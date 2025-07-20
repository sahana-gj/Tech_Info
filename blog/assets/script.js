async function loadYAML() {
  const res = await fetch('docs.yml');
  const yamlText = await res.text();
  const data = jsyaml.load(yamlText);
  const categoryList = document.getElementById('categoryList');

  data.forEach(category => {
    const details = document.createElement('details');
    details.classList.add('category');

    const summary = document.createElement('summary');
    summary.textContent = category.category;
    details.appendChild(summary);

    const ul = document.createElement('ul');

    category.posts.forEach(post => {
      const li = document.createElement('li');
      li.textContent = post.title;
      li.onclick = () => loadMarkdown(post.file);
      ul.appendChild(li);
    });

    details.appendChild(ul);
    categoryList.appendChild(details);
  });
}