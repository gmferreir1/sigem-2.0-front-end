<template>

  <div class="panel" v-loading="load_data" :element-loading-text="load_data_message">

    <div class="panel-heading">
      Total de Contratos: (<span style="font-weight: bold">{{contracts_celebrated.length}}</span>)
    </div>

    <div style="position: absolute; right: 10px; top: 10px">
      <button class="button btn btn-sm btn-default">
        <i class="fa fa-print"></i>
      </button>
    </div>

    <panel-search />

    <div class="panel-body">

      <div class="row" v-if="!contracts_celebrated.length" style="padding-bottom: 10px">
        <div class="col-md-6 col-md-offset-5">
          <not-found />
        </div>
      </div>

      <div class="table-responsive" v-if="contracts_celebrated.length">
        <table class="table table-striped table-bordered table-hover table-condensed">
          <thead>
          <tr>
            <th class="text-center" style="width: 70px">Contrato</th>
            <th class="text-center" style="width: 70px">Código</th>
            <th class="text-left" style="width: 180px">Endereço</th>
            <th class="text-left" style="width: 100px">Bairro</th>
            <th class="text-left" style="width: 170px">Proprietário</th>

            <th class="text-center" style="width: 70px">
              <span class="hidden-md" title="Data da entrega das chaves">Ent. Chaves</span>
              <span class="hidden-lg" title="Data da entrega das chaves">E.Chaves</span>
            </th>
            <th class="text-left hidden-md" style="width: 60px">Tp.Contrato</th>
            <th class="text-center hidden-md" style="width: 70px">Boleto</th>

            <th class="text-center hidden-md" style="width: 70px">TX. Cont</th>
            <th class="text-center hidden-md" style="width: 60px" title="Despesa Bancária">D. Banc</th>
            <th class="text-center" style="width: 40px">
              <span class="hidden-md">Status</span>
              <span class="hidden-lg" title="Status geral do lançamento">ST</span>
            </th>
            <th class="text-center" style="width: 40px">
              <span class="hidden-md">IPTU</span>
              <span class="hidden-lg" title="Status de lançamento do IPTU">IP</span>
            </th>
            <th class="text-center" style="width: 40px">
              <span class="hidden-md">TCRS</span>
              <span class="hidden-lg" title="Status de lançamento do TCRS">TL</span>
            </th>
            <th class="text-center" style="width: 40px"> - </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="list in contracts_celebrated">
            <td class="text-center" style="width: 70px">{{list.contract.toUpperCase()}}</td>
            <td class="text-center" style="width: 70px">{{list.immobile_code.toUpperCase()}}</td>
            <td class="text-left" style="width: 180px">
              <span class="hidden-lg" :title="wordUpper(list.address)">{{strLimit(wordUpper(list.address), 30)}}</span>
              <span class="hidden-md" :title="wordUpper(list.address)">{{wordUpper(list.address)}}</span>
            </td>
            <td class="text-left" style="width: 100px">
              <span class="hidden-lg" :title="wordUpper(list.neighborhood)">{{strLimit(wordUpper(list.neighborhood), 10)}}</span>
              <span class="hidden-md" :title="wordUpper(list.neighborhood)">{{wordUpper(list.neighborhood)}}</span>
            </td>
            <td class="text-left" style="width: 170px">
              <span class="hidden-lg" :title="wordUpper(list.owner_name)">{{strLimit(wordUpper(list.owner_name), 10)}}</span>
              <span class="hidden-md" :title="wordUpper(list.owner_name)">{{wordUpper(list.owner_name)}}</span>
            </td>

            <td class="text-center" style="width: 80px">{{dateFormat(list.delivery_key)}}</td>
            <td class="text-left hidden-md" style="width: 60px">{{list.type_contract === 'new' ? 'Novo' : 'Velho'}}</td>
            <td class="text-center hidden-md" style="width: 70px">{{list.ticket === 'y' ? 'Sim' : 'Não'}}</td>
            <td class="text-center hidden-md" style="width: 70px">{{list.tx_contract === 'y' ? 'Sim' : 'Não'}}</td>

            <td class="text-center hidden-md" style="width: 60px">{{list.bank_expense === 'y' ? 'Sim' : 'Não'}}</td>

            <td class="text-center" style="width: 40px">{{list.status === 'p' ? 'NL' : 'L'}}</td>
            <td class="text-center" style="width: 40px">{{list.status_iptu === 'p' ? 'NL' : 'L'}}</td>
            <td class="text-center" style="width: 40px">{{list.status_tcrs === 'p' ? 'NL' : 'L'}}</td>
            <td class="text-center" style="width: 40px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">
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
import {mapActions, mapState} from 'vuex'
import NotFound from '@/components/NotFound'
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
      load_data: true,
      data_list: {
        data: []
      }
    }
  },
  methods: {
    ...mapActions('Financial', ['getContractsCelebrated']),
    wordUpper,
    dateFormat,
    strLimit,
  },
  computed: {
    ...mapState('Financial', ['contracts_celebrated'])
  },
  mounted () {
    this.getContractsCelebrated().then(res => {

      setTimeout(() => {
        this.load_data = false
      }, 600)

    }).catch(() => {
      this.load_data = false
    })


    this.$bus.$on('Financial\ContractCelebrated:InitLoadSearch', () => {
      this.load_data_message = 'Carregando dados, aguarde ...'
      this.load_data = true
    })

    this.$bus.$on('Financial\ContractCelebrated:EndLoadSearch', () => {
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

</style>