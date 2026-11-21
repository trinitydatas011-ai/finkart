/* ===== Aura Finkart — site scripts (settings live in config.js) ===== */
(function () {
  "use strict";
  const C = window.AURA || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const waNum = String(C.whatsapp || "").replace(/\D/g, "");
  const telNum = String(C.phoneTel || "").replace(/[^\d+]/g, "");
  if (/^\d*0{6,}\d*$/.test(waNum) || !waNum) console.warn("Aura Finkart: set your real WhatsApp and phone numbers in config.js");

  /* ---------- Contact wiring: call / WhatsApp / mail ---------- */
  $$("[data-ph]").forEach(el => { if (C[el.dataset.ph]) el.textContent = C[el.dataset.ph]; });
  $$("[data-tel]").forEach(a => a.href = "tel:" + telNum);
  $$("[data-mail]").forEach(a => a.href = "mailto:" + (C.email || ""));
  const waLink = text => "https://wa.me/" + waNum + (text ? "?text=" + encodeURIComponent(text) : "");
  const hello = "Hello Aura Finkart, I'd like to know more about your loan, insurance and investment services.";
  $$("[data-wa]").forEach(a => a.href = waLink(hello));
  $("#yr").textContent = new Date().getFullYear();

  /* ---------- Loan data (used for the cards, dropdowns and the details dialog) ---------- */
  const LOANS = [
    { id: "personal", name: "Personal Loan", blurb: "Flexible financial assistance for personal expenses and unexpected needs.",
      about: "An unsecured loan you can use for many personal needs, repaid in fixed monthly instalments.",
      uses: ["Medical expenses", "Wedding expenses", "Travel", "Education", "Emergency requirements"],
      elig: ["Salaried or self-employed with steady income", "Good credit history", "Age within the lender's range"],
      docs: ["Identity and address proof", "Recent salary slips or ITR", "Bank statements"] },
    { id: "home", name: "Home Loan", blurb: "Support for purchasing, constructing or renovating your dream home.",
      about: "A long-tenure loan secured against the property, for buying, building, renovating or extending a home.",
      uses: ["Home purchase", "New construction", "Renovation", "Home extension"],
      elig: ["Stable income and repayment capacity", "Good credit history", "Property that meets lender checks"],
      docs: ["Identity and address proof", "Income documents", "Property papers", "Bank statements"] },
    { id: "business", name: "Business Loan", blurb: "Funding for business expansion, working capital and operations.",
      about: "Funding for running or growing a business, including working capital and MSME financing.",
      uses: ["Working capital", "Business expansion", "Machinery and equipment", "MSME financing"],
      elig: ["Business with a steady operating record", "Satisfactory credit profile", "Proof of turnover and profit"],
      docs: ["KYC of owners", "Business registration proof", "ITR, GST and financials", "Bank statements"] },
    { id: "lap", name: "Loan Against Property", blurb: "Access funds by using eligible property as collateral.",
      about: "A loan secured by residential or commercial property you own, for business or personal financial needs.",
      uses: ["Business needs", "Education or medical costs", "Debt consolidation", "Large personal expenses"],
      elig: ["Ownership of an eligible property", "Regular income and repayment capacity", "Clear property title"],
      docs: ["KYC documents", "Property title papers", "Income documents", "Bank statements"] },
    { id: "auto", name: "Auto Loan", blurb: "Financing solutions for personal and commercial vehicles.",
      about: "Finance for new vehicles, and used vehicles where the lender allows it, for personal or commercial use.",
      uses: ["New car purchase", "Used vehicle (lender permitting)", "Commercial vehicle"],
      elig: ["Stable income", "Good credit history", "Down payment as the lender requires"],
      docs: ["Identity and address proof", "Income documents", "Vehicle quotation", "Bank statements"] },
    { id: "machinery", name: "Machinery Loan", blurb: "Assistance for machinery, equipment and business productivity.",
      about: "Finance to buy industrial machinery, manufacturing or commercial equipment for your business.",
      uses: ["Industrial machinery", "Manufacturing equipment", "Commercial equipment", "Productivity upgrades"],
      elig: ["Running business with financial records", "Satisfactory credit profile", "Equipment quotation from supplier"],
      docs: ["KYC and business proof", "ITR and financials", "Machinery quotation", "Bank statements"] },
    { id: "education", name: "Education Loan", blurb: "Financial assistance for higher education and academic aspirations.",
      about: "Funding for higher education in India or, where lenders permit, overseas.",
      uses: ["Tuition fees", "Hostel and living costs", "Books and equipment", "Overseas study (lender permitting)"],
      elig: ["Admission to a recognised course", "Co-applicant such as a parent or guardian", "Co-applicant's income proof"],
      docs: ["Admission letter and fee structure", "Student and co-applicant KYC", "Co-applicant income proof", "Academic records"] },
    { id: "gold", name: "Gold Loan", blurb: "Loans secured against eligible gold jewellery.",
      about: "A short-term loan where eligible gold jewellery is pledged as security and returned on repayment.",
      uses: ["Short-term cash needs", "Business working capital", "Medical or family expenses"],
      elig: ["Gold jewellery of acceptable purity", "Valid identity and address proof", "Age within the lender's range"],
      docs: ["Identity proof", "Address proof", "Photographs", "Gold jewellery for valuation"] }
  ];
  const OTHERS = ["Insurance", "Investments", "Credit score guidance"];

  // Loan cards
  $("#loanGrid").innerHTML = LOANS.map((l, i) => `
    <article class="loan rv">
      <span class="loan__n">${String(i + 1).padStart(2, "0")}</span>
      <h3>${esc(l.name)}</h3>
      <p>${esc(l.blurb)}</p>
      <div class="loan__act">
        <button type="button" class="link" data-open="${l.id}">Learn more</button>
        <a href="#contact" class="btn btn--solid btn--sm" data-pick="${esc(l.name)}">Apply now</a>
      </div>
    </article>`).join("");

  // Loan type <select>s
  const optHtml = '<option value="">Select</option>' + LOANS.map(l => `<option>${esc(l.name)}</option>`).join("") + OTHERS.map(o => `<option>${esc(o)}</option>`).join("");
  $$("[data-loan-options]").forEach(s => s.innerHTML = optHtml);

  // "Apply" shortcuts pre-select the loan type in the main form
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-pick]");
    if (!a) return;
    const sel = $("#loanSel"), v = a.dataset.pick;
    if (sel) { if (![...sel.options].some(o => o.value === v)) sel.add(new Option(v, v)); sel.value = v; }
  });

  /* ---------- Header: sticky state, drawer, dropdown, active link ---------- */
  const nav = $("#nav"), burger = $("#burger"), scrim = $("#scrim"), dd = $(".dd"), ddBtn = $(".dd__btn");
  const setMenu = open => {
    nav.classList.toggle("open", open); scrim.classList.toggle("on", open);
    burger.setAttribute("aria-expanded", open);
    burger.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  scrim.addEventListener("click", () => setMenu(false));
  $$("#nav a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  ddBtn.addEventListener("click", () => { const o = dd.classList.toggle("open"); ddBtn.setAttribute("aria-expanded", o); });
  document.addEventListener("click", e => { if (!dd.contains(e.target)) { dd.classList.remove("open"); ddBtn.setAttribute("aria-expanded", "false"); } });
  addEventListener("keydown", e => { if (e.key === "Escape") { setMenu(false); dd.classList.remove("open"); } });
  addEventListener("resize", () => { if (innerWidth > 900) setMenu(false); });

  const links = $$('.nav>a[href^="#"]:not(.btn)');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-40% 0px -55% 0px" });
  ["insurance", "investments", "cibil", "emi", "about", "contact"].forEach(id => { const s = document.getElementById(id); if (s) spy.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } }), { threshold: .1 });
  const watch = () => $$(".rv:not(.in)").forEach(el => rv.observe(el));
  $$(".head,.photo-card,.what__card,.split,.steps li,.inv article,.trio--text article,.faq details,.tablewrap,.emi,.cibil,.partners,.car").forEach(el => el.classList.add("rv"));
  watch();

  /* ---------- Stats ---------- */
  const fmt = n => Math.round(n).toLocaleString("en-IN");
  $("#stats").innerHTML = (C.stats || []).map(s => `<div class="stat"><b>${esc(s.prefix || "")}<span data-count="${+s.value || 0}">0</span>${esc(s.suffix || "")}</b><span>${esc(s.label)}</span></div>`).join("");
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = 1300;
    const tick = t => { const p = Math.min((t - t0) / dur, 1); el.textContent = fmt(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick); co.unobserve(el);
  }), { threshold: .6 });
  $$("[data-count]").forEach(el => co.observe(el));

  /* ---------- Loan detail dialog ---------- */
  const dlg = $("#loanDlg");
  const li = arr => arr.map(x => `<li>${esc(x)}</li>`).join("");
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-open]");
    if (!b) return;
    const l = LOANS.find(x => x.id === b.dataset.open);
    if (!l) return;
    setMenu(false); dd.classList.remove("open");
    $("#dlgTitle").textContent = l.name;
    $("#dlgAbout").textContent = l.about;
    $("#dlgUses").innerHTML = li(l.uses); $("#dlgElig").innerHTML = li(l.elig); $("#dlgDocs").innerHTML = li(l.docs);
    const apply = $("#dlgApply"); apply.dataset.pick = l.name;
    const wa = $('#loanDlg [data-wa]'); wa.href = waLink(`Hello Aura Finkart, I'd like to know more about a ${l.name}.`);
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
  });
  $("#dlgClose").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  $("#dlgApply").addEventListener("click", () => dlg.close());

  /* ---------- Enquiry forms → WhatsApp (and optional endpoint) ---------- */
  $$("[data-wa-form]").forEach(form => {
    form.addEventListener("submit", async ev => {
      ev.preventDefault();
      const msg = $(".msg", form); msg.className = "msg"; msg.textContent = "";
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const d = Object.fromEntries(new FormData(form).entries());
      if (d.website) return; // honeypot
      const lines = [
        "Hello Aura Finkart, I'd like to enquire about *" + (d.loan || "your services") + "*.",
        "",
        "Name: " + d.name,
        "Mobile: " + d.phone
      ];
      if (d.city) lines.push("City: " + d.city);
      if (d.amount) lines.push("Amount needed: ₹" + Number(d.amount).toLocaleString("en-IN"));
      if (d.msg) lines.push("Message: " + d.msg);
      lines.push("", "Sent from the Aura Finkart website.");
      const url = waLink(lines.join("\n"));

      if (C.formEndpoint) {
        try { fetch(C.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d), keepalive: true }); } catch (_) {}
      }
      // Open WhatsApp straight away (inside the click gesture so mobile browsers allow it)
      const w = window.open(url, "_blank", "noopener");
      msg.innerHTML = 'Opening WhatsApp… if nothing opens, <a href="' + url + '" target="_blank" rel="noopener">tap here to send your enquiry</a>, or call us on <a href="tel:' + telNum + '">' + esc(C.phoneDisplay || telNum) + "</a>.";
      if (!w) msg.classList.add("err");
      form.reset();
    });
  });

  /* ---------- EMI calculator ---------- */
  (function emi() {
    const amt = $("#amt"), amtN = $("#amtN"), rate = $("#rate"), rateN = $("#rateN"), ten = $("#ten"), tenN = $("#tenN"), unit = $("#unit"), err = $("#emiErr");
    const cv = $("#donut"), ctx = cv.getContext("2d");
    const inr = n => "₹" + fmt(n);
    const def = { amt: 1000000, rate: 10.5, ten: 5 };

    const calcEmi = (P, annual, n) => {
      const r = annual / 12 / 100;
      if (r === 0) return P / n;                       // zero-interest loans
      const f = Math.pow(1 + r, n);
      return P * r * f / (f - 1);                      // EMI = P·r·(1+r)^n / ((1+r)^n − 1)
    };
    const draw = share => {
      const s = cv.clientWidth || 220, dpr = devicePixelRatio || 1, c = s / 2, w = s * .12, R = c - w;
      cv.width = s * dpr; cv.height = s * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, s, s); ctx.lineWidth = w;
      const a0 = -Math.PI / 2, a1 = a0 + Math.PI * 2 * share;
      ctx.strokeStyle = "#8FE0D4"; ctx.beginPath(); ctx.arc(c, c, R, a0, a1); ctx.stroke();
      ctx.strokeStyle = "#FFFFFF"; ctx.beginPath(); ctx.arc(c, c, R, a1, a0 + Math.PI * 2); ctx.stroke();
    };
    const update = () => {
      const P = +amtN.value, annual = +rateN.value, t = +tenN.value;
      const n = unit.value === "Y" ? Math.round(t * 12) : Math.round(t);
      if (!(P > 0) || !(annual >= 0) || annual > 100 || !(n >= 1) || !isFinite(P + annual + n)) { err.textContent = "Please enter a valid amount, rate and tenure."; return; }
      err.textContent = "";
      const e = calcEmi(P, annual, n), total = e * n, interest = Math.max(total - P, 0);
      $("#oEmi").textContent = inr(e); $("#oP").textContent = inr(P); $("#oI").textContent = inr(interest); $("#oT").textContent = inr(total);
      $("#oPct").textContent = (total ? interest / total * 100 : 0).toFixed(1) + "%";
      draw(total ? P / total : 1);
    };
    const bind = (r, n) => {
      r.addEventListener("input", () => { n.value = r.value; update(); });
      n.addEventListener("input", () => { if (n.value !== "") r.value = n.value; update(); });
    };
    bind(amt, amtN); bind(rate, rateN); bind(ten, tenN);
    unit.addEventListener("change", () => {
      if (unit.value === "M") { ten.max = 360; tenN.value = Math.round(tenN.value * 12) || 12; }
      else { ten.max = 30; tenN.value = Math.max(1, Math.round(tenN.value / 12)); }
      ten.value = tenN.value; update();
    });
    $("#emiReset").addEventListener("click", () => {
      amt.value = amtN.value = def.amt; rate.value = rateN.value = def.rate; unit.value = "Y"; ten.max = 30; ten.value = tenN.value = def.ten; update();
    });
    addEventListener("resize", update);
    update();
  })();

  /* ---------- Partners ---------- */
  const pBox = $("#partners"), P = C.partners || [];
  pBox.innerHTML = P.length
    ? P.map(p => `<div class="partner partner--logo"><img src="${esc(p.logo)}" alt="${esc(p.name)}" loading="lazy"></div>`).join("")
    : Array.from({ length: 6 }, () => '<div class="partner">Partner logo</div>').join("");

  /* ---------- Testimonials ---------- */
  (function carousel() {
    const T = C.testimonials || [], track = $("#track"), dots = $("#dots");
    if (!T.length) { $("#reviews").hidden = true; return; }
    track.innerHTML = T.map(t => `<div class="tcard"><div class="tcard__in">
      ${t.rating ? `<div class="stars" role="img" aria-label="${+t.rating} out of 5">${"★".repeat(+t.rating)}</div>` : ""}
      <p class="tcard__q">“${esc(t.text)}”</p>
      <p class="tcard__who">${esc(t.name)}<small>${esc(t.loan)}</small></p></div></div>`).join("");
    dots.innerHTML = T.map((_, i) => `<button type="button" aria-label="Review ${i + 1}"></button>`).join("");
    let i = 0, timer;
    const go = n => { i = (n + T.length) % T.length; track.style.transform = `translateX(-${i * 100}%)`; $$("button", dots).forEach((d, k) => d.classList.toggle("on", k === i)); };
    const auto = () => { clearInterval(timer); if (!matchMedia("(prefers-reduced-motion:reduce)").matches) timer = setInterval(() => go(i + 1), 7000); };
    $("#prev").onclick = () => { go(i - 1); auto(); };
    $("#next").onclick = () => { go(i + 1); auto(); };
    $$("button", dots).forEach((d, k) => d.onclick = () => { go(k); auto(); });
    go(0); auto();
  })();
})();
