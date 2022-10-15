<template>
  <base-view>
    <template #default-view-title>
      <ion-title>Home</ion-title>
    </template>
    <template #default-view-body>
		{{user}}
		{{access_token}}
    </template>
  </base-view>
</template>
  
  <script>
import { defineComponent,  } from "vue";
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
	const store = useStore()
	const user = store.state.auth.user;
	const access_token = store.state.auth.accessToken
    return {
		user,
		access_token,

    };
  },
});
</script>