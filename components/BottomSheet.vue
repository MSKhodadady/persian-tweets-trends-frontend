<template>
  <v-bottom-sheet v-model="show">
    <v-sheet>
      <component :is="compName" v-bind="compProps" />
    </v-sheet>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import 'vue-class-component/hooks';

import ChartAddSheet from './bottomSheets/chart.add.vue';

import WordAddSheet from '~/components/bottomSheets/word.add.vue';
import WordDeleteSheet from '~/components/bottomSheets/word.delete.vue';

import UserDeleteSheet from '~/components/bottomSheets/user.delete.vue';
import UserCrawlRangeSheet from '~/components/bottomSheets/user.tweet.crawlrange.vue';
import UserDeleteTweetSheet from '~/components/bottomSheets/user.tweet.deleterange.vue';
import UserChangeCrawlSheet from '~/components/bottomSheets/user.changecrawl.vue';
import UserAddSheet from '~/components/bottomSheets/user.add.vue';

@Component({
  components: {
    WordAddSheet,
    WordDeleteSheet,
    UserDeleteSheet,
    UserCrawlRangeSheet,
    UserDeleteTweetSheet,
    UserChangeCrawlSheet,
    UserAddSheet,
    ChartAddSheet
  }
})
export default class BottomSheet extends Vue {

  show = false
  compName = ''
  compProps = {}

  created () {
    this.$store.subscribe(
      (mutation, { bottomSheet: { compName, compProps } }) => {
        switch (mutation.type) {
          case 'bottomSheet/show':
            this.show = true;
            this.compName = compName;
            this.compProps = compProps;
            break;
          case 'bottomSheet/hide':
            this.compName = '';
            this.compProps = {};
            this.show = false;
            break;
        }
      }
    );
  }
}
</script>
