<template>
  <div class="q-pa-md" style="width: 400px; border: 10px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      ref="loginForm"
    >
      <q-input
        filled
        v-model="loginData.email"
        label="Email"
        lazy-rules="ondemand"
        :rules="[
          (val) => (val && val.length > 0) || 'Email is verplicht',
          isValidEmail,
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="loginData.password"
        label="Password"
        lazy-rules="ondemand"
        :rules="[(val) => (val && val.length > 0) || 'Wachtwoord is verplicht']"
      />

      <div>
        <q-btn label="Login" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { reactive, ref } from "vue";
import { useUserStore } from "src/stores/user-store";
import { useRouter, useRoute } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const name = ref(null);
const age = ref(null);
const accept = ref(false);

const loginData = reactive({});
const userStore = useUserStore();


const loginForm = ref(null);

function onSubmit() {
  loginForm.value.validate().then((success) => {
    if (success) {
      loginUser(loginData);
      // yay, models are correct
    } else {
      console.log("not success");
      // oh no, user has filled in
      // at least one invalid value
    }
  });
}

function loginUser(data) {
  userStore.loginUser(
    data,
    function () {
      router.push(route.query.redirect || "/");
      $q.notify({
        color: "positive",
        textColor: "white",
        icon: "waving_hand",
        message: `Welkom ${loginData.email}`,
      });
    },
    function () {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "E-mail of wachtwoord onjuist",
      });
    }
  );
}

function onReset() {
  name.value = null;
  age.value = null;
  accept.value = false;
}

function isValidEmail(val) {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || "Ongeldig email";
}
</script>

<!-- const getTankTransactions = async () => {
  try {
    const response = await api.get("/ionic/");
    tankTransactions = response.data;
    console.log(response.data);
    return tankTransactions;
  } catch (errors) {
    console.error(errors);
  }
}; -->

<!-- function logoutUser() {
  userStore.logoutUser();
}

function getLocalStorageTokens() {
  console.log($q.localStorage.getItem("access_token"));
  localStorageAccessToken.value = $q.localStorage.getItem("access_token");
  localStorageRefreshToken.value = $q.localStorage.getItem("refresh_token");
}

function getMe(data) {
  console.log(`Me Request ${timestamp}`);
  api
    .get("/users/me")
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
} -->
