<template>
  <v-row class="pa-4">
    <v-col cols="12">
      <h1>Change User Total Crawl State:</h1>
    </v-col>
    <v-col cols="11">
      <v-switch v-model="crawlSwitch" inset :label="crawlSwitchLabel" />
    </v-col>
    <v-col cols="1">
      <v-btn large class="yellow black--text" @click="stopCrawl">
        Yes
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { UserRow } from '~/types.ts';
import urls from '~/IFetch';

@Component({
  props: {
    selectedUsers: {
      type: Array as () => UserRow[],
      default: () => []
    },
    successActionCallback: {
      type: Function,
      default: () => () => {}
    }
  }
})
export default class UserChangeCrawl extends Vue {
  crawlSwitch = false
  $props: {
    selectedUsers: UserRow[],
    successActionCallback: (a: UserRow[], b: boolean) => void
  }

  get crawlSwitchLabel () {
    return this.crawlSwitch ? 'Crawl in Total Crawl Rounds' : 'Don\'t Crawl in Total Crawl rounds';
  }

  async stopCrawl () {
    const su: UserRow[] = [...this.$props.selectedUsers];

    this.$store.commit('bottomSheet/hide');

    this.$store.commit('snackbar/showMessage', {
      content: `stop crawl of ${su.length} user ...`
    });

    const changedCrawlUsers: UserRow[] = [];

    for (const u of su) {
      const res = await fetch(
        urls.user.url,
        urls.user.patch(u.username, this.crawlSwitch)
      );

      const data = res.status === 200 && await res.json();
      if (data && data.username === u.username) {
        changedCrawlUsers.push(u);
      }
    }

    this.$props.successActionCallback(changedCrawlUsers, this.crawlSwitch);

    this.$store.commit('snackbar/showMessage', {
      content: `${changedCrawlUsers.length} of ${su.length} changed 'Total Crawl' successfully!`
    });
  }
}
</script>
