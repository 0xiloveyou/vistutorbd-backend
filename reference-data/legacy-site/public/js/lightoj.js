/* =========================================================
   BLOG VIEWER – Prism-free version
   (full-text search, smooth console animation, expand/copy buttons)
   ========================================================= */
let allPosts = [];
let currentPage = 1;
let postsPerPage = 10;
let currentSort = '';
let activeCategoryElement = null;
let lightningMode = localStorage.getItem("lightningMode") === "true";


/* ---------------------------------------------------------
   HELPERS
   --------------------------------------------------------- */
function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
}

/* ---------- search-index & debounce ---------- */
function buildSearchIndex() {
  allPosts.forEach(p => { p.__search = createSearchString(p); });
}
function createSearchString(p) {
  let out = [p.title, p.category, p.date, ...(p.tags || [])].join(' ');
  (p.sections || []).forEach(s => {
    out += ' ' + [s.subtitle, s.description].join(' ');
    // consoleBlock may be string (old format) or object (new format)
    if (s.consoleBlock) {
      if (typeof s.consoleBlock === 'object') {
        out += ' ' + Object.values(s.consoleBlock).join(' ');
      } else {
        out += ' ' + s.consoleBlock;
      }
    }
  });
  return out.toLowerCase();
}

function debounce(fn, delay = 250) {
  let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), delay); };
}

/* ---------- console window renderer ---------- */
function renderConsoleWindow(code) {
  // `code` can be a string (old posts) or object { c:..., cpp:..., go:..., py:..., js:... }
  const langs = ['c', 'cpp', 'go', 'py', 'js'];

  // helper to get first non-empty language (or default to 'c')
  let defaultLang = 'c';
  if (code && typeof code === 'object') {
    const firstNonEmpty = langs.find(l => code[l] && code[l].trim().length);
    if (firstNonEmpty) defaultLang = firstNonEmpty;
  }

  // If code is object, create data attributes for each language
  let dataAttrs = '';
  if (code && typeof code === 'object') {
    langs.forEach(l => {
      const text = escapeHtml(code[l] || '');
      // attribute names: data-c, data-cpp, data-go, data-py, data-js
      dataAttrs += ` data-${l}="${text.replace(/"/g, '&quot;')}"`;
    });
  }

  // fallback single-string text (old posts)
  const escapedDefault = escapeHtml(
    (typeof code === 'string') ? code : (typeof code === 'object' ? (code[defaultLang] || '') : '')
  ).replace(/"/g, '&quot;');

  return `
    <div class="window">
      <div class="window-title">
        <span class="con-header">Console Window</span>
        <div class="title-controls">
          <button class="three-dot" title="More options" aria-label="More">⚙️</button>

<div class="console-options" style="display:none;">
  <div class="color-palette" role="group" aria-label="Console color palette">
    <button class="color-btn" data-color="#919191ff" title="Black" style="background:#919191ff;"></button>
    <button class="color-btn" data-color="#07e2ffff" title="Dark" style="background:#07e2ffff;"></button>
    <button class="color-btn" data-color="#005af5ff" title="Blue" style="background:#005af5ff;"></button>
    <button class="color-btn" data-color="#00ff11ff" title="Green" style="background:#00ff11ff;"></button>
    <button class="color-btn" data-color="#d31414ff" title="Red" style="background:#d31414ff;"></button>
    <button class="color-btn" data-color="#f59e0b" title="Amber" style="background:#f59e0b;"></button>
    <button class="color-btn" data-color="#8b5cf6" title="Purple" style="background:#8b5cf6;"></button>
  </div>
  <div class="font-controls">
    <button class="font-plus">+</button>
    <button class="font-minus">-</button>
  </div>
</div>


          <select class="lang-select" aria-label="Console language">
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="go">Go</option>
            <option value="py">Python</option>
            <option value="js">JavaScript</option>
          </select>

          <button class="console-copy" title="Copy code" aria-label="Copy">📋</button>
        </div>
      </div>

      <pre class="console" data-text="${escapedDefault}" ${dataAttrs}></pre>

      <div class="console-footer">
        <button class="console-action like" title="Like" aria-label="Like">👍 <span class="count">0</span></button>
        <button class="console-action comment" title="Comment" aria-label="Comment">🗨️</button>
        <button class="console-action share" title="Share" aria-label="Share">🔗</button>
        <button class="console-action repost" title="Repost" aria-label="Repost">🔁</button>
      </div>
    </div>
  `;
}




/* =========================================================
   DATA
   ========================================================= */
async function fetchPosts() {
  try {
    const res = await fetch("posts/lightoj.json");
    return await res.json();
  } catch (e) {
    console.error("Error fetching posts:", e);
    return [];
  }
}

/* =========================================================
   RENDERERS
   ========================================================= */
async function renderBlogs(categoryFilter = null, page = 1) {
  if (allPosts.length === 0) {
    allPosts = await fetchPosts();
    buildSearchIndex();
    populateTagFilter();
    renderCategoryList();
  }

  let posts = [...allPosts];
  const tag = document.getElementById('tagFilter')?.value;

  if (categoryFilter) posts = posts.filter(p => p.category === categoryFilter);
  if (tag)            posts = posts.filter(p => p.tags?.includes(tag));

  switch (currentSort) {
    case "date-desc":  posts.sort((a,b)=>new Date(b.date)-new Date(a.date)); break;
    case "date-asc":   posts.sort((a,b)=>new Date(a.date)-new Date(b.date)); break;
    case "title-asc":  posts.sort((a,b)=>a.title.localeCompare(b.title));    break;
    case "title-desc": posts.sort((a,b)=>b.title.localeCompare(a.title));    break;
  }

  renderBlogsFromArray(posts, page);
  highlightMatches(container, highlightTerm);


}

function renderBlogsFromArray(postsArr, page = 1, highlightTerm = '') {

  // cancel running console animations from previous render to avoid orphaned timers
document.querySelectorAll('.console').forEach(c => stopTyping(c));

  const container = document.getElementById("blogPosts");
  container.innerHTML = "";

  const start = (page - 1) * postsPerPage;
  const paginated = postsArr.slice(start, start + postsPerPage);

  if (!paginated.length) {
    container.innerHTML = "<p>No blog posts found.</p>";
    return;
  }

  paginated.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "blog-post";

    const tags = post.tags?.map(tag =>
      `<span class="tag" onclick="filterByTag('${tag}')">${tag}</span>`).join(" ") || "";

    const sections = (post.sections || []).map(s => {
      const subtitle = s.subtitle ? `<h4>${s.subtitle}</h4>` : "";
      const description = s.description
        ? `<details><summary class="des">Description</summary><div>${s.description.replace(/\n/g,"<br>")}</div></details>` : "";
const consoleBlock = s.consoleBlock ? renderConsoleWindow(s.consoleBlock) : "";
return `<div class="section">${subtitle}${description}${consoleBlock}</div>`;

    }).join("");

    const imageBlock = Array.isArray(post.images) && post.images.length
      ? `<div class="image-container">${post.images.map(url=>`<img src="${url}" class="blog-image">`).join("")}</div>` : "";
    const namedLinks = (post.namedLinks||[]).length
      ? `<div class="named-links"><h4>Named Links</h4><ul>${
          post.namedLinks.map(l=>`<li><a href="${l.url}" target="_blank">${l.name}</a></li>`).join("")
        }</ul></div>` : "";
    const externalLink = post.link
      ? `<div class="external-link"><a href="${post.link}" target="_blank">Open Link</a></div>` : "";

    postDiv.innerHTML = `
      <h2>${post.title}</h2>
      <p><strong>Date:</strong> ${post.date}</p>
      <p><strong>Category:</strong> ${post.category}</p>
      <div><strong>Tags:</strong> ${tags}</div>
      ${imageBlock}${externalLink}${namedLinks}<hr/>${sections}`;
    container.appendChild(postDiv);
  });

  renderPagination(postsArr.length, page);

if (!highlightTerm) {
  document.querySelectorAll('.console').forEach(c => {
    if (lightningMode) {
      // ⚡ append instantly with blinking cursor
      const text = c.dataset.text || '';
      text.split('\n').forEach(line => {
        const lineEl = document.createElement("div");
        lineEl.textContent = line || '\u00A0';
        c.appendChild(lineEl);
      });

      // add fake cursor that blinks infinitely
      const cursor = document.createElement("span");
      cursor.className = "console-cursor blinking-text";
      if (c.lastChild) c.lastChild.appendChild(cursor);
      else c.appendChild(cursor);

      c.dataset.typed = "true"; // mark done
    } else {
      // 🐢 normal typing
      typeConsoleTextOnce(c, 50);
    }
  });
} else {
  // search highlight mode → always append instantly
  document.querySelectorAll('.console').forEach(c => {
    const text = c.dataset.text;
    if (text) {
      text.split('\n').forEach(line => {
        const lineEl = document.createElement("div");
        lineEl.textContent = line || '\u00A0';
        c.appendChild(lineEl);
      });
    }
  });
}


  // highlight BEFORE adding expand buttons
  highlightMatches(container, highlightTerm);
// attach controls to each console window
document.querySelectorAll(".window").forEach(win => attachConsoleControls(win));

// ✅ apply saved font + color AFTER consoles + controls exist
const savedColor = localStorage.getItem("consoleColor");
const savedFont = localStorage.getItem("consoleFontSize");
if (savedColor) {
  document.querySelectorAll(".console").forEach(c => c.style.color = savedColor);
}
if (savedFont) {
  document.querySelectorAll(".console").forEach(c => c.style.fontSize = savedFont + "px");
}

}

/* =========================================================
   SEARCH
   ========================================================= */
const searchInput = document.getElementById('searchInput');
searchInput?.addEventListener('input', debounce(runSearch, 250))

searchInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    if (query.length < 2) {
      renderBlogs(null, 1);
    } else {
      const matches = allPosts.filter(p => p.__search.includes(query));
      renderBlogsFromArray(matches, 1, query);
    }
    searchInput.value = ''; // clear the input field
  }
});

function runSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (q.length < 2) { renderBlogs(null, 1); return; }
  const matches = allPosts.filter(p => p.__search.includes(q));
  renderBlogsFromArray(matches, 1, q);
}

/* =========================================================
   HIGHLIGHT
   ========================================================= */
function highlightMatches(root, term) {
  if (!term) return;

  const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re   = new RegExp(`(${safe})`, 'gi');

  root.querySelectorAll('.console .highlight').forEach(sp => {
    sp.replaceWith(sp.textContent);
  });

  root.querySelectorAll('p, h2, h3, pre, code').forEach(el => {
    if (el.closest('.console')) return;
    el.innerHTML = el.innerHTML.replace(re, '<span style="display: inline;" class="highlight">$1</span>');
  });
}

/* =========================================================
   ANIMATION
   ========================================================= */
function typeConsoleTextOnce(el, speed = 50) {
  if (!el) return;

  // if we've already finished typing, don't restart
  if (el.dataset.typed === "true") return;

  // Stop any previous animation on this element
  stopTyping(el);

  // prepare timeout store and cancellation flag
  el._typingTimeouts = [];
  el._typingCancelled = false;

  const schedule = (fn, delay) => {
    const id = setTimeout(() => {
      if (el._typingCancelled) return;
      fn();
    }, delay);
    el._typingTimeouts.push(id);
    return id;
  };

  const text = el.dataset.text;
  if (!text) {
    el.dataset.typed = "true";
    return;
  }

  const lines = text.split('\n');
  let li = 0, ci = 0;

  // ensure element is empty before typing
  el.innerHTML = '';

  let lineEl = document.createElement("div");
  el.appendChild(lineEl);

  const cursor = document.createElement("span");
  cursor.className = "console-cursor";
  lineEl.appendChild(cursor);

  const typeChar = () => {
    if (el._typingCancelled) return;
    // remove cursor (we'll reattach it to the updated line)
    cursor.remove();

    if (li < lines.length) {
      const line = lines[li];

      if (line.length === 0 && ci === 0) {
        // a blank line: create non-breaking space then move to next line
        lineEl.innerHTML = '&nbsp;';
        lineEl.appendChild(cursor);
        li++;
        schedule(() => {
          if (el._typingCancelled) return;
          lineEl = document.createElement("div");
          el.appendChild(lineEl);
          lineEl.appendChild(cursor);
          typeChar();
        }, 300);
        return;
      }

      if (ci < line.length) {
        // type next character
        lineEl.textContent += line[ci++];
        lineEl.appendChild(cursor);
        schedule(typeChar, speed);
      } else {
        // end of line: prepare next line
        lineEl.appendChild(cursor);
        li++; ci = 0;
        if (li < lines.length) {
          schedule(() => {
            if (el._typingCancelled) return;
            lineEl = document.createElement("div");
            el.appendChild(lineEl);
            lineEl.appendChild(cursor);
            typeChar();
          }, 300);
        } else {
          // finished typing
          el.dataset.typed = "true";
          schedule(() => {
            if (el._typingCancelled) return;
            cursor.classList.add("blinking-text");
            // clear stored timeouts (we're done)
            el._typingTimeouts = [];
          }, 300);
        }
      }
    }
  };

  typeChar();
}

/* =========================================================
   UI HELPERS
   ========================================================= */
function renderCategoryList() {
  const ul = document.getElementById('categoryList'); if (!ul) return;
  const cats = [...new Set(allPosts.map(p=>p.category))].sort((a,b)=>a.localeCompare(b));
  ul.innerHTML = `<li onclick="renderBlogs(); removeActiveCategory();" class="active-category">All</li>` +
                 cats.map(c=>`<li onclick="filterCategory('${c}',this)">${c}</li>`).join("");
}
function populateTagFilter() {
  const tagSet = new Set(); allPosts.forEach(p=>p.tags?.forEach(t=>tagSet.add(t)));
  const sel = document.getElementById('tagFilter'); if (!sel) return;
  tagSet.forEach(t=>{ const o=document.createElement("option"); o.value=o.textContent=t; sel.appendChild(o); });
}
function renderPagination(total, cur) {
  const totalPages = Math.ceil(total / postsPerPage);
  const pg = document.getElementById("pagination");
  pg.innerHTML = "";

  if (totalPages <= 1) return;

  const EDGE = 2;        // always show first 2 & last 2
  const WINDOW = 2;      // pages around current

  // ← Previous
  if (cur > 1) {
    const prev = document.createElement("button");
    prev.textContent = "←";
    prev.onclick = () => renderBlogs(null, cur - 1);
    pg.appendChild(prev);
  }

  const pages = new Set();

  // First pages
  for (let i = 1; i <= EDGE; i++) pages.add(i);

  // Window around current
  for (let i = cur - WINDOW; i <= cur + WINDOW; i++) {
    if (i > 0 && i <= totalPages) pages.add(i);
  }

  // Last pages
  for (let i = totalPages - EDGE + 1; i <= totalPages; i++) {
    if (i > 0) pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);

  let lastRendered = 0;

  sorted.forEach(p => {
    if (p - lastRendered > 1) {
      addDots();
    }
    addPageBtn(p);
    lastRendered = p;
  });

  // → Next
  if (cur < totalPages) {
    const next = document.createElement("button");
    next.textContent = "→";
    next.onclick = () => renderBlogs(null, cur + 1);
    pg.appendChild(next);
  }

  /* helpers */
  function addPageBtn(i) {
    const b = document.createElement("button");
    b.textContent = i;
    if (i === cur) b.classList.add("active");
    b.onclick = () => renderBlogs(null, i);
    pg.appendChild(b);
  }

  function addDots() {
    const span = document.createElement("span");
    span.textContent = "...";
    span.className = "pagination-dots";
    pg.appendChild(span);
  }
}

function filterCategory(c,e){ currentPage=1; renderBlogs(c,1); if(activeCategoryElement)activeCategoryElement.classList.remove("active-category"); activeCategoryElement=e; e.classList.add("active-category"); }
function removeActiveCategory(){ if(activeCategoryElement)activeCategoryElement.classList.remove("active-category"); activeCategoryElement=null; }

function toggleTheme(){ const d=document.body.classList.toggle("dark-mode"); document.querySelector(".sidebar")?.classList.toggle("dark-mode"); localStorage.setItem("theme",d?"dark":"light"); }
function toggleSidebar(){ const s=document.getElementById("sidebar"); s.style.display = s.style.display==="none"?"block":"none"; }
function scrollUp() {
  const blog = document.getElementById('blogPosts');
  if (blog) {
    // scroll the blog container to top
    blog.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function scrollDown() {
  const blog = document.getElementById('blogPosts');
  if (blog) {
    // scroll the blog container to bottom
    blog.scrollTo({ top: blog.scrollHeight, behavior: 'smooth' });
  }
}

function sortPosts(v){ currentSort=v; renderBlogs(null,1); }
function filterByTag(t){ document.getElementById('tagFilter').value=t; renderBlogs(null,1); }

function updateDateTime(){
  const now = new Date();
  document.getElementById("dateTime").textContent =
    now.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      // second: "numeric",
      hour12: true,
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
}

setInterval(updateDateTime,60000);

function applySavedTheme(){ if(localStorage.getItem("theme")==="dark"){ document.body.classList.add("dark-mode"); document.querySelector(".sidebar")?.classList.add("dark-mode"); } }

/* ---------- on load ---------- */
window.onload = () => { applySavedTheme(); const lightningBtn = document.getElementById("lightningToggle");
if (lightningBtn) {
  lightningBtn.addEventListener("click", () => {
    lightningMode = !lightningMode;
    localStorage.setItem("lightningMode", lightningMode);
    renderBlogs(null, 1); // re-render to apply mode
  });

  // ✅ visually indicate mode
  if (lightningMode) lightningBtn.classList.add("active");
  else lightningBtn.classList.remove("active");
}
 updateDateTime(); renderBlogs();};


const blogPosts = document.getElementById("blogPosts");



/* ---------- clear search ---------- */
function clearSearch() {
  const input = document.getElementById('searchInput');
  if (input) {
    input.value = '';
    renderBlogs(null, 1);
    input.focus();
  }
}
searchInput?.addEventListener('input', () => {
  const clearBtn = document.querySelector('.clear-search');
  if (clearBtn) {
    clearBtn.style.display = searchInput.value ? 'inline' : 'none';
  }
});


function attachConsoleControls(windowEl) {
  const consoleEl = windowEl.querySelector(".console");
  if (!consoleEl) return;

  // 🎨 color palette functionality
  windowEl.querySelectorAll(".color-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const color = btn.getAttribute("data-color");
      consoleEl.style.color = color; // change console text color
    });
  });

  // lang select: switch displayed text when changed
  const langSelect = windowEl.querySelector(".lang-select");
  if (langSelect) {
    // set select to default language if possible (first non-empty)
    const possibleLangs = ['c', 'cpp', 'go', 'py', 'js'];
    const firstNonEmpty = possibleLangs.find(l => consoleEl.dataset[l] && consoleEl.dataset[l].trim().length);
    if (firstNonEmpty) {
      langSelect.value = firstNonEmpty;
      consoleEl.dataset.text = consoleEl.dataset[firstNonEmpty] || '';
    }

langSelect.addEventListener("change", () => {
  const lang = langSelect.value;
  const langText = consoleEl.dataset[lang] || '';

  // STOP any ongoing typing on this console BEFORE changing text/DOM
  stopTyping(consoleEl);

  // reset displayed content and typed flag
  consoleEl.innerHTML = '';
  delete consoleEl.dataset.typed;
  consoleEl.dataset.text = langText;

  if (langText) {
    if (lightningMode) {
      // ⚡ instantly append all text + blinking cursor
      langText.split('\n').forEach(line => {
        const lineEl = document.createElement("div");
        lineEl.textContent = line || '\u00A0';
        consoleEl.appendChild(lineEl);
      });

      const cursor = document.createElement("span");
      cursor.className = "console-cursor blinking-text";
      if (consoleEl.lastChild) consoleEl.lastChild.appendChild(cursor);
      else consoleEl.appendChild(cursor);

      consoleEl.dataset.typed = "true"; // mark done
    } else {
      // 🐢 normal typing
      typeConsoleTextOnce(consoleEl, 30);
    }
  }
});


  }

  // 📋 copy code button
  const copyBtn = windowEl.querySelector(".console-copy");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      // prefer currently selected lang, fallback to dataset.text
      const sel = windowEl.querySelector(".lang-select");
      const lang = sel ? sel.value : null;
      let text = '';

      if (lang && consoleEl.dataset[lang]) {
        text = consoleEl.dataset[lang];
      } else if (consoleEl.dataset.text) {
        text = consoleEl.dataset.text;
      } else {
        // fallback: attempt to get innerText
        text = consoleEl.innerText || '';
      }

      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        const prev = copyBtn.textContent;
        copyBtn.textContent = '✅ Copied';
        setTimeout(() => { copyBtn.textContent = prev; }, 1500);
      }).catch(err => console.error('Copy failed', err));
    });
  }

// ⋯ three-dot → toggle options
// ⋯ three-dot → toggle options + close on outside click
const menu = windowEl.querySelector(".three-dot");
const options = windowEl.querySelector(".console-options");
if (menu && options) {
  menu.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent bubbling
    options.style.display = options.style.display === "none" ? "block" : "none";
  });

  document.addEventListener("click", (e) => {
    if (!windowEl.contains(e.target)) {
      options.style.display = "none";
    }
  });
}


// 🎨 color palette functionality (apply globally)
windowEl.querySelectorAll(".color-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const color = btn.getAttribute("data-color");
    document.querySelectorAll(".console").forEach(c => c.style.color = color);
    localStorage.setItem("consoleColor", color);
  });
});

// 🔤 font size controls (apply globally)
const plus = windowEl.querySelector(".font-plus");
const minus = windowEl.querySelector(".font-minus");

let fontSize = parseInt(localStorage.getItem("consoleFontSize")) || 14;

if (plus) {
  plus.addEventListener("click", () => {
    fontSize += 1;
    document.querySelectorAll(".console").forEach(c => c.style.fontSize = fontSize + "px");
    localStorage.setItem("consoleFontSize", fontSize);
  });
}
if (minus) {
  minus.addEventListener("click", () => {
    fontSize = Math.max(10, fontSize - 1); // min size
    document.querySelectorAll(".console").forEach(c => c.style.fontSize = fontSize + "px");
    localStorage.setItem("consoleFontSize", fontSize);
  });
}


  // Note: we don't wire console-footer buttons here (you already have them)
}




function changeConsoleColor(win, color) {
  const con = win.querySelector('.console');
  const title = win.querySelector('.window-title');
  if (con) con.style.backgroundColor = color;
  if (title) title.style.backgroundColor = color;

  const rgb = hexToRgb(color);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  const textColor = brightness > 125 ? '#000' : '#fff';
  if (con) con.style.color = textColor;
  if (title) title.style.color = textColor;
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(s => s + s).join('');
  const num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}


function openCodeModal(codeText) {
  const modal = document.getElementById("codeModal");
  const pre = document.getElementById("modalCode");
  if (!modal || !pre) return;
  pre.textContent = codeText;
  modal.style.display = "flex"; // show modal
}


function stopTyping(el) {
  if (!el) return;
  // mark cancelled so any scheduled callbacks exit early
  el._typingCancelled = true;

  // clear pending timeouts tracked on the element
  if (Array.isArray(el._typingTimeouts)) {
    el._typingTimeouts.forEach(id => clearTimeout(id));
    el._typingTimeouts.length = 0;
  }

  // remove any cursor(s)
  el.querySelectorAll('.console-cursor').forEach(c => c.remove());

  // clear typed flag so a fresh typing can be started later if needed
  delete el.dataset.typed;
}
