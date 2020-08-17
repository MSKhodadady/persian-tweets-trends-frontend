<template>
  <div>
    <v-row>
      <v-col
        v-for="t in tasks"
        :key="t.id"
        xl="2"
        cols="3"
      >
        <task
          :task="t"
        />
      </v-col>
    </v-row>

    <v-btn outlined block @click="loadMore">Load More</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Task from '~/components/Task.vue';
import { TaskObj } from '~/types.ts';

@Component({
  components: { Task }
})
export default class TasksPage extends Vue {
  tasks: TaskObj[] = []

  pageStart = 0
  pageCount = 8

  async mounted () {
    const res = await fetch(`http://localhost:5000/api/task?start=${this.pageStart}&count=${this.pageCount}`);

    let json_res;
    if (res.status === 200) {
      json_res = await res.json();
      this.tasks = json_res.data;
    }
  }

  async loadMore () {
    this.pageStart = this.pageStart + this.pageCount;
    const res = await fetch(`http://localhost:5000/api/task?start=${this.pageStart}&count=${this.pageCount}`);
    let json_res;
    if (res.status === 200) {
      console.log('EHhl');
      json_res = await res.json();
      this.tasks = this.tasks.concat(json_res.data);
    }
  }
}
</script>
