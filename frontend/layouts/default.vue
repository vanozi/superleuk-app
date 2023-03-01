<template>
  <v-app dark>
    <!-- NAVIGATION DRAWER -->

    <v-navigation-drawer v-if="this.$auth.loggedIn" v-model="drawer" :clipped="clipped" fixed app :width="325">
      <v-list-item>
        <v-list-item-content>
          <h4>Gebr. Vroege</h4>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <!-- role based navigation -->
      <v-list>
        <v-list-group v-if="userHasRole(item.roles)" v-for="item in Items" :key="item.title" v-model="item.active"
          :prepend-icon="item.action" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-if="userHasRole(child.roles)" v-for="child in item.items" :key="child.title" :to="child.route"
            exact>
            <v-list-item-content>
              <v-list-item-subtitle v-text="child.title"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

    </v-navigation-drawer>
    <!-- NAVIGATION BAR -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link class="link" style="color: black" to="/">{{
        title
      }}</nuxt-link>
      <v-spacer />

      <!-- RIGHT SIDE MENU WHEN LOGGED IN -->
      <div v-if="this.$auth.loggedIn">
        <!-- LARGER VIEWPORTS -->
        <div v-if="$vuetify.breakpoint.mdAndUp">
          <v-btn @click="logout" color="primary" outlined>
            <v-icon class="mr-2">mdi-lock</v-icon>UITLOGGEN
          </v-btn>
        </div>
        <!-- SMALLER VIEWPORTS -->
        <div v-if="$vuetify.breakpoint.smAndDown">
          <v-btn icon @click="logout">
            <v-icon>mdi-lock</v-icon>
          </v-btn>
        </div>
      </div>

      <!-- RIGHT SIDE MENU WHEN NOTLOGGED IN -->
      <div v-else>
        <!-- LARGER VIEWPORTS -->
        <div v-if="$vuetify.breakpoint.mdAndUp">
          <v-btn color="primary" outlined to="/auth/login">
            <v-icon class="mr-2">mdi-lock-open</v-icon>INLOGGEN
          </v-btn>
          <v-btn color="primary" outlined class="ml-2" to="/auth/register">
            <v-icon class="mr-2">mdi-account-plus-outline</v-icon>REGISTREREN
          </v-btn>
        </div>
        <!-- SMALLER VIEWPORTS -->
        <div v-if="$vuetify.breakpoint.smAndDown">
          <v-btn icon to="/auth/login">
            <v-icon>mdi-lock-open</v-icon>
          </v-btn>
          <v-btn icon to="/auth/register">
            <v-icon>mdi-account-plus-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <!-- APPLICATIE MAIN WINDOW -->
    <v-main>
      <!-- Confirmation Dialog -->

      <Snackbar></Snackbar>
      <nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} - Vanozi &copy</span>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from "~/components/Snackbar.vue";

export default {
  components: { Snackbar },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Superleuk App",

      Items: [
        {
          action: "mdi-account-group-outline",
          items: [{ title: "Uitnodigingen", route: "/admin/allowed_users", roles: ["admin"] }],
          title: "Toegestane users",
          roles: ["admin"]
        },
        {
          action: "mdi-account-clock-outline",
          items: [
            {
              title: "Week overzicht",
              route: "/admin/working_hours/week_overview",
              roles: ["admin"]
            },
            {
              title: "Medewerker overzicht",
              route: "/admin/working_hours/employee_overview",
              roles: ["admin"]
            },
            { title: "Overzicht", route: "/working_hours/overview", roles: ["werknemer"] },
            { title: "Invoeren", route: "/working_hours/", roles: ["werknemer"] },
          ],
          title: "Uren",
          roles: ["admin", "werknemer"]
        },
        {
          title: "Bouwplan",
          action: "mdi-sprout-outline",
          items: [{ title: "2022", route: "/bouwplan/2022", roles: ["werknemer", "monteur", "admin"] }, { title: "2023", route: "/bouwplan/2023", roles: ["werknemer", "monteur", "admin"] }],
          roles: ["werknemer", "monteur", "admin"]
        },

        {
          title: "Machines (Test)",
          action: "mdi-tractor-variant",
          items: [{ title: "Machinepark", route: "/machines", roles: ["werknemer", "monteur", "admin"] }, { title: "Onderhoud / Storingen", route: "/machines/onderhoud", roles: ["werknemer", "monteur", "admin"] }, { title: "Tankbeurten", route: "/machines/tank_transactions", roles: ["werknemer", "monteur", "admin"] },],
          roles: ["werknemer", "monteur", "admin"]
        }
      ],
    };
  },
  methods: {

    async logout() {
      await this.$auth.logout();
      this.$router.push("/auth/login");
    },
    userHasRole(rolesToCheck) {
      for (let i = 0; i < rolesToCheck.length; i++) {
        if (this.$auth.user.roles.filter((e) => e.name === rolesToCheck[i]).length > 0) {
          return true;
        }
      }
      return false
    }
  },
  computed: {

  },
};
</script>

<style>
@use "sass:math";

/* .v-simple-table {
  overflow-x: auto;
} */
</style>
