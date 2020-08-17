<template>
  <v-snackbar v-model="show" :color="color" :timeout="timeout" top right>
    {{ message }}
    <v-btn text @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import Component from 'vue-class-component'
import Vue from 'vue'

@Component({})
export default class Snackbar extends Vue {
  show = false
  message = ''
  color = ''
  timeout = 4000

  created () {
    this.$store.subscribe(
      (mutation, { snackbar: { content, color, timeout } }) => {
        if (mutation.type === 'snackbar/showMessage') {
          this.message = content
          this.color = color
          this.show = true
          this.timeout = timeout || 4000
        }
      }
    )
  }
}
</script>
