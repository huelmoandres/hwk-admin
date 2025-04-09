/**
 * A utility for encrypting and decrypting data in localStorage
 */

// The encryption key is derived from this password
// In a real app, you might want to use a more secure way to store/generate this
const ENCRYPTION_PASSWORD = process.env.STORAGE_ENCRYPTION_PASSWORD || "hawkers";

// Salt for key derivation
const SALT = new Uint8Array([132, 42, 53, 65, 87, 112, 1, 219, 123, 97, 54, 33, 177, 42, 88, 99]);

// Get the encryption key from the password
async function getKey(password: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  // Import the password as a key
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  // Derive the actual encryption key
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: SALT,
      iterations: 100000,
      hash: "SHA-256",
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// Encrypt data
async function encrypt(data: any): Promise<string> {
  const key = await getKey(ENCRYPTION_PASSWORD);
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(JSON.stringify(data));

  // Generate a random IV (Initialization Vector)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the data
  const encryptedBuffer = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, dataBuffer);

  // Combine IV and encrypted data for storage
  const result = new Uint8Array(iv.length + encryptedBuffer.byteLength);
  result.set(iv);
  result.set(new Uint8Array(encryptedBuffer), iv.length);

  // Convert to base64 for storage
  return btoa(String.fromCharCode(...result));
}

// Decrypt data
async function decrypt(encryptedData: string): Promise<any> {
  const key = await getKey(ENCRYPTION_PASSWORD);

  // Convert from base64
  const encryptedBuffer = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0));

  // Extract IV and encrypted data
  const iv = encryptedBuffer.slice(0, 12);
  const data = encryptedBuffer.slice(12);

  // Decrypt the data
  const decryptedBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);

  // Convert to string and parse JSON
  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(decryptedBuffer));
}

// Store encrypted data in localStorage
export async function setEncryptedItem(key: string, value: any): Promise<void> {
  try {
    const encryptedValue = await encrypt(value);
    localStorage.setItem(key, encryptedValue);
  } catch (error) {
    throw error;
  }
}

// Retrieve and decrypt data from localStorage
export async function getEncryptedItem<T>(key: string): Promise<T | null> {
  try {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;
    return (await decrypt(encryptedValue)) as T;
  } catch (error) {
    return null;
  }
}

// Remove item from localStorage
export function removeEncryptedItem(key: string): void {
  localStorage.removeItem(key);
}

// Clear all items from localStorage
export function clearEncryptedItems(): void {
  localStorage.clear();
}
