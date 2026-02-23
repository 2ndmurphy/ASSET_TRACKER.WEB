"use client";

import React, { useState } from "react";
import { useAssetCatalog } from "@/src/features/asset_catalog/hooks/useAssetCatalog";
import { useCreateAsset } from "@/src/features/asset_catalog/hooks/useCreateAsset";
import { useUpdateAsset } from "@/src/features/asset_catalog/hooks/useUpdateAsset";
import AssetTable from "@/src/features/asset_catalog/components/AssetTable";
import AssetFormSidebar from "@/src/features/asset_catalog/components/AssetFormSidebar";
import { Search, Plus, ChevronLeft, ChevronRight, SlidersHorizontal, Package, RefreshCw } from "lucide-react";
import { AssetItem } from "@/src/lib/api/asset_management/types";

export default function AssetManagementPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<AssetItem | null>(null);
  
  const { data, loading, error, refresh } = useAssetCatalog(page, pageSize, searchTerm);
  const { createAsset, loading: isCreating } = useCreateAsset();
  const { updateAsset, loading: isUpdating } = useUpdateAsset();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refresh();
  };

  const handleAddClick = () => {
    setEditingAsset(null);
    setIsSidebarOpen(true);
  };

  const handleEditClick = (asset: AssetItem) => {
    setEditingAsset(asset);
    setIsSidebarOpen(true);
  };

  const handleSave = async (formData: any) => {
    try {
      if (editingAsset) {
        await updateAsset({
          id: editingAsset.id,
          assetName: formData.assetName,
          status: formData.lifecycleStatus,
          metadata: formData.metadata || {}
        });
      } else {
        await createAsset({
          assetCode: formData.assetCode,
          assetName: formData.assetName,
          description: formData.description,
          metadata: {}
        });
      }
      setIsSidebarOpen(false);
      refresh();
    } catch (err) {
      // TODO: show a toast here
      console.error("Save failed:", err);
    }
  };

  const totalPages = data?.data?.totalCount ? Math.ceil(data.data.totalCount / pageSize) : 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="text-blue-500" />
            Asset Catalog
          </h2>
          <p className="text-slate-400 text-sm">Manage and track your organization&apos;s assets in real-time.</p>
        </div>
        
        <button 
          onClick={handleAddClick}
          className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group active:scale-95"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Add New Asset
        </button>
      </div>

      {/* Filters & Search Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        <form onSubmit={handleSearch} className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
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
            {data?.data?.items ? `Showing ${data.data.items.length} of ${data.data.totalCount}` : "Loading..."}
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
             <p className="text-rose-400 font-medium mb-4">Error loading assets: {error.message}</p>
             <button 
                onClick={() => refresh()}
                className="px-4 py-2 bg-rose-500/20 text-rose-300 rounded-lg hover:bg-rose-500/30 transition-colors text-sm"
             >
                Try Again
             </button>
        </div>
      ) : data?.data?.items && (
        <>
          <AssetTable 
            assets={data.data.items} 
            onEdit={handleEditClick}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-slate-500">
                Page <span className="text-slate-300 font-medium">{page}</span> of <span className="text-slate-300 font-medium">{totalPages}</span>
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
      )}

      {/* Asset Form Sidebar */}
      <AssetFormSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        asset={editingAsset}
        onSave={handleSave}
        isSaving={isCreating || isUpdating}
      />
    </div>
  );
}

