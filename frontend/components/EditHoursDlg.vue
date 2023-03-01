// https://techformist.com/reusable-confirmation-dialog-vuetify/

<template>
  <v-dialog v-model="dialog" :max-width="options.width" :style="{ zIndex: options.zIndex }" @keydown.esc="cancel">
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-4 black--text">
        <v-form ref="hours_submission" v-model="valid">
          <v-text-field v-model="editedItem.hours" label="Uren" :rules="hoursRules"></v-text-field>
          <v-text-field v-model="editedItem.milkings" label="Melkbeurten" :rules="milkingRules"
            v-if="userHasRole(['melker'])"></v-text-field>
          <v-text-field v-model="editedItem.description" label="Omschrijving"></v-text-field></v-form></v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn color="warning" outlined class="body-2 font-weight-bold" @click.native="cancel">Annuleer</v-btn>
        <v-btn :disabled="!valid" color="primary" class="body-2 font-weight-bold" outlined
          @click.native="agree">OK</v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditHoursDlg",
  data() {
    return {
      hoursRules: [
        (v) => /^[+-]?\d+(\.\d+)?$/.test(v) || "Onjuiste invoer",
        (v) => v <= 24 || "Er zitten niet meer dan 24 uur in een dag",
      ],
      milkingRules: [
        (v) => /^[+-]?\d+(\.\d+)?$/.test(v) || "Onjuiste invoer",
      ],
      valid: false,
      dialog: false,
      editedItem: { hours: "0", milkings: "0", description: "" },
      title: null,
      options: {
        color: "grey lighten-3",
        width: 400,
        zIndex: 200,
      },
    };
  },

  methods: {
    userHasRole(rolesToCheck) {
      for (let i = 0; i < rolesToCheck.length; i++) {
        if (this.$auth.user.roles.filter((e) => e.name === rolesToCheck[i]).length > 0) {
          return true;
        }
      }
      return false
    },
    open(title, editedItem, options) {
      this.title = title;
      this.options = Object.assign(this.options, options);
      if (editedItem.hours == 0 || editedItem.hours == null) {
        editedItem.hours = "0";
      }
      if (editedItem.milkings == 0 || editedItem.milkings == null) {
        editedItem.milkings = "0";
      }
      this.editedItem = editedItem;
      this.dialog = true;

    },
    agree() {
      // Emit een event met als data editItem om zo de uren op te slaan
      if ((this.editedItem.hours == null) | (this.editedItem.hours == "")) {
        this.editedItem.hours = 0;
      }
      if ((this.editedItem.milkings == null) | (this.editedItem.milkings == "")) {
        this.editedItem.milkings = 0;
      }
      this.$emit("save", this.editedItem);
      this.editedItem = { hours: "0", description: "0" };
      this.dialog = false;
    },
    cancel() {
      this.reset();
      this.resetValidation();
      this.editedItem = { hours: "0", milkings: "0", description: "" },
        this.dialog = false;
    },
    validate() {
      this.$refs.hours_submission.validate();
    },
    reset() {
      this.$refs.hours_submission.reset();
    },
    resetValidation() {
      this.$refs.hours_submission.resetValidation();
    },
  },
};
</script>
