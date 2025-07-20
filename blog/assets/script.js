async function loadYAML() {
  const res = await fetch('docs.yml');
  const yamlText = await res.text();
  const data = jsyaml.load(yamlText);
  const categoryList = document.getElementById('categoryList');

  data.forEach(category => {
    const catTitle = document.createElement('h3');
    catTitle.textContent = category.category;
    categoryList.appendChild(catTitle);

    category.posts.forEach(post => {
      const li = document.createElement('li');
      li.textContent = post.title;
      li.onclick = () => loadMarkdown(post.file);
      categoryList.appendChild(li);
    });
  });
}
async function loadMarkdown(filePath) {
  const res = await fetch(filePath);
  const mdText = await res.text();
  document.getElementById('postContent').innerHTML = marked.parse(mdText);
}
loadYAML();