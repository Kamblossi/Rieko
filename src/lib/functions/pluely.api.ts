import { invoke } from "@tauri-apps/api/core";
import { safeLocalStorage } from "../storage";
import { STORAGE_KEYS } from "@/config";

// Helper function to check if Rieko Cloud should be used
export async function shouldUsePluelyAPI(): Promise<boolean> {
  try {
    // Check if Rieko Cloud is enabled in localStorage
    const pluelyApiEnabled =
      safeLocalStorage.getItem(STORAGE_KEYS.RIEKO_API_ENABLED) === "true";
    if (!pluelyApiEnabled) return false;

    // Check if license is available
    const hasLicense = await invoke<boolean>("check_license_status");
    return hasLicense;
  } catch (error) {
    console.warn("Failed to check Rieko Cloud availability:", error);
    return false;
  }
}
