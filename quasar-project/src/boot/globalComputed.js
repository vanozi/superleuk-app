import {computed, ref } from "vue";


 const fromPath = ref('');
 const toPath = ref('')   

 const routerFromPath = computed({
    // getter
    get() {
      return fromPath.value
    },
    // setter
    set(newValue) {
      // Note: we are using destructuring assignment syntax here.
      fromPath.value = newValue
    }
  })

  const routerToPath = computed({
    // getter
    get() {
      return toPath.value
    },
    // setter
    set(newValue) {
      // Note: we are using destructuring assignment syntax here.
      toPath.value = newValue
    }
  })


export { routerFromPath ,routerToPath };