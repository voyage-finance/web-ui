export const shortenHash = (hash: string) =>
  `${hash.substring(0, 6)}...${hash.slice(-4)}`;
