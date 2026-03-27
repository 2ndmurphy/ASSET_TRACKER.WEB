import {
  getStocktakeHistories,
  getStocktakeDetails,
} from "@/src/lib/api/audit";
import {
  StocktakeHistoryResponse,
  StocktakeDetailResponse,
} from "@/src/types/auditTypes";

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
