/* =====================================================================
   AURA FINKART — SITE SETTINGS
   Edit this file only. No need to touch index.html or script.js.
   ===================================================================== */
window.AURA = {

  /* ---- Contact (used by every Call / WhatsApp / email link on the site) ---- */
  phoneDisplay: "+91 00000 00000",   // how the number is shown on screen
  phoneTel:     "+910000000000",     // number for tap-to-call, with country code
  whatsapp:     "910000000000",      // WhatsApp number: country code + number, NO "+" or spaces
  email:        "hello@aurafinkart.com",
  address:      "Your City, India",
  hours:        "Mon – Sat, 9:30 AM – 6:30 PM",

  /* ---- Optional: also save every enquiry to a sheet / CRM ----
     Paste a Google Apps Script, Formspree or your own API URL. Leave "" to skip.
     WhatsApp enquiries work either way. */
  formEndpoint: "",

  /* ---- Headline numbers (verify before publishing) ---- */
  stats: [
    { value: 50,   suffix: "+",      label: "Banking & NBFC partners" },
    { value: 5000, suffix: "+",      label: "Customers helped" },
    { value: 800,  prefix: "₹", suffix: " Cr+", label: "Loans facilitated" },
    { value: 10,   suffix: "+",      label: "Years of experience" }
  ],

  /* ---- Approved partner logos only: { name: "Bank name", logo: "assets/partners/bank.png" } ---- */
  partners: [],

  /* ---- Approved customer reviews only ---- */
  testimonials: [
    { text: "Replace this with an approved customer review about a personal loan.", name: "Customer name", loan: "Personal Loan", rating: 5 },
    { text: "Replace this with an approved customer review about a home loan.",     name: "Customer name", loan: "Home Loan",     rating: 5 },
    { text: "Replace this with an approved customer review about a business loan.", name: "Customer name", loan: "Business Loan", rating: 5 }
  ]
};
