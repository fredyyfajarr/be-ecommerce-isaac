<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dasbor Interaktif | Backend E-commerce Isaac</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Chosen Palette: Soft Code -->
    <!-- Application Structure Plan: The application is structured as a single-page dashboard with a fixed sidebar for navigation and a main content area that dynamically updates. This structure was chosen over a linear document to allow developers to quickly access specific information (like API endpoints or installation steps) without scrolling through irrelevant sections. The user flow is non-linear, promoting exploration. Key interactions include tab-based content switching, an interactive chart for the tech stack, and collapsible sections for API endpoints, making dense technical information digestible and easy to navigate. -->
    <!-- Visualization & Content Choices: 
        - Project Overview: Inform -> Simple Text -> No interaction -> Standard way to introduce a project.
        - Features: Organize/Inform -> Icon-based Cards (HTML/Tailwind) -> Hover effects -> Visually more engaging than a bullet list.
        - Tech Stack: Compare/Inform -> Horizontal Bar Chart -> Tooltips on hover -> Chart.js/Canvas -> Visually groups technologies by function, offering a better overview than a flat list.
        - Installation: Organize (Process) -> Numbered steps with code blocks -> Copy-to-clipboard button -> HTML/JS -> Improves usability for developers by making code snippets easy to grab.
        - Project Structure: Organize (Hierarchy) -> Styled list mimicking a file tree -> Hover effects -> HTML/CSS with Unicode icons -> A direct and universally understood way to represent file structure.
        - API Endpoints: Organize/Inform -> Accordion UI -> Click to expand/collapse -> HTML/JS -> Manages information density, allowing users to focus on one API resource at a time.
    -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #FDFBF8;
            color: #4A4A4A;
        }
        .code-block {
            background-color: #2D3748;
            color: #E2E8F0;
            border-radius: 0.5rem;
            padding: 1rem;
            position: relative;
            font-family: 'Courier New', Courier, monospace;
            white-space: pre-wrap;
            word-break: break-all;
        }
        .copy-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background-color: #4A5568;
            color: #E2E8F0;
            border: none;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            cursor: pointer;
            font-size: 0.75rem;
            transition: background-color 0.2s;
        }
        .copy-btn:hover {
            background-color: #718096;
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            height: 400px;
            max-height: 50vh;
        }
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #F1F5F9;
        }
        ::-webkit-scrollbar-thumb {
            background: #CBD5E1;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94A3B8;
        }
    </style>
</head>
<body class="antialiased">

    <div class="flex min-h-screen">
        <aside class="w-64 bg-slate-100 text-slate-800 p-6 fixed h-full hidden md:block shadow-lg">
            <h1 class="text-2xl font-bold text-slate-900 mb-8">Proyek Isaac</h1>
            <nav id="desktop-nav" class="space-y-2">
                <a href="#" data-target="welcome" class="nav-link bg-sky-100 text-sky-800 flex items-center px-4 py-2 rounded-lg font-semibold">
                    <span class="mr-3">👋</span> Selamat Datang
                </a>
                <a href="#" data-target="features" class="nav-link hover:bg-slate-200 flex items-center px-4 py-2 rounded-lg font-medium">
                    <span class="mr-3">✨</span> Fitur Utama
                </a>
                <a href="#" data-target="tech" class="nav-link hover:bg-slate-200 flex items-center px-4 py-2 rounded-lg font-medium">
                    <span class="mr-3">🛠️</span> Teknologi
                </a>
                <a href="#" data-target="install" class="nav-link hover:bg-slate-200 flex items-center px-4 py-2 rounded-lg font-medium">
                    <span class="mr-3">🚀</span> Instalasi & Setup
                </a>
                 <a href="#" data-target="structure" class="nav-link hover:bg-slate-200 flex items-center px-4 py-2 rounded-lg font-medium">
                    <span class="mr-3">📁</span> Struktur Proyek
                </a>
                <a href="#" data-target="api" class="nav-link hover:bg-slate-200 flex items-center px-4 py-2 rounded-lg font-medium">
                    <span class="mr-3">📖</span> API Endpoints
                </a>
                <a href="#" data-target="contribution" class="nav-link hover:bg-slate-200 flex items-center px-4 py-2 rounded-lg font-medium">
                    <span class="mr-3">🤝</span> Kontribusi & Lisensi
                </a>
            </nav>
        </aside>

        <main class="flex-1 md:ml-64 p-6 md:p-10">
            <div class="md:hidden mb-6">
                <select id="mobile-nav" class="w-full p-3 border rounded-lg bg-white shadow">
                    <option value="welcome">Selamat Datang</option>
                    <option value="features">Fitur Utama</option>
                    <option value="tech">Teknologi</option>
                    <option value="install">Instalasi & Setup</option>
                    <option value="structure">Struktur Proyek</option>
                    <option value="api">API Endpoints</option>
                    <option value="contribution">Kontribusi & Lisensi</option>
                </select>
            </div>

            <section id="welcome" class="content-section">
                <div class="bg-white p-8 rounded-xl shadow-md">
                    <h2 class="text-3xl font-bold text-slate-900 mb-4">Backend E-commerce Isaac</h2>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">Node.js 18.x</span>
                        <span class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">Express.js 4.x</span>
                        <span class="bg-emerald-100 text-emerald-800 text-sm font-medium px-2.5 py-0.5 rounded">MongoDB</span>
                        <span class="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded">MIT License</span>
                    </div>
                    <p class="text-lg leading-relaxed text-slate-600">
                        Selamat datang di dokumentasi interaktif untuk **Backend E-commerce Isaac**. Ini adalah layanan backend yang dibangun untuk mendukung aplikasi e-commerce modern. Proyek ini menyediakan serangkaian API RESTful untuk mengelola pengguna, produk, kategori, keranjang belanja, dan proses pemesanan. Dibangun dengan tumpukan teknologi yang kuat dan modern, backend ini dirancang agar dapat diskalakan dan mudah dikelola. Gunakan navigasi untuk menjelajahi berbagai aspek proyek ini.
                    </p>
                </div>
            </section>

            <section id="features" class="content-section hidden">
                 <h2 class="text-3xl font-bold text-slate-900 mb-6">Fitur Utama</h2>
                 <p class="text-lg text-slate-600 mb-8">Aplikasi ini dilengkapi dengan serangkaian fitur inti yang komprehensif untuk mendukung fungsionalitas e-commerce sepenuhnya, mulai dari manajemen pengguna hingga pemrosesan pesanan.</p>
                 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <h3 class="font-bold text-lg text-slate-800 mb-2">🔐 Autentikasi & Pengguna</h3>
                        <p class="text-slate-600">Sistem registrasi, login, dan manajemen profil pengguna yang aman menggunakan JSON Web Tokens (JWT).</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <h3 class="font-bold text-lg text-slate-800 mb-2">📦 Manajemen Produk</h3>
                        <p class="text-slate-600">Operasi CRUD (Create, Read, Update, Delete) penuh untuk produk, memungkinkan pengelolaan inventaris yang mudah.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <h3 class="font-bold text-lg text-slate-800 mb-2">🏷️ Manajemen Kategori</h3>
                        <p class="text-slate-600">Kemampuan untuk mengelompokkan produk berdasarkan kategori untuk navigasi dan penemuan yang lebih baik.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <h3 class="font-bold text-lg text-slate-800 mb-2">🛒 Sistem Keranjang</h3>
                        <p class="text-slate-600">Fungsionalitas untuk menambah, melihat, dan memodifikasi item dalam keranjang belanja pengguna.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <h3 class="font-bold text-lg text-slate-800 mb-2">🧾 Manajemen Pesanan</h3>
                        <p class="text-slate-600">Alur kerja untuk membuat pesanan dari keranjang dan melihat riwayat pesanan untuk setiap pengguna.</p>
                    </div>
                     <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <h3 class="font-bold text-lg text-slate-800 mb-2">🖼️ Upload Gambar</h3>
                        <p class="text-slate-600">Integrasi mulus dengan Cloudinary untuk menangani unggahan dan penyimpanan gambar produk.</p>
                    </div>
                 </div>
            </section>
            
            <section id="tech" class="content-section hidden">
                <h2 class="text-3xl font-bold text-slate-900 mb-6">Tumpukan Teknologi</h2>
                <p class="text-lg text-slate-600 mb-8">Proyek ini dibangun di atas fondasi teknologi JavaScript modern yang andal dan populer. Visualisasi di bawah ini memetakan komponen utama dari tumpukan teknologi kami berdasarkan perannya dalam aplikasi.</p>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="chart-container">
                        <canvas id="techChart"></canvas>
                    </div>
                </div>
            </section>

            <section id="install" class="content-section hidden">
                <h2 class="text-3xl font-bold text-slate-900 mb-6">Instalasi dan Menjalankan Proyek</h2>
                <p class="text-lg text-slate-600 mb-8">Ikuti langkah-langkah ini untuk menyiapkan dan menjalankan proyek di lingkungan pengembangan lokal Anda. Pastikan semua prasyarat terpenuhi sebelum memulai.</p>
                
                <div class="space-y-6">
                    <div>
                        <h3 class="text-xl font-semibold mb-2"><span class="bg-slate-200 text-slate-800 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">1</span> Prasyarat</h3>
                        <ul class="list-disc list-inside text-slate-600 bg-white p-4 rounded-lg shadow-sm">
                            <li>Node.js (v18.x atau lebih baru)</li>
                            <li>npm / yarn</li>
                            <li>Server MongoDB yang sedang berjalan</li>
                            <li>Akun Cloudinary</li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold mb-2"><span class="bg-slate-200 text-slate-800 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">2</span> Instalasi</h3>
                        <p class="text-slate-600 mb-2">Clone repositori dan install dependencies.</p>
                        <div class="code-block">
                            <button class="copy-btn">Salin</button>
                            <code>git clone https://github.com/fredyyfajarr/be-ecommerce-isaac.git
cd be-ecommerce-isaac
npm install</code>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold mb-2"><span class="bg-slate-200 text-slate-800 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">3</span> Konfigurasi Environment</h3>
                        <p class="text-slate-600 mb-2">Salin file `.env.example` ke `.env` dan isi dengan kredensial Anda.</p>
                        <div class="code-block">
                            <button class="copy-btn">Salin</button>
                            <code>cp .env.example .env</code>
                        </div>
                        <div class="code-block mt-2">
                            <button class="copy-btn">Salin</button>
                            <code>PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce-isaac
JWT_SECRET=rahasia-jwt-anda
CLOUDINARY_CLOUD_NAME=nama-cloud-cloudinary-anda
CLOUDINARY_API_KEY=api-key-cloudinary-anda
CLOUDINARY_API_SECRET=api-secret-cloudinary-anda
FRONTEND_URL=http://localhost:3000</code>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold mb-2"><span class="bg-slate-200 text-slate-800 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">4</span> Menjalankan Aplikasi</h3>
                        <p class="text-slate-600 mb-2">Jalankan server dalam mode pengembangan (dengan auto-reload).</p>
                        <div class="code-block">
                            <button class="copy-btn">Salin</button>
                            <code>npm run dev</code>
                        </div>
                    </div>
                </div>
            </section>

            <section id="structure" class="content-section hidden">
                <h2 class="text-3xl font-bold text-slate-900 mb-6">Struktur Proyek</h2>
                <p class="text-lg text-slate-600 mb-8">Struktur direktori proyek dirancang agar modular dan mudah dipahami, memisahkan setiap concern ke dalam folder masing-masing untuk keterbacaan dan pemeliharaan yang lebih baik.</p>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="code-block">
                        <code>.
├── src
│   ├── 📁 config       <span class="text-gray-400"># Konfigurasi (database, dll.)</span>
│   ├── 📁 controllers  <span class="text-gray-400"># Logika bisnis untuk setiap route</span>
│   ├── 📁 middleware   <span class="text-gray-400"># Middleware kustom (auth, error handler)</span>
│   ├── 📁 models       <span class="text-gray-400"># Skema database Mongoose</span>
│   ├── 📁 routes       <span class="text-gray-400"># Definisi endpoint API</span>
│   └── 📁 utils        <span class="text-gray-400"># Fungsi bantuan (helper functions)</span>
├── 📄 .env.example     <span class="text-gray-400"># Contoh file environment</span>
├── 📄 index.js         <span class="text-gray-400"># Entry point aplikasi</span>
└── 📄 package.json     <span class="text-gray-400"># Daftar dependency dan skrip</span></code>
                    </div>
                </div>
            </section>

            <section id="api" class="content-section hidden">
                <h2 class="text-3xl font-bold text-slate-900 mb-6">API Endpoints</h2>
                <p class="text-lg text-slate-600 mb-8">Jelajahi endpoint API yang tersedia. Semua endpoint memiliki prefix `/api/v1`. Klik pada setiap grup untuk melihat detailnya.</p>
                <div class="space-y-4" id="api-accordion">
                    <!-- Accordion items will be generated by JS -->
                </div>
            </section>

            <section id="contribution" class="content-section hidden">
                <h2 class="text-3xl font-bold text-slate-900 mb-6">Kontribusi & Lisensi</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-3">🤝 Berkontribusi</h3>
                        <p class="text-slate-600 mb-4">Kontribusi selalu diterima! Jika Anda ingin berkontribusi, silakan ikuti langkah-langkah berikut:</p>
                        <ol class="list-decimal list-inside space-y-2 text-slate-600">
                            <li>Fork repositori ini.</li>
                            <li>Buat branch fitur baru (`git checkout -b fitur/NamaFitur`).</li>
                            <li>Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`).</li>
                            <li>Push ke branch tersebut (`git push origin fitur/NamaFitur`).</li>
                            <li>Buka Pull Request.</li>
                        </ol>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-3">📄 Lisensi</h3>
                        <p class="text-slate-600">Proyek ini dilisensikan di bawah **Lisensi MIT**. Ini berarti Anda bebas menggunakan, memodifikasi, dan mendistribusikan kode ini, baik untuk proyek komersial maupun non-komersial, selama Anda menyertakan pemberitahuan hak cipta dan lisensi asli.</p>
                    </div>
                </div>
            </section>

        </main>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-link');
            const mobileNav = document.getElementById('mobile-nav');
            const contentSections = document.querySelectorAll('.content-section');

            const apiData = [
                {
                    group: '🔐 Autentikasi (/auth)',
                    endpoints: [
                        { method: 'POST', path: '/auth/register', desc: 'Mendaftarkan pengguna baru.' },
                        { method: 'POST', path: '/auth/login', desc: 'Login pengguna dan mendapatkan token JWT.' },
                        { method: 'POST', path: '/auth/logout', desc: 'Logout pengguna.' },
                        { method: 'GET', path: '/auth/me', desc: 'Mendapatkan detail pengguna yang sedang login.' }
                    ]
                },
                {
                    group: '👤 Pengguna (/users)',
                    endpoints: [
                        { method: 'GET', path: '/users', desc: 'Mendapatkan semua pengguna (memerlukan hak akses admin).' },
                        { method: 'GET', path: '/users/:id', desc: 'Mendapatkan detail pengguna berdasarkan ID.' }
                    ]
                },
                {
                    group: '📦 Produk (/products)',
                    endpoints: [
                        { method: 'GET', path: '/products', desc: 'Mendapatkan semua produk dengan filter dan paginasi.' },
                        { method: 'GET', path: '/products/:id', desc: 'Mendapatkan detail produk berdasarkan ID.' },
                        { method: 'POST', path: '/products', desc: 'Menambahkan produk baru (memerlukan hak akses admin).' },
                        { method: 'PUT', path: '/products/:id', desc: 'Memperbarui produk berdasarkan ID (memerlukan hak akses admin).' },
                        { method: 'DELETE', path: '/products/:id', desc: 'Menghapus produk berdasarkan ID (memerlukan hak akses admin).' }
                    ]
                },
                {
                    group: '🏷️ Kategori (/categories)',
                    endpoints: [
                        { method: 'GET', path: '/categories', desc: 'Mendapatkan semua kategori.' },
                        { method: 'POST', path: '/categories', desc: 'Menambahkan kategori baru (memerlukan hak akses admin).' }
                    ]
                },
                {
                    group: '🛒 Keranjang (/carts)',
                    endpoints: [
                        { method: 'GET', path: '/carts', desc: 'Mendapatkan isi keranjang pengguna yang sedang login.' },
                        { method: 'POST', path: '/carts', desc: 'Menambahkan item ke dalam keranjang.' }
                    ]
                },
                {
                    group: '🧾 Pesanan (/orders)',
                    endpoints: [
                        { method: 'GET', path: '/orders', desc: 'Mendapatkan riwayat pesanan pengguna yang sedang login.' },
                        { method: 'POST', path: '/orders', desc: 'Membuat pesanan baru dari item di keranjang.' }
                    ]
                }
            ];
            
            const methodColors = {
                'GET': 'bg-sky-100 text-sky-800',
                'POST': 'bg-green-100 text-green-800',
                'PUT': 'bg-amber-100 text-amber-800',
                'DELETE': 'bg-red-100 text-red-800'
            };

            function generateApiAccordion() {
                const accordionContainer = document.getElementById('api-accordion');
                let html = '';
                apiData.forEach((item, index) => {
                    html += `
                        <div class="border border-slate-200 rounded-lg bg-white">
                            <button class="accordion-header w-full flex justify-between items-center p-4 text-left font-semibold text-slate-800 hover:bg-slate-50">
                                <span>${item.group}</span>
                                <span class="accordion-icon transition-transform transform">▼</span>
                            </button>
                            <div class="accordion-content hidden p-4 border-t border-slate-200">
                                <div class="space-y-3">
                    `;
                    item.endpoints.forEach(endpoint => {
                        html += `
                                    <div class="flex items-center">
                                        <span class="font-mono text-sm font-bold w-20 text-center rounded px-2 py-0.5 ${methodColors[endpoint.method]}">${endpoint.method}</span>
                                        <span class="font-mono text-sm text-slate-700 ml-4">${endpoint.path}</span>
                                        <span class="text-sm text-slate-500 ml-auto text-right">${endpoint.desc}</span>
                                    </div>
                        `;
                    });
                    html += `
                                </div>
                            </div>
                        </div>
                    `;
                });
                accordionContainer.innerHTML = html;
            }

            function setupAccordionListeners() {
                const accordionHeaders = document.querySelectorAll('.accordion-header');
                accordionHeaders.forEach(header => {
                    header.addEventListener('click', () => {
                        const content = header.nextElementSibling;
                        const icon = header.querySelector('.accordion-icon');
                        content.classList.toggle('hidden');
                        icon.classList.toggle('rotate-180');
                    });
                });
            }

            function switchContent(targetId) {
                contentSections.forEach(section => {
                    section.classList.add('hidden');
                });
                const activeSection = document.getElementById(targetId);
                if (activeSection) {
                    activeSection.classList.remove('hidden');
                }

                navLinks.forEach(link => {
                    if (link.dataset.target === targetId) {
                        link.classList.add('bg-sky-100', 'text-sky-800', 'font-semibold');
                        link.classList.remove('hover:bg-slate-200', 'font-medium');
                    } else {
                        link.classList.remove('bg-sky-100', 'text-sky-800', 'font-semibold');
                        link.classList.add('hover:bg-slate-200', 'font-medium');
                    }
                });

                mobileNav.value = targetId;
            }

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.dataset.target;
                    switchContent(targetId);
                });
            });

            mobileNav.addEventListener('change', (e) => {
                switchContent(e.target.value);
            });

            function renderTechChart() {
                const ctx = document.getElementById('techChart').getContext('2d');
                if (window.techChart instanceof Chart) {
                    window.techChart.destroy();
                }
                window.techChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Runtime', 'Framework', 'Database', 'Autentikasi', 'Validasi', 'Upload File'],
                        datasets: [{
                            label: 'Teknologi yang Digunakan',
                            data: [1, 1, 1, 2, 1, 2],
                            backgroundColor: [
                                'rgba(56, 189, 248, 0.6)',
                                'rgba(16, 185, 129, 0.6)',
                                'rgba(132, 204, 22, 0.6)',
                                'rgba(249, 115, 22, 0.6)',
                                'rgba(99, 102, 241, 0.6)',
                                'rgba(217, 70, 239, 0.6)'
                            ],
                            borderColor: [
                                'rgba(56, 189, 248, 1)',
                                'rgba(16, 185, 129, 1)',
                                'rgba(132, 204, 22, 1)',
                                'rgba(249, 115, 22, 1)',
                                'rgba(99, 102, 241, 1)',
                                'rgba(217, 70, 239, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const techMap = {
                                            'Runtime': 'Node.js',
                                            'Framework': 'Express.js',
                                            'Database': 'MongoDB, Mongoose',
                                            'Autentikasi': 'JWT, Bcrypt',
                                            'Validasi': 'Joi',
                                            'Upload File': 'Multer, Cloudinary'
                                        };
                                        return techMap[context.label] || '';
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                display: false,
                            },
                            y: {
                                ticks: {
                                    font: {
                                        size: 14,
                                        weight: '500'
                                    }
                                }
                            }
                        }
                    }
                });
            }
            
            const copyButtons = document.querySelectorAll('.copy-btn');
            copyButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const codeBlock = button.nextElementSibling;
                    const codeToCopy = codeBlock.innerText;
                    
                    const tempTextArea = document.createElement('textarea');
                    tempTextArea.value = codeToCopy;
                    document.body.appendChild(tempTextArea);
                    tempTextArea.select();
                    try {
                        document.execCommand('copy');
                        button.innerText = 'Disalin!';
                        setTimeout(() => {
                            button.innerText = 'Salin';
                        }, 2000);
                    } catch (err) {
                        console.error('Gagal menyalin teks: ', err);
                    }
                    document.body.removeChild(tempTextArea);
                });
            });

            renderTechChart();
            generateApiAccordion();
            setupAccordionListeners();
        });
    </script>
</body>
</html>
