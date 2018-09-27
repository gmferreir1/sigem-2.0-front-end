<template>

  <div v-loading="load_data" element-loading-text="Carregando dados do grafico, aguarde ...">

    <div class="row" v-if="not_show_graph">
      <div class="col-md-12">
        <div class="panel">

          <div class="panel-body">

            <img :src="images.find_graph"/>

            <span v-html="message"></span>

          </div>

        </div>

      </div>

    </div>

    <div id="containerContractInactivated" v-show="!not_show_graph" style="min-width: 310px; height: 400px; max-width: 500px"></div>

  </div>

</template>

<script>
import {wordUpper, moneyFormat} from '@/util/stringHelpers'

export default {
  data () {
    return {
      load_data: true,
      not_show_graph: false,
      data_graph: [],
      month_data: '',
      goal: '',
      type_goal: 'percent',
      images: {
        find_graph: require('@assets/images/find_graph.png')
      }
    }
  },
  methods: {
    wordUpper,
    moneyFormat,
    renderGraph () {

      const self = this

      window.Highcharts.chart('containerContractInactivated', {
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
          text: `<span style="font-size: 13px">Contratos Inativados </span>
                  <span style="font-weight: bold; color: #E98531">${self.wordUpper(self.month_data)}</span>
                 - <span style="font-size: 11px; color: red">META R$ ${moneyFormat(self.goal)}</span>
                  <span style="font-size: 11px">(Máximo)</span>`,
          align: 'left'
        },
        tooltip: {
          valueDecimals: 2,
          valuePrefix: 'R$ '
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              },
              formatter: function () {
                return '<b>' + this.point.name + '</b>: R$ ' + Highcharts.numberFormat(this.y, 2, ',', '.');
              }
            },
            showInLegend: true
          }
        },
        series: [{
          type: 'pie',
          data: self.data_graph
        }]
      })
    },
    getDataGraph () {

      http.get('dashboard/data-graph/contracts-inactivated').then(res => {

        if (res.data.error) {
          const message = res.data.message

          if (message === 'no goals found') {
            this.message = `Nenhuma meta definida no sistema !
                            <div style="margin-left: 35px; font-weight: bold">Defina uma meta para continuar</div>`
            this.not_show_graph = true
            this.load_data = false

            return
          }

          if (message === 'no goal percent found') {
            _notification.error('Metas de percentual não definidas !')
            this.getDataGraph()
          }
        }

        this.data_graph = res.data.data
        this.month_data = res.data.month
        this.goal = res.data.goal

        this.renderGraph()

        setTimeout(() => {
          this.load_data = false
        }, 1200)

      }).catch((err) => {
        this.load_data = false
      })
    }
  },
  mounted () {
    this.load_data = true
    this.getDataGraph()
  }
}
</script>