Website : https://gungdikaebs.cloud/

review ini berdasarkan Codex

Audit dan perbaiki UI portfolio ini agar terasa lebih personal, kreatif, matang, dan memorable tanpa menyerupai template “AI-generated developer portfolio”.

Kerjakan implementasinya langsung pada codebase. Sebelum mengubah kode, pelajari struktur project, framework, komponen, styling, data, serta seluruh animasi GSAP yang sudah ada. Pertahankan teknologi dan fungsi yang sudah berjalan.

Website ini memang ingin mengedepankan kreativitas. Jangan mengubahnya menjadi landing page minimalis yang statis atau membosankan. Target pengalaman saat pengguna pertama kali membuka website adalah: “nice, creative, polished, and memorable.”

Jangan mengerjakan atau mengganti foto profil karena bagian tersebut sengaja dikesampingkan.

## Tujuan utama

- Mengurangi kesan template dan AI slop tanpa menghilangkan kreativitas.
- Mempertahankan GSAP sebagai bagian utama dari identitas website.
- Membuat animasi terasa dirancang dengan sengaja dan memiliki arah.
- Menonjolkan project, kontribusi, dan kemampuan developer.
- Memperbaiki hierarki visual serta pengalaman mobile.
- Mempertahankan dark theme dengan aksen cyan.
- Menyeimbangkan creative developer portfolio dengan professional product portfolio.

## 1. Arah visual

Pertahankan identitas berikut:

- Dark background.
- Aksen cyan.
- Tipografi besar dan ekspresif.
- Grid atau visual teknis yang mendukung suasana.
- Motion dan interaksi berbasis GSAP.
- Nuansa modern, eksperimental, dan developer-oriented.

Perbaiki penggunaannya:

- Jangan menggunakan pola putih–cyan yang identik pada setiap heading.
- Gunakan cyan terutama untuk CTA utama, status, link aktif, nomor project, atau informasi penting.
- Variasikan komposisi setiap section tanpa kehilangan konsistensi sistem desain.
- Kurangi hanya dekorasi yang tidak memiliki hubungan dengan konten.
- Hindari penggunaan glow, watermark, garis, partikel, dan card secara bersamaan pada setiap section.
- Pertahankan visual yang memperkuat karakter dan first impression.

## 2. Motion dan GSAP

- Pertahankan GSAP sebagai bagian utama pengalaman website.
- Pertahankan hero entrance animation yang kuat.
- Gunakan sequencing, easing, timing, stagger, dan masking yang terkontrol.
- Gunakan scroll-triggered animation untuk membangun alur antar-section.
- Project section harus menjadi area motion paling ekspresif.
- Pertimbangkan image reveal, masked transition, parallax ringan, staggered information, pinned storytelling, atau perubahan komposisi saat scrolling.
- Pertahankan hover interaction pada project, navigation, CTA, dan link.
- Variasikan animasi berdasarkan fungsi section.
- Jangan menggunakan fade-up yang sama pada semua heading, card, label, dan paragraf.
- Setiap animasi harus mengarahkan perhatian, membantu hierarki, menjelaskan transisi, atau memperkuat karakter konten.
- Hindari delay terlalu panjang atau motion yang menghambat pengguna mencapai informasi.
- Jangan menganimasikan elemen kecil hanya karena elemen tersebut dapat dianimasikan.
- Buat sistem motion konsisten dengan beberapa nilai duration, easing, stagger, dan movement distance.
- Pastikan animasi menggunakan transform dan opacity jika memungkinkan agar performanya baik.
- Hindari layout shift, teks terpotong, horizontal overflow, atau konten yang tetap tersembunyi jika animasi gagal.
- Pada mobile, pertahankan pengalaman kreatif dengan jarak gerak dan kompleksitas yang lebih ringan.
- Tambahkan `prefers-reduced-motion` sebagai fallback aksesibilitas. Dalam mode ini, tampilkan konten secara langsung dan nonaktifkan animasi non-esensial.
- Jangan menghapus animasi yang sudah bekerja dengan baik hanya untuk membuat desain lebih minimalis.

## 3. Hero section

- Pertahankan positioning sebagai Full-Stack Developer.
- Buat headline lebih spesifik dan memiliki karakter, tetapi jangan mengubah fakta.
- Kurangi ukuran heading mobile sekitar 10–15%.
- Gunakan line-height yang rapat tetapi tetap nyaman dibaca.
- Pastikan headline tidak menyebabkan teks terpotong atau horizontal overflow.
- Pastikan value proposition, deskripsi, dan CTA terlihat lebih cepat.
- Hero boleh memenuhi sebagian besar viewport, tetapi tidak boleh menyembunyikan seluruh informasi penting.
- Pertahankan maksimal dua tombol utama: “Explore My Work” dan “View GitHub”.
- Jadikan “Contact Me” sebagai link kecil atau hilangkan jika redundan.
- Availability badge dapat dipertahankan.
- Gunakan entrance sequence hero sebagai salah satu momen visual utama website.

## 4. Projects sebagai case study

- Project harus menjadi fokus utama portfolio.
- Jangan hanya menampilkan kumpulan card dengan pola identik.
- Gunakan pendekatan editorial atau visual storytelling.
- Pertahankan screenshot project yang sudah tersedia.
- Tambahkan nomor project seperti `01`, `02`, dan seterusnya.
- Tampilkan nama, jenis project, tahun, role, teknologi, dan kontribusi utama.
- Batasi deskripsi preview menjadi maksimal sekitar tiga baris.
- Jika datanya tersedia, tampilkan:
  - Challenge
  - Contribution
  - Result
- Tambahkan “View Case Study”, “Live Demo”, atau “Source Code” hanya jika URL tersedia.
- Jangan mengarang angka, hasil, teknologi, atau link.
- Buat project yang berbeda memiliki sedikit variasi komposisi.
- Gunakan GSAP untuk membantu pengguna mengeksplorasi project, bukan sekadar menambahkan fade animation.
- Pastikan project tetap mudah dibaca meskipun menggunakan motion yang ekspresif.

## 5. Experience

- Pertahankan format timeline.
- Ubah paragraf panjang menjadi 3–4 poin pencapaian yang mudah dipindai.
- Pertahankan jabatan, perusahaan, dan periode kerja.
- Gunakan kalimat yang menekankan kontribusi dan hasil.
- Gunakan angka hanya jika tersedia pada data asli.
- Jangan mengarang metrik.
- Rapikan alignment periode kerja pada desktop dan mobile.
- Motion pada timeline dapat mengikuti progres scroll, tetapi jangan mengganggu pembacaan.

## 6. Skills

- Sederhanakan card yang terlalu besar dan ruang kosong yang tidak diperlukan.
- Gunakan grid 2×2, empat kolom seimbang, atau daftar editorial yang ringkas.
- Kelompokkan skill menjadi:
  - Interface
  - Backend
  - Data
  - Workflow
- Perbaiki penamaan:
  - `Vue JS` menjadi `Vue.js`
  - `Nest JS` menjadi `NestJS`
  - `Github` menjadi `GitHub`
- Jika memang ada pada codebase atau data portfolio, tampilkan TypeScript, PostgreSQL, dan Prisma secara konsisten.
- Jangan menggunakan progress bar atau persentase kemampuan yang tidak dapat dibuktikan.
- Skills tidak perlu menjadi section yang paling dekoratif.
- Gunakan interaction atau motion ringan untuk membantu eksplorasi, bukan untuk mengisi ruang.

## 7. Variasi antar-section

Setiap section harus memiliki karakter visual yang sesuai dengan isinya:

- Hero: cinematic entrance dan strong first impression.
- Projects: editorial storytelling dan motion paling ekspresif.
- Experience: timeline yang terstruktur.
- Skills: ringkas dan mudah dipindai.
- About: layout dua kolom dan lebih personal.
- Education: terstruktur seperti archive atau credentials.
- Blog: editorial preview.
- Contact: strong closing statement dan CTA yang jelas.

Jangan menggunakan formula heading, garis dekoratif, card, dan reveal yang sama pada seluruh section.

Gunakan sistem spacing, warna, tipografi, border, radius, dan motion yang konsisten agar variasi tersebut tetap terasa sebagai satu website.

## 8. Contact section

- Perbaiki inkonsistensi antara copy dan tindakan utama.
- Saat ini copy menyatakan email adalah cara terbaik, sedangkan form mengarahkan pengguna ke WhatsApp.
- Jika form tetap membuka WhatsApp, ubah copy agar menyatakan WhatsApp sebagai channel tercepat.
- Tetap tampilkan email sebagai alternatif.
- Pastikan pengguna langsung memahami apa yang terjadi ketika menekan tombol form.
- Pertahankan statement besar sebagai penutup halaman.
- Tingkatkan kontras kata “next opportunity” dan teks sekunder lainnya.
- Pastikan field, label, focus state, error state, dan tombol dapat digunakan dengan jelas.
- Motion pada contact harus terasa sebagai closing sequence, bukan menghambat pengisian form.

## 9. Mobile navigation

- Pastikan seluruh menu mudah ditemukan.
- Kurangi jarak vertikal yang berlebihan.
- Pastikan menu dapat di-scroll jika konten melebihi viewport.
- Berikan active state yang jelas.
- Pertahankan tombol menu dan close minimal 44×44 px.
- Gunakan animasi pembukaan menu yang ekspresif tetapi cepat.
- Menu dapat memakai stagger, masking, atau transition overlay.
- Jangan membuat pengguna menunggu animasi selesai sebelum dapat memilih menu.
- Pastikan focus management dan keyboard navigation bekerja.
- Pastikan tidak ada horizontal overflow.

## 10. Konsistensi konten

- Gunakan bahasa Inggris sebagai bahasa utama UI.
- Jangan menerjemahkan nama project.
- Ringkas copy yang generik tanpa mengubah fakta.
- Koreksi “System Information” menjadi “Information Systems” jika yang dimaksud adalah jurusan Sistem Informasi.
- Jangan mengubah pengalaman menjadi klaim yang tidak dapat diverifikasi.
- Jangan mengarang testimonial, jumlah pengguna, conversion rate, atau pencapaian lain.
- Pertahankan konten blog, pendidikan, project, dan pengalaman yang sudah ada.

## 11. Accessibility dan usability

- Pastikan teks biasa memiliki rasio kontras yang memadai.
- Hindari abu-abu yang terlalu gelap pada background hitam.
- Tambahkan focus state yang jelas untuk link, button, input, dan menu.
- Pastikan seluruh interaksi dapat digunakan dengan keyboard.
- Pertahankan alt text pada gambar.
- Pastikan animasi bukan satu-satunya cara untuk memahami informasi.
- Pastikan konten tetap terlihat jika JavaScript animasi gagal.
- Dukung `prefers-reduced-motion`.
- Pertahankan ukuran target interaksi yang nyaman pada mobile.
- Periksa heading hierarchy dan semantic HTML.

## Batasan

- Jangan mengerjakan atau mengganti foto profil.
- Jangan mengganti seluruh identitas visual.
- Jangan membuat desain baru dari nol.
- Jangan mengubah website menjadi landing page minimalis yang statis.
- Jangan menghapus GSAP.
- Jangan mengurangi animasi secara agresif.
- Jangan menambahkan efek hanya untuk membuat halaman terlihat lebih ramai.
- Jangan menambahkan dependency besar jika library yang ada sudah mencukupi.
- Jangan menghapus konten project, experience, education, blog, atau contact.
- Jangan mengubah API, backend, URL, atau alur data kecuali benar-benar diperlukan untuk UI.
- Jangan mengarang konten, link, teknologi, angka, atau pencapaian.
- Jangan menambahkan gradient, glassmorphism, atau glow tambahan secara berlebihan.

## Kriteria selesai

- Website tetap memberikan first impression yang kreatif dan memorable.
- Animasi terasa terarah dan bukan kumpulan efek template.
- GSAP tetap menjadi bagian penting dari pengalaman.
- Tidak ada horizontal overflow pada lebar 390 px.
- Tidak ada teks yang terpotong selama atau setelah animasi.
- Hero mobile tidak menyembunyikan seluruh informasi penting.
- Mobile menu mudah digunakan.
- Project lebih mudah dipindai dan kontribusi developer lebih jelas.
- Experience tidak lagi berupa paragraf besar.
- Skills memiliki layout yang seimbang.
- Contact memiliki channel utama yang jelas.
- Aksen cyan digunakan secara lebih terarah.
- Focus keyboard terlihat.
- Reduced-motion bekerja.
- Tampilan tetap kuat pada desktop, tablet, dan mobile.

## Cara kerja

Implementasikan secara bertahap agar perubahan dapat diperiksa:

Tahap 1:
- Audit codebase dan motion system.
- Perbaiki hero.
- Perbaiki header dan mobile navigation.
- Buat token atau helper untuk duration, easing, dan stagger jika diperlukan.

Tahap 2:
- Redesign presentasi Projects.
- Ringkas Experience.
- Rapikan Skills.
- Variasikan layout antar-section.

Tahap 3:
- Perbaiki Contact.
- Audit konsistensi konten.
- Audit accessibility.
- Optimalkan performa animasi.
- Lakukan final responsive QA.

Setelah implementasi:

- Jalankan lint, build, dan test yang tersedia.
- Periksa viewport minimal 1440×1000, 768×1024, dan 390×844.
- Periksa console browser.
- Uji seluruh navigasi dan CTA.
- Uji kondisi `prefers-reduced-motion`.
- Pastikan tidak ada layout shift dan horizontal overflow.
- Laporkan file yang diubah.
- Jelaskan keputusan desain dan motion utama.
- Laporkan hasil verifikasi serta masalah yang masih tersisa.