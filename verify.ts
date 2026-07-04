import forge from "node-forge";

const ED25519 = forge.pki.ed25519;
const decode64 = forge.util.decode64;

export const verify = (licStr: string, publicKey: string) => {
  const [payload, signature] = licStr.split(".");
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

  return forge.util.decode64(payload ?? "");
};
