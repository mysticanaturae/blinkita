(function () {
    "use strict";

    const config = window.YOUNIQUE_CONFIG || {};

    function selectedPlanQuery() {
        const plan = new URLSearchParams(window.location.search).get("plan");
        return ["BASIC", "PREMIUM", "VIP"].includes(plan)
            ? "?plan=" + encodeURIComponent(plan)
            : "";
    }

    function client() {
        if (!config.supabaseUrl || !config.supabaseAnonKey) {
            throw new Error(
                "YOUNIQUE še ni povezan s Supabase. " +
                "Vnesi URL projekta in javni anon/publishable ključ."
            );
        }

        if (!window.supabase || !window.supabase.createClient) {
            throw new Error("Supabase knjižnica se ni naložila.");
        }

        if (!window.__youniqueClient) {
            window.__youniqueClient = window.supabase.createClient(
                config.supabaseUrl,
                config.supabaseAnonKey
            );
        }

        return window.__youniqueClient;
    }

    function message(text, type) {
        const el = document.querySelector("[data-younique-message]");
        if (!el) return;
        el.textContent = text;
        el.dataset.type = type || "info";
        el.hidden = false;
    }

    function setBusy(form, busy) {
        const button = form.querySelector('button[type="submit"]');
        if (!button) return;
        button.disabled = busy;
        button.setAttribute("aria-busy", String(busy));
    }

    const registerForm = document.querySelector("#younique-register");

    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            setBusy(registerForm, true);

            try {
                const email = registerForm.email.value.trim();
                const password = registerForm.password.value;
                const fullName = registerForm.full_name.value.trim();

                if (password.length < 10) {
                    throw new Error(
                        "Geslo mora vsebovati vsaj 10 znakov."
                    );
                }

                const { data, error } = await client().auth.signUp({
                    email: email,
                    password: password,
                    options: {
                        data: { full_name: fullName },
                        emailRedirectTo: window.location.origin +
                            "/sl/you-login.html" + selectedPlanQuery()
                    }
                });

                if (error) throw error;

                if (data.session) {
                    window.location.assign("/sl/you-dashboard.html" + selectedPlanQuery());
                } else {
                    message(
                        "Registracija je sprejeta. Preveri e-pošto in " +
                        "potrdi svoj račun, nato se prijavi.",
                        "success"
                    );
                }
            } catch (error) {
                message(error.message || "Registracija ni uspela.", "error");
            } finally {
                setBusy(registerForm, false);
            }
        });
    }

    const loginForm = document.querySelector("#younique-login");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            setBusy(loginForm, true);

            try {
                const { error } = await client().auth.signInWithPassword({
                    email: loginForm.email.value.trim(),
                    password: loginForm.password.value
                });

                if (error) throw error;

                window.location.assign("/sl/you-dashboard.html" + selectedPlanQuery());
            } catch (error) {
                message(
                    error.message || "Prijava ni uspela.",
                    "error"
                );
            } finally {
                setBusy(loginForm, false);
            }
        });
    }

    window.YOUNIQUE = {
        client: client,
        message: message
    };
})();