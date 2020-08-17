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

import ChartAddSheet from './buttonSheets/chart.add.vue';

import WordAddSheet from '~/components/buttonSheets/word.add.vue';
import WordDeleteSheet from '~/components/buttonSheets/word.delete.vue';
import WordEditSheet from '~/components/buttonSheets/word.edit.vue';

import UserDeleteSheet from '~/components/buttonSheets/user.delete.vue';
import UserCrawlRangeSheet from '~/components/buttonSheets/user.tweet.crawlrange.vue';
import UserDeleteTweetSheet from '~/components/buttonSheets/user.tweet.deleterange.vue';
import UserChangeCrawlSheet from '~/components/buttonSheets/user.changecrawl.vue';
import UserAddSheet from '~/components/buttonSheets/user.add.vue';

@Component({
  components: {
    WordAddSheet,
    WordDeleteSheet,
    WordEditSheet,
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
