import { mountSlots } from "./mountSlots.js";
import { watchFixedFooter, syncFooterReserve } from "./sheetLayout.js";

async function bootstrapShell() {
  await mountSlots([
    { selector: "#scroll-content", url: "./partials/scroll-content.html" },
    { selector: "#fixed-footer", url: "./partials/fixed-footer.html" },
  ]);

  watchFixedFooter();

  const { bootstrap } = await import("../main.js");
  await bootstrap();
  syncFooterReserve();
}

bootstrapShell().catch((err) => {
  console.error("Shell bootstrap failed:", err);
  document.body.insertAdjacentHTML(
    "beforeend",
    `<p style="padding:24px;color:#900;font-family:system-ui,sans-serif">Failed to load app: ${err.message}. Serve this folder over HTTP (see README).</p>`
  );
});
