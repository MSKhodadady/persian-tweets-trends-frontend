<template>
  <v-row class="pa-4" align="stretch">
    <v-col cols="12">
      <h1>Adding User:</h1>
    </v-col>
    <v-col cols="6">
      <v-text-field v-model="username" outlined label="Username" />
    </v-col>
    <v-col cols="5" />
    <v-col cols="1">
      <v-btn large color="green" @click="addUser">
        Add
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import urls from '../../IFetch'
export default Vue.extend({
  data () {
    return {
      username: ''
    }
  },

  methods: {
    async addUser () {
      this.$store.commit('bottomSheet/hide')

      this.$store.commit('snackbar/showMessage', {
        content: `adding ${this.username} ...`,
        color: 'info'
      })

      const res = await fetch(urls.user.url, urls.user.put(this.username))

      const data = res.status === 200 && await res.json()
      if (data.username === this.username) {
        this.$store.commit('snackbar/showMessage', {
          content: `${this.username} added!`,
          color: 'info'
        })
      }

    }
  }
})
</script>
