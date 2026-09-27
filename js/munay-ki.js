(function () {
  "use strict";

  /*
    BLINKITA · MUNAY KI
    Bilingual reservation system

    IMPORTANT:
    Replace YOUR_FORMSPREE_FORM_ID with the real Formspree ID
    when the form is created.
  */

  const FORMSPREE_ENDPOINT =
    "https://formspree.io/f/mjykadqk";

  let modal = null;

  const LANG =
    (document.documentElement.lang || "sl")
      .toLowerCase()
      .startsWith("en")
      ? "en"
      : "sl";

  const I18N = {

    sl: {
      services: [
        "Munay Ki ob polni luni",
        "Munay Ki terapija",
        "Munay Ki intenziv · 3 × 3 iniciacije",
        "Munay Ki coaching"
      ],

      kicker: "BLINKITA · MUNAY KI",

      title: "Rezerviraj svojo izkušnjo",

      close: "Zapri",

      serviceLabel: "Izbrana storitev",
      formatLabel: "Format",
      nameLabel: "Ime in priimek",
      emailLabel: "E-mail",
      phoneLabel: "WhatsApp / telefon",
      dateLabel: "Želeni termin",
      messageLabel: "Sporočilo",

      formatPlaceholder: "Izberi format",
      online: "ONLINE",
      belize: "V ŽIVO V BELIZEJU",

      datePlaceholder:
        "Na primer: naslednja polna luna / 15. oktober",

      messagePlaceholder:
        "Če želiš, mi napiši še nekaj o tem, kaj te je pripeljalo sem.",

      submit: "POŠLJI REZERVACIJO",
      sending: "POŠILJAM …",
      secondary: "ZAPRI",

      footer:
        "BLINKITA · ONLINE · V ŽIVO V BELIZEJU",

      subject:
        "BLINKITA · Nova Munay Ki rezervacija",

      language:
        "sl",

      notConfigured:
        "Obrazec je pripravljen. Za dejansko pošiljanje je treba vstaviti tvoj pravi Formspree ID.",

      success:
        "Tvoja rezervacija je prejeta. Hvala. Tvoje sporočilo je prispelo v BLINKITA. Odgovorim ti osebno.",

      error:
        "Pošiljanje trenutno ni uspelo. Prosim, poskusi ponovno."
    },

    en: {
      services: [
        "Munay Ki Full Moon",
        "Munay Ki Therapy",
        "Munay Ki Intensive · 3 × 3 Initiations",
        "Munay Ki Coaching"
      ],

      kicker: "BLINKITA · MUNAY KI",

      title: "Reserve Your Experience",

      close: "Close",

      serviceLabel: "Selected experience",
      formatLabel: "Format",
      nameLabel: "Full name",
      emailLabel: "E-mail",
      phoneLabel: "WhatsApp / phone",
      dateLabel: "Preferred date",
      messageLabel: "Message",

      formatPlaceholder: "Choose format",
      online: "ONLINE",
      belize: "IN PERSON IN BELIZE",

      datePlaceholder:
        "For example: next full moon / October 15",

      messagePlaceholder:
        "If you wish, tell me a little about what brought you here.",

      submit: "SEND RESERVATION",
      sending: "SENDING …",
      secondary: "CLOSE",

      footer:
        "BLINKITA · ONLINE · IN PERSON IN BELIZE",

      subject:
        "BLINKITA · New Munay Ki reservation",

      language:
        "en",

      notConfigured:
        "The form is ready. To send it, your real Formspree ID still needs to be added.",

      success:
        "Your reservation has been received. Thank you. Your message has reached BLINKITA and I will reply personally.",

      error:
        "The message could not be sent right now. Please try again."
    }

  };

  const T = I18N[LANG];


  function createModal() {

    if (modal) return modal;

    modal = document.createElement("div");

    modal.className = "munay-ki-reservation-modal";
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div class="munay-ki-modal-backdrop"></div>

      <div
        class="munay-ki-modal-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="munayKiModalTitle">

        <button
          type="button"
          class="munay-ki-modal-close"
          aria-label="${T.close}">
          ×
        </button>

        <div class="munay-ki-modal-kicker">
          ${T.kicker}
        </div>

        <h2 id="munayKiModalTitle">
          ${T.title}
        </h2>

        <div class="munay-ki-modal-line"></div>

        <form
          class="munay-ki-form"
          id="munayKiReservationForm">

          <div class="munay-ki-field">
            <label for="munayKiService">
              ${T.serviceLabel}
            </label>

            <select
              id="munayKiService"
              name="service"
              required>
            </select>
          </div>

          <div class="munay-ki-field">
            <label for="munayKiFormat">
              ${T.formatLabel}
            </label>

            <select
              id="munayKiFormat"
              name="format"
              required>

              <option value="">
                ${T.formatPlaceholder}
              </option>

              <option value="ONLINE">
                ${T.online}
              </option>

              <option value="${T.belize}">
                ${T.belize}
              </option>

            </select>
          </div>

          <div class="munay-ki-field">
            <label for="munayKiName">
              ${T.nameLabel}
            </label>

            <input
              id="munayKiName"
              name="name"
              type="text"
              autocomplete="name"
              required>
          </div>

          <div class="munay-ki-field">
            <label for="munayKiEmail">
              ${T.emailLabel}
            </label>

            <input
              id="munayKiEmail"
              name="email"
              type="email"
              autocomplete="email"
              required>
          </div>

          <div class="munay-ki-field">
            <label for="munayKiPhone">
              ${T.phoneLabel}
            </label>

            <input
              id="munayKiPhone"
              name="phone"
              type="text"
              autocomplete="tel">
          </div>

          <div class="munay-ki-field">
            <label for="munayKiDate">
              ${T.dateLabel}
            </label>

            <input
              id="munayKiDate"
              name="preferred_date"
              type="text"
              placeholder="${T.datePlaceholder}">
          </div>

          <div class="munay-ki-field">
            <label for="munayKiMessage">
              ${T.messageLabel}
            </label>

            <textarea
              id="munayKiMessage"
              name="message"
              placeholder="${T.messagePlaceholder}"></textarea>
          </div>

          <input
            type="hidden"
            name="_subject"
            value="${T.subject}">

          <input
            type="hidden"
            name="_language"
            value="${T.language}">

          <div class="munay-ki-modal-actions">

            <button
              type="submit"
              class="munay-ki-submit">
              ${T.submit}
            </button>

            <button
              type="button"
              class="munay-ki-modal-secondary">
              ${T.secondary}
            </button>

          </div>

          <div
            class="munay-ki-form-status"
            id="munayKiFormStatus"
            role="status"
            aria-live="polite">
          </div>

        </form>

        <div class="munay-ki-modal-footer">
          ${T.footer}
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    const serviceSelect =
      modal.querySelector("#munayKiService");

    T.services.forEach(function (service) {

      const option =
        document.createElement("option");

      option.value = service;
      option.textContent = service;

      serviceSelect.appendChild(option);
    });

    modal
      .querySelector(".munay-ki-modal-close")
      .addEventListener("click", closeModal);

    modal
      .querySelector(".munay-ki-modal-secondary")
      .addEventListener("click", closeModal);

    modal
      .querySelector(".munay-ki-modal-backdrop")
      .addEventListener("click", closeModal);

    modal
      .querySelector("#munayKiReservationForm")
      .addEventListener("submit", submitForm);

    return modal;
  }


  function getSelectedService(program) {

    if (!program) return "";

    const p =
      program
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    const index =
      T.services.findIndex(function (service) {

        const s =
          service
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();

        return (
          p === s ||
          p.includes(s) ||
          s.includes(p)
        );
      });

    if (index >= 0) {
      return T.services[index];
    }

    return "";
  }


  function openModal(program) {

    const m = createModal();

    const service =
      m.querySelector("#munayKiService");

    const status =
      m.querySelector("#munayKiFormStatus");

    const selected =
      getSelectedService(program);

    if (selected) {
      service.value = selected;
    }

    status.classList.remove("is-visible");
    status.textContent = "";

    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");

    document.body.classList.add(
      "munay-ki-reservation-open"
    );

    setTimeout(function () {

      const name =
        m.querySelector("#munayKiName");

      if (name) name.focus();

    }, 80);
  }


  function closeModal() {

    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove(
      "munay-ki-reservation-open"
    );
  }


  async function submitForm(event) {

    event.preventDefault();

    const form = event.currentTarget;

    const submit =
      form.querySelector(".munay-ki-submit");

    const status =
      form.querySelector("#munayKiFormStatus");

    if (
      FORMSPREE_ENDPOINT.includes(
        "YOUR_FORMSPREE_FORM_ID"
      )
    ) {

      status.textContent =
        T.notConfigured;

      status.classList.add("is-visible");

      return;
    }

    submit.disabled = true;
    submit.textContent = T.sending;

    try {

      const response = await fetch(
        FORMSPREE_ENDPOINT,
        {
          method: "POST",
          body: new FormData(form),
          headers: {
            "Accept": "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error("Formspree error");
      }

      form.reset();

      status.textContent =
        T.success;

      status.classList.add("is-visible");

    } catch (error) {

      status.textContent =
        T.error;

      status.classList.add("is-visible");

    } finally {

      submit.disabled = false;
      submit.textContent = T.submit;

    }
  }


  function setup() {

    document.addEventListener("click", function (event) {

      const trigger =
        event.target.closest(
          ".munayki-cta[data-program]"
        );

      if (!trigger) return;

      event.preventDefault();
      event.stopPropagation();

      openModal(
        trigger.getAttribute("data-program")
      );

    });


    document.addEventListener("keydown", function (event) {

      if (event.key === "Escape") {
        closeModal();
      }

    });

  }


  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      setup
    );

  } else {

    setup();

  }

})();

