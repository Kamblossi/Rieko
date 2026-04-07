import React from "react";
import ReactDOM from "react-dom/client";
import { PostHogProvider } from "@posthog/react";
import Overlay from "./components/Overlay";
import { AppProvider, ThemeProvider } from "./contexts";
import "./global.css";
import { getCurrentWindow } from "@tauri-apps/api/window";
import AppRoutes from "./routes";

const currentWindow = getCurrentWindow();
const windowLabel = currentWindow.label;
const posthogApiKey =
  import.meta.env.VITE_POSTHOG_KEY ?? "phc_bTVKlgcLvXkjaZnhdNVyRFvo3hBxJzFk4RQY2LVRF5j";
const posthogHost = import.meta.env.VITE_POSTHOG_HOST ?? "https://us.i.posthog.com";

function withPostHog(element: React.ReactNode) {
  if (!posthogApiKey) {
    return element;
  }

  return (
    <PostHogProvider apiKey={posthogApiKey} options={{ api_host: posthogHost }}>
      {element}
    </PostHogProvider>
  );
}

// Render different components based on window label
if (windowLabel.startsWith("capture-overlay-")) {
  const monitorIndex = parseInt(windowLabel.split("-")[2], 10) || 0;
  // Render overlay without providers
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    withPostHog(
      <React.StrictMode>
        <Overlay monitorIndex={monitorIndex} />
      </React.StrictMode>
    )
  );
} else {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    withPostHog(
      <React.StrictMode>
        <ThemeProvider>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </ThemeProvider>
      </React.StrictMode>
    )
  );
}
