<template>

  <div class="panel" v-loading="load_data" element-loading-text="Carregando dados, aguarde ...">


    <div class="panel-heading">
      Lista de Imóveis Captados <span style="font-weight: bold">( {{resume.qt_total}} )</span> - <span style="font-weight: bold; color: red;">R$ {{moneyFormat(resume.value_total)}}</span>
    </div>

    <panel-search @openModalFormCaptured="params => $emit('openModalFormCaptured', params)" @showLoad="showLoad"/>

    <div class="panel-body">

      <div class="row" v-if="!data_list.data.length" style="padding-bottom: 10px">
        <div class="col-md-6 col-md-offset-5">
          <not-found />
        </div>
      </div>

      <div class="table-responsive" v-if="data_list.data.length">
        <table class="table table-striped table-bordered table-hover table-condensed">
          <thead>
          <tr>
            <th class="text-left hidden-md" style="width: 150px">Proprietário</th>
            <th class="text-left hidden-lg" style="width: 100px">Proprietário</th>

            <th class="text-center" style="width: 80px">Código</th>
            <th class="text-center" style="width: 60px" title="Finalidade">Fin</th>

            <th class="text-left hidden-md" style="width: 300px">Endereço</th>
            <th class="text-left hidden-lg" style="width: 140px">Endereço</th>


            <th class="text-left" style="width: 130px">Tipo</th>
            <th class="text-center" style="width: 90px">Valor R$</th>
            <th class="text-center" style="width: 80px">Captação</th>

            <th class="text-left hidden-md" style="width: 150px">Captador</th>
            <th class="text-left hidden-lg" style="width: 100px">Captador</th>

            <th class="text-center" style="width: 70px"> - </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="list in data_list.data">
            <td class="text-left hidden-md" style="width: 150px" :title="wordUpper(list.owner)">
              <a href="#" @click.prevent="$emit('edit', list.id)">
                {{strLimit(wordUpper(list.owner), 25)}}
              </a>
            </td>

            <td class="text-left hidden-lg" style="width: 100px" :title="wordUpper(list.owner)">
              <a href="#" @click.prevent="$emit('edit', list.id)">
                {{strLimit(wordUpper(list.owner), 10)}}
              </a>
            </td>

            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="$emit('edit', list.id)">
                {{list.immobile_code.toUpperCase()}}
              </a>
            </td>

            <td class="text-center" style="width: 60px">
              <a href="#" @click.prevent="$emit('edit', list.id)">
                {{list.type_location.toUpperCase()}}
              </a>
            </td>

            <td class="text-left hidden-md" style="width: 300px" :title="list.address.toUpperCase() + ' ' + list.neighborhood.toUpperCase()">
              <a href="#" @click.prevent="$emit('edit', list.id)">
                {{strLimit(list.address.toUpperCase() + ' ' + list.neighborhood.toUpperCase(), 25)}}
              </a>
            </td>

            <td class="text-left hidden-lg" style="width: 140px" :title="list.address.toUpperCase() + ' ' + list.neighborhood.toUpperCase()">
              <a href="#" @click.prevent="$emit('edit', list.id)">
                {{strLimit(list.address.toUpperCase() + ' ' + list.neighborhood.toUpperCase(), 15)}}
              </a>
            </td>

            <td class="text-left" style="width: 130px">
              <a href="#" @click.prevent="$emit('remove', list.id)">
                {{wordUpper(list.type_immobile_name)}}
              </a>
            </td>
            <td class="text-center" style="width: 90px">
              <a href="#" @click.prevent="$emit('edit', list.id)">
                <div class="pull-left">R$ </div>
                <div class="pull-right">{{moneyFormat(list.value)}}</div>
              </a>
            </td>
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="$emit('edit', list.id)">
                {{dateFormat(list.captured_date)}}
              </a>
            </td>

            <td class="text-left hidden-md" style="width: 150px" :title="wordUpper(list.responsible_name)">
              <a href="#" @click.prevent="$emit('edit', list.id)">
                {{strLimit(wordUpper(list.responsible_name), 30)}}
              </a>
            </td>
            <td class="text-left hidden-lg" style="width: 100px" :title="wordUpper(list.responsible_name)">
              <a href="#" @click.prevent="$emit('edit', list.id)">
                {{strLimit(wordUpper(list.responsible_name), 10)}}
              </a>
            </td>

            <td class="text-center" style="width: 70px">

              <a href="#" @click.prevent="$emit('edit', list.id)" title="Editar">
                <i class="fa fa-pencil size-icon-table orange"></i>
              </a>

              <a href="#" @click.prevent="$emit('remove', list.id)" style="margin-left: 10px" title="Remover">
                <i class="fa fa-trash size-icon-table red"></i>
              </a>

            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>

import NotFound from '@/components/NotFound'
import {wordUpper, strLimit, moneyFormat} from '@/util/stringHelpers'
import {dateFormat} from '@/util/dateTime'
import PanelSearch from './PanelSearch'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    NotFound,
    PanelSearch
  },
  data () {
    return {
      load_data_message: 'Carregando dados, aguarde ...',
      load_data: false,
      sort_by: 'transfer_date',
      sort_order: false,
      sort_by_data: {},
      data_list: {
        data: []
      },
      resume: {
        qt_total: 0,
        value_total: 0
      }
    }
  },
  methods: {
    wordUpper,
    dateFormat,
    strLimit,
    moneyFormat,
    ...mapActions('ImmobileCaptured', ['getListReportImmobileCaptured']),
    showLoad (params) {
      this.load_data_message = params.load_data_message
      this.load_data = params.load_data
    }
  },
  computed: {
    ...mapState('ImmobileCaptured', ['all_list_report_immobile_captured']),
  },
  watch: {
    all_list_report_immobile_captured () {

      this.data_list.data = this.all_list_report_immobile_captured

      const collection = collect(this.all_list_report_immobile_captured)

      this.resume = {
        qt_total: collection.count(),
        value_total: collection.sum('value')
      }

      setTimeout(() => {
        this.load_data = false
      }, 600)
    }
  },
  mounted () {

    this.load_data = true

    const queryParams = {
      params: {
        init_date: window.moment().startOf('month').format('DD/MM/YYYY'),
        end_date: window.moment().endOf('month').format('DD/MM/YYYY'),
      }
    }

    this.getListReportImmobileCaptured(queryParams).catch(() => {
      this.load_data = false
    })
  }
}
</script>

<style scoped>

  th {
    font-weight: normal !important;
    font-size: 11px;
  }

  tr {
    font-size: 11px;
  }

  thead, tbody {
    display: block;
  }

  tbody {
    max-height: calc(100vh - 340px) !important;
    overflow-y: auto;    /* Trigger vertical scroll    */
    overflow-x: hidden;  /* Hide the horizontal scroll */
  }

  thead, tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
  }

  thead {
    width: 100%
  }

  thead > tr > th {
    border-right: none !important;
  }

  .panel-body {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

  .panel {
    padding-top: 10px;
  }

</style>