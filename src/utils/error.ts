interface RpcError extends Error {
  code: number | string;
}

export const isRpcError = (error: unknown): error is RpcError => {
  if ((error as any)?.code) {
    return true;
  }
  return false;
};
