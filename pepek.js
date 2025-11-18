// Dapatkan tombol toggle dan daftar navigasi
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.getElementById('nav-list');

// Tambahkan event listener untuk mengaktifkan/menonaktifkan menu saat tombol diklik
menuToggle.addEventListener('click', function() {
    // Menambahkan atau menghapus class 'active' pada ul
    navList.classList.toggle('active');
});