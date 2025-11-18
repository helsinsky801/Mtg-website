// Kunci untuk menyimpan status kunjungan di localStorage
const VISITED_KEY = 'mtg_first_visit_final';

function createForcedPreloader() {
    // Cek apakah pengguna sudah pernah mengunjungi sebelumnya
    const hasVisited = localStorage.getItem(VISITED_KEY);

    if (hasVisited === 'true') {
        return; 
    }

    // --- 1. Definisi CSS Dinamis ---
    
    const keyframes = `
        @keyframes logoPulse {
            0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(0, 140, 255, 0.4); }
            70% { transform: scale(1.0); box-shadow: 0 0 0 15px rgba(0, 140, 255, 0); }
            100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(0, 140, 255, 0); }
        }
        @keyframes fadeOut {
            to { opacity: 0; visibility: hidden; }
        }
    `;

    const style = `
        .preloader-mtg {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: #000000; /* Hitam dramatis */
            z-index: 99999;
            display: flex; justify-content: center; align-items: center;
            opacity: 1;
            animation: none !important; /* Nonaktifkan animasi awal untuk kontrol JS */
            transition: opacity 0.5s ease-out;
        }
        .logo-pulse-mtg {
            width: 80px; height: 80px;
            background-color: rgb(0, 140, 255);
            border-radius: 50%;
            display: flex; justify-content: center; align-items: center;
            font-family: sans-serif; font-size: 24px; font-weight: 900;
            color: white;
            animation: logoPulse 1.5s infinite ease-in-out;
        }
    `;

    // --- 2. Suntikkan Gaya dan Keyframes ke Head ---
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = keyframes + style;
    document.head.appendChild(styleSheet);

    // --- 3. Buat dan Susun Elemen DOM ---
    
    // a. Preloader Container
    const preloader = document.createElement('div');
    preloader.className = 'preloader-mtg';
    
    // b. Logo Animasi
    const logoContainer = document.createElement('div');
    logoContainer.className = 'logo-pulse-mtg';
    logoContainer.textContent = 'MTG'; 

    preloader.appendChild(logoContainer);
    
    // c. Tambahkan Preloader SEGERA ke Body
    document.body.appendChild(preloader);
    
    
    // --- 4. Logika Penghilangan ---
    // Gunakan window.onload untuk memastikan semua aset berat dimuat
    window.addEventListener('load', function() {
        // Berikan sedikit waktu tambahan agar animasi pulse sempat terlihat (mis. 500ms)
        setTimeout(() => {
            // Memicu transisi fade-out
            preloader.style.animation = 'fadeOut 0.7s ease-out forwards';
            
            // Set status kunjungan ke true
            localStorage.setItem(VISITED_KEY, 'true');

            // Hapus elemen dari DOM setelah animasi selesai
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                    // Hapus juga stylesheet untuk membersihkan DOM
                    styleSheet.parentNode.removeChild(styleSheet);
                }
            }, 700); 
        }, 500); // Tunda 0.5 detik
    });
}

// Panggil fungsi untuk memulai animasi SEGERA
createForcedPreloader();