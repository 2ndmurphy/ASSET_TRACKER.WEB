"use client";

import React, { useState, useCallback } from "react";
import GenericSidebar from "@/src/components/ui/GenericSidebar";
import { useBulkImportAssets } from "../hooks/useBulkImportAssets";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";

interface AssetImportSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssetImportSidebar({
  isOpen,
  onClose,
  onSuccess,
}: AssetImportSidebarProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { importAssets, loading, error, result, reset } = useBulkImportAssets();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && isValidFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const isValidFile = (file: File) => {
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    return (
      validTypes.includes(file.type) ||
      file.name.endsWith(".csv") ||
      file.name.endsWith(".xlsx")
    );
  };

  const handleImport = async () => {
    if (!file) return;
    try {
      await importAssets(file);
      onSuccess();
    } catch (err) {
      console.error("Import failed:", err);
    }
  };

  const handleClose = () => {
    setFile(null);
    reset();
    onClose();
  };

  const footer = (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleClose}
        className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-white/5 transition-all"
      >
        {result ? "Close" : "Cancel"}
      </button>
      {!result && (
        <button
          onClick={handleImport}
          disabled={!file || loading}
          className="flex-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Upload size={18} />
          )}
          Import Assets
        </button>
      )}
    </div>
  );

  return (
    <GenericSidebar
      isOpen={isOpen}
      onClose={handleClose}
      title="Bulk Import Assets"
      subtitle="Upload a CSV or Excel file to add multiple assets at once."
      footer={footer}
      widthClass="max-w-md"
    >
      <div className="space-y-6">
        {!result ? (
          <>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all ${
                isDragging
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                accept=".csv,.xlsx,.xls"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="p-4 rounded-full bg-blue-500/10 text-blue-400 mb-4">
                <Upload size={32} />
              </div>
              <p className="text-white font-medium">
                Click or drag file to upload
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Accepts .csv, .xlsx, .xls
              </p>
            </div>

            {file && (
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="text-blue-400 shrink-0" size={20} />
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                {!loading && (
                  <button
                    onClick={() => setFile(null)}
                    className="p-1 hover:bg-white/10 rounded-lg text-slate-400"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
                <AlertCircle
                  className="text-rose-400 shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-sm text-rose-400">{error.message}</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 mb-4">
              <CheckCircle2 size={48} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">
              Import Successful
            </h4>
            <p className="text-slate-400 mb-6">
              {`Successfully processed ${result.totalProcessed} assets.`}
            </p>
          </div>
        )}
      </div>
    </GenericSidebar>
  );
}
