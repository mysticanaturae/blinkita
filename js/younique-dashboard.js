(function () {
    "use strict";

    async function init() {
        const api = window.YOUNIQUE;
        if (!api) return;

        try {
            const supabase = api.client();
            const { data: sessionData, error: sessionError } =
                await supabase.auth.getSession();

            if (sessionError) throw sessionError;

            const session = sessionData.session;

            if (!session) {
                window.location.replace("/sl/you-login.html");
                return;
            }

            const user = session.user;
            const metadata = user.user_metadata || {};
            const name = metadata.full_name || user.email || "Članica BLINKITA";

            document.getElementById("welcome").textContent =
                "Dobrodošla, " + name + ".";

            document.getElementById("member-email").textContent =
                user.email || "";

            document.getElementById("member-status").textContent =
                "Račun prijavljen";

            // Read only this user's membership through Supabase RLS.
            const { data: memberships, error: membershipError } =
                await supabase
                    .from("younique_memberships")
                    .select("plan, status, current_period_end, updated_at")
                    .eq("user_id", user.id)
                    .order("updated_at", { ascending: false })
                    .limit(20);

            if (membershipError) throw membershipError;

            const now = Date.now();
            const activeMembership = (memberships || []).find(function (item) {
                return item.status === "active" &&
                    (!item.current_period_end ||
                     new Date(item.current_period_end).getTime() > now);
            });

            const tier = activeMembership
                ? activeMembership.plan
                : "FREE";

            document.getElementById("tier-name").textContent = tier;

            const requestedPlan = new URLSearchParams(window.location.search).get("plan");
            if (["BASIC", "PREMIUM", "VIP"].includes(requestedPlan)) {
                api.message(
                    "Izbrala si paket " + requestedPlan +
                    ". Izbira je zabeležena za nadaljevanje, vendar plačilo " +
                    "in aktivacija plačljivega članstva še nista povezana.",
                    "info"
                );
            }

            document.querySelectorAll("[data-plan]").forEach(function (button) {
                button.addEventListener("click", function () {
                    api.message(
                        "Izbira paketa še ni povezana s potrjenim plačilom. " +
                        "Plačljivi dostop se aktivira šele po potrditvi na strežniku.",
                        "info"
                    );
                });
            });

            const logoutButton = document.getElementById("logout");

            if (logoutButton) {
                logoutButton.addEventListener("click", async function () {
                    const { error: logoutError } = await supabase.auth.signOut();

                    if (logoutError) {
                        api.message(logoutError.message, "error");
                        return;
                    }

                    window.location.replace("/sl/you-login.html");
                });
            }
        } catch (error) {
            console.error("YOUNIQUE dashboard error:", error);
            api.message(
                "Portala ali podatkov o članstvu ni bilo mogoče naložiti. " +
                "Poskusi znova.",
                "error"
            );
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
