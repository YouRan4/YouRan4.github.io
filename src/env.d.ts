/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare global {
  interface Window {
    adsbygoogle?: any[] & { loaded?: boolean };
    syncGiscusTheme: (theme: "light" | "dark") => void;
    __giscusTheme: string;
  };
}

export {};
