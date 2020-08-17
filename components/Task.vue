<template>
  <v-card outlined>
    <v-card-title>{{ task.id }} - {{ task.task_type }}</v-card-title>

    <v-card-text>
      <p>{{ task.task_state }}</p>
      <P>since: {{ task.crawl_since }}</P>
      <p>until: {{ task.crawl_until }}</p>
    </v-card-text>

    <v-card-actions>
      <v-progress-linear :value="progress" height="10" rounded />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Comp from 'vue-class-component'
import { TaskObj } from '~/types.ts'

@Comp({
  props: {
    task: Object as () => TaskObj
  }
})
export default class Task extends Vue {
  get progress () {
    return this.$props.task.progress || 100
  }
}
</script>
