(() => {
  'use strict';

  function findAceEditor() {
    const element =
      document.querySelector('.ace_editor') ||
      document.querySelector('[id*="editor"].ace_editor');

    if (!element) return null;

    try {
      if (window.ace && typeof window.ace.edit === 'function') {
        return window.ace.edit(element);
      }
    } catch (_) {}

    // Some Ace builds expose the editor instance on the DOM node.
    return element.env?.editor || null;
  }

  function setFallback(sql) {
    const textarea = document.querySelector('.ace_text-input');
    if (!textarea) return false;

    textarea.focus();
    textarea.value = sql;
    textarea.dispatchEvent(new InputEvent('input', {
      bubbles: true,
      inputType: 'insertText',
      data: sql
    }));
    textarea.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  window.addEventListener('message', event => {
    if (event.source !== window) return;
    const data = event.data;
    if (!data || data.source !== 'sql-island-auto-answer' || data.type !== 'SET_SQL') return;

    const sql = String(data.sql || '');
    if (!sql) return;

    const editor = findAceEditor();
    if (editor) {
      editor.setValue(sql, -1);
      editor.clearSelection();
      editor.focus();
      editor.session?.getUndoManager?.().reset?.();
      return;
    }

    setFallback(sql);
  });
})();