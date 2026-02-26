import { apiClient } from "./client";
import {
  AssetCatalogResponse,
  SingleAssetResponse,
  CreateAssetRequest,
  UpdateAssetRequest,
  BulkImportRequest,
  BulkImportAssetsResponse,
} from "../../types/assetTypes";

export const getAssetCatalog = async (
  pageNumber: number,
  pageSize: number,
  search?: string,
) => {
  const params = new URLSearchParams();
  if (pageNumber) params.append("page", pageNumber.toString());
  if (pageSize) params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);

  return apiClient.get<AssetCatalogResponse>(`/assets?${params.toString()}`);
};

export const getAssetById = (id: number) =>
  apiClient.get<SingleAssetResponse>(`/assets/${id}`);

export const createAsset = (asset: CreateAssetRequest) =>
  apiClient.post<SingleAssetResponse>(`/assets/new`, asset);

export const updateAsset = (asset: UpdateAssetRequest) =>
  apiClient.patch<SingleAssetResponse>(`/assets/edit`, asset);

export const bulkImportAssets = (assetFile: BulkImportRequest) => {
  const formData = new FormData();
  formData.append("file", assetFile.file);

  return apiClient.post<BulkImportAssetsResponse>(
    `/assets/bulk-import`,
    formData,
  );
};
