<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" >
    <q-card class="q-dialog-plugin">
      <slot/>
      <q-card-actions align="right">
        <AppButton outline color="positive" label="OK" @click="onOKClick"/>
        <AppButton outline color="negative" label="Cancel" @click="onDialogCancel"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {useDialogPluginComponent} from 'quasar'
import AppButton from "components/app/AppButton.vue";

const props = defineProps({
  // ...your custom props
})

const emits = defineEmits(['confirm',
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])

const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK()
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
    emits('confirm')
}
</script>
