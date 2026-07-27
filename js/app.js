// ======================================
// THEME TOGGLE LOGIC
// ======================================
const themeBtn = document.getElementById('themeBtn');

function loadTheme() {
    const savedTheme = localStorage.getItem('calcTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.documentElement.classList.add('light-theme');
        if (themeBtn) themeBtn.innerText = '☀️';
    } else {
        document.body.classList.remove('light-theme');
        document.documentElement.classList.remove('light-theme');
        if (themeBtn) themeBtn.innerText = '🌙';
    }
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.documentElement.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('calcTheme', 'light');
            themeBtn.innerText = '☀️';
        } else {
            localStorage.setItem('calcTheme', 'dark');
            themeBtn.innerText = '🌙';
        }
    });
}

loadTheme();

// ======================================
// SIDEBAR MENU LOGIC
// ======================================
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function toggleMenu() {
    if (sidebar) sidebar.classList.toggle('active');
    if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
}

if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleMenu);

// ======================================
// HISTORY LOGIC
// ======================================
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

function getSavedHistory() {
    try {
        return JSON.parse(localStorage.getItem('calcHistory')) || [];
    } catch (e) {
        return [];
    }
}

function saveHistoryData(data) {
    try {
        localStorage.setItem('calcHistory', JSON.stringify(data));
    } catch (e) {}
}

function loadHistory() {
    const listEl = document.getElementById('historyList');
    if (!listEl) return;
    
    listEl.innerHTML = '';
    let history = getSavedHistory();

    if (history.length === 0) {
        listEl.innerHTML = '<li style="color: #64748b; text-align: center; font-size: 14px; margin-top: 20px;">No History yet</li>';
        return;
    }

    history.forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.innerHTML = `
            <div class="hist-exp">${item.expression} =</div>
            <div class="hist-res">${item.result}</div>
        `;
        listEl.appendChild(li);
    });
}

window.addToHistory = function(expression, result) {
    if (!expression || result === undefined || result === "Error") return;
    
    let history = getSavedHistory();
    history.unshift({ expression: String(expression), result: String(result) });

    if (history.length > 10) {
        history = history.slice(0, 10);
    }

    saveHistoryData(history);
    loadHistory(); 
};

if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
        try {
            localStorage.removeItem('calcHistory');
        } catch(e) {}
        loadHistory();
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadHistory);
} else {
    loadHistory();
}
