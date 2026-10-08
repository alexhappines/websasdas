/* ExcelAcademy · logika bersama (localStorage sebagai DB demo) */
'use strict';

const Plans = {
  free:    { id:'free',    name:'Gratis',      price:0,      per:'selamanya', desc:'Akses kursus dasar + kuis.' },
  monthly: { id:'monthly', name:'Pro Bulanan', price:49000,  per:'/bulan',   desc:'Semua kursus dan kuis terbuka.' },
  yearly:  { id:'yearly',  name:'Pro Tahunan', price:399000, per:'/tahun',   desc:'Sama dengan Bulanan, setara Rp33.250/bulan.' },
};

function fmtIDR(n){ return n === 0 ? 'Gratis' : 'Rp' + n.toLocaleString('id-ID'); }

/* ---------- auth ---------- */
function getUsers(){ try { return JSON.parse(localStorage.getItem('xl_users') || '[]'); } catch { return []; } }
function saveUsers(users){ localStorage.setItem('xl_users', JSON.stringify(users)); }

function currentUser(){
  try {
    const s = JSON.parse(localStorage.getItem('xl_session') || 'null');
    if (!s || !s.email) return null;
    return getUsers().find(u => u.email === s.email) || null;
  } catch { return null; }
}
function setUser(next){
  const users = getUsers(), i = users.findIndex(u => u.email === next.email);
  if (i > -1) { users[i] = next; saveUsers(users); }
}
function login(email, pass){
  const u = getUsers().find(u => u.email.toLowerCase() === String(email).trim().toLowerCase());
  if (!u || u.pass !== pass) return { ok:false, error:'Email atau kata sandi salah.' };
  localStorage.setItem('xl_session', JSON.stringify({ email:u.email, at:Date.now() }));
  return { ok:true, user:u };
}
function register(name, email, pass){
  if (!name || name.trim().length < 2) return { ok:false, error:'Nama minimal 2 karakter.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok:false, error:'Format email tidak valid.' };
  if (!pass || pass.length < 6) return { ok:false, error:'Kata sandi minimal 6 karakter.' };
  if (getUsers().some(u => u.email.toLowerCase() === email.trim().toLowerCase()))
    return { ok:false, error:'Email sudah terdaftar. Silakan masuk.' };
  const u = { id:'u' + Date.now(), name:name.trim(), email:email.trim().toLowerCase(), pass,
              plan:'free', planEx:0, joined:Date.now(), progress:{} };
  const users = getUsers(); users.push(u); saveUsers(users);
  return login(u.email, pass);
}
function logout(){ localStorage.removeItem('xl_session'); location.href = 'index.html'; }

/* ---------- langganan ---------- */
function isPro(user){
  user = user || currentUser();
  return !!(user && user.plan && user.plan !== 'free' && Plans[user.plan] && user.planEx > Date.now());
}
function planName(user){ return isPro(user) ? Plans[(user || currentUser()).plan].name : 'Gratis'; }
function subscribe(planId){
  const u = currentUser(); if (!u) return { ok:false, error:'Silakan masuk dulu.' };
  if (!Plans[planId] || planId === 'free') return { ok:false, error:'Paket tidak valid.' };
  u.plan = planId; u.planEx = Date.now() + (planId === 'yearly' ? 365 : 30) * 864e5;
  setUser(u); return { ok:true };
}
function cancelSub(){
  const u = currentUser(); if (!u) return;
  u.plan = 'free'; u.planEx = 0; setUser(u);
}

/* ---------- progres ---------- */
function lessonDone(user, lessonId){ return !!(user && user.progress && user.progress[lessonId]); }
function completeLesson(lessonId){
  const u = currentUser(); if (!u) return false;
  u.progress = u.progress || {}; u.progress[lessonId] = Date.now(); setUser(u); return true;
}
function courseProgress(course, user){
  user = user || currentUser();
  const total = course.lessons.length;
  const done = course.lessons.filter(l => lessonDone(user, l.id)).length;
  return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
}
function totalDone(user){ user = user || currentUser(); return user ? Object.keys(user.progress || {}).length : 0; }
function nextLesson(course, user){
  user = user || currentUser();
  return course.lessons.find(l => !lessonDone(user, l.id)) || course.lessons[course.lessons.length - 1];
}

/* ---------- UI helpers ---------- */
function esc(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function fmtDate(ts){ return new Date(ts).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }); }

function toast(msg, type){
  const t = document.createElement('div');
  t.className = 'toast ' + (type || 'ok');
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2600);
}

function renderNav(){
  const el = document.getElementById('nav'); if (!el) return;
  const u = currentUser();
  el.innerHTML = `
  <div class="container nav-inner">
    <a class="brand" href="index.html"><span class="brand-ico">X</span> ExcelAcademy</a>
    <nav class="nav-links">
      <a href="courses.html">Kursus</a>
      <a href="index.html#harga">Harga</a>
      ${u ? '<a href="dashboard.html">Dashboard</a>' : ''}
    </nav>
    <div class="nav-auth">
      ${u
        ? `<a class="btn btn-ghost btn-sm" href="dashboard.html">${esc(u.name.split(' ')[0])}</a>`
        : `<a class="btn btn-ghost btn-sm" href="login.html">Masuk</a>
           <a class="btn btn-primary btn-sm" href="login.html?tab=daftar">Daftar Gratis</a>`}
    </div>
  </div>`;
}

function renderSide(active){
  const el = document.getElementById('side'); if (!el) return;
  const u = currentUser(); if (!u) { location.href = 'login.html'; return; }
  el.innerHTML = `
    <a class="brand" href="index.html"><span class="brand-ico">X</span> ExcelAcademy</a>
    <a class="item ${active === 'dashboard' ? 'active' : ''}" href="dashboard.html">Dashboard</a>
    <a class="item ${active === 'courses' ? 'active' : ''}" href="courses.html">Kursus</a>
    <a class="item ${active === 'billing' ? 'active' : ''}" href="billing.html">Tagihan &amp; Paket</a>
    <div class="spacer"></div>
    <div class="planbox">Paket: <b>${esc(planName(u))}</b><br>
      ${isPro(u) ? 'Berlaku hingga ' + fmtDate(u.planEx) : '<a href="billing.html" style="color:#9fe0bb">Lihat paket Pro</a>'}
    </div>
    <button class="item w-full" onclick="logout()">Keluar</button>`;
}

function requireAuth(){
  if (!currentUser()) {
    const page = (location.pathname.split('/').pop() || 'index.html') + location.search;
    location.href = 'login.html?next=' + encodeURIComponent(page);
    return false;
  }
  return true;
}

document.addEventListener('DOMContentLoaded', renderNav);