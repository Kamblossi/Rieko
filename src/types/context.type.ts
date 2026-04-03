import { Dispatch, SetStateAction } from "react";
import { ScreenshotConfig, TYPE_PROVIDER } from "@/types";
import { CursorType, CustomizableState } from "@/lib/storage";

export type LicenseCapabilities = {
  cloud_enabled?: boolean;
  dev_space_enabled?: boolean;
  byok_enabled?: boolean;
  supports_audio?: boolean;
  supports_vision?: boolean;
  supports_code?: boolean;
  allowed_model_keys?: string[];
  trial_request_limit?: number | null;
  monthly_generation_limit?: number | null;
};

export type LicenseValidationState = {
  is_active: boolean;
  last_validated_at?: string | null;
  is_dev_license: boolean;
  plan_code?: string | null;
  tier?: string | null;
  capabilities?: LicenseCapabilities;
  reason?: string | null;
};

export type IContextType = {

  systemPrompt: string;
  setSystemPrompt: Dispatch<SetStateAction<string>>;
  allAiProviders: TYPE_PROVIDER[];
  customAiProviders: TYPE_PROVIDER[];
  selectedAIProvider: {
    provider: string;
    variables: Record<string, string>;
  };
  onSetSelectedAIProvider: ({
    provider,
    variables,
  }: {
    provider: string;
    variables: Record<string, string>;
  }) => void;
  allSttProviders: TYPE_PROVIDER[];
  customSttProviders: TYPE_PROVIDER[];
  selectedSttProvider: {
    provider: string;
    variables: Record<string, string>;
  };
  onSetSelectedSttProvider: ({
    provider,
    variables,
  }: {
    provider: string;
    variables: Record<string, string>;
  }) => void;
  screenshotConfiguration: ScreenshotConfig;
  setScreenshotConfiguration: React.Dispatch<
    React.SetStateAction<ScreenshotConfig>
  >;
  customizable: CustomizableState;
  toggleAppIconVisibility: (isVisible: boolean) => Promise<void>;
  toggleAlwaysOnTop: (isEnabled: boolean) => Promise<void>;
  toggleAutostart: (isEnabled: boolean) => Promise<void>;
  loadData: () => void;
  pluelyApiEnabled: boolean;
  setPluelyApiEnabled: (enabled: boolean) => Promise<void>;
  hasActiveLicense: boolean;
  cloudEnabledForPlan: boolean;
  licensePlanCode: string | null;
  licenseTier: string | null;
  licenseCapabilities: LicenseCapabilities | null;
  setHasActiveLicense: Dispatch<SetStateAction<boolean>>;
  getActiveLicenseStatus: () => Promise<LicenseValidationState>;
  selectedAudioDevices: {
    input: { id: string; name: string };
    output: { id: string; name: string };
  };
  setSelectedAudioDevices: Dispatch<
    SetStateAction<{
      input: { id: string; name: string };
      output: { id: string; name: string };
    }>
  >;
  setCursorType: (type: CursorType) => void;
  supportsImages: boolean;
  setSupportsImages: (value: boolean) => void;
};
