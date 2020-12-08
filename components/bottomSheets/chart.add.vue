<template>
  <v-row class="pa-4" align="stretch">
    <v-col cols="6"><h1>Adding Chart:</h1></v-col>

    <v-col cols="6">
      <v-text-field v-model="token" label="token" outlined />
    </v-col>

    <v-col cols="6">
      <v-text-field
        v-model="since"
        label="Since"
        outlined
        :error="validateSince.show"
        :error-messages="validateSince.message"
      />
    </v-col>

    <v-col cols="6">
      <v-text-field
        v-model="until"
        label="Until"
        outlined
        :error="validateUntil.show"
        :error-messages="validateUntil.message"
      />
    </v-col>

    <v-col
      :cols="chartType === 'momentum' ? 4 : 6"
    >
      <v-select
        v-model="chartType"
        :items="chartSelectTypes"
        label="Chart Type"
        outlined
      />
    </v-col>

    <template v-if="chartType === 'MA'">
      <v-col cols="6">
        <v-text-field
          v-model="k_param"
          label="K parameter"
          type="number"
        />
      </v-col>
    </template>

    <template v-if="chartType === 'trend-momentum'">
      <v-col cols="2">
        <v-text-field
          v-model="k_l"
          label="Large K param"
          type="number"
        />
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="k_s"
          label="Small K param"
          type="number"
        />
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="alpha"
          label="Alpha param"
          type="number"
        />
      </v-col>
    </template>

    <template v-if="chartType === 'momentum'">
      <v-col cols="2">
        <v-text-field
          v-model="k_l"
          label="Large K param"
          type="number"
        />
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="k_s"
          label="Small K param"
          type="number"
        />
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="alpha"
          label="Alpha param"
          type="number"
        />
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="k_param"
          label="Last K param"
          type="number"
        />
      </v-col>
    </template>

    <v-col cols="12">
      <v-slider
        v-model="chosenColor"
        :max="colorList.length - 1"
        step="1"
        ticks
        :tick-labels="colorList"
        :color="colorValues[chosenColor]"
        :thumb-color="colorValues[chosenColor]"
        :track-color="colorValues[chosenColor]"
        :track-fill-color="colorValues[chosenColor]"
      />
    </v-col>

    <v-col cols="2" @click="addChart">
      <v-btn color="info">Add Chart</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import { ChartOption } from '../../types';

@Component
export default class ChartAddSheet extends Vue {

  @Prop(Function) readonly actionCallback: (c: ChartOption) => void

  token: string = ''

  since: string = moment().subtract(1, 'month').format('YYYY-MM-DD HH:mm')
  until: string = moment().format('YYYY-MM-DD HH:mm')

  chartType: 'frequency' | 'MA' | 'trend-momentum' | 'momentum' = 'frequency'
  chartSelectTypes = [
    'frequency', 'MA', 'trend-momentum', 'momentum'
  ]

  chosenColor = 0
  colorList = [
    'crimson',
    'red',
    'gold',
    'orange',
    'yellow',
    'lime',
    'green',
    'olive',
    'cyan',
    'teal',
    'blue',
    'slateblue',
    'magenta',
    'darkorchid',
    'purple',
    'indigo',
    'brown'
  ]

  colorValues = [
    '#DC143C', // 'crimson',
    '#FF0000', // 'red',
    '#FFD700', // 'gold',
    '#FFA500', // 'orange',
    '#FFFF00', // 'yellow',
    '#00FF00', // 'lime',
    '#008000', // 'green',
    '#808000', // 'olive',
    '#00FFFF', // 'cyan',
    '#008080', // 'teal',
    '#0000FF', // 'blue',
    '#6A5ACD', // 'slateblue',
    '#FF00FF', // 'magenta',
    '#9932CC', // 'darkorchid',
    '#800080', // 'purple',
    '#4B0082', // 'indigo',
    '#A52A2A' // 'brown'
  ]

  k_param: number = 3
  k_l: number = 5
  k_s: number = 3
  alpha: number = 0.5

  addChart () {
    this.$store.commit('bottomSheet/hide');
    const params = this.chartType === 'MA' ? {
      'k-param': this.k_param
    } : this.chartType === 'trend-momentum' ? {
      'k-l': this.k_l,
      'k-s': this.k_s,
      alpha: this.alpha
    } : this.chartType === 'momentum' ? {
      'k-l': this.k_l,
      'k-s': this.k_s,
      alpha: this.alpha,
      'k-param': this.k_param
    } : null;

    const o: ChartOption = {
      color: this.colorValues[this.chosenColor],
      token: this.token,
      since: this.since,
      until: this.until,
      'chart-type': this.chartType,
      ...params
    };

    this.actionCallback(o);
  }

  validateDateTime (dt: string): { show: boolean, message: string } {
    const rg = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/;

    const m = dt.match(rg);

    if (m) {
      const month = parseInt(m[2]);
      if (!(month > 0 && month < 13)) {
        return { show: true, message: 'month not correct' };
      }

      const day = parseInt(m[3]);
      if (!(day > 0 && day < 32)) {
        return { show: true, message: 'day not correct' };
      }

      const hour = parseInt(m[4]);
      if (!(hour > -1 && hour < 24)) {
        return { show: true, message: 'hour not correct' };
      }

      const minute = parseInt(m[5]);
      if (!(minute > -1 && minute < 60)) {
        return { show: true, message: 'minute not correct' };
      }
    } else {
      return { show: true, message: 'must be in format: YYYY-MM-DD hh:mm' };
    }

    return { show: false, message: '' };
  }

  get validateSince () {
    return this.validateDateTime(this.since);
  }

  get validateUntil () {
    const validation = this.validateDateTime(this.until);
    if (validation.show || this.validateSince.show) { return validation; }

    if (!moment(this.since).isBefore(this.until)) { return { show: true, message: 'Until must be after Since!' }; }

    return validation;
  }

}
</script>
