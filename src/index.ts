import * as crypto from "crypto";

const ALGORITHM = "aes-256-gcm";

export function encryptSecret(plainText: string, masterKey: string): { cipherText: string; iv: string; tag: string } {
  const iv = crypto.randomBytes(12);
  const key = crypto.scryptSync(masterKey, "salt", 32);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let enc = cipher.update(plainText, "utf8", "hex");
  enc += cipher.final("hex");
  return { cipherText: enc, iv: iv.toString("hex"), tag: cipher.getAuthTag().toString("hex") };
}
