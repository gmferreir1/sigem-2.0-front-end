<template>


  <div v-loading="load_data" element-loading-text="Carregando dados do grafico, aguarde ...">
    <div id="containerGraphStatus" style="min-width: 310px; height: 400px; max-width: 600px"></div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      load_data: true,
      data_graph: [],
      month_data: ''
    }
  },
  methods: {
    renderGraph () {

      const self = this

      window.Highcharts.chart('containerGraphStatus', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: `<span style="font-size: 12px">Contratos Celebrados por Status Mês de </span> <span style="font-weight: bold; color: orange">${self.month_data}</span>`,
          align: 'left'
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            }
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: self.data_graph
        }]
      })
    },
    dataGraph () {
      http.get('dashboard/data-graph/contracts-celebrated-per-status').then(res => {

        this.data_graph = res.data.data
        this.month_data = res.data.month

        this.renderGraph()

        setTimeout(() => {
          this.load_data = false
        }, 1200)

      }).catch(() => {
        this.load_data = false
      })
    }
  },
  mounted () {
    this.dataGraph()
  }
}
</script>