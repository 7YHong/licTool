#!/usr/bin/env bun
import { generate } from "./generate";
import { verify } from "./verify";
import { loadKeys } from "./common";

interface CliOptions {
  command: "generate" | "verify";
  value?: string;
}

function parseArgs(args: string[]): CliOptions {
  const [command, value] = args;

  if (!command) {
    return { command: "help" };
  }

  if (command === "generate" || command === "verify") {
    if (command === "generate" && !value) {
      console.error("错误: generate 命令需要指定 payload");
      printUsage();
      process.exit(1);
    }
    if (command === "verify" && !value) {
      console.error("错误: verify 命令需要指定 license");
      printUsage();
      process.exit(1);
    }
    return { command, value };
  }

  return { command: "help" };
}

function printUsage() {
  console.log(`
授权码工具 CLI

用法:
  lictool generate <payload>    生成授权码
  lictool verify <license>      验证授权码

示例:
  lictool generate '{"user":"test","exp":"2025-12-31"}'
  lictool verify "eyJ1c2VyIjoidGVzdCIsImV4cCI6IjIwMjUtMTItMzEifQ==.MEUCIQD..."
`);
}

async function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  if (options.command === "help") {
    printUsage();
    process.exit(0);
  }

  const keys = loadKeys();

  try {
    if (options.command === "generate") {
      const license = generate(options.value!, keys.privateKey);
      console.log("授权码:", license);
    } else if (options.command === "verify") {
      const payload = verify(options.value!, keys.publicKey);
      console.log("验证成功! Payload:", payload);
    }
  } catch (error) {
    console.error("错误:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
