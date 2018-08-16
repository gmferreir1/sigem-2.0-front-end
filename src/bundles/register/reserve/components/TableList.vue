<template>

  <div class="panel" v-loading="load_data" :element-loading-text="load_data_message">

    <div class="panel-heading">

      <div class="row">
        <div class="col-md-12">
          <div style="float: left; width: 180px">
            <span class="title">Total: </span>
            <span class="number">&nbsp;(000) R$ 44.444,44</span>
          </div>

          <div style="float: left; width: 180px">
            <span class="title">Reserva: </span>
            <span class="number">&nbsp; (000) R$ 44.444,44</span>
          </div>

          <div style="float: left; width: 180px">
            <span class="title">Documentação: </span>
            <span class="number">&nbsp; (000) R$ 44.444,44</span>
          </div>

          <div style="float: left; width: 180px">
            <span class="title">Análise: </span>
            <span class="number">&nbsp; (000) R$ 44.444,44</span>
          </div>

          <div style="float: left; width: 180px">
            <span class="title">Cadastro: </span>
            <span class="number">&nbsp; (000) R$ 44.444,44</span>
          </div>

        </div>
      </div>

      <div class="row">
        <div class="col-md-8">
          <hr />
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">

          <div style="float: left; width: 180px">
            <span class="title">Pendente: </span>
            <span class="number">&nbsp; (000) R$ 44.444,44</span>
          </div>

          <div style="float: left; width: 180px">
            <span class="title">Assinado: </span>
            <span class="number">&nbsp; (000) R$ 44.444,44</span>
          </div>

          <div style="float: left; width: 180px">
            <span class="title">Ass c/ Pend: </span>
            <span class="number">&nbsp; (000) R$ 44.444,44</span>
          </div>

          <div style="float: left; width: 180px">
            <span class="title">Ativ. Finais: </span>
            <span class="number">&nbsp; (000) R$ 44.444,44</span>
          </div>

          <div style="float: left; width: 180px">
            <span class="title">Cancelados: </span>
            <span class="number" style="color: red">&nbsp; (000) R$ 44.444,44</span>
          </div>
        </div>
      </div>

    </div>

    <panel-search
      @openModalFormReserve="params => $emit('openModalFormReserve', params)"
      @openModalDocumentation="$emit('openModalDocumentation')"
      @openModalScoreAttendance="$emit('openModalScoreAttendance')"/>

    <div class="panel-body">

      <!--
      <div class="row" v-if="!data_list.data.length" style="padding-bottom: 10px">
        <div class="col-md-6 col-md-offset-5">
          <not-found />
        </div>
      </div>
      -->

      <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover table-condensed">
          <thead>
          <tr>
            <th class="text-center">Reserva</th>
            <th class="text-center">Código</th>
            <th class="text-center">Contrato</th>
            <th class="text-center">Dt. Res</th>
            <th class="text-center">VR. Neg</th>
            <th class="text-center">Cliente</th>
            <th class="text-center">Previsão</th>
            <th class="text-center">Status</th>
            <th class="text-center">Cadastro</th>
            <th class="text-center">Recepção</th>
            <th class="text-center">Conc</th>
            <th class="text-center">Tempo</th>
            <th class="text-center"> - </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="text-center"></td>
            <td class="text-center">

              <a href="" @click.prevent="">
                <i class="fa fa-ban size-icon-table" style="color: #CCCCCC"></i>
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
import {mapActions, mapState} from 'vuex'
import {wordUpper, strLimit} from '@/util/stringHelpers'
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
    strLimit
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

</style>