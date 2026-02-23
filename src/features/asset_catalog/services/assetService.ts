import { getAssetCatalog, getAssetById, createAsset, updateAsset } from "@/src/lib/api/asset_management/asset";
import { AssetItem, AssetCatalogResponse, CreateAssetRequest, UpdateAssetRequest } from "@/src/lib/api/asset_management/types";

export async function getAssetCatalogService(pageNumber: number, pageSize: number, search?: string): Promise<AssetCatalogResponse> {
  const response = await getAssetCatalog(pageNumber, pageSize, search);

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch asset catalog");
  }

  return response;
}

export async function getAssetByIdService(assetId: number): Promise<AssetItem> {
  const response = await getAssetById(assetId);

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch asset by id");
  }

  return response.data;
}

export async function createAssetService(params: CreateAssetRequest): Promise<AssetItem> {
  const response = await createAsset(params);

  if (!response.success) {
    throw new Error(response.message || "Failed to create asset");
  }

  return response.data;
}

export async function updateAssetService(params: UpdateAssetRequest): Promise<AssetItem> {
  const response = await updateAsset(params);

  if (!response.success) {
    throw new Error(response.message || "Failed to update asset");
  }

  return response.data;
}