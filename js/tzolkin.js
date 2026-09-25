/* ============================================================
   BLINKITA TZOLK'IN ENGINE
   Traditional Maya 260-day calendar

   Structure:
   - 20 named days
   - 13 numbers
   - 260 unique combinations

   Comparative names:
   - K'iche'
   - Yucatec
   - International / common reference

   Reference used by this engine:
   2012-12-21 = 4 Ajaw

   IMPORTANT:
   This engine does NOT use Dreamspell terminology.
   The numbers 1–13 are treated as the traditional
   13-number cycle of the Tzolk'in / Cholq'ij.

   BLINKITA SI
   ============================================================ */

(function () {
    "use strict";

    /* ----------------------------------------------------------
       20 DAY SIGNS

       Order follows the traditional 20-day cycle represented
       through the Yucatec/common Maya naming sequence.

       K'iche' ↔ Yucatec ↔ International
       ---------------------------------------------------------- */

    const TZOLKIN_SIGNS = [
        {
            index: 0,
            asset: "imix",
            kiche: "Imox",
            yucatec: "Imix",
            international: "Imix",
            meaningSl: "Voda",
            meaningEn: "Water",
            keywordsSl: ["voda", "začetek", "življenje", "izvor"],
            keywordsEn: ["water", "beginning", "life", "source"]
        },
        {
            index: 1,
            asset: "ik",
            kiche: "Iq'",
            yucatec: "Ik'",
            international: "Ik'",
            meaningSl: "Dih",
            meaningEn: "Breath",
            keywordsSl: ["dih", "veter", "življenjska sila", "gibanje"],
            keywordsEn: ["breath", "wind", "life force", "movement"]
        },
        {
            index: 2,
            asset: "akbal",
            kiche: "Aq'ab'al",
            yucatec: "Ak'b'al",
            international: "Akbal",
            meaningSl: "Tema",
            meaningEn: "Darkness",
            keywordsSl: ["tema", "noč", "zora", "svetloba"],
            keywordsEn: ["darkness", "night", "dawn", "light"]
        },
        {
            index: 3,
            asset: "kan",
            kiche: "K'at",
            yucatec: "K'an",
            international: "Kan",
            meaningSl: "Seme",
            meaningEn: "Seed",
            keywordsSl: ["seme", "mreža", "ogenj", "rojstvo"],
            keywordsEn: ["seed", "net", "fire", "birth"]
        },
        {
            index: 4,
            asset: "chicchan",
            kiche: "Kan",
            yucatec: "Chikchan",
            international: "Chicchan",
            meaningSl: "Kača",
            meaningEn: "Serpent",
            keywordsSl: ["kača", "moč", "življenjska sila", "preobrazba"],
            keywordsEn: ["serpent", "strength", "life force", "transformation"]
        },
        {
            index: 5,
            asset: "cimi",
            kiche: "Kame",
            yucatec: "Kimi",
            international: "Cimi",
            meaningSl: "Smrt",
            meaningEn: "Death",
            keywordsSl: ["predniki", "preobrazba", "prehod", "osvoboditev"],
            keywordsEn: ["ancestors", "transformation", "transition", "release"]
        },
        {
            index: 6,
            asset: "manik",
            kiche: "Kej",
            yucatec: "Manik'",
            international: "Manik",
            meaningSl: "Jelen",
            meaningEn: "Deer",
            keywordsSl: ["jelen", "zemlja", "podpora", "moč"],
            keywordsEn: ["deer", "earth", "support", "strength"]
        },
        {
            index: 7,
            asset: "lamat",
            kiche: "Q'anil",
            yucatec: "Lamat",
            international: "Lamat",
            meaningSl: "Zvezda",
            meaningEn: "Star",
            keywordsSl: ["zvezda", "seme", "zorenje", "cikel"],
            keywordsEn: ["star", "seed", "ripening", "cycle"]
        },
        {
            index: 8,
            asset: "muluc",
            kiche: "Toj",
            yucatec: "Muluk",
            international: "Muluc",
            meaningSl: "Voda",
            meaningEn: "Water",
            keywordsSl: ["voda", "daritev", "čiščenje", "ogenj"],
            keywordsEn: ["water", "offering", "cleansing", "fire"]
        },
        {
            index: 9,
            asset: "oc",
            kiche: "Tz'i'",
            yucatec: "Ok",
            international: "Oc",
            meaningSl: "Pes",
            meaningEn: "Dog",
            keywordsSl: ["pes", "čuti", "zvestoba", "pravičnost"],
            keywordsEn: ["dog", "senses", "loyalty", "justice"]
        },
        {
            index: 10,
            asset: "chuen",
            kiche: "B'atz'",
            yucatec: "Chuwen",
            international: "Chuen",
            meaningSl: "Opica",
            meaningEn: "Monkey",
            keywordsSl: ["opica", "ustvarjanje", "umetnost", "igra"],
            keywordsEn: ["monkey", "creation", "art", "play"]
        },
        {
            index: 11,
            asset: "eb",
            kiche: "E",
            yucatec: "Eb'",
            international: "Eb",
            meaningSl: "Pot",
            meaningEn: "Road",
            keywordsSl: ["pot", "dež", "življenje", "usmeritev"],
            keywordsEn: ["road", "rain", "life", "direction"]
        },
        {
            index: 12,
            asset: "ben",
            kiche: "Aj",
            yucatec: "B'en",
            international: "Ben",
            meaningSl: "Koruza",
            meaningEn: "Maize",
            keywordsSl: ["koruza", "rast", "steblo", "življenje"],
            keywordsEn: ["maize", "growth", "stalk", "life"]
        },
        {
            index: 13,
            asset: "ix",
            kiche: "I'x",
            yucatec: "Ix",
            international: "Ix",
            meaningSl: "Jaguar",
            meaningEn: "Jaguar",
            keywordsSl: ["jaguar", "zemlja", "skrivnost", "moč"],
            keywordsEn: ["jaguar", "earth", "mystery", "power"]
        },
        {
            index: 14,
            asset: "men",
            kiche: "Tz'ikin",
            yucatec: "Men",
            international: "Men",
            meaningSl: "Orel",
            meaningEn: "Eagle",
            keywordsSl: ["orel", "vid", "vizija", "nebo"],
            keywordsEn: ["eagle", "vision", "sky", "perspective"]
        },
        {
            index: 15,
            asset: "cib",
            kiche: "Ajmaq",
            yucatec: "K'ib'",
            international: "Cib",
            meaningSl: "Modrost",
            meaningEn: "Wisdom",
            keywordsSl: ["modrost", "predniki", "odpuščanje", "spomin"],
            keywordsEn: ["wisdom", "ancestors", "forgiveness", "memory"]
        },
        {
            index: 16,
            asset: "caban",
            kiche: "No'j",
            yucatec: "Kab'an",
            international: "Caban",
            meaningSl: "Zemlja",
            meaningEn: "Earth",
            keywordsSl: ["zemlja", "znanje", "gibanje", "misel"],
            keywordsEn: ["earth", "knowledge", "movement", "thought"]
        },
        {
            index: 17,
            asset: "etznab",
            kiche: "Tijax",
            yucatec: "Etz'nab'",
            international: "Etznab",
            meaningSl: "Kremen",
            meaningEn: "Flint",
            keywordsSl: ["kremen", "ogledalo", "resnica", "jasnost"],
            keywordsEn: ["flint", "mirror", "truth", "clarity"]
        },
        {
            index: 18,
            asset: "cauac",
            kiche: "Kawoq",
            yucatec: "Kawak",
            international: "Cauac",
            meaningSl: "Nevihta",
            meaningEn: "Storm",
            keywordsSl: ["nevihta", "dež", "čiščenje", "preobrazba"],
            keywordsEn: ["storm", "rain", "cleansing", "transformation"]
        },
        {
            index: 19,
            asset: "ahau",
            kiche: "Ajpu'",
            yucatec: "Ajaw",
            international: "Ahau",
            meaningSl: "Sonce",
            meaningEn: "Sun",
            keywordsSl: ["sonce", "svetloba", "vodenje", "celovitost"],
            keywordsEn: ["sun", "light", "guidance", "wholeness"]
        }
    ];

    /* ----------------------------------------------------------
       13 NUMBERS

       These are simply the traditional 1–13 numerical cycle.
       They are NOT Dreamspell "tones".

       The tone-1.png ... tone-13.png files are retained as
       graphical assets only.
       ---------------------------------------------------------- */

    const TZOLKIN_NUMBERS = Array.from(
        { length: 13 },
        function (_, index) {
            const number = index + 1;

            return {
                number: number,
                asset: `tone-${number}`,
                label: String(number)
            };
        }
    );

    /* ----------------------------------------------------------
       DATE HELPERS
       ---------------------------------------------------------- */

    function normalizeDate(input) {
        if (!input) {
            const now = new Date();

            return new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                12,
                0,
                0
            );
        }

        if (input instanceof Date) {
            return new Date(
                input.getFullYear(),
                input.getMonth(),
                input.getDate(),
                12,
                0,
                0
            );
        }

        const value = String(input).trim();

        /*
           Accept:
           YYYY-MM-DD
           Date-compatible values
        */

        if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            const parts = value.split("-").map(Number);

            return new Date(
                parts[0],
                parts[1] - 1,
                parts[2],
                12,
                0,
                0
            );
        }

        const parsed = new Date(value);

        if (Number.isNaN(parsed.getTime())) {
            return new Date(NaN);
        }

        return new Date(
            parsed.getFullYear(),
            parsed.getMonth(),
            parsed.getDate(),
            12,
            0,
            0
        );
    }

    function isoDate(date) {
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
            return "";
        }

        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");

        return `${y}-${m}-${d}`;
    }

    /* ----------------------------------------------------------
       MODULO HELPER

       JavaScript % can return negative numbers.
       This keeps the cycle always inside its positive range.
       ---------------------------------------------------------- */

    function positiveModulo(value, divisor) {
        return ((value % divisor) + divisor) % divisor;
    }

    /* ----------------------------------------------------------
       TZOLK'IN CALCULATION

       Reference:
       2012-12-21 = 4 Ajaw

       Therefore:

       Number:
       ((days + 3) mod 13) + 1

       Sign:
       (days + 19) mod 20
       ---------------------------------------------------------- */

    function tzolkinForDate(input) {
        const date = normalizeDate(input);

        if (Number.isNaN(date.getTime())) {
            return null;
        }

        const reference = new Date(
            2012,
            11,
            21,
            12,
            0,
            0
        );

        const days = Math.round(
            (date.getTime() - reference.getTime()) / 86400000
        );

        const numberIndex =
            positiveModulo(days + 3, 13);

        const signIndex =
            positiveModulo(days + 19, 20);

        const number =
            TZOLKIN_NUMBERS[numberIndex];

        const sign =
            TZOLKIN_SIGNS[signIndex];

        return {
            date: isoDate(date),

            daysFromReference: days,

            /*
               Traditional 1–13 number
            */
            number: number.number,

            numberData: number,

            /*
               20-day sign
            */
            sign: sign,

            /*
               Convenient direct names
            */
            kiche: sign.kiche,
            yucatec: sign.yucatec,
            international: sign.international,

            meaningSl: sign.meaningSl,
            meaningEn: sign.meaningEn,

            keywordsSl: sign.keywordsSl || [],
            keywordsEn: sign.keywordsEn || [],

            asset: sign.asset,

            signAsset:
                `assets/tzolkin/${sign.asset}.png`,

            numberAsset:
                `assets/tzolkin/tone-${number.number}.png`,

            /*
               Complete names
            */
            kin:
                `${number.number} ${sign.yucatec}`,

            kinKiche:
                `${number.number} ${sign.kiche}`,

            kinYucatec:
                `${number.number} ${sign.yucatec}`,

            kinInternational:
                `${number.number} ${sign.international}`
        };
    }

    /* ----------------------------------------------------------
       SIGN LOOKUP
       ---------------------------------------------------------- */

    function getSign(name) {
        if (!name) {
            return null;
        }

        const value =
            String(name)
                .trim()
                .toLowerCase();

        return (
            TZOLKIN_SIGNS.find(function (sign) {
                return (
                    sign.kiche.toLowerCase() === value ||
                    sign.yucatec.toLowerCase() === value ||
                    sign.international.toLowerCase() === value ||
                    sign.asset.toLowerCase() === value
                );
            }) || null
        );
    }

    /* ----------------------------------------------------------
       NUMBER LOOKUP
       ---------------------------------------------------------- */

    function getNumber(value) {
        const n = Number(value);

        if (!Number.isInteger(n)) {
            return null;
        }

        return (
            TZOLKIN_NUMBERS.find(function (item) {
                return item.number === n;
            }) || null
        );
    }

    /* ----------------------------------------------------------
       ASSET PATHS
       ---------------------------------------------------------- */

    function getSignAsset(sign) {
        if (!sign) {
            return "";
        }

        if (typeof sign === "string") {
            sign = getSign(sign);
        }

        if (!sign) {
            return "";
        }

        return `assets/tzolkin/${sign.asset}.png`;
    }

    function getNumberAsset(number) {
        const item = getNumber(number);

        if (!item) {
            return "";
        }

        return `assets/tzolkin/tone-${item.number}.png`;
    }

    /* ----------------------------------------------------------
       LANGUAGE HELPER
       ---------------------------------------------------------- */

    function getSignName(result, language) {
        if (!result || !result.sign) {
            return "";
        }

        switch (
            String(language || "")
                .toLowerCase()
        ) {
            case "kiche":
            case "k'iche'":
            case "kiche'":
                return result.sign.kiche;

            case "yucatec":
                return result.sign.yucatec;

            case "international":
            case "common":
                return result.sign.international;

            case "both":
            case "dual":
            default:
                return `${result.sign.kiche} · ${result.sign.yucatec}`;
        }
    }

    /* ----------------------------------------------------------
       RENDER

       Existing BLINKITA markup can continue using:

       <div data-tzolkin></div>

       Optional date:

       <input data-tzolkin-date>
       ---------------------------------------------------------- */
    function formatDisplayDate(date, isEnglish) {
        const d = normalizeDate(date);
        const day = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();

        if (isEnglish) {
            const months = [
                "January", "February", "March", "April",
                "May", "June", "July", "August",
                "September", "October", "November", "December"
            ];

            return months[month] + " " + day + ", " + year;
        }

        return day + ". " + (month + 1) + ". " + year;
    }

    function getLocalizedMeaning(result, isEnglish) {
        return isEnglish
            ? (result.meaningEn || "")
            : (result.meaningSl || "");
    }

    function getLocalizedKeywords(result, isEnglish) {
        return isEnglish
            ? (result.keywordsEn || [])
            : (result.keywordsSl || []);
    }

    function renderTzolkin(input) {
        const el =
            document.querySelector("[data-tzolkin]");

        if (!el) {
            return null;
        }

        let iso = input;

        if (!iso) {
            const dateInput =
                document.querySelector("[data-tzolkin-date]");

            if (dateInput && dateInput.value) {
                iso = dateInput.value;
            }
        }

        const result = tzolkinForDate(iso);

        if (!result) {
            el.innerHTML =
                `<span class="tz-error">Neveljaven datum.</span>`;

            return null;
        }

        const lang =
            (document.documentElement.lang || "sl").toLowerCase();

        const isEnglish =
            lang.indexOf("en") === 0;

        const displayName =
            result.international || result.yucatec || result.kiche;

        const meaning =
            getLocalizedMeaning(result, isEnglish);

        const keywords =
            getLocalizedKeywords(result, isEnglish);

        function normalizeTzolkinAsset(asset) {
            if (!asset) return "";

            let file = String(asset)
                .replace(/\\/g, "/")
                .split("/")
                .pop();

            file = file.replace(/\.png$/i, "");

            return file;
        }

        const signFile =
            normalizeTzolkinAsset(result.signAsset);

        const numberFile =
            normalizeTzolkinAsset(result.numberAsset);

        const signImage =
            signFile
                ? "../assets/tzolkin/" + signFile + ".png"
                : "";

        const numberImage =
            numberFile
                ? "../assets/tzolkin/" + numberFile + ".png"
                : "";

        const keywordLabel =
            isEnglish
                ? "KEYWORDS"
                : "KLJUČNE BESEDE";

        const displayDate =
            formatDisplayDate(result.date, isEnglish);

        const keywordsHtml =
            keywords.length
                ? keywords.map(function (keyword) {
                    return `<span class="tz-keyword">${keyword}</span>`;
                }).join(
                    `<span class="tz-keyword-separator"> · </span>`
                )
                : "";

        const tzLabel =
            isEnglish
                ? "TZOLK'IN · TRADITIONAL COUNT"
                : "TZOLK'IN · TRADICIONALNO ŠTETJE";

        const dailyCodeLabel =
            isEnglish
                ? "DAILY CODE OF LIVING TIME"
                : "DNEVNA KODA ŽIVEGA ČASA";

        el.innerHTML = `
            <div class="tzolkin-result">

                <span class="tz-label">
                    ${tzLabel}
                </span>

                <span class="tz-daily-code">${dailyCodeLabel}</span>

                <div class="tz-images">

                    <img
                        class="tz-number-image"
                        src="${numberImage}"
                        alt="${result.number}"
                    >

                    <img
                        class="tz-sign-image"
                        src="${signImage}"
                        alt="${displayName}"
                    >

                </div>

                <strong class="tz-main-name">${result.number} ${displayName}, ${meaning}</strong>

                <span class="tz-keywords-title">
                    ${keywordLabel}
                </span>

                <span class="tz-keywords">
                    ${keywordsHtml}
                </span>

                <small class="tz-date">
                    ${displayDate}
                </small>

            </div>
        `;

        return result;
    }
/* ----------------------------------------------------------
       DATE INPUT AUTO-UPDATE
       ---------------------------------------------------------- */

    function bindDateInput() {
        const input =
            document.querySelector(
                "[data-tzolkin-date]"
            );

        if (!input) {
            return;
        }

        input.addEventListener(
            "change",
            function () {
                renderTzolkin(input.value);
            }
        );

        input.addEventListener(
            "input",
            function () {
                if (
                    /^\d{4}-\d{2}-\d{2}$/.test(
                        input.value
                    )
                ) {
                    renderTzolkin(input.value);
                }
            }
        );
    }

    /* ----------------------------------------------------------
       PUBLIC BLINKITA API
       ---------------------------------------------------------- */

    window.BLINKITA_TZOLKIN = {
        signs: TZOLKIN_SIGNS,
        numbers: TZOLKIN_NUMBERS,

        tzolkinForDate:
            tzolkinForDate,

        getSign:
            getSign,

        getNumber:
            getNumber,

        getSignName:
            getSignName,

        getSignAsset:
            getSignAsset,

        getNumberAsset:
            getNumberAsset,

        render:
            renderTzolkin,

        positiveModulo:
            positiveModulo
    };

    /* ----------------------------------------------------------
       BACKWARD COMPATIBILITY

       Existing BLINKITA code may still call:

       tzolkinForDate(...)
       renderTzolkin(...)

       Keep these aliases so the rest of V4 does not break.
       ---------------------------------------------------------- */

    window.tzolkinForDate =
        tzolkinForDate;

    window.renderTzolkin =
        renderTzolkin;

    /* ----------------------------------------------------------
       INIT
       ---------------------------------------------------------- */

    document.addEventListener(
        "DOMContentLoaded",
        function () {
            renderTzolkin();
            bindDateInput();
        }
    );

})();















