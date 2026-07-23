const timestampField = document.querySelector("#timestamp");
const membershipSelect = document.querySelector("#membership-level");
const dialogButtons = document.querySelectorAll("[data-dialog]");
const dialogs = document.querySelectorAll("dialog");

timestampField.value = new Date().toISOString();

dialogButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.querySelector(`#${button.dataset.dialog}`);
    if (dialog) {
      dialog.showModal();
    }
  });
});

dialogs.forEach((dialog) => {
  const closeButton = dialog.querySelector(".close-dialog");
  const selectButton = dialog.querySelector("[data-select-level]");

  closeButton.addEventListener("click", () => dialog.close());

  selectButton.addEventListener("click", () => {
    membershipSelect.value = selectButton.dataset.selectLevel;
    dialog.close();
    membershipSelect.focus();
  });

  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const isOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (isOutside) {
      dialog.close();
    }
  });
});
