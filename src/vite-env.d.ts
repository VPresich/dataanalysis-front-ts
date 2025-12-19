/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASEURL: string;
  readonly VITE_DEVELOPED_MODE: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
