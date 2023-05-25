/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MY_STORE: string
    readonly VITE_SECRET_KEY: string
    readonly VITE_PRIVATE_KEY: string
    readonly VITE_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

