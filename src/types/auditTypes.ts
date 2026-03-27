export interface StocktakeHistoryItem {
  stocktakeId: number;
  auditDate: string;
  locationName: string;
  performedBy: string;
  expected: number;
  found: number;
  missing: number;
  misplaced: number;
  unexpected: number;
}

export interface StocktakeDetailItem {
  epc: string;
  assetName: string;
  assetCode: string;
  status: string;
  note: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface StocktakeHistoryData {
  items: StocktakeHistoryItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface StocktakeDetailData {
  items: StocktakeDetailItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export type StocktakeHistoryResponse = ApiResponse<StocktakeHistoryData>;
export type StocktakeDetailResponse = ApiResponse<StocktakeDetailData>;
