document.addEventListener('DOMContentLoaded', () => {
    const bookmarkForm = document.getElementById('bookmark-form');
    const bookmarkNameInput = document.getElementById('bookmark-name');
    const bookmarkUrlInput = document.getElementById('bookmark-url');
    const messageDiv = document.getElementById('message');
    const bookmarkList = document.getElementById('bookmark-list');
    function loadBookmarks() {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarkList.innerHTML = '';
        bookmarks.forEach((bookmark, index) => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = bookmark.url;
            link.target = "_blank"; // 新しいタブで開く
            link.textContent = bookmark.name;
            const textSpan = document.createElement('span');
            textSpan.classList.add('bookmark-text');
            textSpan.appendChild(link);
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '削除';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => deleteBookmark(index));
            li.appendChild(textSpan);
            li.appendChild(deleteBtn);
            bookmarkList.appendChild(li);
        });
    }
    function addBookmark(name, url) {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        if (bookmarks.some(bookmark => bookmark.url === url)) {
            messageDiv.textContent = `既に保存されているブックマークです: ${name} - ${url}`;
            return;
        }
        bookmarks.push({ name, url });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        loadBookmarks();
    }
    function deleteBookmark(index) {
        if (confirm('このブックマークを削除しますか？')) {
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
            bookmarks.splice(index, 1);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            loadBookmarks();
        }
    }
    bookmarkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = bookmarkNameInput.value.trim();
        const url = bookmarkUrlInput.value.trim();
        messageDiv.textContent = '';
        if (name && url) {
            addBookmark(name, url);
            bookmarkNameInput.value = '';
            bookmarkUrlInput.value = '';
        }
    });
    loadBookmarks();
});