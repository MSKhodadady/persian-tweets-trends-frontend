<template>
  <v-app>
    <v-snackbar
      v-model="snackbarShow"
      top
      right
      :timeout="snackbar.timeout"
    >
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbarShow = false"
        >
          Close
        </v-btn>
      </template>

      {{ snackbar.message }}
    </v-snackbar>

    <snack-bar />

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
    >
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- :clipped-left="clipped" -->
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-btn
        v-if="drawer"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />

      <!-- <v-spacer /> -->
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer
      :fixed="fixed"
      :app="fixed"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <bottom-sheet />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

import BottomSheet from '../components/BottomSheet.vue'
import SnackBar from '~/components/Snackbar.vue'

export default Vue.extend({
  components: {
    BottomSheet,
    SnackBar
  },

  data () {
    return {
      drawerOpened: false,
      clipped: false,
      drawer: false,
      miniVariant: false,
      rightDrawer: false,
      title: 'Twitter Trend Anaylyze',
      items: [
        {
          icon: 'mdi-home-variant-outline',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-checkbox-multiple-blank',
          title: 'Tasks',
          to: '/tasks'
        },
        {
          icon: 'mdi-account-box-multiple',
          title: 'Users',
          to: '/users'
        },
        {
          icon: 'mdi-book-alphabet',
          title: 'Dictionary',
          to: '/dictionary'
        },
        {
          icon: 'mdi-test-tube',
          title: 'Analyze',
          to: '/analyze'
        }/*,
        {
          icon: 'mdi-cogs',
          title: 'Options',
          to: '/options'
        }*/
      ]
    }
  },

  computed: {
    snackbar () {
      return this.$store.state.snackbar
    },

    snackbarShow: {
      get () {
        return this.$store.state.snackbar.show
      },
      set (newValue) {
        if (!newValue) { this.$store.commit('hideBottomSheet') }
      }
    }
  }
})

</script>
