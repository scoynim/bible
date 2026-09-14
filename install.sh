#!/bin/sh
set -eu

PACKAGE_NAME="${SCOYNIM_BIBLE_PACKAGE:-@scoynim/bible}"
INSTALL_PREFIX="${SCOYNIM_BIBLE_PREFIX:-$HOME/.local}"

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
npm install --global --prefix "$INSTALL_PREFIX" "$PACKAGE_NAME"

BIN_DIR="$INSTALL_PREFIX/bin"
case ":$PATH:" in
  *":$BIN_DIR:"*) ;;
  *)
    SHELL_NAME="$(basename "${SHELL:-sh}")"
    case "$SHELL_NAME" in
      zsh) PROFILE_FILE="$HOME/.zprofile" ;;
      bash) PROFILE_FILE="$HOME/.bash_profile" ;;
      *) PROFILE_FILE="$HOME/.profile" ;;
    esac

    PATH_LINE="export PATH=\"$BIN_DIR:\$PATH\""
    if [ ! -f "$PROFILE_FILE" ] || ! grep -Fqx "$PATH_LINE" "$PROFILE_FILE"; then
      printf '\n%s\n' "$PATH_LINE" >> "$PROFILE_FILE"
    fi
    PATH="$BIN_DIR:$PATH"
    export PATH
    printf '%s\n' "已將 ${BIN_DIR} 加入 ${PROFILE_FILE}。"
    ;;
esac

printf '%s\n' '安裝完成。'
"$BIN_DIR/v" --version
printf '%s\n' '輸入 v -h 查看所有指令。'
