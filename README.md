# Backend E-commerce Isaac

<p align="center">
  <img src="https://img.shields.io/badge/node.js-18.x-green.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/express.js-4.x-blue.svg" alt="Express.js">
  <img src="https://img.shields.io/badge/database-MongoDB-green.svg" alt="MongoDB">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
</p>

## 📝 Deskripsi Proyek

**Backend E-commerce Isaac** adalah layanan _backend_ yang dibangun untuk mendukung aplikasi e-commerce modern. Proyek ini menyediakan serangkaian API RESTful untuk mengelola pengguna, produk, kategori, keranjang belanja, dan proses pemesanan. Dibangun dengan Node.js dan Express.js, serta menggunakan MongoDB sebagai database, backend ini dirancang untuk menjadi scalable dan mudah dikelola.

## ✨ Fitur Utama

-   **Autentikasi & Manajemen Pengguna**: Registrasi, login, dan manajemen profil pengguna menggunakan JSON Web Tokens (JWT).
-   **Manajemen Produk**: Operasi CRUD (Create, Read, Update, Delete) untuk produk.
-   **Manajemen Kategori**: Pengelompokan produk berdasarkan kategori.
-   **Sistem Keranjang Belanja**: Fungsionalitas untuk menambah, melihat, dan mengubah item dalam keranjang.
-   **Manajemen Pesanan**: Proses untuk membuat dan melihat riwayat pesanan pengguna.
-   **Upload Gambar**: Integrasi dengan Cloudinary untuk menangani unggahan gambar produk.
-   **Validasi Input**: Validasi data yang masuk menggunakan Joi untuk memastikan integritas data.
-   **Middleware Kustom**: Termasuk middleware untuk otentikasi (JWT) dan penanganan error.

## 🛠️ Teknologi yang Digunakan

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB dengan Mongoose ODM
-   **Autentikasi**: JSON Web Token (JWT)
-   **Password Hashing**: Bcrypt
-   **Validasi**: Joi
-   **Upload File**: Multer & Cloudinary
-   **Environment Variables**: Dotenv
-   **Lainnya**: `cookie-parser`, `cors`, `nodemon`

## 🚀 Panduan Instalasi dan Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

### 1. Prasyarat

-   [Node.js](https://nodejs.org/) (disarankan versi 18.x atau lebih baru)
-   [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/)
-   [MongoDB](https://www.mongodb.com/try/download/community) (pastikan server MongoDB Anda berjalan)
-   Akun [Cloudinary](https://cloudinary.com/) untuk manajemen gambar.

### 2. Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/fredyyfajarr/be-ecommerce-isaac.git](https://github.com/fredyyfajarr/be-ecommerce-isaac.git)
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd be-ecommerce-isaac
    ```

3.  **Install semua dependency yang dibutuhkan:**
    ```bash
    npm install
    ```
    atau jika Anda menggunakan yarn:
    ```bash
    yarn install
    ```

4.  **Konfigurasi Environment Variables:**
    Buat file `.env` di root direktori proyek dengan menyalin dari `.env.example`.
    ```bash
    cp .env.example .env
    ```
    Kemudian, isi nilai variabel di dalam file `.env` sesuai dengan konfigurasi lokal Anda:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/ecommerce-isaac
    JWT_SECRET=rahasia-jwt-anda
    CLOUDINARY_CLOUD_NAME=nama-cloud-cloudinary-anda
    CLOUDINARY_API_KEY=api-key-cloudinary-anda
    CLOUDINARY_API_SECRET=api-secret-cloudinary-anda
    FRONTEND_URL=http://localhost:3000
    ```

### 3. Menjalankan Aplikasi

-   **Mode Pengembangan (Development)**
    Perintah ini akan menjalankan server dengan `nodemon`, yang akan otomatis me-restart server setiap kali ada perubahan pada kode.
    ```bash
    npm run dev
    ```

-   **Mode Produksi (Production)**
    Perintah ini akan menjalankan server secara normal menggunakan `node`.
    ```bash
    npm start
    ```

Server akan berjalan pada port yang Anda tentukan di file `.env` (contoh: `http://localhost:5000`).

## 📖 API Endpoints

Berikut adalah daftar endpoint API utama yang tersedia. Prefix untuk semua endpoint adalah `/api/v1`.

### 🔐 Autentikasi (`/auth`)

-   `POST /auth/register`: Mendaftarkan pengguna baru.
-   `POST /auth/login`: Login pengguna dan mendapatkan token JWT.
-   `POST /auth/logout`: Logout pengguna.
-   `GET /auth/me`: Mendapatkan detail pengguna yang sedang login.

### 👤 Pengguna (`/users`)

-   `GET /users`: Mendapatkan semua pengguna (memerlukan hak akses admin).
-   `GET /users/:id`: Mendapatkan detail pengguna berdasarkan ID.

### 📦 Produk (`/products`)

-   `GET /products`: Mendapatkan semua produk dengan filter dan paginasi.
-   `GET /products/:id`: Mendapatkan detail produk berdasarkan ID.
-   `POST /products`: Menambahkan produk baru (memerlukan hak akses admin).
-   `PUT /products/:id`: Memperbarui produk berdasarkan ID (memerlukan hak akses admin).
-   `DELETE /products/:id`: Menghapus produk berdasarkan ID (memerlukan hak akses admin).

### 🏷️ Kategori (`/categories`)

-   `GET /categories`: Mendapatkan semua kategori.
-   `POST /categories`: Menambahkan kategori baru (memerlukan hak akses admin).

### 🛒 Keranjang (`/carts`)

-   `GET /carts`: Mendapatkan isi keranjang pengguna yang sedang login.
-   `POST /carts`: Menambahkan item ke dalam keranjang.

### 🧾 Pesanan (`/orders`)

-   `GET /orders`: Mendapatkan riwayat pesanan pengguna yang sedang login.
-   `POST /orders`: Membuat pesanan baru dari item di keranjang.

## 📁 Struktur Proyek

Struktur direktori proyek dirancang agar modular dan mudah dipahami, memisahkan setiap *concern* ke dalam folder masing-masing untuk keterbacaan dan pemeliharaan yang lebih baik.

```bash
be-ecommerce-isaac/
├── src/
│   ├── config/         # Konfigurasi (database, dll.)
│   ├── controllers/    # Logika bisnis untuk setiap route
│   ├── middleware/     # Middleware kustom (auth, error handler)
│   ├── models/         # Skema database Mongoose
│   ├── routes/         # Definisi endpoint API
│   └── utils/          # Fungsi bantuan (helper functions)
├── .env.example        # Contoh file environment
├── index.js            # Entry point aplikasi
└── package.json        # Daftar dependency dan skrip
```
## 🤝 Kontribusi

Kontribusi selalu diterima! Jika Anda ingin berkontribusi, silakan lakukan _fork_ pada repositori ini, buat _branch_ baru, dan ajukan _Pull Request_.

1.  Fork repositori ini.
2.  Buat branch fitur baru (`git checkout -b fitur/NamaFitur`).
3.  Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`).
4.  Push ke branch tersebut (`git push origin fitur/NamaFitur`).
5.  Buka Pull Request.

## 📄 Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).






