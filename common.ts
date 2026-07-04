import fs from "fs";

/**
 *
 * @param keysName keys文件名
 * @returns privateKey publicKey (base64)
 */
export function loadKeys(keysName: string = "keys.json"): {
  privateKey: string;
  publicKey: string;
} {
  if (!fs.existsSync(keysName)) {
    throw new Error("密钥文件不存在，请先运行 keygen 命令");
  }
  return JSON.parse(fs.readFileSync(keysName, "utf-8"));
}
