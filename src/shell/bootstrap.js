import { mountSlots } from "./mountSlots.js";
import { watchFixedFooter } from "./sheetLayout.js";

async function bootstrapShell() {
  document.body.classList.add("footer-only-debug");

  await mountSlots([
    { selector: "#fixed-footer", url: "./partials/fixed-footer.html" },
  ]);

  watchFixedFooter();
}

bootstrapShell().catch((err) => {
  console.error("Shell bootstrap failed:", err);
  document.body.insertAdjacentHTML(
    "beforeend",
    `<p style="padding:24px;color:#900;font-family:system-ui,sans-serif">Failed to load shell: ${err.message}. Serve this folder over HTTP (see README).</p>`
  );
});
