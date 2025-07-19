document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts');

    fetch('./posts/sample-post.md')
        .then(response => response.text())
        .then(data => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = marked(data);
            postsContainer.appendChild(postElement);
        })
        .catch(error => {
            console.error('Error loading the post:', error);
        });
});