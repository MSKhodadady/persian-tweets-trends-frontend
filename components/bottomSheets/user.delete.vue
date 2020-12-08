<template>
  <v-row class="pa-4">
    <v-col cols="12">
      <h1>Deleting User(s) with their Tweets:</h1>
    </v-col>

    <v-col cols="11">
      <h2>Are you Sure?</h2>
    </v-col>

    <v-col cols="1">
      <v-btn large class="red" @click="deleteUsers">
        Yes
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { UserRow } from '~/types.ts';
import urls from '~/IFetch.ts';

@Component({
  props: {
    selectedUsers: {
      type: Array as () => UserRow[],
      default: () => []
    },
    endProcessCallback: {
      type: Function,
      default: () => () => {}
    }
  }
})
export default class UserDelete extends Vue {
  $props: {
    selectedUsers: UserRow[],
    endProcessCallback: Function
  }

  async deleteUsers () {
    const su = [...this.$props.selectedUsers];
    this.$store.commit('bottomSheet/hide');

    this.$store.commit('snackbar/showMessage', {
      content: `deleting ${su.length} ...`
    });

    const deletedUsernames: UserRow[] = [];

    for (const u of su) {
      const res = await fetch(urls.user.url, urls.user.delete(u.username));

      const data = res.status === 200 && await res.json();
      if (data && data.username === u.username) {
        deletedUsernames.push(u);
      }
    }

    this.$props.endProcessCallback(deletedUsernames);
    this.$store.commit({
      type: 'snackbar/showMessage',
      content: `${deletedUsernames.length} of ${su.length} deleted successfully!`
    });
  }
}
</script>
