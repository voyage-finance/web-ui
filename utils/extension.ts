import { RuntimeMessage } from 'types';

export const sendExtensionMessage = (
  msg: RuntimeMessage,
  extensionId: string,
  _callback?: (response: any) => void
) => {
  const callback = _callback ? _callback : () => undefined;
  console.log('extension id: ', extensionId);
  if (chrome.runtime) chrome.runtime.sendMessage(extensionId, msg, callback);
  else {
    alert('Extension not found');
  }
};
