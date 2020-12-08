<template>
  <v-row class="pa-4" align="stretch">
    <v-col cols="11">
      <h1>Are you sure to delete dictionary?</h1>
    </v-col>

    <v-col cols="1">
      <v-btn large color="red" @click="deleteDict">Yes!</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { DictionaryRow } from '../../types';
import urls from '../../IFetch';

@Component({
  props: {
    selectedDicts: {
      type: Array,
      default: () => []
    },
    makeEmpty: {
      type: Function,
      default: () => () => {}
    },
    successActionCallBack: {
      type: Function,
      default: () => () => {}
    }
  }
})
export default class WordDelete extends Vue {

  async deleteDict () {

    this.$store.commit('bottomSheet/hide');

    const selectedDicts: DictionaryRow[] = [...this.$props.selectedDicts];
    let successTokens = 0;
    this.$props.makeEmpty();

    for (const { token } of selectedDicts) {
      const res = await fetch(urls.dictionary.url, urls.dictionary.delete(token));
      const data = res.status === 200 && await res.json();

      if (data && data.token === token) {
        successTokens += 1;
        this.$props.successActionCallBack(token);
      }
    }

    this.$store.commit('snackbar/showMessage', {
      content: `${successTokens} of ${selectedDicts.length} token removed successfully!`,
      color: 'info'
    });

  }

}
</script>
