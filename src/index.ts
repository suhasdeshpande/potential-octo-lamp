import { detectLeaks } from "./detect-leaks";
import { notifyLeaks } from "./notify-leaks";

(async function init() {
  const isLeaking = await detectLeaks();
  if (isLeaking) {
    console.log("Leak detected!");
    await notifyLeaks();
  }
})();
