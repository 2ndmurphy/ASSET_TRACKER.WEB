import { useState, useEffect, useCallback } from "react";
import { getAuditReportSummaryService } from "../services/auditService";
import { AuditReportSummaryResponse } from "@/src/types/auditTypes";
import { NormalizeError } from "next/dist/shared/lib/utils";

export function useAuditSummary() {
  const [data, setData] = useState<AuditReportSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NormalizeError | null>(null);

  const summary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAuditReportSummaryService();
      setData(response);
    } catch (err) {
      setError(err as NormalizeError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    summary();
  }, [summary]);

  return { data, loading, error, refresh: summary };
}
