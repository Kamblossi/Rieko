const CLOUD_PLAN_DISABLED_MESSAGE =
  "This plan does not include Rieko Cloud. Use your own AI and STT providers or upgrade.";

const TRIAL_LIMIT_REACHED_MESSAGE =
  "Your Limited Trial has reached its 5-request limit. Upgrade to continue using Rieko Cloud.";

function coerceErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return "An unexpected Rieko Cloud error occurred.";
}

export function getFriendlyRiekoCloudErrorMessage(error: unknown): string {
  const raw = coerceErrorMessage(error).trim();
  const normalized = raw.toUpperCase();
  const lower = raw.toLowerCase();

  if (
    normalized.includes("CLOUD_NOT_ENABLED_FOR_PLAN") ||
    lower.includes("does not include rieko cloud") ||
    lower.includes("cloud is not enabled for this plan")
  ) {
    return CLOUD_PLAN_DISABLED_MESSAGE;
  }

  if (
    normalized.includes("TRIAL_REQUEST_LIMIT_REACHED") ||
    lower.includes("limited trial request limit") ||
    lower.includes("request limit of 5 has been reached") ||
    lower.includes("5-request limit")
  ) {
    return TRIAL_LIMIT_REACHED_MESSAGE;
  }

  if (raw.startsWith("Rieko Cloud Error:")) {
    return raw.replace(/^Rieko Cloud Error:\s*/i, "").trim();
  }

  if (raw.startsWith("Rieko Cloud STT Error:")) {
    return raw.replace(/^Rieko Cloud STT Error:\s*/i, "").trim();
  }

  return raw;
}

export { CLOUD_PLAN_DISABLED_MESSAGE, TRIAL_LIMIT_REACHED_MESSAGE };
