// DFCE 2026 Quiz — admin export page logic (not linked from the public site)
(function () {
  "use strict";

  const LEADERBOARD_KEY = "dfce2026_leaderboard";

  const dateInput = document.getElementById("admin-date");
  const summaryEl = document.getElementById("admin-summary");
  const sourceEl = document.getElementById("admin-source");
  const tableBody = document.getElementById("admin-table-body");
  const btnExportDay = document.getElementById("btn-export-day");
  const btnExportAll = document.getElementById("btn-export-all");
  const btnRefresh = document.getElementById("btn-refresh");

  let allEntries = [];

  function isCloudMode() {
    return !!window.QUIZ_DB;
  }

  function dayKey(isoString) {
    const d = new Date(isoString);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function todayKey() {
    return dayKey(new Date().toISOString());
  }

  async function loadAllEntries() {
    if (isCloudMode()) {
      try {
        const snap = await window.QUIZ_DB.collection("scores").get();
        return snap.docs.map((doc) => doc.data());
      } catch (err) {
        console.warn("[DFCE Admin] Firestore read failed, falling back to local scores.", err);
      }
    }
    try {
      const raw = localStorage.getItem(LEADERBOARD_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function sortEntries(entries) {
    return [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function renderTable(entries) {
    tableBody.innerHTML = "";
    entries.forEach((e) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHtml(e.name)}</td>
        <td>${e.score}/10</td>
        <td>${e.time}</td>
        <td>${new Date(e.date).toLocaleString()}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function entriesForDay(day) {
    return allEntries.filter((e) => dayKey(e.date) === day);
  }

  function refreshView() {
    const day = dateInput.value || todayKey();
    const dayEntries = sortEntries(entriesForDay(day));
    renderTable(dayEntries);
    summaryEl.textContent = `${dayEntries.length} attempt(s) on ${day} · ${allEntries.length} total across all days.`;
    sourceEl.textContent = isCloudMode() ? "Shared Firestore leaderboard" : "Local browser storage only (Firebase not configured)";
  }

  function csvEscape(value) {
    const str = value == null ? "" : String(value);
    if (/[",\n\r]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  function toCSV(entries) {
    const header = ["Rank", "Name", "Score", "Time (s)", "Date/Time (ISO)"];
    const sorted = [...entries].sort((a, b) => b.score - a.score || a.time - b.time);
    const rows = sorted.map((e, i) => [i + 1, e.name, e.score, e.time, e.date]);
    return [header, ...rows].map((r) => r.map(csvEscape).join(",")).join("\r\n");
  }

  function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function init() {
    dateInput.value = todayKey();
    summaryEl.textContent = "Loading…";
    allEntries = await loadAllEntries();
    refreshView();
  }

  dateInput.addEventListener("change", refreshView);

  btnRefresh.addEventListener("click", async () => {
    summaryEl.textContent = "Refreshing…";
    allEntries = await loadAllEntries();
    refreshView();
  });

  btnExportDay.addEventListener("click", () => {
    const day = dateInput.value || todayKey();
    const dayEntries = entriesForDay(day);
    if (dayEntries.length === 0) {
      alert(`No scores recorded for ${day}.`);
      return;
    }
    downloadCSV(toCSV(dayEntries), `dfce2026-leaderboard-${day}.csv`);
  });

  btnExportAll.addEventListener("click", () => {
    if (allEntries.length === 0) {
      alert("No scores recorded yet.");
      return;
    }
    downloadCSV(toCSV(allEntries), `dfce2026-leaderboard-all.csv`);
  });

  init();
})();
