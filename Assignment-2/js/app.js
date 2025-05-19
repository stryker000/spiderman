/*  ───────────────────────────────────────────────────────────
   Array Utilities – All business logic & DOM wiring
   Using vanilla JS + jQuery for concise DOM manipulation
   ──────────────────────────────────────────────────────────── */

/* ---------- A. Integer utilities ----------------------------------- */
let intArr = [];

/** Parse text field to integer array */
function loadIntegerArray() {
  const raw = $("#intInput").val();
  if (!raw.trim()) return showIntMessage("Please enter some numbers.", "danger");

  // Sanitise & convert
  intArr = raw
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => !Number.isNaN(n));

  if (!intArr.length) {
    showIntMessage("No valid integers found.", "danger");
  } else {
    showIntMessage(`Loaded array: [ ${intArr.join(", ")} ]`, "success");
  }
}

/** Binary search – assumes ascending-sorted array */
function binarySearch(arr, key) {
  let lo = 0,
    hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === key) return mid;
    arr[mid] < key ? (lo = mid + 1) : (hi = mid - 1);
  }
  return -1;
}

/** Helper: write coloured alert */
function showIntMessage(msg, type) {
  $("#intResult").removeClass("d-none").removeClass("alert-*").addClass(`alert-${type}`).text(msg);
}

/* ---------- B. Named entity utilities ------------------------------ */
const entities = [];

/** Re-render entity table */
function refreshEntityTable() {
  const tbody = $("#entityTable tbody");
  tbody.empty();
  entities.forEach((name, idx) => {
    tbody.append(`<tr><td>${idx + 1}</td><td>${name}</td></tr>`);
  });
}

/* ---------- Event wiring ------------------------------------------- */
$(document).ready(function () {
  /* Integer array events */
  $("#btnSetIntArr").on("click", loadIntegerArray);

  $("#btnSort").on("click", () => {
    if (!intArr.length) return showIntMessage("Load an array first.", "warning");
    intArr.sort((a, b) => a - b);
    showIntMessage(`Sorted array: [ ${intArr.join(", ")} ]`, "info");
  });

  $("#btnSearch").on("click", () => {
    if (!intArr.length) return showIntMessage("Load an array first.", "warning");
    const key = Number($("#searchKey").val());
    if (Number.isNaN(key)) return showIntMessage("Enter a valid number to search.", "danger");

    const pos = binarySearch([...intArr].sort((a, b) => a - b), key);
    pos >= 0
      ? showIntMessage(`✅ ${key} found at index ${pos} (0-based after sort).`, "success")
      : showIntMessage(`❌ ${key} not found in array.`, "danger");
  });

  /* Entity array events */
  $("#btnAdd").on("click", () => {
    const name = $("#entityName").val().trim();
    if (!name) return;
    entities.push(name);
    refreshEntityTable();
    $("#entityName").val("").focus();
  });

  $("#btnRemove").on("click", () => {
    const name = $("#entityName").val().trim();
    if (!name) return;
    const idx = entities.indexOf(name);
    if (idx >= 0) entities.splice(idx, 1);
    refreshEntityTable();
  });

  $("#btnEntitySort").on("click", () => {
    entities.sort((a, b) => a.localeCompare(b));
    refreshEntityTable();
  });
});
