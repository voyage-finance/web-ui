declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CHAIN_ID: string;
      NEXT_PUBLIC_PROVIDER_URL: string;
      NEXT_PUBLIC_GRAPH_URL: string;
      NEXT_PUBLIC_EXPLORER_URL: string;
      NEXT_PUBLIC_AUTH0_DOMAIN: string;
      NEXT_PUBLIC_AUTH0_CLIENT_ID: string;
    }
  }
}

export {};
