import { useEffect, useState } from 'react';

const apiURI =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? ''
    : process.env.NEXT_PUBLIC_API;

export const useCollectionMetadata = (collection: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  useEffect(() => {
    setLoading(true);
    fetch(`${apiURI}/v1/metadata/collection/${collection}`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [collection]);
  return { loading, data };
};
