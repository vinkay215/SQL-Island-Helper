const DEFAULTS = {
  shortcutMenu: 'Ctrl+B',
  shortcutAssign: 'Ctrl+N',
  shortcutCopy: 'Ctrl+M'
};

let recordingButton = null;

function normalizeKey(key) {
  const aliases = {
    ' ': 'Space',
    'Escape': 'Esc',
    'ArrowUp': 'Up',
    'ArrowDown': 'Down',
    'ArrowLeft': 'Left',
    'ArrowRight': 'Right'
  };
  if (aliases[key]) return aliases[key];
  if (key.length === 1) return key.toUpperCase();
  return key;
}

function shortcutFromEvent(event) {
  const key = normalizeKey(event.key || '');
  if (!key || ['Control', 'Alt', 'Shift', 'Meta'].includes(event.key)) return '';

  const parts = [];
  if (event.ctrlKey) parts.push('Ctrl');
  if (event.altKey) parts.push('Alt');
  if (event.shiftKey) parts.push('Shift');
  if (event.metaKey) parts.push('Meta');
  parts.push(key);

  return parts.join('+');
}

function setStatus(text) {
  document.querySelector('#status').textContent = text;
}

async function refresh() {
  const saved = await chrome.storage.local.get(Object.keys(DEFAULTS));

  document.querySelectorAll('.shortcut').forEach(button => {
    const setting = button.dataset.setting;
    button.textContent = saved[setting] || DEFAULTS[setting];
  });
}

async function hasDuplicate(setting, shortcut) {
  const saved = await chrome.storage.local.get(Object.keys(DEFAULTS));

  for (const key of Object.keys(DEFAULTS)) {
    if (key === setting) continue;
    const current = saved[key] || DEFAULTS[key];
    if (current === shortcut) return true;
  }
  return false;
}

document.querySelectorAll('.shortcut').forEach(button => {
  button.addEventListener('click', () => {
    if (recordingButton) recordingButton.classList.remove('recording');

    recordingButton = button;
    button.classList.add('recording');
    button.textContent = 'Nhấn phím...';
    setStatus('Nhấn tổ hợp phím bạn muốn dùng. Ví dụ: Ctrl+Shift+B');
  });
});

window.addEventListener('keydown', async event => {
  if (!recordingButton) return;

  event.preventDefault();
  event.stopPropagation();

  const shortcut = shortcutFromEvent(event);
  if (!shortcut) return;

  // Require at least one modifier to avoid accidental single-letter shortcuts.
  if (!event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
    setStatus('Phím tắt phải có Ctrl, Alt, Shift hoặc Meta.');
    return;
  }

  const setting = recordingButton.dataset.setting;

  if (await hasDuplicate(setting, shortcut)) {
    setStatus('Phím tắt này đang được dùng cho chức năng khác.');
    return;
  }

  await chrome.storage.local.set({ [setting]: shortcut });

  recordingButton.classList.remove('recording');
  recordingButton.textContent = shortcut;
  recordingButton = null;

  setStatus(`Đã lưu ${shortcut}. Có hiệu lực ngay trên SQL Island.`);
});

document.querySelector('#reset').addEventListener('click', async () => {
  await chrome.storage.local.set(DEFAULTS);
  await refresh();
  setStatus('Đã khôi phục Ctrl+B / Ctrl+N / Ctrl+M.');
});

refresh();
