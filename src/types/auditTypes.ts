export interface AuditReportSummaryItem {
  totalShrinkage: number;
  recoveryRate: number;
  totalRecovered: number;
  topMissingAssetType: string;
}

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
  assetId: number;
  epc: string;
  assetName: string;
  assetCode: string;
  status: string;
  note: string | null;
}

export interface AssetLifecycleItem {
  eventDate: string;
  eventType: string;
  performedBy: string;
  locationName: string;
  description: string;
  status: string;
  deviceName: string;
}

export interface StocktakeComparisonItem {
  assetCode: string;
  assetName: string;
  previousAuditLocation: string;
  currentAuditLocation: string;
  previousStatus: string;
  currentStatus: string;
  auditAnalysis: string;
  currentNote: string | null;
}

// Requests Payload
export interface StocktakeComparisonRequest {
  previousStocktakeId: number;
  currentStocktakeId: number;
}

// API Response and Data
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface AuditReportSummaryData {
  summary: AuditReportSummaryItem;
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

export interface AssetLifecycleData {
  assetId: number;
  items: AssetLifecycleItem[];
}

export interface StocktakeComparisonData {
  previousStocktakeId: number;
  currentStocktakeId: number;
  items: StocktakeComparisonItem[];
}

export type AuditReportSummaryResponse = ApiResponse<AuditReportSummaryData>;
export type StocktakeHistoryResponse = ApiResponse<StocktakeHistoryData>;
export type StocktakeDetailResponse = ApiResponse<StocktakeDetailData>;
export type AssetLifecycleResponse = ApiResponse<AssetLifecycleData>;
export type StocktakeComparisonResponse = ApiResponse<StocktakeComparisonData>;
