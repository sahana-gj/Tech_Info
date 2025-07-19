// Simple blog loader for posts/sample-post.md

const posts = [
  {
    title: "Sample Post",
    file: "posts/sample-post.md"
  }
];

function loadHome() {
  const postsList = document.getElementById('posts-list');
  postsList.innerHTML = '';
  posts.forEach(post => {
    const preview = document.createElement('div');
    preview.className = 'post-preview';
    preview.innerHTML = `
      <div class="post-title" data-file="${post.file}">${post.title}</div>
      <div class="post-content">Click to read more...</div>
    `;
    postsList.appendChild(preview);
  });
  document.querySelector('main h1').textContent = "Welcome to My Blog";
}

function loadPost(file, title) {
  fetch(file)
    .then(res => res.text())
    .then(md => {
      // Simple markdown to HTML (only paragraphs and headings)
      let html = md
        .replace(/^# (.*$)/gim, '<h2>$1</h2>')
        .replace(/^## (.*$)/gim, '<h3>$1</h3>')
        .replace(/^### (.*$)/gim, '<h4>$1</h4>')
        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
        .replace(/\*(.*)\*/gim, '<i>$1</i>')
        .replace(/\n$/gim, '<br />');
      document.getElementById('posts-list').innerHTML = `<div>${html}</div>`;
      document.querySelector('main h1').textContent = title;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadHome();

  document.getElementById('posts-list').addEventListener('click', e => {
    if (e.target.classList.contains('post-title')) {
      const file = e.target.getAttribute('data-file');
      const title = e.target.textContent;
      loadPost(file, title);
    }
  });

  document.getElementById('home-tab').addEventListener('click', e => {
    e.preventDefault();
    loadHome();
  });

  document.getElementById('about-tab').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('main h1').textContent = "About";
    document.getElementById('posts-list').innerHTML = `<div>This is a simple blog website built with HTML, CSS, and JavaScript.</div>`;
  });

  document.getElementById('contact-tab').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('main h1').textContent = "Contact";
    document.getElementById('posts-list').innerHTML = `<div>Email: youremail@example.com</div>`;
  });
});