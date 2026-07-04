import forge from "node-forge";

const ED25519 = forge.pki.ed25519;
const { decode64, createBuffer } = forge.util;

export const verify = (licStr: string, publicKey: string) => {
  const [payload, signature] = licStr.split(".");
  if (!payload || !signature) {
    throw new Error("授权码格式错误");
  }
  if (decode64(signature).length !== 64) {
    throw new Error("授权码格式错误: 签名长度错误");
  }
  // 生成 SHA-256 摘要
  const md = forge.md.sha256.create();
  md.update(payload ?? "");
  const verified = ED25519.verify({
    md,
    signature: decode64(signature ?? ""),
    publicKey: decode64(publicKey),
  });
  if (!verified) {
    throw new Error("签名验证失败，数据可能被篡改");
  }

  return createBuffer(decode64(payload ?? "")).toString();
};
