$ErrorActionPreference = 'Stop'
$PackageName = if ($env:SCOYNIM_BIBLE_PACKAGE) { $env:SCOYNIM_BIBLE_PACKAGE } else { '@scoynim/bible' }

if (-not (Get-Command node -ErrorAction SilentlyContinue) -or -not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host 'scoynim/bible 需要 Node.js 20 以上版本。'
    Write-Host '請先從 https://nodejs.org 安裝 Node.js，再重新執行此安裝指令。'
    exit 1
}

$NodeMajor = [int]((& node -p "Number(process.versions.node.split('.')[0])").Trim())
if ($NodeMajor -lt 20) {
    Write-Host "目前 Node.js 版本為 $(& node --version)，需要 20 以上版本。"
    exit 1
}

Write-Host "正在安裝 $PackageName ..."
& npm install --global $PackageName
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host '安裝完成。'
& v --version
Write-Host '輸入 v -h 查看所有指令。'
