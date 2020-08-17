<template>
  <v-row class="pa-4" align="stretch">
    <v-col cols="12">
      <h1>Adding another word to dictionary:</h1>
    </v-col>
    <v-col cols="6">
      <v-text-field v-model="token" outlined label="Token" />
    </v-col>
    <v-col cols="6">
      <v-text-field v-if="!deleteToken" v-model="replaceWith" outlined label="Replace With" />
    </v-col>
    <v-col cols="11">
      <v-checkbox v-model="deleteToken" label="Delete Token if seen?" />
    </v-col>
    <v-col cols="1">
      <v-btn large class="green darken-4" @click="addDict">
        Add
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import urls from '../../IFetch'

@Component({})
export default class WordAdd extends Vue {
  token = ''
  replaceWith = null
  deleteToken = false

  async addDict () {
    this.$store.commit('bottomSheet/hide')

    this.$store.commit('snackbar/showMessage', {
      content: `adding token: ${this.token} ...`,
      color: 'info'
    })

    const res = await fetch(
      urls.dictionary.url, urls.dictionary.put(this.token, this.deleteToken ? null : this.replaceWith))

    const data = res.status === 200 && await res.json()

    if (data) {
      this.$store.commit('snackbar/showMessage', { content: `token: ${this.token} was added!`, color: 'info' })
    }
  }
}
</script>
