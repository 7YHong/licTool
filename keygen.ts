import forge from "node-forge";
const seed = forge.random.getBytesSync(32);
const { privateKey, publicKey } = forge.pki.ed25519.generateKeyPair({
  seed: seed,
});

console.log(privateKey, publicKey);

console.log(privateKey.toBase64(), publicKey.toBase64());
