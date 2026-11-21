AURA FINKART — WEBSITE
======================

HOW TO OPEN
  Unzip, then double-click index.html. Keep all files and the "assets" folder together.

HOW TO PUT IT ONLINE
  Upload the whole folder to any web host (cPanel / Hostinger / Netlify / Vercel).
  index.html must stay at the top level.

STEP 1 — ADD YOUR REAL NUMBERS  (important: WhatsApp and Call do not work until you do this)
  Open config.js in Notepad and change:
    phoneDisplay  -> how the number shows on the page, e.g. "+91 98765 43210"
    phoneTel      -> same number for tap-to-call, e.g. "+919876543210"
    whatsapp      -> country code + number, NO plus or spaces, e.g. "919876543210"
    email, address, hours
  Every Call button, WhatsApp button, the floating WhatsApp icon, the mobile
  bottom bar and both enquiry forms use these values automatically.

HOW ENQUIRIES WORK
  Both forms (hero "Quick enquiry" and "Apply now") open WhatsApp with the
  customer's name, mobile, loan type, city and amount already typed into a
  message to your number. They press Send.
  Optional: put a Google Apps Script / Formspree URL in "formEndpoint" in
  config.js to also save every enquiry to a sheet.

BEFORE YOU PUBLISH — CLIENT MUST CONFIRM
  * stats in config.js (50+ partners, 5,000+ customers, ₹800 Cr+, 10+ years)
    were taken from the reference website and are not verified.
  * testimonials in config.js are placeholders — use approved reviews only.
  * partners in config.js is empty — add only approved bank/NBFC logos
    (put logo files in assets/ and list them as { name, logo }).
  * loan rates show "Ask our advisor" — add rates only when approved.
  * Privacy Policy / Terms / Disclaimer footer links are placeholders (#).

FILES
  index.html  page content        style.css  design
  script.js   behaviour           config.js  YOUR SETTINGS (edit this one)
  assets/     photos and logo files
