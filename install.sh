#!/bin/sh
set -eu

PACKAGE_NAME="${SCOYNIM_BIBLE_PACKAGE:-@scoynim/bible}"

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  printf '%s\n' 'scoynim/bible 需要 Node.js 20 以上版本。'
  printf '%s\n' '請先從 https://nodejs.org 安裝 Node.js，再重新執行此安裝指令。'
  exit 1
fi

NODE_MAJOR="$(node -p "Number(process.versions.node.split('.')[0])")"
if [ "$NODE_MAJOR" -lt 20 ]; then
  printf '%s\n' "目前 Node.js 版本為 $(node --version)，需要 20 以上版本。"
  exit 1
fi

printf '%s\n' "正在安裝 $PACKAGE_NAME ..."
npm install --global "$PACKAGE_NAME"
printf '%s\n' '安裝完成。'
v --version
printf '%s\n' '輸入 v -h 查看所有指令。'
