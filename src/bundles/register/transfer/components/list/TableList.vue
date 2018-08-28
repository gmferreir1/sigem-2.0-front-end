<template>

  <div class="panel" v-loading="load_data" :element-loading-text="load_data_message">



    <panel-search @openModalScoreAttendant="$emit('openModalScoreAttendant')"/>

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
            <th class="text-center">Previsão</th>
            <th class="text-center"> - </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="list in data_list.data">
            <td class="text-center"></td>
            <td class="text-center" style="width: 50px">

              <a href="#">
                <i class="fa fa-pencil size-icon-table orange"></i>
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

export default {
  components: {
    NotFound,
    PanelSearch
  },
  data () {
    return {
      load_data_message: 'Carregando dados, aguarde ...',
      load_data: false,
      sort_by: 'code_reserve',
      sort_order: true,
      sort_by_data: {},
      data_list: {
        data: []
      },
      filter: {
        type_release: ['rent'],
        year_release: [moment().format('YYYY')],
        input_search: ''
      },
      printer: false
    }
  },
  methods: {
    wordUpper,
    dateFormat,
    strLimit,
    moneyFormat
  },
  mounted () {
  }
}
</script>

<style scoped>

  .title {
    font-size: 10px;
    font-weight: bold;
  }

  .number {
    font-size: 10px;
  }

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