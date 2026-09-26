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
