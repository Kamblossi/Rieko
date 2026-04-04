import { useCallback, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { GetLicense } from "@/components";
import { RiekoCloudSetup, Usage } from "./components";
import { PageLayout } from "@/layouts";
import { useApp } from "@/contexts";

const Dashboard = () => {
  const { hasActiveLicense, cloudEnabledForPlan } = useApp();
  const [activity, setActivity] = useState<any>(null);
  const [loadingActivity, setLoadingActivity] = useState(false);

  const fetchActivity = useCallback(async () => {
    if (!hasActiveLicense || !cloudEnabledForPlan) {
      setActivity({ data: [], total_tokens_used: 0 });
      return;
    }
    setLoadingActivity(true);
    try {
      const response = await invoke("get_activity");
      const responseData: any = response;
      if (responseData && responseData.success) {
        setActivity(responseData);
      } else {
        setActivity({ data: [], total_tokens_used: 0 });
      }
    } catch (error) {
      setActivity({ data: [], total_tokens_used: 0 });
    } finally {
      setLoadingActivity(false);
    }
  }, [cloudEnabledForPlan, hasActiveLicense]);

  useEffect(() => {
    if (hasActiveLicense && cloudEnabledForPlan) {
      fetchActivity();
    } else {
      setActivity(null);
    }
  }, [cloudEnabledForPlan, fetchActivity, hasActiveLicense]);

  const activityData =
    activity && Array.isArray(activity.data) ? activity.data : [];
  const totalTokens =
    activity && typeof activity.total_tokens_used === "number"
      ? activity.total_tokens_used
      : 0;

  return (
    <PageLayout
      title="Dashboard"
      description="Manage your Rieko license, cloud access, and usage from one place."
      rightSlot={!hasActiveLicense ? <GetLicense /> : null}
    >
      {/* Rieko Cloud Setup */}
      <RiekoCloudSetup />

      <Usage
        loading={loadingActivity}
        onRefresh={fetchActivity}
        data={activityData}
        totalTokens={totalTokens}
      />
    </PageLayout>
  );
};

export default Dashboard;
