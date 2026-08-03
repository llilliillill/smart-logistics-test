import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryProvider, RouterProvider } from "./providers";
import "@/shared/styles/index.css";

async function enableMocking() {
  const { worker } = await import("@/shared/api/mocks/browser");
  return worker.start({ onUnhandledRequest: "bypass" });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </StrictMode>,
  );
});
