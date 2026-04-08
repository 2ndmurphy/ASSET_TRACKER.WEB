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

  return apiClient.get<AssetCatalogResponse>(
    `/web/assets?${params.toString()}`,
  );
};

export const getAssetById = (id: number) =>
  apiClient.get<SingleAssetResponse>(`/web/assets/${id}`);

export const createAsset = (asset: CreateAssetRequest) =>
  apiClient.post<SingleAssetResponse>(`/web/assets/new`, asset);

export const updateAsset = (asset: UpdateAssetRequest) =>
  apiClient.patch<SingleAssetResponse>(`/web/assets/edit`, asset);

export const deleteAsset = (assetId: number) =>
  apiClient.patch<SingleAssetResponse>(`/web/assets/${assetId}/delete`);

export const bulkImportAssets = (assetFile: BulkImportRequest) => {
  const formData = new FormData();
  formData.append("file", assetFile.file);

  return apiClient.post<BulkImportAssetsResponse>(
    `/web/assets/bulk-import`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};
