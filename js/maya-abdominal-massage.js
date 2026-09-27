document.addEventListener("DOMContentLoaded", function () {

  /*
   * ==========================================================
   * BLINKITA BODY · MAYA ABDOMINAL MASSAGE
   * Booking modal
   * ==========================================================
   */

  const modal = document.getElementById("mayaModal");
  const form = document.getElementById("mayaForm");
  const status = document.getElementById("mayaFormStatus");

  if (!modal) {
    return;
  }


  const openButtons =
    document.querySelectorAll("[data-open-maya-modal]");

  const closeButtons =
    document.querySelectorAll("[data-close-maya-modal]");


  function openModal() {

    modal.classList.add("is-open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "maya-modal-open"
    );

    const firstInput =
      modal.querySelector("input");

    if (firstInput) {

      setTimeout(function () {
        firstInput.focus();
      }, 80);

    }

  }


  function closeModal() {

    modal.classList.remove("is-open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "maya-modal-open"
    );

  }


  openButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      openModal
    );

  });


  closeButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      closeModal
    );

  });


  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        modal.classList.contains("is-open")
      ) {

        closeModal();

      }

    }
  );


  /*
   * ==========================================================
   * FORMSPREE
   * ==========================================================
   */

  if (form) {

    form.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();

        if (status) {
          status.textContent =
            "Pošiljam…";
        }

        const data =
          new FormData(form);


        try {

          const response =
            await fetch(
              form.action,
              {
                method: "POST",
                body: data,
                headers: {
                  "Accept":
                    "application/json"
                }
              }
            );


          if (response.ok) {

            form.reset();

            if (status) {

              status.textContent =
                "Hvala. Tvoje sporočilo je bilo poslano. Odgovorim ti osebno.";

            }

          } else {

            if (status) {

              status.textContent =
                "Pošiljanje trenutno ni uspelo. Preveri Formspree povezavo in poskusi ponovno.";

            }

          }


        } catch (error) {

          if (status) {

            status.textContent =
              "Prišlo je do napake pri pošiljanju. Poskusi ponovno.";

          }

        }

      }
    );

  }

});
