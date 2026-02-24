"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalCount?: number;
  pageSize?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
  pageSize,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-slate-500">
          Page <span className="text-slate-300 font-medium">{currentPage}</span>{" "}
          of <span className="text-slate-300 font-medium">{totalPages}</span>
        </p>
        {totalCount !== undefined && pageSize !== undefined && (
          <p className="text-xs text-slate-500">Total {totalCount} items</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <ChevronLeft size={20} />
        </button>

        {[...Array(Math.min(5, totalPages))].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
