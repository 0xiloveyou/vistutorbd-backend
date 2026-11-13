var $els = $('.menu a, .menu header');
var count = $els.length;
var grouplength = Math.ceil(count/3);
var groupNumber = 0;
var i = 1;
$('.menu').css('--count',count+'');
$els.each(function(j){
    if ( i > grouplength ) {
        groupNumber++;
        i=1;
    }
    $(this).attr('data-group',groupNumber);
    i++;
});

$('.menu footer button').on('click',function(e){
    e.preventDefault();
    $els.each(function(j){
        $(this).css('--top',$(this)[0].getBoundingClientRect().top + ($(this).attr('data-group') * -15) - 20);
        $(this).css('--delay-in',j*.1+'s');
        $(this).css('--delay-out',(count-j)*.1+'s');
    });
    $('.menu').toggleClass('closed');
    e.stopPropagation();
});

// run animation once at beginning for demo
setTimeout(function(){
    $('.menu footer button').click();
    setTimeout(function(){
        $('.menu footer button').click();
    }, (count * 100) + 500 );
}, 1000);
const blogPosts = [
    {
      title: "Understanding Recursion",
      date: "2025-04-14",
      content: "Recursion is a method of solving problems where the solution depends on smaller instances of the same problem.",
      tags: ["Recursion", "Algorithms"],
      category: "recursion",
      codes: [
        { lang: "python", label: "Python Implementation", code: `def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)` },
        { lang: "cpp", label: "C++ Implementation", code: `int factorial(int n) {\n    return (n == 0) ? 1 : n * factorial(n - 1);\n}` }
      ],
      extra: "This technique is useful in problems like traversals, backtracking, and divide-and-conquer strategies."
    },

    {
      title: "Graph Traversal: BFS vs DFS",
      date: "2025-04-15",
      content: "BFS uses a queue, DFS uses a stack or recursion. Choose based on the problem constraints and needs.",
      tags: ["Graph", "BFS", "DFS"],
      category: "graph",
      codes: [
        { lang: "cpp", label: "C++ BFS Example", code: `void bfs(int start) {\n  queue<int> q;\n  q.push(start);\n  while (!q.empty()) {\n    int node = q.front(); q.pop();\n    for (int neighbor : graph[node]) {\n      if (!visited[neighbor]) {\n        visited[neighbor] = true;\n        q.push(neighbor);\n      }\n    }\n  }\n}` }
      ],
      extra: "DFS is better for path-checking, while BFS is optimal for shortest path in unweighted graphs."
    }
  ];

  function renderPosts() {
    const container = document.getElementById("blogPosts");
    container.innerHTML = '';
    blogPosts.forEach(post => {
      const div = document.createElement("div");
      div.className = "blog-post";
      div.dataset.category = post.category;
      div.innerHTML = `
        <h2>${post.title}</h2>
        <div class="date">Posted on: ${post.date}</div>
        <p>${post.content}</p>
        <div class="tags">
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
        ${post.codes.map(code => `
          <h3>${code.label}</h3>
          <div class="code-container">
            <button class="copy-button" onclick="copyCode(this)">Copy</button>
            <pre><code class="language-${code.lang}">${code.code}</code></pre>
          </div>
        `).join("")}
        <button class="expand-btn" onclick="toggleExpand(this)">Expand More</button>
        <div class="expandable"><p>${post.extra}</p></div>
      `;
      container.appendChild(div);
    });
    Prism.highlightAll();
  }

  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".sidebar").classList.toggle("dark-mode");
  }

  function toggleExpand(btn) {
    const expandable = btn.nextElementSibling;
    if (expandable.style.display === "block") {
      expandable.style.display = "none";
      btn.innerText = "Expand More";
    } else {
      expandable.style.display = "block";
      btn.innerText = "Collapse";
    }
  }

  function filterCategory(cat) {
    document.querySelectorAll('.blog-post').forEach(post => {
      post.style.display = post.dataset.category === cat ? "block" : "none";
    });
  }

  function copyCode(button) {
    const code = button.nextElementSibling.innerText;
    navigator.clipboard.writeText(code).then(() => {
      button.innerText = "Copied!";
      setTimeout(() => (button.innerText = "Copy"), 1500);
    });
  }

  function searchPosts() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const posts = document.querySelectorAll('.blog-post');

    posts.forEach(post => {
      let textContent = post.textContent.toLowerCase();
      post.style.display = textContent.includes(query) || query.length < 2 ? "block" : "none";

      post.querySelectorAll("p, h2, h3, code").forEach(el => {
        el.innerHTML = el.textContent.replace(new RegExp(query, "gi"), match => {
          return query.length >= 2 ? `<span class="highlight">${match}</span>` : match;
        });
      });
    });
  }

  function clearSearch() {
    const input = document.getElementById('searchInput');
    input.value = '';
    searchPosts();
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
  }

  // Initial render
  renderPosts();