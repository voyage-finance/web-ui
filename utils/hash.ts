export const shortenHash = (hash: string) =>
  `${hash.substring(0, 6)}...${hash.slice(-4)}`;

export const decodeEmailNFingerprint = (encoded: string) => {
  const whitespaceReplaced = encoded.replaceAll(' ', '+');
  const decodedObj = JSON.parse(
    decodeURIComponent(escape(atob(whitespaceReplaced)))
  );
  const fingerprintArray: string[] = [...(decodedObj.fingerprint || [])];
  return [decodedObj.email, fingerprintArray] as const;
};
