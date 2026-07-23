const parameters = new URLSearchParams(window.location.search);

const summaryFields = {
  first: "#summary-first",
  last: "#summary-last",
  email: "#summary-email",
  phone: "#summary-phone",
  organization: "#summary-organization"
};

Object.entries(summaryFields).forEach(([parameter, selector]) => {
  const value = parameters.get(parameter);
  if (value) {
    document.querySelector(selector).textContent = value;
  }
});

const timestamp = parameters.get("timestamp");
if (timestamp) {
  const submittedDate = new Date(timestamp);
  if (!Number.isNaN(submittedDate.getTime())) {
    document.querySelector("#summary-date").textContent = submittedDate.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short"
    });
  }
}
