<template>

  <div id="container" style="min-width: 310px; height: 400px; max-width: 600px; width: 600px"  v-loading="load_data" element-loading-text="Carregando dados do grafico, aguarde ..."></div>

</template>

<script>
export default {
  data () {
    return {
      load_data: true
    }
  },
  methods: {
    renderGraph () {
      window.Highcharts.chart('container', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        title: {
          text: 'Contratos Celebrados Setembro 2018',
          align: 'center',
          verticalAlign: 'top',
          y: 60
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            selected: false,
            startAngle: -90,
            endAngle: 90,
            innerSize: '80%',
            showInLegend: false,
            dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                fontWeight: 'bold',
                color: 'white'
              }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%']
          }
        },
        series: [{
          type: 'pie',
          data: [
            {
              name: 'Meta Cumprida',
              y: 80,
              color: 'green'
            },
            {
              name: 'Meta a Cumprir',
              y: 20,
              color: 'red'
            },
          ]
        }]
      })
    }
  },
  mounted () {
    this.renderGraph()
    setTimeout(() => {
      this.load_data = false
    }, 1200)
  }
}
</script>