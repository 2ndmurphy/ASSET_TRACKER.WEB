export interface AssetItem {
  id: number,
  assetCode: string,
  assetName: string,
  description: string,
  lifecycleStatus: string,
  linkedEpc: string,
  currentLocation: string,
  lastSeenAt: string,
  createdAt: string
}

export interface CreateAssetRequest {
  assetCode: string,
  name: string,
  description: string,
  metadata: any,
}

export interface UpdateAssetRequest{
  id: number,
  name: string,
  status: string,
  metadata: any,
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorType: number;
}

export interface AssetCatalogData {
  items: AssetItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export type AssetCatalogResponse = ApiResponse<AssetCatalogData>;
export type SingleAssetResponse = ApiResponse<AssetItem>;
