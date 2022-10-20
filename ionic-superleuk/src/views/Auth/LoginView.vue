<template>
  <base-view>
    <template #default-view-title>
      <ion-title>Login</ion-title>
    </template>
    <template #default-view-body>
      <ion-grid>
        <n-space vertical class="ion-margin-top">
          <n-form
            ref="formRef"
            :model="formValue"
            :rules="rules"
            :show-label="formShowLabel"
          >
            <n-form-item path="loginInfo.email">
              <n-input
                v-model:value="formValue.loginInfo.email"
                placeholder="E-mail adres"
              />
            </n-form-item>
            <n-form-item path="loginInfo.password">
              <n-input
                v-model:value="formValue.loginInfo.password"
                placeholder="Wachtwoord"
                :rules="rules"
                type="password"
                show-password-on="click"
              />
            </n-form-item>
            <n-form-item>
              <n-button @click="submitLogin(formValue.loginInfo)">
                Login
              </n-button>
            </n-form-item>
          </n-form>
        </n-space>
        <ion-row class="ion-justify-content-center">
          <pre
            >{{ JSON.stringify(formValue, null, 2) }}
            </pre
          >
        </ion-row>
      </ion-grid>
    </template>
  </base-view>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";
import { useMessage } from "naive-ui";
import { GlassesOutline, Glasses } from "@vicons/ionicons5";
import { Device } from "@capacitor/device";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const formValue = ref({
      loginInfo: {
        email: "",
        password: "",
        deviceId: "",
      },
    });
    const formShowLabel = ref(false);
    const formRef = ref(null);
    const message = useMessage();

    // lifecycle hooks
    onBeforeMount(async function () {
      // de store legen voor als er nog auth info in zit
      store.commit("auth/DELETE_ACCESS_TOKEN");
      store.commit("auth/DELETE_LOGGED_IN_USER");
      // device id ophalen en alvast in de form opslaan
      const info = await Device.getInfo();
      const id = await Device.getId();
      const deviceId = info.platform + info.model + id.uuid;
      console.log(deviceId);
      formValue.value.loginInfo.deviceId = deviceId;
    });

    //  store action

    return {
      formRef,
      formShowLabel,
      size: ref("medium"),
      formValue,
      async submitLogin(loginData) {
        let response = await store.dispatch("auth/performLogin", loginData);
        console.log(response);
        if (response.status == 200) {
          await store.dispatch(
            "auth/getUserInfo",
            response.data["access_token"]
          );
          router.push("/home");
        }
      },
      rules: {
        loginInfo: {
          email: {
            required: true,
            message: "E-Mail adres ontbreekt",
            trigger: "blur",
          },
          password: {
            required: true,
            message: "Wachtwoord ontbreekt",
            trigger: ["input", "blur"],
          },
        },
      },
      handleValidateClick(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success("Valid");
          } else {
            console.log(errors);
            message.error(errors.le);
          }
        });
      },
      GlassesOutline,
      Glasses,
    };
  },
});
</script>

  