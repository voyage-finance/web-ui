declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ENV: string;
      NEXT_PUBLIC_CHAIN_ID?: string;
      NEXT_PUBLIC_PROVIDER_URL?: string;
      NEXT_PUBLIC_GRAPH_URL?: string;
    }
  }
}

export {};
