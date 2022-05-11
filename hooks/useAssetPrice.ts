import {
  COINGECKO_ASSET_MAP,
  COINGECKO_BASE_URL,
  ReserveAssets,
} from '../consts';
import { useEffect, useState } from 'react';

interface PriceData {
  latestPrice: number;
  history: Record<number, number>;
}

interface PriceHistory {
  prices: Array<[number, number]>;
}

const DEFAULT_PRICE_DATA: PriceData = {
  history: {},
  latestPrice: 0,
};

export const fetchPriceData = async (asset: ReserveAssets) => {
  const coinId = COINGECKO_ASSET_MAP[asset];
  const response = await fetch(
    `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=365&interval=daily`
  );
  const history = await response.json();

  return parsePriceData(history);
};

const parsePriceData = (history: PriceHistory): PriceData => {
  const { prices } = history;
  const [latest] = prices.slice(-1);

  const past = prices.slice(0, -1).reduce((acc, [t, p]) => {
    return { ...acc, [t]: p };
  }, {});

  return {
    latestPrice: latest[1],
    history: past,
  };
};

export const useAssetPrice = (asset: ReserveAssets): [PriceData, boolean] => {
  const [data, setData] = useState(DEFAULT_PRICE_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPriceData(asset).then((data: PriceData) => {
      setData(data);
    });
    setLoading(false);
  }, [asset]);

  return [data, loading];
};
