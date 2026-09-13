import { spawn, spawnSync } from 'node:child_process';

function commandExists(command) {
  return spawnSync('which', [command], { stdio: 'ignore' }).status === 0;
}

function clipboardCommand() {
  if (process.platform === 'darwin') return { command: 'pbcopy', args: [] };
  if (process.platform === 'win32') {
    return {
      command: 'powershell.exe',
      args: ['-NoProfile', '-NonInteractive', '-Command', '[Console]::InputEncoding=[Text.UTF8Encoding]::new($false); $v=[Console]::In.ReadToEnd(); Set-Clipboard -Value $v']
    };
  }
  if (process.platform === 'linux') {
    if (process.env.WSL_DISTRO_NAME && commandExists('clip.exe')) return { command: 'clip.exe', args: [] };
    if (process.env.WAYLAND_DISPLAY && commandExists('wl-copy')) return { command: 'wl-copy', args: [] };
    if (commandExists('xclip')) return { command: 'xclip', args: ['-selection', 'clipboard'] };
    if (commandExists('xsel')) return { command: 'xsel', args: ['--clipboard', '--input'] };
  }
  return null;
}

export async function copyToClipboard(text) {
  const target = clipboardCommand();
  if (!target) {
    throw new Error('找不到系統剪貼簿工具。Linux 請安裝 wl-clipboard、xclip 或 xsel。');
  }

  await new Promise((resolve, reject) => {
    const child = spawn(target.command, target.args, { stdio: ['pipe', 'ignore', 'pipe'] });
    let stderr = '';
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr.trim() || `剪貼簿指令結束代碼：${code}`));
    });
    child.stdin.end(text, 'utf8');
  });
}
