<template>
  <div>
    <canvas ref="chart" />

    <div class="pa-2">
      <v-chip
        v-for="(c, i) in charts"
        :key="i"
        class="me-3"
        :color="c.chartOption.color"
        close
        @click:close="removeChart(c)"
      >
        <v-progress-circular
          v-if="!c.data"
          :color="invertColor(c.chartOption.color)"
          indeterminate
        />
        {{ chipLabel(c.chartOption) }}
      </v-chip>
    </div>

    <fab-buttons
      :action-buttons="fabButtons"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import 'vue-class-component/hooks';
import Chart from 'chart.js';
import colorInverter from 'invert-color';
import { FabButton, ChartOption, MA, TrendMomentum, Momentum, TotalChartOption } from '../types';
import urls from '../IFetch';
import FabButtons from '~/components/fabButtons.vue';

@Component({
  components: {
    FabButtons
  }
})
export default class AnalyzePage extends Vue {
  fabButtons: FabButton[] = [
    {
      text: 'Add Chart',
      icon: 'mdi-plus',
      class: 'green',
      isAdd: true,
      onClick: () => this.showAddChartSheet()
    }
  ]

  charts: TotalChartOption[] = []
  // chartDatasets: ChartDataSets[] = []
  mainChart: Chart

  mounted () {
    this.mainChart = new Chart(this.$refs.chart as HTMLCanvasElement, {
      type: 'line',
      data: { datasets: this.charts },
      options: {
        scales: {
          xAxes: [{ type: 'time' }]
        }
      }
    });
  }

  showAddChartSheet () {
    this.$store.commit('bottomSheet/show', {
      compName: 'ChartAddSheet',
      compProps: {
        actionCallback: (chartOption: ChartOption) => {
          this.charts.push({
            chartOption,
            data: null
          });

          this.renderCharts().then();
        }
      }
    });
  }

  async renderCharts () {
    console.log('renderCharts called!');
    for (const chart of this.charts) {
      if (!chart.data) {
        const res = await fetch(urls.chart.url, urls.chart.post(chart.chartOption));
        const d = res.status === 200 && await res.json();

        if (d) {
          const data: { count: string, date: string }[] = d.data;
          const { since, until, 'chart-type': chartType, token, color } = chart.chartOption;

          chart.data = data.map(d => ({ y: d.count, x: d.date }));
          chart.label = `${token}-${chartType}-${since}->${until}`;
          chart.borderColor = color;
        }
      }
    }

    this.mainChart.data.datasets = this.charts;
    this.mainChart.update();
  }

  removeChart (c) {
    this.charts = this.charts.filter(chart => (chart !== c));
    this.mainChart.data.datasets = this.charts;

    this.mainChart.update();
  }

  chipLabel (c: ChartOption) {
    const { token, since, until, 'chart-type': chartType } = c;

    let chartTypeExpression = '';
    if (chartType === 'MA') {
      const { 'k-param': k_param } = c as MA;
      chartTypeExpression = `(k=${k_param})`;
    } else if (chartType === 'trend-momentums') {
      const { 'k-s': k_s, 'k-l': k_l, alpha } = c as TrendMomentum;
      chartTypeExpression = `(k_s=${k_s}, k_l=${k_l}, alpha=${alpha})`;
    } else if (chartType === 'momentum') {
      const { 'k-s': k_s, 'k-l': k_l, alpha, 'k-param': k_param } = c as Momentum;
      chartTypeExpression = `(k_param=${k_param}, k_s=${k_s}, k_l=${k_l}, alpha=${alpha})`;
    }

    return `${token} - ${chartType}${chartTypeExpression} - ${since} -> ${until}`;
  }

  invertColor (color) {
    return colorInverter(color);
  }

}
</script>
