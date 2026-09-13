# scoynim/bible CLI

`scoynim/bible` 是只包含中韓聖經資料、章節查看與經文複製功能的離線 CLI。

## 安裝

發布到 npm 後，Windows PowerShell、Linux 與 macOS 可使用相同指令：

```sh
npm install --global @scoynim/bible
```

若安裝檔發布於 `scoynim/bible` 儲存庫，也可以使用一行安裝。

macOS／Linux：

```sh
curl -fsSL https://raw.githubusercontent.com/scoynim/bible/main/install.sh | sh
```

Windows PowerShell：

```powershell
irm https://raw.githubusercontent.com/scoynim/bible/main/install.ps1 | iex
```

以上兩個入口會檢查 Node.js 版本並安裝 `@scoynim/bible`。因此必須先發布 npm 套件，GitHub 儲存庫也必須確實位於 `scoynim/bible`，網址才會生效。

開發中的本機版本可在專案根目錄執行：

```sh
npm link
```

安裝完成後使用 `v`：

```sh
v "太1:1"
v "太1:2-4、6 創2:1"
v -n "太10"
v -n "태10"
v -n "mat10 kr/cn"
v -b
v -h
```

預設指令會把經文複製到系統剪貼簿。`-n` 只在終端機顯示整章，不修改剪貼簿。
複製與整章顯示沿用 scoynim.dev 網頁的經文排列格式；雙語固定為每節韓文在前、中文在後。

Linux 剪貼簿需要 `wl-copy`、`xclip` 或 `xsel`，WSL 則使用 `clip.exe`。章節查看與其他指令不依賴剪貼簿工具。

## 開發驗證

```sh
npm run test:cli
node cli/v.mjs -n "mat10 cn"
```

經文資料直接讀取既有的 `bible/{book}/{chapter}.json`，沒有複製第二套資料。
