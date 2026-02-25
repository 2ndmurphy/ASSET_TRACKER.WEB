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

  const response = await apiClient.get<AssetCatalogResponse>(
    `/assets?${params.toString()}`,
  );
  return response as unknown as AssetCatalogResponse;
};

export const getAssetById = async (id: number) => {
  const response = await apiClient.get<SingleAssetResponse>(`/assets/${id}`);
  return response as unknown as SingleAssetResponse;
};

export const createAsset = async (asset: CreateAssetRequest) => {
  const response = await apiClient.post<SingleAssetResponse>(
    `/assets/new`,
    asset,
  );
  return response as unknown as SingleAssetResponse;
};

export const updateAsset = async (asset: UpdateAssetRequest) => {
  const response = await apiClient.put<SingleAssetResponse>(
    `/assets/edit`,
    asset,
  );
  return response as unknown as SingleAssetResponse;
};

export const bulkImportAssets = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<BulkImportRequest>(
    `assets/bulk-import`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response as unknown as BulkImportAssetsResponse;
};
