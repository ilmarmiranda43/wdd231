const form = document.querySelector(".assessment-form");
const submittedAt = document.querySelector("#submitted-at");
const challenge = document.querySelector("textarea[name='challenge']");
const challengeCount = document.querySelector("#challenge-count");
const processField = document.querySelector("input[name='process']");

const selectedAutomation = new URLSearchParams(window.location.search).get("automation");
if (selectedAutomation) processField.value = selectedAutomation;

function updateCharacterCount() {
  challengeCount.textContent = challenge.value.length;
}

challenge.addEventListener("input", updateCharacterCount);
updateCharacterCount();
form.addEventListener("submit", () => { submittedAt.value = new Date().toISOString(); });
