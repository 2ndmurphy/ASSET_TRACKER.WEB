"use client";

import React from "react";

import { Tag } from "lucide-react";

export interface ColumnDef<T> {
  id: string;
  header: React.ReactNode;
  accessor?: keyof T;
  cell?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  rowKey: (row: T) => string | number;
  emptyState?: React.ReactNode;
  onRowClick?: (row: T) => void;
}

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  rowKey,
  emptyState,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <tr className="border-b border-white/10 bg-white/2">
              {columns.map((col) => (
                <th
                  key={col.id}
                  className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <Tag size={24} className="opacity-20" />
                    </div>
                    <p>No data found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={rowKey(row)}
                  onClick={() => onRowClick?.(row)}
                  className={`transition-colors group ${onRowClick ? "hover:bg-white/2 cursor-pointer" : ""}`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className={`px-6 py-4 ${col.className ?? ""}`}
                    >
                      {col.cell
                        ? col.cell(row)
                        : col.accessor
                          ? (row[col.accessor] as React.ReactNode)
                          : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
