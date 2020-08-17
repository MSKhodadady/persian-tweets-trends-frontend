<template>
  <div class="fab-col">
    <v-tooltip
      v-for="btn in actionButtons"
      :key="btn.text"
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :class="'ma-2 ' + btn.class"
          dark
          fab
          :small="btn.small || false"
          :disabled="disabled(btn)"
          v-bind="attrs"
          v-on="on"
          @click="btn.onClick"
        >
          <v-icon>{{ btn.icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ btn.text }}</span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    actionButtons: {
      type: Array,
      default: () => []
    },

    disabled: {
      type: Function,
      default: () => false
    }
  }
});
</script>

<style scoped>
.fab-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  align-items: center;

  position: absolute;
  right: 5px;
  bottom: 0;
}
</style>
