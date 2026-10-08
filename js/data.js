/* ExcelAcademy · data kursus */
'use strict';

const COURSES = [
{
  id:'c1', title:'Excel Dasar untuk Pemula', level:'Pemula', tag:'Gratis', hours:3,
  desc:'Kuasai dasar Excel: cell, format, tabel, dan rumus pertamamu.',
  lessons:[
    { id:'c1l1', title:'Mengenal Antarmuka Excel', dur:'8 mnt', type:'video' },
    { id:'c1l2', title:'Cell, Baris, dan Kolom', dur:'10 mnt', type:'video' },
    { id:'c1l3', title:'Format Number & Tabel', dur:'12 mnt', type:'membaca', content:`
      <p>Excel punya banyak format angka. Pilih cell lalu tekan <code>Ctrl+1</code> untuk membuka dialog <b>Format Cells</b>.</p>
      <table><tr><th>Format</th><th>Contoh</th></tr>
      <tr><td>Mata Uang</td><td>Rp1.250.000</td></tr>
      <tr><td>Persentase</td><td>15%</td></tr>
      <tr><td>Tanggal</td><td>14 September 2026</td></tr></table>
      <p>Tekan <code>Ctrl+T</code> untuk mengubah range menjadi <b>Tabel</b>: header otomatis, filter siap pakai, dan rumus lebih rapi.</p>` },
    { id:'c1l4', title:'Rumus Pertama: SUM & AVERAGE', dur:'15 mnt', type:'membaca', content:`
      <p>Rumus selalu diawali tanda <code>=</code>. Dua fungsi paling sering dipakai:</p>
      <p><code>=SUM(B2:B10)</code> → menjumlahkan nilai dari B2 sampai B10.<br>
         <code>=AVERAGE(B2:B10)</code> → menghitung rata-rata.</p>
      <table><tr><th>Produk</th><th>Qty</th></tr>
      <tr><td>Pensil</td><td>120</td></tr>
      <tr><td>Buku</td><td>80</td></tr>
      <tr><td><b>Total</b></td><td class="hl">200</td></tr></table>
      <p>Tip: tekan <code>Alt + =</code> untuk auto-SUM dalam sekali tekan.</p>` },
    { id:'c1l5', title:'Kuis Dasar Excel', dur:'5 mnt', type:'kuis',
      quiz:{ q:'Formula mana yang benar untuk menjumlahkan A1 sampai A10?',
             options:['=JUMLAH(A1:A10)','=SUM(A1:A10)','=TOTAL(A1:A10)','SUM(A1:A10)'], answer:1 } },
  ],
},
{
  id:'c2', title:'Formula & Fungsi Excel', level:'Menengah', tag:'Gratis + Pro', hours:5,
  desc:'IF, VLOOKUP, XLOOKUP, dan fungsi teks untuk menghemat pekerjaan berulang.',
  lessons:[
    { id:'c2l1', title:'Logika IF & IFS', dur:'14 mnt', type:'membaca', content:`
      <p><code>=IF(A2&gt;=75,"LULUS","REMEDIAL")</code></p>
      <p>IF membaca kondisi: jika <b>benar</b> ambil nilai kedua, jika <b>salah</b> ambil nilai ketiga. Untuk banyak kondisi gunakan IFS:</p>
      <p><code>=IFS(A2&gt;=90,"A", A2&gt;=80,"B", A2&gt;=70,"C")</code></p>
      <table><tr><th>Nilai</th><th>Hasil</th></tr>
      <tr><td>91</td><td class="hl">A</td></tr>
      <tr><td>78</td><td>B</td></tr>
      <tr><td>65</td><td>C</td></tr></table>` },
    { id:'c2l2', title:'VLOOKUP vs XLOOKUP', dur:'18 mnt', type:'video' },
    { id:'c2l3', title:'Fungsi Teks: LEFT, MID, CONCAT', dur:'12 mnt', type:'membaca', pro:true, content:`
      <p><code>=LEFT("ExcelAcademy",5)</code> → <b>Excel</b></p>
      <p><code>=MID("ExcelAcademy",6,3)</code> → <b>Aca</b></p>
      <p><code>=CONCAT(A2," ",B2)</code> → menggabungkan nama depan + belakang.</p>
      <p><code>=TRIM(A2)</code> menghapus spasi berlebih, wajib saat membersihkan data hasil impor.</p>` },
    { id:'c2l4', title:'COUNTIF & SUMIF', dur:'13 mnt', type:'video', pro:true },
    { id:'c2l5', title:'Kuis Formula', dur:'5 mnt', type:'kuis',
      quiz:{ q:'XLOOKUP lebih unggul dari VLOOKUP karena…',
             options:['Selalu lebih cepat','Bisa mencari ke arah kiri & tak perlu nomor kolom','Tidak butuh nilai pencari','Hanya untuk data teks'], answer:1 } },
  ],
},
{
  id:'c3', title:'Analisis Data & PivotTable', level:'Mahir', tag:'Pro', hours:6,
  desc:'Olah ribuan baris data jadi ringkasan yang bisa dibaca cepat dengan PivotTable & chart.',
  lessons:[
    { id:'c3l1', title:'Menyiapkan Data yang Bersih', dur:'11 mnt', type:'membaca', content:`
      <p>Data yang baik itu: <b>1 baris = 1 data</b>, tidak ada baris kosong di tengah, header unik, dan format konsisten.</p>
      <ul>
        <li>Tanggal selalu satu format.</li>
        <li>Angka tanpa teks campuran: tulis <code>20</code> dan <code>pcs</code> di dua kolom berbeda.</li>
        <li>Hapus merge cell sebelum membuat PivotTable.</li>
      </ul>
      <p>Gunakan <b>Remove Duplicates</b> (Data → Data Tools) untuk membersihkan data ganda.</p>` },
    { id:'c3l2', title:'Membuat PivotTable Pertama', dur:'16 mnt', type:'video', pro:true },
    { id:'c3l3', title:'Grouping & Calculated Field', dur:'14 mnt', type:'video', pro:true },
    { id:'c3l4', title:'Chart & Dashboard Mini', dur:'20 mnt', type:'membaca', pro:true, content:`
      <p>Mini dashboard = 1 sheet berisi tabel ringkasan + 2–3 chart.</p>
      <ol>
        <li>Ringkas data dengan PivotTable.</li>
        <li>Pilih range → <b>Insert → Recommended Charts</b>.</li>
        <li>Tambahkan <b>Slicer</b> agar chart bisa difilter sekali klik.</li>
      </ol>
      <p>Simpan sebagai template <code>.xltx</code> agar bisa dipakai ulang setiap bulan.</p>` },
    { id:'c3l5', title:'Kuis PivotTable', dur:'5 mnt', type:'kuis', pro:true,
      quiz:{ q:'PivotTable paling cocok digunakan untuk…',
             options:['Mengubah warna cell','Meringkas data besar dengan agregasi cepat','Menulis catatan','Merekam makro'], answer:1 } },
  ],
},
{
  id:'c4', title:'Excel untuk Bisnis', level:'Menengah', tag:'Pro', hours:7,
  desc:'Cashflow, forecasting, dan dashboard KPI khusus untuk UMKM.',
  lessons:[
    { id:'c4l1', title:'Mindset Spreadsheet untuk Bisnis', dur:'9 mnt', type:'video' },
    { id:'c4l2', title:'Membuat Cashflow Sederhana', dur:'17 mnt', type:'membaca', pro:true, content:`
      <p>Cashflow minimal punya 3 kolom: <b>Tanggal | Masuk | Keluar</b>, lalu saldo berjalan:</p>
      <p><code>=E2 + C3 - D3</code> (saldo lama + uang masuk − uang keluar)</p>
      <table><tr><th>Tanggal</th><th>Masuk</th><th>Keluar</th><th>Saldo</th></tr>
      <tr><td>1 Sep</td><td>5.000.000</td><td>1.200.000</td><td class="hl">3.800.000</td></tr>
      <tr><td>2 Sep</td><td>2.000.000</td><td>500.000</td><td>5.300.000</td></tr></table>
      <p>Beri <b>conditional formatting</b> merah saat saldo &lt; 1 juta sebagai peringatan dini.</p>` },
    { id:'c4l3', title:'Forecast dengan TREND', dur:'15 mnt', type:'video', pro:true },
    { id:'c4l4', title:'Dashboard KPI UMKM', dur:'22 mnt', type:'membaca', pro:true, content:`
      <p>KPI wajib di dashboard UMKM:</p>
      <ul>
        <li><b>Omzet bulan ini</b>: <code>=SUMIF(Bulan,"Sep",Omzet)</code></li>
        <li><b>Pertumbuhan</b>: <code>=(BulanIni-BulanLalu)/BulanLalu</code></li>
        <li><b>Top 5 produk</b>: sort PivotTable descending.</li>
      </ul>
      <p>Taruh semua di satu sheet, maksimal 3 warna, angka besar di atas, agar mudah dibaca pemilik usaha.</p>` },
    { id:'c4l5', title:'Kuis Excel Bisnis', dur:'5 mnt', type:'kuis', pro:true,
      quiz:{ q:'Fungsi yang tepat untuk memproyeksikan tren penjualan adalah…',
             options:['=TREND()','=PREDICT()','=GUESS()','=NEXT()'], answer:0 } },
  ],
},
];

const findCourse  = id => COURSES.find(c => c.id === id);
const findLesson  = (course, id) => course && course.lessons.find(l => l.id === id);
const lessonUrl   = (cId, lId) => `lesson.html?course=${cId}&lesson=${lId}`;
const typeLabel   = { video:'Video', membaca:'Membaca', kuis:'Kuis' };