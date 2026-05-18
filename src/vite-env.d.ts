/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASEURL: string;
  readonly VITE_DEVELOPED_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
