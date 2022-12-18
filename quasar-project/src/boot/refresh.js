import { LocalStorage } from "quasar";
import { api } from "./axios";
import { useUserStore } from "src/stores/user-store";

export default async ({ app, redirect, store, router }) => {
  // Als je de pagina refresh dan is er geen pinia store meer
  // Op basis van of de tokens nog aanwezig zijn in de localStorage worden de user gegevens opgehaald
  // en in de userStore opgeslagen
  if (
    LocalStorage.getItem("access_token") &&
    LocalStorage.getItem("refresh_token")
  ) {
    api
      .get("/users/me")
      .then((response) => {
        const userStore = useUserStore();
        userStore.user = response.data;
        return
      })
      .catch((error) => console.log(error));
  }
  // Als de tokens niet aanwezig zijn je je refreshed de login pagina, prima niks doen
  else if (window.location.href.includes("/auth/login")) {
    return;
  }
  // refresh je een andere pagina dan redirecten naar de login pagina
  else {
    redirect({ path: "/auth/login" });
  }
};
