export const shortenHash = (hash: string) =>
  `${hash.substring(0, 6)}...${hash.slice(-4)}`;

export const decodeEmailNFingerprint = (encoded: string) => {
  // TODO: decode encoded into email and fingerprint
  const decodedObj = JSON.parse(encoded);
  console.log('decodedObj', decodedObj);
  return [decodedObj.email, decodedObj.fingerprint || ''];
};
