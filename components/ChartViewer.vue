<template>
  <canvas ref="chart" />
</template>

<script lang="ts">
import Vue from 'vue';
// import Component from 'vue-class-component';
import { Component, Prop } from 'vue-property-decorator';
import ChartJS, { ChartDataSets } from 'chart.js';
import urls from '../IFetch';

@Component({})
export default class ChartViewer extends Vue {

  @Prop(Array) readonly datasets: ChartDataSets[] = []

  mainChart: ChartJS = null

  async mounted () {
    /* const res = await fetch(urls.chart.url, urls.chart.postFreq(
      'احساس',
      '2020-02-18 00:00',
      '2020-04-25 00:00'
    ));
    if (res.status === 200) {
      const data: { count: string, date: string }[] = (await res.json()).data;

      this.datasets.push({
        data: data.map(d => ({ y: d.count, t: new Date(d.date) })),
        label: 'sequence',
        borderColor: 'green'
      });
    } else {
      throw new Error('no data');
    } */

    /* const res2 = await fetch(urls.chart.url, urls.chart.postMA(
      'احساس',
      5,
      '2020-02-18 00:00',
      '2020-04-25 00:00'
    ));
    if (res2.status === 200) {
      const data2: { count: string, date: string }[] = (await res2.json()).data;

      this.datasets.push({
        data: data2.map(d => ({ y: d.count, t: new Date(d.date) })),
        label: 'MA',
        borderColor: 'red'
      });
    } */

    /* this.mainChart = new ChartJS(this.$refs.chart as HTMLCanvasElement, {
      type: 'line',
      data: { datasets: this.datasets },
      options: {
        scales: {
          xAxes: [{ type: 'time' }]
        }
      }
    }); */
  }

  async renderChart () {

  }
}
</script>
