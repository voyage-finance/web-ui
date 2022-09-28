import { RuntimeMessage } from 'types';
import { EXTENSION_ID } from 'utils/env';

export const sendExtensionMessage = (
  msg: RuntimeMessage,
  _callback?: (response: any) => void
) => {
  const callback = _callback ? _callback : () => undefined;
  console.log('extension id: ', EXTENSION_ID);
  if (chrome.runtime) chrome.runtime.sendMessage(EXTENSION_ID, msg, callback);
  else {
    alert('Extension not found');
  }
};
