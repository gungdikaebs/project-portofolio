# Portfolio — Upcoming Improvements

Catatan pengembangan berikutnya untuk portfolio dan halaman admin. Daftar ini bukan komitmen implementasi; setiap perubahan data perlu didiskusikan sebelum schema, API, dan admin diubah.

## Prinsip

- Konten publik tetap berasal dari admin/API.
- Jangan menambahkan angka, hasil, teknologi, atau klaim yang tidak dapat diverifikasi.
- Field baru dibuat opsional agar data lama tetap valid.
- Perubahan schema harus disertai migration, validasi DTO, input admin, dan fallback frontend.
- Motion harus membantu hierarki dan tetap mendukung `prefers-reduced-motion`.

## Prioritas 1 — Project Case Study

Field Project yang tersedia saat ini sudah mencakup judul, slug, deskripsi, kategori, tahun, cover, live URL, skills, gallery, status, featured, dan urutan.

Field yang disarankan:

- [x] `role: String?`
  - Peran spesifik dalam project, misalnya Full-Stack Developer atau Frontend Developer.
  - Jangan menampilkan nilai default jika belum diisi.

- [x] `challenge: Text?`
  - Masalah atau batasan utama yang perlu diselesaikan.

- [x] `contribution: Text?`
  - Bagian yang benar-benar dikerjakan secara langsung.

- [x] `result: Text?`
  - Hasil project berdasarkan fakta.
  - Metrik hanya boleh ditulis jika memiliki sumber yang dapat diverifikasi.

- [x] `sourceCodeUrl: String?`
  - URL repository GitHub/GitLab.
  - Ditampilkan sebagai “Source Code” hanya ketika tersedia.

- [x] Pertimbangkan repository jamak
  - Gunakan hanya jika satu project memang memiliki repository frontend dan backend terpisah.
  - Opsi awal yang sederhana: tetap memakai satu `sourceCodeUrl`.
  - Opsi lanjutan: model `ProjectRepository` dengan `label`, `url`, dan `sortOrder`.

- [x] `projectUrl` tetap digunakan sebagai Live Demo
  - Jangan menyamakan live URL dengan source-code URL.

Perubahan admin yang diperlukan:

- [x] Tambahkan input Role, Challenge, Contribution, Result, dan Source Code URL.
- [x] Berikan helper text bahwa semua field case study bersifat opsional.
- [x] Validasi URL untuk Live Demo dan Source Code.
- [x] Sediakan preview sebelum project dipublikasikan.

Kriteria selesai:

- Project preview tetap ringkas, maksimal sekitar tiga baris.
- Detail project dapat menampilkan Overview, Challenge, Contribution, Result, dan Gallery berdasarkan field yang tersedia.
- Section kosong tidak ikut dirender.
- Tidak ada label atau klaim buatan ketika data belum diisi.

## Prioritas 2 — Skills dan Category Ordering

- [x] Tambahkan `sortOrder: Int` pada `SkillCategory`.
- [x] Urutkan kategori berdasarkan `sortOrder`, lalu `createdAt` sebagai fallback.
- [x] Tambahkan kontrol naik/turun atau drag-and-drop pada admin.
- [x] Pastikan urutan admin dan halaman publik selalu sama.
- [x] Pertahankan `Skill.sortOrder` untuk urutan skill di dalam kategori.

Catatan:

- Nama kategori harus tetap mengikuti admin.
- Frontend tidak boleh mengelompokkan ulang skill menggunakan keyword atau heuristic.

## Prioritas 3 — Experience yang Lebih Terstruktur

Saat ini pencapaian masih berasal dari satu field `description` dan dipecah menjadi bullet di frontend.

- [ ] Tambahkan daftar `achievements` yang dapat diedit per item di admin.
- [ ] Pertimbangkan model `ExperienceAchievement` dengan:
  - `id`
  - `experienceId`
  - `content`
  - `sortOrder`
- [ ] Pertahankan `description` sebagai ringkasan opsional atau fallback untuk data lama.
- [ ] Hubungkan teknologi Experience ke data Skill jika teknologi memang ingin ditampilkan.
- [ ] Hindari field metrik khusus; angka dapat ditulis di achievement hanya jika benar dan dapat diverifikasi.

Kriteria selesai:

- Setiap pekerjaan menampilkan 3–4 poin yang mudah dipindai.
- Admin dapat mengatur urutan pencapaian.
- Frontend tidak perlu memotong paragraf berdasarkan tanda titik.

## Prioritas 4 — Profile dan Contact dari CMS

Beberapa informasi masih hardcoded di frontend.

- [ ] `email: String?`
- [ ] `whatsappNumber: String?`
- [ ] `githubUrl: String?`
- [ ] `linkedinUrl: String?`
- [ ] `availabilityText: String?`
- [ ] `headline: String?`
- [ ] `shortIntroduction: Text?`

Aturan:

- `whatsappNumber` disimpan dalam format internasional tanpa spasi untuk pembuatan URL.
- Label tampilan nomor dapat diformat terpisah oleh frontend.
- Link yang kosong tidak dirender.
- Availability tidak boleh ditampilkan jika `availableForHi` bernilai false.

## Prioritas 5 — Content Quality

- [ ] Audit bio agar lebih personal dan tidak berisi jargon generik.
- [ ] Audit setiap deskripsi project bersama pemilik portfolio.
- [ ] Ubah deskripsi Experience menjadi kontribusi konkret.
- [ ] Periksa excerpt Blog agar menjelaskan isi artikel, bukan memakai pembuka generik.
- [ ] Hindari kata-kata seperti “passionate”, “innovative”, “cutting-edge”, “robust”, “seamless”, dan “meaningful” jika tidak diikuti bukti atau konteks.
- [ ] Jangan membuat testimonial, jumlah pengguna, conversion rate, atau hasil bisnis tanpa sumber.

Template penulisan Project:

1. Apa yang dibangun?
2. Untuk konteks atau kebutuhan apa?
3. Apa bagian yang dikerjakan secara langsung?
4. Keputusan teknis apa yang penting?
5. Apa hasil yang benar-benar dapat dibuktikan?

## Prioritas 6 — Admin Workflow

- [x] Preview draft Project sebelum publish.
- [ ] Peringatan jika project featured tidak memiliki cover atau deskripsi.
- [ ] Validasi format URL dan file upload.
- [ ] Tampilkan status kelengkapan case study di daftar project.
- [ ] Konfirmasi sebelum meninggalkan form dengan perubahan yang belum disimpan.
- [ ] Pertimbangkan autosave hanya setelah alur manual stabil.

## Prioritas 7 — Quality Assurance

- [ ] Tambahkan test untuk normalisasi URL media/API.
- [ ] Tambahkan test rendering ketika field opsional kosong.
- [ ] Tambahkan test keyboard untuk navigation dan gallery dialog.
- [ ] Tambahkan test `prefers-reduced-motion`.
- [ ] Tambahkan responsive smoke test untuk 1440×1000, 768×1024, dan 390×844.
- [ ] Periksa horizontal overflow secara otomatis.
- [ ] Jalankan accessibility audit sebelum deployment.

## Keputusan yang Perlu Didiskusikan

- [x] Apakah satu project cukup memiliki satu repository URL? Diputuskan: satu `sourceCodeUrl`.
- [x] Apakah Challenge, Contribution, dan Result ingin menggunakan plain text atau rich-text editor? Diputuskan: plain text.
- [ ] Apakah Experience membutuhkan relasi ke Skills atau cukup daftar teknologi bebas?
- [ ] Apakah semua informasi Contact ingin dikelola dari Profile admin?
- [x] Apakah category ordering memerlukan drag-and-drop atau tombol naik/turun sudah cukup? Diputuskan: tombol naik/turun.

## Urutan Implementasi yang Disarankan

1. Project case-study fields dan Source Code URL.
2. Input admin dan tampilan Project Detail.
3. SkillCategory `sortOrder` dan kontrol pengurutan.
4. Structured Experience achievements.
5. Profile/contact fields.
6. Content audit berbasis data asli.
7. Automated responsive dan accessibility checks.
