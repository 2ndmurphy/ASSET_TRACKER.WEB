import { apiClient } from "./client";
import {
  StocktakeComparisonRequest,
  AuditReportSummaryResponse,
  StocktakeHistoryResponse,
  StocktakeDetailResponse,
  AssetLifecycleResponse,
  StocktakeComparisonResponse,
} from "../../types/auditTypes";

export const getAuditReportSummary = async () => {
  return apiClient.get<AuditReportSummaryResponse>(`/audit-report/summary`);
};

export const getStocktakeHistories = async (
  pageNumber: number,
  pageSize: number,
  search?: string,
) => {
  const params = new URLSearchParams();
  if (pageNumber) params.append("page", pageNumber.toString());
  if (pageSize) params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);

  return apiClient.get<StocktakeHistoryResponse>(
    `/audit-report/stocktake-histories?${params.toString()}`,
  );
};

export const getStocktakeDetails = async (
  stocktakeId: number,
  pageNumber: number,
  pageSize: number,
  search?: string,
) => {
  const params = new URLSearchParams();
  if (pageNumber) params.append("page", pageNumber.toString());
  if (pageSize) params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);

  return apiClient.get<StocktakeDetailResponse>(
    `/audit-report/stocktake-histories/${stocktakeId}?${params.toString()}`,
  );
};

export const getAssetLifecycles = async (assetId: number) => {
  return apiClient.get<AssetLifecycleResponse>(
    `/audit-report/asset-lifecycles/${assetId}`,
  );
};

export const getStocktakeComparison = async (
  request: StocktakeComparisonRequest,
) => {
  return apiClient.post<StocktakeComparisonResponse>(
    `/audit-report/stocktake-comparisons`,
    request,
  );
};
