"use client";

import React, { useState, useMemo } from "react";
import { useAssetCatalog } from "@/src/features/asset_catalog/hooks/useAssetCatalog";
import { useCreateAsset } from "@/src/features/asset_catalog/hooks/useCreateAsset";
import { useUpdateAsset } from "@/src/features/asset_catalog/hooks/useUpdateAsset";
import DataTable, { ColumnDef } from "@/src/components/ui/DataTable";
import ActionFormSidebar from "@/src/components/ui/ActionFormSidebar";
import AssetFormFields from "@/src/features/asset_catalog/components/AssetFormFields";
import Pagination from "@/src/components/ui/Pagination";
import {
  Search,
  Plus,
  Package,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import { Eye, Edit2, MapPin, Clock, RefreshCcw } from "lucide-react";
import { AssetItem } from "@/src/types/assetTypes";

function getStatusStyles(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "in-transit":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "missing":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
}

export default function AssetManagementPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<AssetItem | null>(null);
  const [formData, setFormData] = useState<Partial<AssetItem>>({
    assetCode: "",
    assetName: "",
    description: "",
    lifecycleStatus: "Active",
  });

  const { data, loading, error, refresh } = useAssetCatalog(
    page,
    pageSize,
    searchTerm,
  );
  const { createAsset, loading: isCreating } = useCreateAsset();
  const { updateAsset, loading: isUpdating } = useUpdateAsset();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refresh();
  };

  const handleAddClick = () => {
    setEditingAsset(null);
    setFormData({
      assetCode: "",
      assetName: "",
      description: "",
      lifecycleStatus: "Active",
    });
    setIsSidebarOpen(true);
  };

  const handleEditClick = (asset: AssetItem) => {
    setEditingAsset(asset);
    setFormData(asset);
    setIsSidebarOpen(true);
  };

  const handleView = (id: number) => {
    // TODO: Implement view logic or navigation
    console.log("View asset", id);
  };

  const columns = useMemo<ColumnDef<AssetItem>[]>(
    () => [
      {
        id: "asset",
        header: "Asset",
        cell: (row) => (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              {row.assetName}
            </span>
            <span className="text-xs text-slate-500 font-mono mt-0.5">
              {row.assetCode}
            </span>
          </div>
        ),
      },
      {
        id: "epc",
        header: "EPC / Tag",
        cell: (row) => (
          <span className="text-xs text-slate-400 font-mono bg-white/5 px-2 py-1 rounded border border-white/5">
            {row.linkedEpc || "Unassigned"}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: (row) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${getStatusStyles(row.lifecycleStatus)}`}
          >
            {row.lifecycleStatus}
          </span>
        ),
      },
      {
        id: "location",
        header: "Location",
        accessor: "currentLocation",
        cell: (row) => (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <MapPin size={14} className="text-blue-400" />
            <span>{row.currentLocation || "Not added yet"}</span>
          </div>
        ),
      },
      {
        id: "lastSeen",
        header: "Last Seen",
        accessor: "lastSeenAt",
        cell: (row) => (
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Clock size={14} />
            <span>
              {new Date(row.lastSeenAt).toLocaleString([], {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>
          </div>
        ),
      },
      {
        id: "actions",
        header: "Action",
        className: "text-right",
        cell: (row) => (
          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleView(row.id);
              }}
              className="p-2 hover:bg-blue-500/20 hover:text-blue-400 text-slate-400 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(row);
              }}
              className="p-2 hover:bg-amber-500/20 hover:text-amber-400 text-slate-400 rounded-lg transition-colors"
              title="Edit Asset"
            >
              <Edit2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const handleSave = async () => {
    try {
      if (editingAsset) {
        await updateAsset({
          id: editingAsset.id,
          name: formData.assetCode || "",
          status: formData.lifecycleStatus || "Active",
          metadata: null,
        });
      } else {
        await createAsset({
          assetCode: formData.assetCode || "",
          name: formData.assetName || "",
          description: formData.description || "",
          metadata: null,
        });
      }

      setIsSidebarOpen(false);
      refresh();
    } catch (err) {
      console.error("Save operation failed in component:", err);
    }
  };

  const totalCount = data?.data?.totalCount ?? 0;
  const safePageSize = pageSize > 0 ? pageSize : 1;
  const totalPages = Math.ceil(totalCount / safePageSize);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="text-blue-500" />
            Asset Catalog
          </h2>
          <p className="text-slate-400 text-sm">
            Manage and track your organization&apos;s assets in real-time.
          </p>
        </div>

        <button
          onClick={handleAddClick}
          className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group active:scale-95"
        >
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          Add New Asset
        </button>
      </div>

      {/* Filters & Search Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        <form onSubmit={handleSearch} className="relative w-full sm:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by code or name..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => refresh()}
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:bg-white/10 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/10 transition-colors text-sm font-medium">
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
            {data?.data?.items
              ? `Showing ${data.data.items.length} of ${data.data.totalCount}`
              : "Loading..."}
          </span>
        </div>
      </div>

      {/* Main Content (Table) */}
      {loading && !data?.data?.items ? (
        <div className="space-y-4">
          <div className="h-[400px] w-full bg-white/5 animate-pulse rounded-2xl border border-white/10" />
        </div>
      ) : error ? (
        <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
          <p className="text-rose-400 font-medium mb-4">
            Error loading assets: {error.message}
          </p>
          <button
            onClick={() => refresh()}
            className="px-4 py-2 bg-rose-500/20 text-rose-300 rounded-lg hover:bg-rose-500/30 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      ) : (
        data?.data?.items && (
          <>
            <DataTable
              data={data.data.items}
              columns={columns}
              rowKey={(row) => row.id}
              onRowClick={(row) => handleEditClick(row)}
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalCount={totalCount}
              pageSize={pageSize}
            />
          </>
        )
      )}

      {/* Generic Action Form Sidebar */}
      <ActionFormSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        title={editingAsset ? "Edit Asset" : "Add New Asset"}
        subtitle={
          editingAsset
            ? `Updating ${editingAsset.assetCode}`
            : "Fill in the details to create a new asset."
        }
        onSave={handleSave}
        isSaving={isCreating || isUpdating}
        submitLabel={editingAsset ? "Update Asset" : "Save Asset"}
      >
        <AssetFormFields
          formData={formData}
          setFormData={setFormData}
          isEdit={!!editingAsset}
        />
      </ActionFormSidebar>
    </div>
  );
}
