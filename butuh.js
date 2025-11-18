// Kunci untuk menyimpan status kunjungan di localStorage
const VISITED_KEY = 'mtg_first_visit';

function createInitialLoadAnimation() {
    // Cek apakah pengguna sudah pernah mengunjungi sebelumnya dalam sesi ini
    const hasVisited = localStorage.getItem(VISITED_KEY);

    // Jika sudah pernah berkunjung, lewati animasi pembukaan penuh
    if (hasVisited === 'true') {
        // Jika sudah berkunjung, hanya lakukan animasi loading cepat (opsional)
        // Kita hanya akan memastikan konten dimuat tanpa preloader penuh.
        return; 
    }

    // 1. Suntikkan Keyframes CSS untuk animasi
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';

    const keyframes = `
        /* Animasi progress bar dari 0% ke 100% */
        @keyframes fillProgress {
            from { width: 0%; }
            to { width: 100%; }
        }

        /* Animasi penghilangan (wipe-up) */
        @keyframes wipeUp {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-100%); opacity: 0; }
        }
    `;
    styleSheet.innerHTML = keyframes;
    document.head.appendChild(styleSheet);

    // 2. Definisikan Gaya CSS In-Line untuk elemen
    
    // Gaya Preloader Utama (Overlay)
    const preloaderStyles = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(20, 20, 20); /* Latar belakang gelap, dramatis */
        z-index: 99999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out;
    `;
    
    // Gaya Progress Bar Container
    const progressContainerStyles = `
        width: 250px;
        height: 2px;
        background-color: rgba(255, 255, 255, 0.2);
        margin-top: 20px;
        overflow: hidden;
    `;
    
    // Gaya Progress Bar yang Bergerak
    const progressBarStyles = `
        height: 100%;
        background-color: rgb(0, 140, 255); /* Biru MTG */
        animation: fillProgress 2.5s ease-out forwards;
    `;
    
    // Gaya Teks Logo Awal
    const logoTextStyles = `
        color: white;
        font-family: sans-serif;
        font-size: 36px;
        font-weight: 900;
        letter-spacing: 5px;
        opacity: 0;
        animation: fadeIn 0.8s ease-out 0.5s forwards; /* Fade in setelah 0.5s */
    `;
    
    // Keyframe untuk Fade In Teks Logo
    const fadeInKeyframe = `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`;
    styleSheet.innerHTML += fadeInKeyframe;


    // 3. Buat dan Susun Elemen DOM
    
    const preloader = document.createElement('div');
    preloader.style.cssText = preloaderStyles;
    
    const logoText = document.createElement('span');
    logoText.textContent = 'MTG';
    logoText.style.cssText = logoTextStyles;
    
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = progressContainerStyles;
    
    const progressBar = document.createElement('div');
    progressBar.style.cssText = progressBarStyles;

    // 4. Gabungkan dan Tambahkan ke Body
    progressContainer.appendChild(progressBar);
    preloader.appendChild(logoText);
    preloader.appendChild(progressContainer);
    document.body.appendChild(preloader);
    
    
    // 5. Logika Penghilangan (Setelah semua dimuat dan progress bar selesai)
    window.addEventListener('load', function() {
        // Tentukan durasi total sebelum menghilangkan preloader
        // (Harus lebih lama dari animasi progress bar: 2.5s)
        const totalDelay = 3000; // 3.0 detik

        setTimeout(() => {
            // Set status kunjungan ke true
            localStorage.setItem(VISITED_KEY, 'true'); 
            
            // Memicu animasi wipe-up dan menghilangkan opacity
            preloader.style.animation = 'wipeUp 0.8s ease-in-out forwards';

            // Hapus elemen dari DOM setelah animasi wipe-up selesai (0.8 detik)
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 800); 
        }, totalDelay);
    });
}

// Panggil fungsi untuk memulai animasi
createInitialLoadAnimation();