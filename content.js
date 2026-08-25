(() => {
  'use strict';

  if (window.__SQL_ISLAND_EXTENSION_LOADED__) return;
  window.__SQL_ISLAND_EXTENSION_LOADED__ = true;

  const ANSWERS = [
  {
    "question": "It seems there are a few people living in these villages. How can I see a list of all inhabitants?",
    "answer": "SELECT *\nFROM INHABITANT;"
  },
  {
    "question": "Man! I'm hungry. I will go and find a butcher to ask for some free sausages.",
    "answer": "SELECT *\nFROM INHABITANT\nWHERE job = 'butcher';"
  },
  {
    "question": "Thank you, Edward! Okay, let's see who is friendly on this island...",
    "answer": "SELECT *\nFROM INHABITANT\nWHERE state = 'friendly';"
  },
  {
    "question": "There is no way around getting a sword for myself. I will now try to find a friendly weaponsmith to forge me one.",
    "answer": "SELECT *\nFROM INHABITANT\nWHERE state = 'friendly' AND job = 'weaponsmith';"
  },
  {
    "question": "Oh, that does not look good. Maybe other friendly smiths can help you out, e.g. a blacksmith. Try out: job LIKE '%smith' to find all inhabitants whose job ends with 'smith'.",
    "answer": "SELECT *\nFROM INHABITANT\nWHERE state = 'friendly' AND job LIKE '%smith';"
  },
  {
    "question": "That looks better! I will go and visit those smiths. Hi stranger! Where are you going? I'm Paul, I'm the major of Monkeycity. I will go ahead and register you as a citizen.",
    "answer": "INSERT INTO INHABITANT (name, villageid, gender, job, gold, state)\nVALUES ('Stranger', 1, '?', '?', 0, '?');"
  },
  {
    "question": "No need to call me stranger! What's my personid?",
    "answer": "SELECT personid\nFROM INHABITANT\nWHERE name = 'Stranger';"
  },
  {
    "question": "Hi Ernest! How much is a sword? I can offer to make you a sword for 150 gold. That's the cheapest you will find! How much gold do you have?",
    "answer": "SELECT gold\nFROM INHABITANT\nWHERE personid = 20;"
  },
  {
    "question": "Damn! No mon, no fun. There has to be another option to earn gold other than going to work. Maybe I could collect ownerless items and sell them! Can I make a list of all items that don't belong to anyone?",
    "answer": "SELECT *\nFROM ITEM\nWHERE owner ISNULL;"
  },
  {
    "question": "So much cool stuff! Yay, a coffee cup. Let's collect it!",
    "answer": "UPDATE ITEM\nSET owner = 20\nWHERE item = 'coffee cup';"
  },
  {
    "question": "Do you know a trick how to collect all the ownerless items?",
    "answer": "UPDATE ITEM\nSET owner = 20\nWHERE owner ISNULL;"
  },
  {
    "question": "Now list all of the items I have!",
    "answer": "SELECT *\nFROM ITEM\nWHERE owner = 20;"
  },
  {
    "question": "Find a friendly inhabitant who is either a dealer or a merchant. Maybe they want to buy some of my items.",
    "answer": "SELECT *\nFROM INHABITANT\nWHERE state = 'friendly'\nAND job = 'dealer' OR job = 'merchant';"
  },
  {
    "question": "I'd like to get the ring and the teapot. The rest is nothing but scrap. Please give me the two items. My personid is 15.",
    "answer": "UPDATE ITEM\nSET owner = 15\nWHERE item IN ('teapot', 'ring');"
  },
  {
    "question": "Thank you! Here, some gold!",
    "answer": "UPDATE INHABITANT\nSET gold = gold + 120\nWHERE personid = 20;"
  },
  {
    "question": "Unfortunately, that's not enough gold to buy a sword. Seems like I do have to work after all. Maybe it's not a bad idea to change my name from Stranger to my real name before I will apply for a job.",
    "answer": "UPDATE INHABITANT\nSET name = 'Nguyen Quoc Vinh'\nWHERE name = 'Stranger';"
  },
  {
    "question": "Since baking is one of my hobbies, why not find a baker who I can work for?",
    "answer": "SELECT *\nFROM INHABITANT\nWHERE job = 'baker'\nORDER BY gold DESC;"
  },
  {
    "question": "Is there a pilot on this island by any chance? He could fly me home.",
    "answer": "SELECT *\nFROM INHABITANT\nWHERE job = 'pilot';"
  },
  {
    "question": "I will show you a trick how to find out the name of the village where Dirty Dieter lives.",
    "answer": "SELECT village.name\nFROM VILLAGE, INHABITANT\nWHERE village.villageid = inhabitant.villageid\nAND inhabitant.name = 'Dirty Dieter';"
  },
  {
    "question": "Find out the chief's name of the village Onionville?",
    "answer": "SELECT inhabitant.name\nFROM VILLAGE, INHABITANT\nON village.villageid = inhabitant.villageid\nWHERE village.name = 'Onionville'\nAND village.chief = inhabitant.personid;"
  },
  {
    "question": "Um, how many inhabitants does Onionville have?",
    "answer": "SELECT COUNT(*)\nFROM INHABITANT, VILLAGE\nWHERE village.villageid = inhabitant.villageid\nAND village.name = 'Onionville';"
  },
  {
    "question": "Hello Ahmed, the pilot is held captive by Dirty Dieter in his sister's house. Shall I tell you how many women there are in Onionville? Nah, you can figure it out by yourself!",
    "answer": "SELECT COUNT(*)\nFROM VILLAGE, INHABITANT\nON village.villageid = inhabitant.villageid\nWHERE village.name = 'Onionville'\nAND inhabitant.gender = 'f';"
  },
  {
    "question": "Oh, only one woman. What's her name?",
    "answer": "SELECT inhabitant.name\nFROM VILLAGE, INHABITANT\nON village.villageid = inhabitant.villageid\nWHERE village.name = 'Onionville'\nAND inhabitant.gender = 'f';"
  },
  {
    "question": "Ahmed, if you hand me over the entire property of our nearby village Cucumbertown, I will release the pilot. I will show you now what this property consists of.",
    "answer": "SELECT SUM(inhabitant.gold)\nFROM INHABITANT, VILLAGE\nWHERE village.villageid = inhabitant.villageid\nAND village.name = 'Cucumbertown';"
  },
  {
    "question": "Oh no, baking bread alone can't solve my problems. If I continue working and selling items though, \nI could earn more gold than the worth of gold inventories of all bakers, dealers and merchants together. How much gold is that?",
    "answer": "SELECT SUM(gold)\nFROM INHABITANT\nWHERE job = 'baker'\nOR job = 'dealer'\nOR job = 'merchant';"
  },
  {
    "question": "Let's have a look at how much average gold people own, depending on their job.",
    "answer": "SELECT job, SUM(inhabitant.gold), AVG(inhabitant.gold)\nFROM inhabitant\nGROUP BY job\nORDER BY AVG(inhabitant.gold);"
  },
  {
    "question": "Very interesting: For some reason, butchers own the most gold. How much gold do different inhabitants have on average, depending on their state (friendly, ...)?",
    "answer": "SELECT state, avg(gold)\nFROM INHABITANT\nGROUP BY state;"
  },
  {
    "question": "Ok, so the only way is to mug the villains. Or I might as well go ahead and just kill Dirty Dieter with my sword!",
    "answer": "DELETE FROM INHABITANT\nWHERE name = 'Dirty Dieter';"
  },
  {
    "question": "Heeeey! Now I'm very angry! What will you do next, Ahmed?",
    "answer": "DELETE FROM INHABITANT\nWHERE name = 'Dirty Diane';"
  },
  {
    "question": "Yeah! Now I release the pilot!",
    "answer": "UPDATE INHABITANT\nSET state = 'friendly'\nWHERE job = 'pilot';"
  },
  {
    "question": "I take my sword, some gold and lots of useless items with me as a souvenir. What a big adventure!",
    "answer": "UPDATE INHABITANT\nSET state = 'emigrated'\nWHERE personid = 20;"
  }
];

  const state = {
    shortcutMenu: 'Ctrl+B',
    shortcutAssign: 'Ctrl+N',
    shortcutCopy: 'Ctrl+M',
    playerName: 'Nguyen Quoc Vinh',
    lastQuestion: '',
    lastAnswer: '',
  };

  function normalize(text) {
    return (text || '')
      .toLowerCase()
      .replace(/\(\s*hint:[\s\S]*?\)/gi, ' ')
      .replace(/[’‘]/g, "'")
      .replace(/[^a-z0-9'%?]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokens(text) {
    return new Set(normalize(text).split(' ').filter(x => x.length > 1));
  }

  function similarity(a, b) {
    const A = tokens(a);
    const B = tokens(b);
    if (!A.size || !B.size) return 0;
    let common = 0;
    for (const x of A) if (B.has(x)) common++;
    return (2 * common) / (A.size + B.size);
  }

  function findAnswer(question) {
    const nq = normalize(question);

    // Exact/contained match first. This also handles extra hints added by the site.
    for (const item of ANSWERS) {
      const ni = normalize(item.question);
      if (nq === ni || nq.includes(ni) || ni.includes(nq)) {
        return { ...item, score: 1 };
      }
    }

    let best = null;
    for (const item of ANSWERS) {
      const score = similarity(question, item.question);
      if (!best || score > best.score) best = { ...item, score };
    }
    return best && best.score >= 0.58 ? best : null;
  }

  function resolveAnswer(answer) {
    return answer.replaceAll('Nguyen Quoc Vinh', state.playerName.replaceAll("'", "''"));
  }

  function sendToAce(sql) {
    window.postMessage({
      source: 'sql-island-auto-answer',
      type: 'SET_SQL',
      sql
    }, '*');
  }

  function getQuestion() {
    return document.querySelector('#exercise_text')?.textContent?.trim() || '';
  }

  function updatePanel(match) {
    const status = document.querySelector('#sia-status');
    const questionBox = document.querySelector('#sia-question');
    const answer = document.querySelector('#sia-answer');
    const fillBtn = document.querySelector('#sia-fill');
    const copyBtn = document.querySelector('#sia-copy');

    if (!status || !questionBox || !answer || !fillBtn || !copyBtn) return;

    const currentQuestion = getQuestion();
    questionBox.textContent = currentQuestion || 'Không tìm thấy câu hỏi';

    if (!match) {
      state.lastAnswer = '';
      status.textContent = 'Chưa nhận diện được câu hỏi';
      status.dataset.ok = '0';
      answer.value = '';
      fillBtn.disabled = true;
      copyBtn.disabled = true;
      return;
    }

    const sql = resolveAnswer(match.answer);
    state.lastAnswer = sql;
    status.textContent = `Đã nhận diện • ${Math.round(match.score * 100)}%`;
    status.dataset.ok = '1';
    answer.value = sql;
    fillBtn.disabled = false;
    copyBtn.disabled = false;
  }

  function analyzeAndMaybeFill(force = false) {
    const question = getQuestion();
    if (!question) return;

    if (!force && question === state.lastQuestion) return;
    state.lastQuestion = question;

    const match = findAnswer(question);
    updatePanel(match);

  }

  function createPanel() {
    if (document.querySelector('#sia-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'sia-panel';
    panel.innerHTML = `
      <div class="sia-head">
        <strong>SQL Island Answer</strong>
        <button id="sia-collapse" title="Thu gọn">−</button>
      </div>

      <div id="sia-body">
        <div class="sia-section">
          <div class="sia-title">Câu hỏi hiện tại</div>
          <div id="sia-question" class="sia-question">Đang đọc câu hỏi...</div>
        </div>

        <div class="sia-section">
          <div class="sia-title">Đáp án hiện tại</div>
          <textarea id="sia-answer" readonly spellcheck="false"></textarea>
        </div>

        <div id="sia-status" data-ok="0">Đang nhận diện...</div>

        <div class="sia-actions">
          <button id="sia-fill" disabled>Gán đáp án</button>
          <button id="sia-copy" disabled>Copy</button>
        </div>
      </div>
    `;
    document.documentElement.appendChild(panel);
    panel.classList.add('sia-panel-hidden');

    analyzeAndMaybeFill(true);

    document.querySelector('#sia-fill').addEventListener('click', () => {
      if (state.lastAnswer) sendToAce(state.lastAnswer);
    });

    document.querySelector('#sia-copy').addEventListener('click', async () => {
      if (!state.lastAnswer) return;
      try {
        await navigator.clipboard.writeText(state.lastAnswer);
        const btn = document.querySelector('#sia-copy');
        const old = btn.textContent;
        btn.textContent = 'Đã copy';
        setTimeout(() => btn.textContent = old, 900);
      } catch (_) {}
    });

    document.querySelector('#sia-collapse').addEventListener('click', e => {
      const body = document.querySelector('#sia-body');
      const hidden = body.classList.toggle('sia-hidden');
      e.target.textContent = hidden ? '+' : '−';
    });
  }


  function togglePanelByShortcut() {
    let panel = document.querySelector('#sia-panel');

    if (!panel) {
      createPanel();
      panel = document.querySelector('#sia-panel');
    }

    if (!panel) return;

    panel.classList.toggle('sia-panel-hidden');

    if (!panel.classList.contains('sia-panel-hidden')) {
      analyzeAndMaybeFill(true);
    }
  }

  async function copyCurrentAnswer() {
    if (!state.lastAnswer) {
      analyzeAndMaybeFill(true);
    }

    if (!state.lastAnswer) return;

    try {
      await navigator.clipboard.writeText(state.lastAnswer);

      const btn = document.querySelector('#sia-copy');
      if (btn) {
        const old = btn.textContent;
        btn.textContent = 'Đã copy';
        setTimeout(() => btn.textContent = old, 900);
      }
    } catch (_) {}
  }

  function assignCurrentAnswer() {
    if (!state.lastAnswer) {
      analyzeAndMaybeFill(true);
    }

    if (state.lastAnswer) {
      sendToAce(state.lastAnswer);
    }
  }

  function eventToShortcut(event) {
    const parts = [];
    if (event.ctrlKey) parts.push('Ctrl');
    if (event.altKey) parts.push('Alt');
    if (event.shiftKey) parts.push('Shift');
    if (event.metaKey) parts.push('Meta');

    let key = event.key || '';
    if (['Control', 'Alt', 'Shift', 'Meta'].includes(key)) return '';

    if (key.length === 1) {
      key = key.toUpperCase();
    } else {
      const aliases = {
        ' ': 'Space',
        'Escape': 'Esc',
        'ArrowUp': 'Up',
        'ArrowDown': 'Down',
        'ArrowLeft': 'Left',
        'ArrowRight': 'Right'
      };
      key = aliases[key] || key;
    }

    parts.push(key);
    return parts.join('+');
  }

  function loadShortcuts() {
    chrome.storage.local.get(
      ['shortcutMenu', 'shortcutAssign', 'shortcutCopy'],
      (saved) => {
        state.shortcutMenu = saved.shortcutMenu || 'Ctrl+B';
        state.shortcutAssign = saved.shortcutAssign || 'Ctrl+N';
        state.shortcutCopy = saved.shortcutCopy || 'Ctrl+M';
      }
    );
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (changes.shortcutMenu) state.shortcutMenu = changes.shortcutMenu.newValue || 'Ctrl+B';
    if (changes.shortcutAssign) state.shortcutAssign = changes.shortcutAssign.newValue || 'Ctrl+N';
    if (changes.shortcutCopy) state.shortcutCopy = changes.shortcutCopy.newValue || 'Ctrl+M';
  });

  window.addEventListener('keydown', (event) => {
    if (event.repeat) return;

    const shortcut = eventToShortcut(event);
    if (!shortcut) return;

    if (shortcut === state.shortcutMenu) {
      event.preventDefault();
      event.stopImmediatePropagation();
      togglePanelByShortcut();
      return;
    }

    if (shortcut === state.shortcutAssign) {
      event.preventDefault();
      event.stopImmediatePropagation();
      assignCurrentAnswer();
      return;
    }

    if (shortcut === state.shortcutCopy) {
      event.preventDefault();
      event.stopImmediatePropagation();
      copyCurrentAnswer();
    }
  }, true);


  function injectPageBridge() {
    if (document.querySelector('#sia-page-bridge')) return;
    const script = document.createElement('script');
    script.id = 'sia-page-bridge';
    script.src = chrome.runtime.getURL('page.js');
    (document.head || document.documentElement).appendChild(script);
    script.onload = () => script.remove();
  }

  function watchQuestion() {
    const observer = new MutationObserver(() => analyzeAndMaybeFill(false));
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  loadShortcuts();
  injectPageBridge();
  createPanel();
  watchQuestion();
  analyzeAndMaybeFill(true);
})();
