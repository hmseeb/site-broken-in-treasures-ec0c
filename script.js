/* Broken in Treasures — Salem, WV
   Progressive enhancement only: the page and form work fully without JS. */
(function () {
  "use strict";

  var ENDPOINT = "https://vision.leadrai.com/api/forms/79930042188c405bc3d7c464a727af95";

  /* Current year in the footer */
  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* Stamp the hidden _page field so submissions know where the visitor was */
  var pageField = document.getElementById("page-field");
  if (pageField) {
    pageField.value = window.location.href;
  }

  var form = document.getElementById("contact-form");
  var success = document.getElementById("form-success");

  function showConfirmation(scroll) {
    if (!success) return;
    success.hidden = false;
    if (form) form.hidden = true;
    if (scroll) {
      success.setAttribute("tabindex", "-1");
      success.focus({ preventScroll: true });
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /* Plain HTML submission returns with ?submitted=1 */
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get("submitted") === "1") {
      showConfirmation(true);
    }
  } catch (e) {
    /* URLSearchParams unavailable — the server response still stands on its own */
  }

  /* Fetch submission to the same endpoint, with a graceful fallback */
  if (form && window.fetch) {
    form.addEventListener("submit", function (event) {
      if (typeof form.reportValidity === "function" && !form.reportValidity()) {
        return; /* let the browser show its own validation messages */
      }

      event.preventDefault();

      var button = form.querySelector('button[type="submit"]');
      var originalLabel = button ? button.textContent : "";
      if (button) {
        button.disabled = true;
        button.textContent = "Sending…";
      }

      if (pageField) pageField.value = window.location.href;

      var payload = {};
      new FormData(form).forEach(function (value, key) {
        payload[key] = value;
      });
      payload._page = window.location.href;

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Request failed: " + response.status);
          return response.json().catch(function () { return { ok: true }; });
        })
        .then(function (data) {
          if (data && data.ok === false) throw new Error("Submission rejected");
          form.reset();
          showConfirmation(true);
        })
        .catch(function () {
          /* Fall back to a normal browser POST so the lead is never lost */
          if (button) {
            button.disabled = false;
            button.textContent = originalLabel;
          }
          /* .submit() does not re-fire the submit event, so there is no loop */
          HTMLFormElement.prototype.submit.call(form);
        });
    });
  }
})();
