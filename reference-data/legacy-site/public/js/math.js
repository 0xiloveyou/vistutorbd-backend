let allPosts = [];
let currentPage = 1;
let postsPerPage = 10;
let currentSort = '';
let activeCategoryElement = null;

function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function (match) {
    const escape = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escape[match];
  });
}


function renderConsoleWindow(code) {
  return `
    <div class="window">
      <div class="window-title">
        <span>Console Output</span>
        <div class="window-buttons">
          <div class="window-button close"></div>
          <div class="window-button reduce"></div>
          <div class="window-button fullscreen"></div>
        </div>
      </div>
      <div class="console" data-typed="false" data-text="${escapeHtml(code)}"></div>
    </div>
  `;
}

async function fetchPosts() {
  try {
    const res = await fetch("posts/math.json");
    return await res.json();
  } catch (e) {
    console.error("Error fetching dsa & algo posts:", e);
    return [];
  }
}

async function renderBlogs(categoryFilter = null, page = 1) {
  if (allPosts.length === 0) {
    allPosts = await fetchPosts();
    populateTagFilter();
    renderCategoryList();
  }

  let filteredPosts = [...allPosts];
  const selectedTag = document.getElementById('tagFilter')?.value;

  if (categoryFilter) {
    filteredPosts = filteredPosts.filter(post => post.category === categoryFilter);
  }

  if (selectedTag) {
    filteredPosts = filteredPosts.filter(post => post.tags?.includes(selectedTag));
  }

  switch (currentSort) {
    case "date-desc": filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
    case "date-asc": filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
    case "title-asc": filteredPosts.sort((a, b) => a.title.localeCompare(b.title)); break;
    case "title-desc": filteredPosts.sort((a, b) => b.title.localeCompare(a.title)); break;
  }

  const container = document.getElementById("blogPosts");
  container.innerHTML = "";

  const start = (page - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(start, start + postsPerPage);
  

  if (!paginatedPosts.length) {
    container.innerHTML = "<p>No blog posts found.</p>";
    return;
  }

  paginatedPosts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "blog-post";

    const tags = post.tags?.map(tag => `<span class="tag" onclick="filterByTag('${tag}')">${tag}</span>`).join(" ") || "";

    const sections = (post.sections || []).map(section => {
      const subtitle = section.subtitle ? `<h4>${section.subtitle}</h4>` : "";
      const description = section.description
  ? `<details><summary>Description</summary><div>${section.description.replace(/\n/g, "<br>")}</div></details>`
  : "";
      const codeBlock = section.code?.code
        ? `<details><summary>${section.code.label || "Code"} (${section.code.lang})</summary>
            <div class="code-container">
              <button class="copy-button" onclick="copyCode(this)">Copy</button>
              <pre><code class="language-${section.code.lang}">${escapeHtml(section.code.code)}</code></pre>
            </div>
          </details>`
        : "";
      const consoleBlocks = section.consoleBlocks?.map(code => renderConsoleWindow(code)).join("") || "";

      return `<div class="section">${subtitle}${description}${codeBlock}${consoleBlocks}</div>`;
    }).join("");

    const linkButton = post.link ? `<a class="link-button" href="${post.link}" target="_blank">Open Link</a>` : "";

    let imageBlock = "";
    if (Array.isArray(post.images) && post.images.length) {
      imageBlock = `<div class="image-container">${post.images.map(url => `<img src="${url}" alt="Blog Image" class="blog-image"/>`).join("")}</div>`;
    }

    const topLevelConsoleBlocks = (post.consoleBlocks || []).map(code => renderConsoleWindow(code)).join("");

    postDiv.innerHTML = `
      <h2>${post.title}</h2>
      <p><strong>Date:</strong> ${post.date}</p>
      <p><strong>Category:</strong> ${post.category}</p>
      <div><strong>Tags:</strong> ${tags}</div>
      ${linkButton}
      ${imageBlock}
      <hr />
      ${sections}
      ${topLevelConsoleBlocks}
    `;

    container.appendChild(postDiv);
   // 👉 Animate all console windows for this post
postDiv.querySelectorAll('.console').forEach(consoleEl => {
  typeConsoleTextOnce(consoleEl);
    });
    
  });

  renderPagination(filteredPosts.length, page);
  Prism.highlightAll();
  attachExpandButtons();

  // for In This Post" floating table of contents (TOC)
  generateToc(); 

}

function renderCategoryList() {
  const ul = document.getElementById('categoryList');
  if (!ul) return;

  const categories = [...new Set(allPosts.map(post => post.category))].sort((a, b) => a.localeCompare(b));

  ul.innerHTML = `<li onclick="renderBlogs(); removeActiveCategory();" class="active-category">All</li>` +
    categories.map(cat => `<li onclick="filterCategory('${cat}', this)">${cat}</li>`).join("");
}

function populateTagFilter() {
  const tagSet = new Set();
  allPosts.forEach(post => post.tags?.forEach(tag => tagSet.add(tag)));
  const tagFilter = document.getElementById('tagFilter');
  if (!tagFilter) return;
  tagSet.forEach(tag => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    tagFilter.appendChild(option);
  });
}

function renderPagination(totalPosts, currentPage) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (currentPage > 1) {
    const prev = document.createElement("button");
    prev.textContent = "Previous";
    prev.onclick = () => renderBlogs(null, currentPage - 1);
    pagination.appendChild(prev);
  }

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    if (i === currentPage) button.classList.add("active");
    button.onclick = () => renderBlogs(null, i);
    pagination.appendChild(button);
  }

  if (currentPage < totalPages) {
    const next = document.createElement("button");
    next.textContent = "Next";
    next.onclick = () => renderBlogs(null, currentPage + 1);
    pagination.appendChild(next);
  }
}

function filterCategory(category, element) {
  currentPage = 1;
  renderBlogs(category, currentPage);
  if (activeCategoryElement) activeCategoryElement.classList.remove("active-category");
  activeCategoryElement = element;
  element.classList.add("active-category");
}

function removeActiveCategory() {
  if (activeCategoryElement) activeCategoryElement.classList.remove("active-category");
  activeCategoryElement = null;
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".sidebar")?.classList.toggle("dark-mode");
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
}

function copyCode(button) {
  const code = button.nextElementSibling.innerText;
  navigator.clipboard.writeText(code).then(() => {
    button.innerText = "Copied!";
    setTimeout(() => (button.innerText = "Copy"), 1500);
  });
}

function searchPosts() {
  const query = document.getElementById('searchInput')?.value.trim().toLowerCase();
  const posts = document.querySelectorAll('.blog-post');

  posts.forEach(post => {
    let match = post.textContent.toLowerCase().includes(query);
    post.style.display = query.length >= 2 && !match ? "none" : "block";

    post.querySelectorAll("p, h2, h3, code").forEach(el => {
      el.innerHTML = el.textContent.replace(new RegExp(query, "gi"), match => {
        return query.length >= 2 ? `<span class="highlight">${match}</span>` : match;
      });
    });
  });
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  searchPosts();
}

function sortPosts(sortValue) {
  currentSort = sortValue;
  renderBlogs(null, 1);
}

function filterByTag(tag) {
  document.getElementById('tagFilter').value = tag;
  renderBlogs(null, 1);
}



function updateDateTime() {
  const now = new Date();
  document.getElementById("dateTime").textContent = now.toLocaleString();
}

setInterval(updateDateTime, 60000);



function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  document.querySelector(".sidebar")?.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function openCodeModal(code) {
  const modal = document.getElementById("codeModal");
  const modalCode = document.getElementById("modalCode");
  modalCode.innerText = code;  // preserves line breaks
  modal.style.display = "flex";
}



function attachExpandButtons() {
  // Regular code blocks
  document.querySelectorAll("pre code").forEach(codeBlock => {
    if (!codeBlock.parentElement.querySelector(".expand-btn")) {
      const btn = createExpandButton(codeBlock);
      codeBlock.parentElement.style.position = "relative";
      codeBlock.parentElement.appendChild(btn);
    }
  });

  // Console-style window blocks
  document.querySelectorAll(".window .console").forEach(consoleBlock => {
    if (!consoleBlock.querySelector(".expand-btn")) {
      const btn = createExpandButton(consoleBlock);
      consoleBlock.style.position = "relative";
      consoleBlock.appendChild(btn);
    }
  });
}

// Creates the 🔍 button and attaches zoom logic
function createExpandButton(targetBlock) {
  const btn = document.createElement("button");
  btn.textContent = "🔍";
  btn.className = "expand-btn";
  btn.style.cssText = "position:absolute;top:5px;right:5px;z-index:2;padding:2px;font-size:14px;";
  
  btn.onclick = () => {
    const content = getFormattedContent(targetBlock);
    openCodeModal(content);
  };

  return btn;
}

function getFormattedContent(el) {
  if (el.tagName === "PRE") {
    return el.innerText;
  } else {
    // fallback for div.console that may have <br> or span-based content
    return Array.from(el.childNodes).map(node => {
      return node.nodeType === Node.TEXT_NODE ? node.textContent :
             node.tagName === "BR" ? "\n" :
             node.innerText || "";
    }).join("");
  }
}



function openCodeModal(code) {
  const modal = document.getElementById("codeModal");
  const modalCode = document.getElementById("modalCode");
  modalCode.textContent = code;
  modal.style.display = "flex";
}

document.getElementById("closeCodeModal").addEventListener("click", () => {
  document.getElementById("codeModal").style.display = "none";
});

document.getElementById("copyCodeModal").addEventListener("click", () => {
  const code = document.getElementById("modalCode").textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert("Code copied to clipboard!");
  });
});


document.getElementById("closeCodeModal").addEventListener("click", () => {
  document.getElementById("codeModal").style.display = "none";
});

document.getElementById("copyCodeModal").addEventListener("click", () => {
  const code = document.getElementById("modalCode").textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert("Code copied to clipboard!");
  });
});


function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.querySelector(".sidebar")?.classList.add("dark-mode");
  }
}


window.onload = () => {
  applySavedTheme();      // Apply saved theme
  updateDateTime();       // Your existing functions
  renderBlogs();          // Load blog content
};



  const fullscreenBtn = document.getElementById("fullscreenToggle");
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      fullscreenBtn.textContent = "Exit Fullscreen";
    } else {
      document.exitFullscreen();
      fullscreenBtn.textContent = "🖥 Fullscreen";
    }
  });





  const toggleReadingBtn = document.getElementById("toggleReadingMode");
  const exitReadingBtn = document.getElementById("exitReadingModeBtn");
  const blogPosts = document.getElementById("blogPosts");

  toggleReadingBtn.addEventListener("click", () => {
    // Hide UI elements
    document.querySelector(".navbar")?.style.setProperty("display", "none");
    document.querySelector(".sidebar")?.style.setProperty("display", "none");
    document.querySelector(".search-container")?.style.setProperty("display", "none");
    document.getElementById("pagination")?.style.setProperty("display", "none");
    document.querySelector(".scroll-buttons")?.style.setProperty("display", "none");
    document.querySelector(".sidebar-toggle-btn")?.style.setProperty("display", "none");

    // Expand blog content
    if (blogPosts) {
      blogPosts.style.maxWidth = "100%";
      blogPosts.style.padding = "40px";
      blogPosts.style.margin = "auto";
    }

    // Show exit button
    exitReadingBtn.style.display = "block";
  });

  exitReadingBtn.addEventListener("click", () => {
    // Restore UI elements
    document.querySelector(".navbar")?.style.removeProperty("display");
    document.querySelector(".sidebar")?.style.removeProperty("display");
    document.querySelector(".search-container")?.style.removeProperty("display");
    document.getElementById("pagination")?.style.removeProperty("display");
    document.querySelector(".scroll-buttons")?.style.removeProperty("display");
    document.querySelector(".sidebar-toggle-btn")?.style.removeProperty("display");

    // Restore blog post layout
    if (blogPosts) {
      blogPosts.style.removeProperty("max-width");
      blogPosts.style.removeProperty("padding");
      blogPosts.style.removeProperty("margin");
    }

    // Hide exit button
    exitReadingBtn.style.display = "none";
  });




  function generateFloatingToc() {
    const tocList = document.getElementById("tocList");
    tocList.innerHTML = "";
  
    const headings = document.querySelectorAll("#blogPosts h2, #blogPosts h3");
  
    headings.forEach((heading, index) => {
      const id = `section-${index}`;
      heading.setAttribute("id", id);
  
      const li = document.createElement("li");
      li.innerHTML = `<a href="#${id}">${heading.innerText}</a>`;
      tocList.appendChild(li);
    });
  }
  
  // Call this after rendering blog content
  setTimeout(() => {
    generateFloatingToc();
  }, 500); // Slight delay in case content is still loading

  
  function toggleToc() {
    const toc = document.getElementById('floatingToc');
    const arrow = document.getElementById('tocArrow');
    toc.classList.toggle('collapsed');
  }
  


// for floating table of contents (TOC) 
  function generateToc() {
    const tocList = document.getElementById('tocList');
    const blogContent = document.getElementById('blogPosts');
    tocList.innerHTML = ''; // Clear old TOC
  
    const headings = blogContent.querySelectorAll('h2, h3');
    
    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id;
  
      const li = document.createElement('li');
      li.style.marginLeft = heading.tagName === 'H3' ? '15px' : '0';
  
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = heading.textContent;
  
      li.appendChild(link);
      tocList.appendChild(li);
    });
  }
  



  function typeConsoleTextOnce(element, speed = 50) {
    if (element.dataset.typed === "true") return;
  
    const text = element.dataset.text;
    if (!text) return;
  
    const lines = text.split('\n');
    let lineIndex = 0;
    let charIndex = 0;
  
    let currentLineElement = document.createElement("div");
    element.appendChild(currentLineElement);
  
    const cursor = document.createElement("span");
    cursor.className = "console-cursor";
    currentLineElement.appendChild(cursor);
  
    const typeChar = () => {
      // Remove cursor temporarily
      cursor.remove();
  
      if (lineIndex < lines.length) {
        const currentLine = lines[lineIndex];
  
        if (charIndex < currentLine.length) {
          currentLineElement.textContent += currentLine[charIndex];
          charIndex++;
          currentLineElement.appendChild(cursor);
          setTimeout(typeChar, speed);
        } else {
          // Finish line
          currentLineElement.appendChild(cursor); // place at end of this line
          lineIndex++;
          charIndex = 0;
  
          // Start next line after short delay
          if (lineIndex < lines.length) {
            setTimeout(() => {
              currentLineElement = document.createElement("div");
              element.appendChild(currentLineElement);
              currentLineElement.appendChild(cursor);
              typeChar();
            }, 300);
          } else {
            // Done typing
            element.dataset.typed = "true";
          }
        }
      }
    };
  
    typeChar();
  }
  

  
  // typeConsoleTextOnce(consoleEl, 400); // faster line typing

