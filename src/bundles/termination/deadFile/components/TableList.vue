<template>

  <div class="panel" v-loading="load_data" element-loading-text="Carregando dados, aguarde ...">

    <div class="panel-heading">
      Total de Processos Arquivados: (<span style="font-weight: bold">{{data_list.data.length}}</span>)
    </div>


    <panel-search />

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
            <th class="text-center" style="width: 80px">Contrato</th>
            <th class="text-center" style="width: 100px">Rescisão</th>
            <th class="text-center" style="width: 60px">Caixa</th>
            <th class="text-center" style="width: 80px">Arquivo</th>
            <th class="text-center" style="width: 100px">Status</th>
            <th class="text-center" style="width: 100px">Ano</th>
            <th class="text-center" style="width: 100px">Tipo</th>
            <th class="text-left">Resp.</th>
            <th class="text-center" style="width: 100px" title="Data do Arquivamento">Arquiv.</th>
            <th class="text-center" style="width: 50px"> - </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="list in data_list.data">
            <td class="text-center" style="width: 80px">{{list.contract.toUpperCase()}}</td>
            <td class="text-center" style="width: 100px">{{dateFormat(list.termination_date, 'DD/MM/YYYY')}}</td>
            <td class="text-center" style="width: 60px">{{list.cashier}}</td>
            <td class="text-center" style="width: 80px">{{list.file}}</td>
            <td class="text-center" style="width: 100px">
              <span :class="{success: list.status === 1, error: list.status === 2}">{{list.status === 1 ? 'Arquivado' : 'Cancelado'}}</span>
            </td>
            <td class="text-center" style="width: 100px">{{list.year_release}}</td>
            <td class="text-center" style="width: 100px">{{list.type_release === 'rent' ? 'Aluguel' : 'Justiça'}}</td>
            <td class="text-left">
              <span class="hidden-md" :title="wordUpper(list.rp_last_action_name)">{{wordUpper(list.rp_last_action_name)}}</span>
              <span class="hidden-lg" :title="wordUpper(list.rp_last_action_name)">{{wordUpper(strLimit(list.rp_last_action_name, 10))}}</span>
            </td>
            <td class="text-center" style="width: 100px">{{list.created_at ? dateFormat(list.created_at, 'DD/MM/YYYY') : ' - '}}</td>
            <td class="text-center" style="width: 50px">
              <a href="" @click.prevent="$emit('showModalConfirmCancel', list)" v-if="list.status === 1" title="Cancelar arquivamento">
                <i class="fa fa-ban size-icon-table red"></i>
              </a>

              <a href="" @click.prevent="" v-else>
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
      load_data: true,
      data_list: {
        data: []
      },
      filter: {
        type_release: ['rent'],
        year_release: [moment().format('YYYY')],
        input_search: ''
      }
    }
  },
  methods: {
    wordUpper,
    dateFormat,
    strLimit,
    getData () {

      const queryParams = {
        params: {
          type_release: this.filter.type_release,
          year_release: this.filter.year_release,
          search: this.filter.input_search,
          searchFields: 'contract:like;file:like;cashier:like'
        }
      }

      http.get('dead-file', queryParams).then(res => {

        this.data_list.data = res.data.data

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    }
  },
  mounted () {
    this.getData()

    this.$bus.$on('Termination\DeadFile:RefreshTableList', () => {
      this.getData()
    })

    this.$bus.$on('Termination\DeadFile:Search', (dataFilter) => {
      this.load_data = true

      this.filter.type_release = dataFilter.type_release
      this.filter.year_release = dataFilter.year_release
      this.filter.input_search = dataFilter.input_search
      this.getData()
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

</style>