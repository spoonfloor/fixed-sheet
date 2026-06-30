const startButton = document.querySelector("#startButton");
const statusText = document.querySelector("#statusText");

startButton?.addEventListener("click", () => {
  statusText.textContent = "Ready for the next feature.";
});
