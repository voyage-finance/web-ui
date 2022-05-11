export const MAX_UINT_AMOUNT =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export enum ReserveAssets {
  TUS = 'tus',
}

export const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Assets IDs are necessary for fetching price data from the coingecko API.
// The full list can be accessed at https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit#gid=0
// Newly supported game assets should be added here.
export const COINGECKO_ASSET_MAP: Record<ReserveAssets, string> = {
  [ReserveAssets.TUS]: 'treasure-under-sea',
};
