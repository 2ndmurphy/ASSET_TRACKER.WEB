"use client";

import React, { useState, useMemo } from "react";
import { useLocation } from "@/src/features/location_management/hooks/useLocation";
import { useCreateLocation } from "@/src/features/location_management/hooks/useCreateLocation";
import { useUpdateLocation } from "@/src/features/location_management/hooks/useUpdateLocation";
import DataTable, { ColumnDef } from "@/src/components/ui/DataTable";
import ActionFormSidebar from "@/src/components/ui/ActionFormSidebar";
import LocationFormFields from "@/src/features/location_management/components/LocationFormFields";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Package,
  RefreshCw,
  BookText,
} from "lucide-react";
import { Eye, Edit2, MoreVertical, MapPin, Tag, Clock } from "lucide-react";
import { LocationItem } from "@/src/types/locationTypes";

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
  const [editingLocation, setEditingLocation] = useState<LocationItem | null>(
    null,
  );
  const [formData, setFormData] = useState<Partial<LocationItem>>({
    locationCode: "",
    locationName: "",
    locationDescription: "",
  });

  const { data, loading, error, refresh } = useLocation(
    page,
    pageSize,
    searchTerm,
  );
  const { createLocation, loading: isCreating } = useCreateLocation();
  const { updateLocation, loading: isUpdating } = useUpdateLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refresh();
  };

  const handleAddClick = () => {
    setEditingLocation(null);
    setFormData({
      locationCode: "",
      locationName: "",
      locationDescription: "",
    });
    setIsSidebarOpen(true);
  };

  const handleEditClick = (location: LocationItem) => {
    setEditingLocation(location);
    setFormData(location);
    setIsSidebarOpen(true);
  };

  const handleView = (id: number) => {
    // Implement view logic or navigation
    console.log("View asset", id);
  };

  const columns = useMemo<ColumnDef<LocationItem>[]>(
    () => [
      {
        id: "location",
        header: "Location",
        cell: (row) => (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              {row.locationName}
            </span>
            <span className="text-xs text-slate-500 font-mono mt-0.5">
              {row.locationCode}
            </span>
          </div>
        ),
      },
      {
        id: "description",
        header: "Description",
        accessor: "locationDescription",
        cell: (row) => (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <BookText size={14} className="text-green-400" />
            <span>{row.locationDescription}</span>
          </div>
        ),
      },
      {
        id: "lastUpdatedAt",
        header: "Last Updated At",
        accessor: "lastUpdatedAt",
        cell: (row) => (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Clock size={14} className="text-blue-400" />
            <span>
              {new Date(row.lastUpdatedAt).toLocaleString([], {
                dateStyle: "short",
                timeStyle: "short",
              }) || "Not updated yet."}
            </span>
          </div>
        ),
      },
      {
        id: "actions",
        header: "Action",
        className: "text-right",
        cell: (row) => (
          <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
      if (editingLocation) {
        await updateLocation({
          id: editingLocation.id,
          locationName: formData.locationName || "",
          locationCode: formData.locationCode || "",
          locationDescription: formData.locationDescription || "",
        });
      } else {
        await createLocation({
          locationName: formData.locationName || "",
          locationCode: formData.locationCode || "",
          locationDescription: formData.locationDescription || "",
        });
      }

      setIsSidebarOpen(false);
      refresh();
    } catch (err) {
      console.error("Save operation failed in component:", err);
    }
  };

  const totalPages = data?.data?.totalCount
    ? Math.ceil(data.data.totalCount / pageSize)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="text-blue-500" />
            Location Management
          </h2>
          <p className="text-slate-400 text-sm">
            Manage your organization&apos;s locations in real-time.
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
          Add New Location
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
            Error loading locations: {error.message}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-slate-500">
                  Page{" "}
                  <span className="text-slate-300 font-medium">{page}</span> of{" "}
                  <span className="text-slate-300 font-medium">
                    {totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                          page === pageNum
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                            : "bg-white/5 text-slate-400 hover:bg-white/10"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )
      )}

      {/* Generic Action Form Sidebar */}
      <ActionFormSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        title={editingLocation ? "Edit Location" : "Add New Location"}
        subtitle={
          editingLocation
            ? `Updating ${editingLocation.locationCode}`
            : "Fill in the details to create a new location."
        }
        onSave={handleSave}
        isSaving={isCreating || isUpdating}
        submitLabel={editingLocation ? "Update Location" : "Save Location"}
      >
        <LocationFormFields
          formData={formData}
          setFormData={setFormData}
          isEdit={!!editingLocation}
        />
      </ActionFormSidebar>
    </div>
  );
}
