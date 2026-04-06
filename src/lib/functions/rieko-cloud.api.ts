import { invoke } from "@tauri-apps/api/core";
import { safeLocalStorage } from "../storage";
import { STORAGE_KEYS } from "@/config";

type LicenseValidationState = {
  is_active: boolean;
  is_dev_license: boolean;
  capabilities?: {
    cloud_enabled?: boolean;
  };
};

// Helper function to check if Rieko Cloud should be used
export async function shouldUseRiekoCloudAPI(): Promise<boolean> {
  try {
    const riekoCloudEnabled =
      safeLocalStorage.getItem(STORAGE_KEYS.RIEKO_API_ENABLED) === "true";
    if (!riekoCloudEnabled) return false;

    const validation = await invoke<LicenseValidationState>(
      "validate_license_api"
    );

    if (!validation.is_active) {
      return false;
    }

    return Boolean(
      validation.is_dev_license || validation.capabilities?.cloud_enabled
    );
  } catch (error) {
    console.warn("Failed to check Rieko Cloud availability:", error);
    return false;
  }
}
