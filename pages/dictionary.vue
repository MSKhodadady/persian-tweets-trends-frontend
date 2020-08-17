<template>
  <div>
    <v-data-table
      v-model="tableSelected"
      :headers="tableHeader"
      :items="tableData"
      :items-per-page="itemPerPage"
      item-key="token"
      show-select
      hide-default-footer
      :loading="tableData.length === 0"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.replaceWith="{ item }">
        <span v-if="!item.replaceWith"><i>NOTHING (DELETE)</i></span>
        <span v-else>{{ item.replaceWith }}</span>
      </template>

      <template v-slot:footer>
        <div>
          <v-btn block color="blue" outlined @click="loadMore">Load More</v-btn>
        </div>
      </template>
    </v-data-table>

    <fab-buttons
      :action-buttons="actionButtons"
      :disabled="(btn) => !(noOneSelected || btn.isAdd)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import 'vue-class-component/hooks';

import fabButtons from '../components/fabButtons.vue';
import urls from '../IFetch';
import { DictionaryRow } from '../types';

@Component({
  components: { fabButtons }
})
export default class DictionaryPage extends Vue {

  tableSelected: DictionaryRow[] = []
  currentSheet: string = ''

  tableData: DictionaryRow[] = []

  tableHeader = [
    { text: 'token', value: 'token' },
    { text: 'replace with', value: 'replaceWith' }
  ]

  actionButtons = [
    {
      text: 'delete',
      class: 'red accent-4',
      icon: 'mdi-file-remove',
      small: true,
      onClick: () => this.showDeleteSheet()
    },
    {
      text: 'Add',
      class: 'green darken-4',
      icon: 'mdi-text-box-plus',
      isAdd: true,
      onClick: () => this.showAddSheet()
    }
  ]

  start: number = 0
  count: number = 8
  itemPerPage = 100

  async mounted () {
    const res = await fetch(urls.dictionary.url + urls.dictionary.get(this.count, this.start));
    const output = res.status === 200 && await res.json();
    this.tableData = output.data;
    console.log(this.tableData);
  }

  async loadMore () {
    this.start += this.count;
    this.itemPerPage += this.count;

    const res = await fetch(
      urls.dictionary.url + urls.dictionary.get(this.count, this.start)
    );
    const output = res.status === 200 && await res.json();
    this.tableData = this.tableData.concat(output.data);
  }

  closeSheet (btn) {
    console.log(btn);
    btn.showSheet = false;
    this.tableSelected = [];
  }

  showAddSheet () {
    this.$store.commit('bottomSheet/show', {
      compName: 'WordAddSheet',
      compProps: null
    });
  }

  showDeleteSheet () {
    this.$store.commit('bottomSheet/show', {
      compName: 'WordDeleteSheet',
      compProps: {
        selectedDicts: this.tableSelected,
        makeEmpty: () => { this.tableSelected = []; },
        successActionCallBack: (token: string) => {
          this.tableData = this.tableData.filter(
            r => (r.token !== token)
          );
        }
      }
    });
  }

  get noOneSelected () {
    return this.tableSelected.length !== 0;
  }

  get sheetProp () {
    return {
      tableSelected: this.tableSelected
    };
  }

}
</script>
