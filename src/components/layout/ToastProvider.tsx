"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: { fontFamily: "var(--font-hind)", borderRadius: "12px" },
        success: { iconTheme: { primary: "#1a9951", secondary: "#ffffff" } },
        error: { iconTheme: { primary: "#d03739", secondary: "#ffffff" } },
      }}
    />
  );
}
