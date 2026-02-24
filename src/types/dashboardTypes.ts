export interface DashboardSummary {
  totalActiveAssets: number;
  totalInTransit: number;
  totalMissing: number;
}

export interface HeatmapData {
  locationName: string;
  assetCount: number;
}

export interface ActivityData {
  timestamp: string;
  user: string;
  epc: string;
  assetName: string;
  location: string;
  activityType: string;
}

export interface DashboardOverviewData {
  summary: DashboardSummary;
  heatmap: HeatmapData[];
  activities: ActivityData[];
  alerts: any[];
}

export interface DashboardOverviewResponse {
  success: boolean;
  message: string;
  data: DashboardOverviewData;
}
