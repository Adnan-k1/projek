document.querySelector('.playlist-toggle').addEventListener('click', function () {
    const playlistMenu = document.querySelector('.playlist-menu');
    this.classList.toggle('active');
    playlistMenu.style.display = playlistMenu.style.display === 'block' ? 'none' : 'block';
});
