/* ============================================================
   BLINKITA BODY · JIN SHIN JYUTSU JS
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  const fingerInfo = document.getElementById("fingerInfo");
  const fingerCards = document.querySelectorAll(".finger-card");

  const fingerContent = {

    palec: {
      title: "PALEC",
      text: "Tukaj bo v naslednjem koraku vnesen preverjen BLINKITA Jin Shin Jyutsu protokol za držanje palca.",
      time: "3–5 MIN",
      type: "SAMOPOMOČ"
    },

    kazalec: {
      title: "KAZALEC",
      text: "Tukaj bo v naslednjem koraku vnesen preverjen BLINKITA Jin Shin Jyutsu protokol za držanje kazalca.",
      time: "3–5 MIN",
      type: "SAMOPOMOČ"
    },

    sredinec: {
      title: "SREDINEC",
      text: "Tukaj bo v naslednjem koraku vnesen preverjen BLINKITA Jin Shin Jyutsu protokol za držanje sredinca.",
      time: "3–5 MIN",
      type: "SAMOPOMOČ"
    },

    prstanec: {
      title: "PRSTANEC",
      text: "Tukaj bo v naslednjem koraku vnesen preverjen BLINKITA Jin Shin Jyutsu protokol za držanje prstanca.",
      time: "3–5 MIN",
      type: "SAMOPOMOČ"
    },

    mezinec: {
      title: "MEZINEC",
      text: "Tukaj bo v naslednjem koraku vnesen preverjen BLINKITA Jin Shin Jyutsu protokol za držanje mezinca.",
      time: "3–5 MIN",
      type: "SAMOPOMOČ"
    }

  };


  fingerCards.forEach(card => {

    card.addEventListener("click", () => {

      fingerCards.forEach(item => item.classList.remove("active"));

      card.classList.add("active");

      const key = card.dataset.finger;
      const item = fingerContent[key];

      if (!item || !fingerInfo) return;

      fingerInfo.innerHTML = `
        <div class="jsj-section-label">
          BLINKITA BODY · ${item.type}
        </div>

        <h3 style="font-size:2rem;font-weight:400;margin:12px 0;">
          ${item.title}
        </h3>

        <p style="line-height:1.8;max-width:760px;">
          ${item.text}
        </p>

        <div class="protocol-meta">
          <b>${item.time}</b>
          <b>${item.type}</b>
        </div>
      `;

      fingerInfo.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    });

  });


  /* ----------------------------------------------------------
     WHAT DO YOU NEED NOW?
  ---------------------------------------------------------- */

  const nowCards = document.querySelectorAll(".jsj-now-card");
  const protocolCards = document.querySelectorAll(".protocol-card");

  nowCards.forEach(card => {

    card.addEventListener("click", () => {

      nowCards.forEach(item => item.classList.remove("active"));
      card.classList.add("active");

      const filter = card.dataset.filter;

      protocolCards.forEach(protocol => {

        const categories = protocol.dataset.category || "";

        if (!filter || categories.includes(filter)) {
          protocol.style.display = "";
        } else {
          protocol.style.display = "none";
        }

      });

      const library = document.getElementById("protocols");

      if (library) {
        setTimeout(() => {
          library.scrollIntoView({
            behavior:"smooth",
            block:"start"
          });
        }, 120);
      }

    });

  });

});

/* =========================================================
   BLINKITA BODY · THERAPY MODAL
========================================================= */

(function () {

  function initTherapyModal() {

    const modal = document.getElementById("therapyModal");

    if (!modal) return;

    const openButtons = document.querySelectorAll(".therapy-modal-open");
    const closeButtons = modal.querySelectorAll("[data-modal-close]");
    const form = document.getElementById("therapyForm");
    const status = document.getElementById("therapyFormStatus");

    function openModal() {

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");

      document.body.classList.add("therapy-modal-open");

      const firstInput = modal.querySelector("input:not([type='hidden'])");

      if (firstInput) {
        setTimeout(function () {
          firstInput.focus();
        }, 50);
      }
    }

    function closeModal() {

      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");

      document.body.classList.remove("therapy-modal-open");
    }

    openButtons.forEach(function (button) {

      button.addEventListener("click", function () {
        openModal();
      });

    });

    closeButtons.forEach(function (button) {

      button.addEventListener("click", function () {
        closeModal();
      });

    });

    document.addEventListener("keydown", function (event) {

      if (
        event.key === "Escape" &&
        modal.classList.contains("is-open")
      ) {
        closeModal();
      }

    });

    if (form) {

      form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const endpoint = form.getAttribute("action");

        if (
          !endpoint ||
          endpoint.includes("YOUR_FORMSPREE_FORM_ID")
        ) {

          status.className = "therapy-form-status error";

          status.textContent =
            "Obrazec še ni povezan s Formspree obrazcem.";

          return;
        }

        const submitButton =
          form.querySelector(".therapy-form-submit");

        submitButton.disabled = true;
        submitButton.textContent = "POŠILJAM …";

        status.className = "therapy-form-status";
        status.textContent = "";

        try {

          const response = await fetch(
            endpoint,
            {
              method: "POST",
              body: new FormData(form),
              headers: {
                "Accept": "application/json"
              }
            }
          );

          if (response.ok) {

            form.reset();

            status.className =
              "therapy-form-status success";

            status.innerHTML =
              "<strong>Hvala.</strong><br>" +
              "Tvoje povpraševanje je poslano. " +
              "Odgovorim ti v najkrajšem možnem času.";

            submitButton.textContent =
              "POSLANO";

          } else {

            status.className =
              "therapy-form-status error";

            status.textContent =
              "Pri pošiljanju je prišlo do napake. " +
              "Poskusi ponovno.";

            submitButton.disabled = false;

            submitButton.textContent =
              "POŠLJI POVPRAŠEVANJE";
          }

        } catch (error) {

          status.className =
            "therapy-form-status error";

          status.textContent =
            "Povezava ni uspela. Preveri internetno povezavo " +
            "in poskusi ponovno.";

          submitButton.disabled = false;

          submitButton.textContent =
            "POŠLJI POVPRAŠEVANJE";
        }

      });

    }

  }

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initTherapyModal
    );

  } else {

    initTherapyModal();

  }

})();
