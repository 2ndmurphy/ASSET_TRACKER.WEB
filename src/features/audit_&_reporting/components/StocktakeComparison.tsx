"use client";

import React, { useMemo, useState } from "react";
import { useStocktakeComparisons } from "../hooks/useStocktakeComparisons";
import DataTable, { ColumnDef } from "@/src/components/ui/DataTable";
import Pagination from "@/src/components/ui/Pagination";
import { RefreshCw, LayoutDashboard } from "lucide-react";
import { StocktakeComparisonItem } from "@/src/types/auditTypes";

export default function StocktakeComparison({
  previousStocktakeId,
  currentStocktakeId,
}: {
  previousStocktakeId: number;
  currentStocktakeId: number;
}) {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const request = useMemo(
    () => ({
      previousStocktakeId,
      currentStocktakeId,
    }),
    [previousStocktakeId, currentStocktakeId],
  );

  const { data, loading, error, refresh } = useStocktakeComparisons(request);

  const columns = useMemo<ColumnDef<StocktakeComparisonItem>[]>(
    () => [
      {
        id: "assetCode",
        header: "Asset Code",
        cell: (row) => (
          <span className="text-sm font-medium text-white">
            {row.assetCode}
          </span>
        ),
      },
      {
        id: "assetName",
        header: "Asset Name",
        cell: (row) => (
          <span className="text-sm text-slate-300">{row.assetName}</span>
        ),
      },
      {
        id: "locations",
        header: "Locations (Prev -> Curr)",
        cell: (row) => (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 bg-white/5 px-2 py-1 rounded">
              {row.previousAuditLocation || "N/A"}
            </span>
            <span className="text-slate-500">→</span>
            <span className="text-slate-300 bg-white/5 px-2 py-1 rounded">
              {row.currentAuditLocation || "N/A"}
            </span>
          </div>
        ),
      },
      {
        id: "statusChange",
        header: "Status Change",
        cell: (row) => (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/5">
              {row.previousStatus || "N/A"}
            </span>
            <span className="text-slate-500">→</span>
            <span
              className={`px-2 py-1 rounded font-medium border ${
                row.currentStatus === "Found"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : row.currentStatus?.includes("Missing")
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    : row.currentStatus === "Misplaced"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
              }`}
            >
              {row.currentStatus || "N/A"}
            </span>
          </div>
        ),
      },
      {
        id: "auditAnalysis",
        header: "Analysis",
        cell: (row) => (
          <span
            className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
              row.auditAnalysis === "Recovered"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : row.auditAnalysis === "New Loss"
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  : row.auditAnalysis === "Consistent"
                    ? "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                    : "bg-white/5 text-slate-300 border border-white/10"
            }`}
          >
            {row.auditAnalysis}
          </span>
        ),
      },
      {
        id: "note",
        header: "Note",
        cell: (row) => (
          <span className="text-sm text-slate-400">
            {row.currentNote || "-"}
          </span>
        ),
      },
    ],
    [],
  );

  const items = data?.data?.items || [];
  const safePageSize = pageSize > 0 ? pageSize : 10;
  const totalCount = items.length;
  const totalPages = Math.ceil(totalCount / safePageSize);
  const paginatedItems = items.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutDashboard className="text-indigo-400" />
            Stocktake Comparison Logs
          </h2>
          <p className="text-slate-400 text-sm">
            Analysis of asset status changes from Stocktake #
            {previousStocktakeId} to #{currentStocktakeId}.
          </p>
        </div>

        <button
          onClick={() => refresh()}
          className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:bg-white/10 transition-colors shrink-0"
          title="Refresh"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {loading && !data ? (
        <div className="h-[400px] w-full bg-white/5 animate-pulse rounded-2xl border border-white/10" />
      ) : error ? (
        <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
          <p className="text-rose-400 font-medium mb-4">
            Error loading comparison: {error.message}
          </p>
          <button
            onClick={() => refresh()}
            className="px-4 py-2 bg-rose-500/20 text-rose-300 rounded-lg hover:bg-rose-500/30 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <DataTable
            data={paginatedItems}
            columns={columns}
            rowKey={(row) => row.assetCode}
          />
          {totalCount > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalCount={totalCount}
              pageSize={pageSize}
            />
          )}
        </>
      )}
    </div>
  );
}
