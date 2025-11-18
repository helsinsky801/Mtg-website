function initializeScrollAndHoverEffects() {
    // Kunci CSS untuk Animasi Scroll (Fade-in & Slide-up)
    const scrollStyles = `
        /* Gaya awal: Tersembunyi dan sedikit di bawah */
        .scroll-reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 1s ease-out, transform 0.8s ease-out;
        }

        /* Gaya aktif: Terlihat dan kembali ke posisi normal */
        .scroll-reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    // Kunci CSS untuk Animasi Hover (Pulse)
    const hoverStyles = `
        /* Menggunakan filter untuk efek glow ringan */
        .hover-pulse {
            transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .hover-pulse:hover {
            transform: scale(1.02);
            box-shadow: 0 0 15px rgba(0, 153, 255, 0.7); /* Biru MTG Glow */
        }
    `;

    // Suntikkan Gaya ke Head
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = scrollStyles + hoverStyles;
    document.head.appendChild(styleSheet);


    // --- Animasi 1: Fade-in/Slide-up on Scroll ---

    // Dapatkan semua DIV yang ingin dianimasikan saat scroll (misal: semua div konten utama)
    // Di sini kita targetkan div yang memiliki padding besar di file CSS Anda
    const scrollTargetSelectors = [
        '.kontolodon', 
        '.lapobango', 
        '.pepek-tebelah', 
        '.biji-onta', 
        '.kontol-onta', 
        '.kimaylee',
        '.biji-lepe',
        '.kontol-bapak-kudeng',
        '.baca'
    ];
    
    // Kumpulkan semua elemen target
    let scrollTargets = [];
    scrollTargetSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('scroll-reveal'); // Tambahkan kelas dasar
            scrollTargets.push(el);
        });
    });

    // Fungsi untuk memeriksa posisi scroll
    const checkVisibility = () => {
        const windowHeight = window.innerHeight;

        scrollTargets.forEach(el => {
            // Posisi di mana elemen mulai muncul dari bawah
            const elementTop = el.getBoundingClientRect().top;

            // Jika elemen berada di atas 80% dari ketinggian jendela (muncul di viewport)
            if (elementTop < windowHeight * 0.85) {
                el.classList.add('visible');
            } else {
                // Opsional: Hilangkan saat discroll ke atas lagi (untuk animasi berulang)
                // el.classList.remove('visible'); 
            }
        });
    };

    // Tambahkan event listener untuk scroll
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility); // Panggil saat halaman dimuat

    // --- Animasi 2: Pulse on Hover ---

    // Dapatkan semua DIV yang ingin dianimasikan saat hover (misal: semua kotak biru kecil)
    const hoverTargetSelectors = [
        '.biji-peler', 
        '.peler', 
        '.biji', 
        '.lodon',
        '.kontol', 
        '.pepek', 
        '.kontol-basah', 
        '.biji-kuda', 
        '.biji-leper',
        '.kontol-patah',
        '.bahlil-pukimai',
        '.bahlil-anjing',
        '.bahlil-hitam',
        '.wenzz',
        '.analisis',
        '.konsul',
        '.Aturan',
        '.kontol-crot',
        '.bahlil-black',
        '.lodon-gp',
        '.kileng'
    ];
    
    // Tambahkan kelas hover ke semua target
    hoverTargetSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('hover-pulse');
        });
    });
}

// Panggil fungsi inisialisasi
initializeScrollAndHoverEffects();