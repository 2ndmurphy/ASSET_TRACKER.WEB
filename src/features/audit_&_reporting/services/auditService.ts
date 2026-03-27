import {
  getAuditReportSummary,
  getStocktakeHistories,
  getStocktakeDetails,
  getAssetLifecycles,
  getStocktakeComparison,
} from "@/src/lib/api/audit";
import {
  StocktakeComparisonRequest,
  AuditReportSummaryResponse,
  StocktakeHistoryResponse,
  StocktakeDetailResponse,
  AssetLifecycleResponse,
  StocktakeComparisonResponse,
} from "@/src/types/auditTypes";

export async function getAuditReportSummaryService(): Promise<AuditReportSummaryResponse> {
  const response = await getAuditReportSummary();

  if (response && response.success === false) {
    throw new Error(
      response.message || "Failed to fetch audit report summary.",
    );
  }

  return response;
}

export async function getStocktakeHistoriesService(
  pageNumber: number,
  pageSize: number,
  search?: string,
): Promise<StocktakeHistoryResponse> {
  const response = await getStocktakeHistories(pageNumber, pageSize, search);

  if (response && response.success === false) {
    throw new Error(response.message || "Failed to fetch stocktake histories.");
  }

  return response;
}

export async function getStocktakeDetailsService(
  stocktakeId: number,
  pageNumber: number,
  pageSize: number,
  search?: string,
): Promise<StocktakeDetailResponse> {
  const response = await getStocktakeDetails(
    stocktakeId,
    pageNumber,
    pageSize,
    search,
  );

  if (response && response.success === false) {
    throw new Error(response.message || "Failed to fetch stocktake details.");
  }

  return response;
}

export async function getAssetLifecyclesService(
  assetId: number,
): Promise<AssetLifecycleResponse> {
  const response = await getAssetLifecycles(assetId);

  if (response && response.success === false) {
    throw new Error(response.message || "Failed to fetch asset lifecycles.");
  }

  return response;
}

export async function getStocktakeComparisonService(
  request: StocktakeComparisonRequest,
): Promise<StocktakeComparisonResponse> {
  const response = await getStocktakeComparison(request);

  if (response && response.success === false) {
    throw new Error(
      response.message || "Failed to fetch stocktake comparison.",
    );
  }

  return response;
}
