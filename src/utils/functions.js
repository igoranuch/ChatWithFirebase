import CryptoJS from "crypto-js";

export const generateRandomKey = () => {
  const keySize = 256;
  const randomBytes = CryptoJS.lib.WordArray.random(keySize / 8);
  const key = CryptoJS.enc.Hex.stringify(randomBytes);
  return key;
};

export const encryptMessage = (message, encryptionKey) => {
  const encryptedMessage = CryptoJS.AES.encrypt(
    message,
    encryptionKey
  ).toString();
  return encryptedMessage;
};

export const decryptMessage = (encryptedMessage, encryptionKey) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, encryptionKey);
  const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
};
