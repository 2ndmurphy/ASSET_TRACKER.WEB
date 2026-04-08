"use client";

import React, { useState, useMemo, useRef } from "react";
import { useStocktakeHistories } from "@/src/features/audit_&_reporting/hooks/useStocktakeHistories";
import DataTable, { ColumnDef } from "@/src/components/ui/DataTable";
import Pagination from "@/src/components/ui/Pagination";
import StatCard from "@/src/features/dashboard/components/StatCard";
import { Shrink, Percent, ShieldAlert } from "lucide-react";
import {
  Search,
  RefreshCw,
  Eye,
  MapPin,
  SlidersHorizontal,
  Trash,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { StatCardSkeleton } from "@/src/components/ui/Skeletons";
import { diffForHumans } from "@/src/lib/utils/diffForHumans";
import StocktakeDetails from "@/src/features/audit_&_reporting/components/StocktakeDetails";
import StocktakeComparison from "@/src/features/audit_&_reporting/components/StocktakeComparison";
import { useAuditSummary } from "@/src/features/audit_&_reporting/hooks/useAuditSummary";

export default function AuditReportingPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isImportSidebarOpen, setIsImportSidebarOpen] = useState(false);
  const [selectedStocktakeId, setSelectedStocktakeId] = useState<number | null>(
    null,
  );
  const {
    data: summaryData,
    loading: summaryLoading,
    error: summaryError,
  } = useAuditSummary();
  const {
    data: stocktakeData,
    loading: stocktakeLoading,
    error: stocktakeError,
    refresh,
  } = useStocktakeHistories(page, pageSize, searchTerm);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refresh();
  };

  const handleView = (stocktakeId: number) => {
    setSelectedStocktakeId(stocktakeId);
    // Scroll to details after render
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleCloseDetails = () => {
    setSelectedStocktakeId(null);
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  const toggleAllRowSelection = () => {
    if (stocktakeData?.data?.items) {
      if (selectedRows.length === stocktakeData.data.items.length) {
        setSelectedRows([]);
      } else {
        setSelectedRows(stocktakeData.data.items.map((r) => r.stocktakeId));
      }
    }
  };

  // Dynamic Columns
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select",
        header: (
          <div className="flex justify-center items-center w-full">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-white/20 bg-white/5 cursor-pointer accent-blue-500"
              checked={
                !!stocktakeData?.data?.items &&
                selectedRows.length === stocktakeData.data.items.length &&
                stocktakeData.data.items.length > 0
              }
              onChange={toggleAllRowSelection}
            />
          </div>
        ),
        cell: (row) => (
          <div className="flex justify-center items-center w-full">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-white/20 bg-white/5 cursor-pointer accent-blue-500"
              checked={selectedRows.includes(row.stocktakeId)}
              onChange={(e) => {
                e.stopPropagation();
                toggleRowSelection(row.stocktakeId);
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ),
        className: "w-12 px-2",
        headerClassName: "w-12 px-2",
      },
      {
        id: "auditDate",
        header: "Audit Date",
        cell: (row) => (
          <div className="flex flex-col">
            <span className="text-sm text-slate-500 font-mono mt-0.5">
              {new Date(row.auditDate).toLocaleDateString()}
            </span>
          </div>
        ),
      },
      {
        id: "location",
        header: "Location",
        accessor: "locationName",
        cell: (row) => (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <MapPin size={14} className="text-blue-400" />
            <span>{row.locationName}</span>
          </div>
        ),
      },
      {
        id: "performedBy",
        header: "Performed By",
        accessor: "performedBy",
        cell: (row) => (
          <span className="text-xs text-slate-400 font-mono bg-white/5 px-2 py-1 rounded border border-white/5">
            {row.performedBy}
          </span>
        ),
      },
      {
        id: "expected",
        header: "Expected",
        accessor: "expected",
        cell: (row) => (
          <span className="text-xs text-blue-400 font-mono bg-blue-500/5 px-2 py-1 rounded border border-blue-500/5">
            {row.expected}
          </span>
        ),
      },
      {
        id: "found",
        header: "Found",
        accessor: "found",
        cell: (row) => (
          <span className="text-xs text-green-400 font-mono bg-green-500/5 px-2 py-1 rounded border border-green-500/5">
            {row.found}
          </span>
        ),
      },
      {
        id: "missing",
        header: "Missing",
        accessor: "missing",
        cell: (row) => (
          <span className="text-xs text-red-400 font-mono bg-red-500/5 px-2 py-1 rounded border border-red-500/5">
            {row.missing}
          </span>
        ),
      },
      {
        id: "misplaced",
        header: "Misplaced",
        accessor: "misplaced",
        cell: (row) => (
          <span className="text-xs text-yellow-400 font-mono bg-yellow-500/5 px-2 py-1 rounded border border-yellow-500/5">
            {row.misplaced}
          </span>
        ),
      },
      {
        id: "unexpected",
        header: "Unexpected",
        accessor: "unexpected",
        cell: (row) => (
          <span className="text-xs text-slate-400 font-mono bg-white/5 px-2 py-1 rounded border border-white/5">
            {row.unexpected}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Action",
        className: "text-right",
        cell: (row) => (
          <div className="flex items-start justify-left gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleView(row.stocktakeId);
              }}
              className="p-2 hover:bg-blue-500/20 hover:text-blue-400 text-slate-400 rounded-lg transition-colors"
              title="View Stocktake Details"
            >
              <Eye size={16} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleView(row.stocktakeId);
              }}
              className="p-2 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 rounded-lg transition-colors"
              title="Delete Stocktake"
            >
              <Trash size={16} />
            </button>
          </div>
        ),
      },
    ],
    [selectedRows, stocktakeData?.data?.items],
  );

  const totalCount = stocktakeData?.data?.totalCount ?? 0;
  const safePageSize = pageSize > 0 ? pageSize : 1;
  const totalPages = Math.ceil(totalCount / safePageSize);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="text-blue-500" />
            Audit & Reporting
          </h2>
          <p className="text-slate-400 text-sm">
            Manage and track your organization&apos;s assets in real-time.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      {summaryLoading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        </>
      ) : summaryError ? (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          Error: {summaryError.message}
        </div>
      ) : (
        summaryData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Shrinkage"
                value={summaryData.data.summary.totalShrinkage}
                icon={<Shrink className="text-green-400" size={24} />}
              />
              <StatCard
                title="Recovery Rate"
                value={summaryData.data.summary.recoveryRate}
                icon={<Percent size={24} />}
              />
              <StatCard
                title="Total Recovered"
                value={summaryData.data.summary.totalRecovered}
                icon={<RefreshCw className="text-yellow-400" size={24} />}
              />
              <StatCard
                title="Top Missing Asset"
                value={summaryData.data.summary.topMissingAssetType}
                icon={<ShieldAlert size={24} />}
              />
            </div>
          </>
        )
      )}

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
          {selectedRows.length >= 2 && (
            <button
              onClick={() => {
                setIsComparing(true);
                setSelectedStocktakeId(null);
                setTimeout(() => {
                  detailsRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 100);
              }}
              className="animate-in fade-in zoom-in-95 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm font-medium flex items-center justify-center gap-2"
            >
              Compare
            </button>
          )}

          <button
            onClick={() => refresh()}
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:bg-white/10 transition-colors"
            title="Refresh"
          >
            <RefreshCw
              size={18}
              className={stocktakeLoading ? "animate-spin" : ""}
            />
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/10 transition-colors text-sm font-medium">
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
            {stocktakeData?.data?.items
              ? `Showing ${stocktakeData.data.items.length} of ${stocktakeData.data.totalCount}`
              : "Loading..."}
          </span>
        </div>
      </div>

      {/* Table Section */}
      {stocktakeLoading && !stocktakeData?.data?.items ? (
        <div className="space-y-4">
          <div className="h-[400px] w-full bg-white/5 animate-pulse rounded-2xl border border-white/10" />
        </div>
      ) : stocktakeError ? (
        <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
          <p className="text-rose-400 font-medium mb-4">
            Error loading assets: {stocktakeError.message}
          </p>
          <button
            onClick={() => refresh()}
            className="px-4 py-2 bg-rose-500/20 text-rose-300 rounded-lg hover:bg-rose-500/30 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      ) : (
        stocktakeData?.data?.items && (
          <>
            <DataTable
              data={stocktakeData.data.items}
              columns={columns}
              rowKey={(row) => row.stocktakeId}
              onRowClick={() => {}}
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

      {/* Stocktake Details Section */}
      {selectedStocktakeId !== null && !isComparing && (
        <div
          ref={detailsRef}
          className="mt-2 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleCloseDetails}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Back to List
            </button>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500 font-medium">
              Stocktake #{selectedStocktakeId}
            </span>
          </div>
          <StocktakeDetails stocktakeId={selectedStocktakeId} />
        </div>
      )}

      {/* Comparison Section */}
      {isComparing && selectedRows.length >= 2 && (
        <div
          ref={detailsRef}
          className="mt-2 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setIsComparing(false)}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Close Comparison
            </button>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              Comparing Stocktakes: {selectedRows.join(" vs ")}
            </span>
          </div>
          <StocktakeComparison
            previousStocktakeId={Math.min(...selectedRows)}
            currentStocktakeId={Math.max(...selectedRows)}
          />
        </div>
      )}
    </div>
  );
}
