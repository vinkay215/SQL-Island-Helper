chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['shortcutMenu', 'shortcutAssign', 'shortcutCopy'], (saved) => {
    const defaults = {};
    if (!saved.shortcutMenu) defaults.shortcutMenu = 'Ctrl+B';
    if (!saved.shortcutAssign) defaults.shortcutAssign = 'Ctrl+N';
    if (!saved.shortcutCopy) defaults.shortcutCopy = 'Ctrl+M';
    if (Object.keys(defaults).length) chrome.storage.local.set(defaults);
  });
});
