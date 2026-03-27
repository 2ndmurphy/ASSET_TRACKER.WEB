import { apiClient } from "./client";
import {
  StocktakeHistoryResponse,
  StocktakeDetailResponse,
} from "../../types/auditTypes";

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
