import forge from "node-forge";
import { loadKeys } from "./common";

const ED25519 = forge.pki.ed25519;
const decode64 = forge.util.decode64;

export const generate = (payloadStr: string, privateKey: string) => {
  // Base64 编码 payload (使用标准 base64)
  const base64Payload = forge.util.encode64(payloadStr);

  // 生成 SHA-256 摘要
  const md = forge.md.sha256.create();
  md.update(base64Payload);

  // // 使用私钥签名
  var signature = ED25519.sign({
    md: md,
    privateKey: decode64(loadKeys().privateKey),
  });

  // Base64 编码签名 (使用 forge 的编码器确保一致性)
  const base64Signature = signature.toBase64();
  // 组合授权码
  return `${base64Payload}.${base64Signature}`;
};
