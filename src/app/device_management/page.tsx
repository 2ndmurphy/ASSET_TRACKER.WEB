"use client";

import React, { useState, useMemo } from "react";
import { useDeviceManagement } from "@/src/features/device_management/hooks/useDevice";
import { useCreateDevice } from "@/src/features/device_management/hooks/useCreateDevice";
import { useUpdateDevice } from "@/src/features/device_management/hooks/useUpdateDevice";
import { useKillSwitch } from "@/src/features/device_management/hooks/useKillSwitch";
import { useKillUser } from "@/src/features/device_management/hooks/useKillUser";
import { useKillScan } from "@/src/features/device_management/hooks/useKillScan";
import { DeviceItem } from "@/src/types/deviceTypes";
import DataTable, { ColumnDef } from "@/src/components/ui/DataTable";
import Pagination from "@/src/components/ui/Pagination";
import ActionFormSidebar from "@/src/components/ui/ActionFormSidebar";
import DeviceFormFields from "@/src/features/device_management/components/DeviceFormFields";
import {
  Search,
  Plus,
  Monitor,
  RefreshCw,
  SlidersHorizontal,
  Edit2,
  Power,
  UserMinus,
  ScanLine,
  Activity,
  User,
  ClipboardList,
} from "lucide-react";

export default function DeviceManagementPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<DeviceItem | null>(null);
  const [formData, setFormData] = useState<Partial<DeviceItem>>({
    deviceName: "",
    hardwareId: "",
    isDeviceHardwareActive: true,
  });

  const { data, loading, error, refresh } = useDeviceManagement(
    page,
    pageSize,
    searchTerm,
  );
  const { createDevice, loading: isCreating } = useCreateDevice();
  const { updateDevice, loading: isUpdating } = useUpdateDevice();

  const { killDevice, loading: isKillingSwitch } = useKillSwitch();
  const { killUser, loading: isKillingUser } = useKillUser();
  const { killScan, loading: isKillingScan } = useKillScan();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refresh();
  };

  const handleAddClick = () => {
    setEditingDevice(null);
    setFormData({
      deviceName: "",
      hardwareId: "",
      isDeviceHardwareActive: true,
    });
    setIsSidebarOpen(true);
  };

  const handleEditClick = (device: DeviceItem) => {
    setEditingDevice(device);
    setFormData(device);
    setIsSidebarOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingDevice) {
        await updateDevice({
          deviceId: editingDevice.deviceId,
          deviceName: formData.deviceName || "",
          isActive: formData.isDeviceHardwareActive || false,
        });
      } else {
        await createDevice({
          deviceName: formData.deviceName || "",
          hardwareId: formData.hardwareId || "",
        });
      }
      setIsSidebarOpen(false);
      refresh();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const columns = useMemo<ColumnDef<DeviceItem>[]>(
    () => [
      {
        id: "device",
        header: "Device",
        cell: (row) => (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              {row.deviceName}
            </span>
            <span className="text-xs text-slate-500 font-mono mt-0.5">
              {row.hardwareId}
            </span>
          </div>
        ),
      },
      {
        id: "operator",
        header: "Operator",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <User size={14} className="text-blue-400" />
            <div className="flex flex-col">
              <span className="text-sm text-slate-300">
                {row.currentOperator || "No Operator"}
              </span>
              {row.isUserLoggedIn && (
                <span className="text-[10px] text-emerald-500">
                  ID: {row.userSessionId}
                </span>
              )}
            </div>
          </div>
        ),
      },
      {
        id: "task",
        header: "Current Task",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <ClipboardList size={14} className="text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-sm text-slate-300">
                {row.currentTask || "Idle"}
              </span>
              {row.scanSessionId && (
                <span className="text-[10px] text-indigo-500">Scan ACTIVE</span>
              )}
            </div>
          </div>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: (row) => (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
              row.isDeviceHardwareActive
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }`}
          >
            <Activity size={10} />
            {row.isDeviceHardwareActive ? "Active" : "Inactive"}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Operations",
        className: "text-right",
        cell: (row) => (
          <div className="flex items-center justify-end gap-1">
            {/* Standard Actions */}
            <div className="flex items-center gap-1 mr-4 border-r border-white/10 pr-4">
              <button
                onClick={() => handleEditClick(row)}
                className="p-2 hover:bg-amber-500/20 hover:text-amber-400 text-slate-400 rounded-lg transition-colors"
                title="Edit Device"
              >
                <Edit2 size={16} />
              </button>
            </div>

            {/* Kill Operations */}
            <button
              onClick={async (e) => {
                e.stopPropagation();
                if (confirm("Kill scan session?")) {
                  await killScan({ targetId: row.deviceId });
                  refresh();
                }
              }}
              disabled={!row.scanSessionId || isKillingScan}
              className={`p-2 rounded-lg transition-colors ${
                row.scanSessionId
                  ? "hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300"
                  : "text-slate-600 cursor-not-allowed opacity-50"
              }`}
              title="Kill Scan Session"
            >
              <ScanLine size={16} />
            </button>

            <button
              onClick={async (e) => {
                e.stopPropagation();
                if (confirm("Kill user session?")) {
                  await killUser({ targetId: row.deviceId });
                  refresh();
                }
              }}
              disabled={!row.isUserLoggedIn || isKillingUser}
              className={`p-2 rounded-lg transition-colors ${
                row.isUserLoggedIn
                  ? "hover:bg-orange-500/20 text-orange-400 hover:text-orange-300"
                  : "text-slate-600 cursor-not-allowed opacity-50"
              }`}
              title="Kill User Session"
            >
              <UserMinus size={16} />
            </button>

            <button
              onClick={async (e) => {
                e.stopPropagation();
                if (confirm("Emergency Kill Switch?")) {
                  await killDevice({ targetId: row.deviceId });
                  refresh();
                }
              }}
              disabled={isKillingSwitch}
              className="p-2 hover:bg-rose-500/20 text-rose-500 hover:text-rose-400 rounded-lg transition-colors"
              title="Emergency Kill Switch"
            >
              <Power size={16} />
            </button>
          </div>
        ),
      },
    ],
    [
      refresh,
      killDevice,
      killScan,
      killUser,
      isKillingScan,
      isKillingSwitch,
      isKillingUser,
    ],
  );

  const totalCount = data?.data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / (pageSize || 1));

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Monitor className="text-blue-500" />
            Device Management
          </h2>
          <p className="text-slate-400 text-sm">
            Monitor and control active hardware, user sessions, and scan
            operations.
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
          Register Device
        </button>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        <form onSubmit={handleSearch} className="relative w-full sm:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or hardware ID..."
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

      {/* Table Section */}
      {loading && !data?.data?.items ? (
        <div className="h-[400px] w-full bg-white/5 animate-pulse rounded-2xl border border-white/10" />
      ) : error ? (
        <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center text-rose-400">
          <p className="mb-4">Error loading devices: {error.message}</p>
          <button
            onClick={() => refresh()}
            className="px-4 py-2 bg-rose-500/20 rounded-lg hover:bg-rose-500/30"
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
              rowKey={(row) => row.deviceId}
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

      {/* Form Sidebar */}
      <ActionFormSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        title={editingDevice ? "Edit Device" : "Register Device"}
        subtitle={
          editingDevice
            ? `Updating ${editingDevice.deviceName}`
            : "Register a new hardware device to the system."
        }
        onSave={handleSave}
        isSaving={isCreating || isUpdating}
        submitLabel={editingDevice ? "Update Device" : "Complete Registration"}
      >
        <DeviceFormFields
          formData={formData}
          setFormData={setFormData}
          isEdit={!!editingDevice}
        />
      </ActionFormSidebar>
    </div>
  );
}
