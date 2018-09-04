<template>

  <div class="panel" v-loading="load_data" :element-loading-text="load_data_message">


    <div class="panel-heading">
      Lista de Contratos (<span style="font-weight: bold">{{ data_list.data.length }}</span>) - <span style="font-weight: bold; color: red;">R$ {{moneyFormat(value_total)}}</span>
    </div>


    <panel-search
      @openModalScoreAttendant="$emit('openModalScoreAttendant')"
      @openModalReason="$emit('openModalReason')"
      @openModalFormContract="$emit('openModalFormContract', {type_action: 'new_transfer'})"/>

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
            <th class="text-center" style="width: 80px" title="Data da transferência">
              <a href="#" @click.prevent="sort('transfer_date')">
                <span v-if="sort_by == 'transfer_date' ">
                    <i class="fa" v-if="sort_by == 'transfer_date'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Transf
              </a>
            </th>
            <th class="text-center" style="width: 80px">
              <a href="#" @click.prevent="sort('contract')">
                <span v-if="sort_by == 'contract' ">
                    <i class="fa" v-if="sort_by == 'contract'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Contrato
              </a>
            </th>
            <th class="text-center" style="width: 80px" title="Código Imóvel">
              <a href="#" @click.prevent="sort('immobile_code')">
                <span v-if="sort_by == 'immobile_code' ">
                    <i class="fa" v-if="sort_by == 'immobile_code'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                <span class="hidden-md">Cd.Imóvel</span>
                <span class="hidden-lg" title="Código Imóvel">Código</span>
              </a>
            </th>
            <th class="text-left hidden-md" style="width: 150px">
              <a href="#" @click.prevent="sort('address')">
                <span v-if="sort_by == 'address' ">
                    <i class="fa" v-if="sort_by == 'address'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Endereço
              </a>
            </th>
            <th class="text-center hidden-md" style="width: 80px">
              <a href="#" @click.prevent="sort('value')">
                <span v-if="sort_by == 'value' ">
                    <i class="fa" v-if="sort_by == 'value'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Valor
              </a>
            </th>
            <th class="text-left" style="width: 100px">Motivo</th>
            <th class="text-left" style="width: 100px">
              <a href="#" @click.prevent="sort('requester_name')">
                <span v-if="sort_by == 'requester_name' ">
                    <i class="fa" v-if="sort_by == 'requester_name'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Solicitante
              </a>
            </th>
            <th class="text-left" style="width: 80px">
              <a href="#" @click.prevent="sort('status')">
                <span v-if="sort_by == 'status' ">
                    <i class="fa" v-if="sort_by == 'status'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Status
              </a>
            </th>
            <th class="text-center" style="width: 80px">
              <a href="#" @click.prevent="sort('end_process')">
                <span v-if="sort_by == 'end_process' ">
                    <i class="fa" v-if="sort_by == 'end_process'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                <span class="hidden-md">Conclusão</span>
                <span class="hidden-lg" title="Conclusão">Conc</span>
              </a>
            </th>
            <th class="text-left" style="width: 60px">
              <span class="hidden-md">Responsável</span>
              <span class="hidden-lg" title="Responsável">Resp</span>
            </th>
            <th class="text-center" style="width: 80px">
              <a href="#" @click.prevent="sort('days_duration_process')">
                <span v-if="sort_by == 'days_duration_process' ">
                    <i class="fa" v-if="sort_by == 'days_duration_process'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Duração
              </a>
            </th>
            <th class="text-center" style="width: 50px"> - </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="list in data_list.data">
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="edit(list.id)">
                {{dateFormat(list.transfer_date)}}
              </a>
            </td>
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="edit(list.id)">
                {{list.contract.toUpperCase()}}
              </a>
            </td>
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="edit(list.id)">
                {{list.immobile_code.toUpperCase()}}
              </a>
            </td>
            <td class="text-left hidden-md" style="width: 150px" :title="list.address.toUpperCase() + ' ' +list.neighborhood.toUpperCase()">
              <a href="#" @click.prevent="edit(list.id)">
                {{strLimit(list.address.toUpperCase() + ' ' +list.neighborhood.toUpperCase(), 25)}}
              </a>
            </td>
            <td class="text-center hidden-md" style="width: 80px">
              <a href="#" @click.prevent="edit(list.id)">
                <div style="float: left">R$ </div>
                <div style="float: right">{{moneyFormat(list.value)}}</div>
              </a>
            </td>
            <td class="text-left" style="width: 100px">
              <a href="#" @click.prevent="edit(list.id)">
                <span class="hidden-md" :title="wordUpper(list.reason_name)">{{strLimit(wordUpper(list.reason_name), 20)}}</span>
                <span class="hidden-lg" :title="wordUpper(list.reason_name)">{{strLimit(wordUpper(list.reason_name), 11)}}</span>
              </a>
            </td>
            <td class="text-left" style="width: 100px">
              <a href="#" @click.prevent="edit(list.id)">
                <span class="hidden-md" :title="wordUpper(list.requester_name)">{{wordUpper(list.requester_name)}}</span>
                <span class="hidden-lg" :title="wordUpper(list.requester_name)">{{strLimit(wordUpper(list.requester_name), 10)}}</span>
              </a>
            </td>
            <td class="text-left" style="width: 80px">
              <a href="#" @click.prevent="edit(list.id)">
                <span :class="{success: list.status === 'r', orange: list.status === 'p', error: list.status === 'c'}">
                  {{wordUpper(getStatusName(list.status))}}
                </span>
              </a>
            </td>
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="edit(list.id)">
                {{list.end_process ? dateFormat(list.end_process) : ' - '}}
              </a>
            </td>
            <td class="text-left" style="width: 60px" :title="wordUpper(list.responsible_transfer_name)">
              <span class="hidden-md">{{wordUpper(strLimit(list.responsible_transfer_name, 8))}}</span>
              <span class="hidden-lg">{{wordUpper(strLimit(list.responsible_transfer_name, 5))}}</span>
            </td>
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="edit(list.id)">
                {{list.days_duration_process}} (d)
              </a>
            </td>
            <td class="text-center" style="width: 50px">
              <a href="#" @click.prevent="edit(list.id)">
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
      value_total: 0
    }
  },
  methods: {
    wordUpper,
    dateFormat,
    strLimit,
    moneyFormat,
    ...mapActions('Register', ['getContractsTransfer', 'getContractTransfer']),
    getStatusName (status) {
      if (status === 'p') {
        return 'pendente'
      }

      if (status === 'r') {
        return 'resolvido'
      }

      if (status === 'c') {
        return 'cancelado'
      }
    },
    sort(sortBy = null) {
      this.sort_order = !this.sort_order
      const collection = collect(this.data_list.data)
      let sort

      this.sort_by = !sortBy ? this.sort_by : sortBy

      if (this.sort_order) {
        sort = collection.sortBy(sortBy)
      } else {
        sort = collection.sortByDesc(sortBy)
      }
      this.$bus.$emit('Register\Transfer\Contract:SortData', {sort_by: this.sort_by, sort_order: this.sort_order})
      this.data_list.data = sort.all()

    },
    edit (id) {
      this.getContractTransfer(id)
    }
  },
  computed: {
    ...mapState('Register', ['contracts_transfer'])
  },
  watch: {
    'contracts_transfer' () {
      this.data_list.data = this.contracts_transfer

      // collection
      const collection = collect(this.data_list.data)

      // total
      this.value_total = collection.sum('value')

      setTimeout(() => {
        this.load_data = false
      }, 600)
    }
  },
  mounted () {
    this.load_data = true
    this.getContractsTransfer()

    this.$bus.$on('Register\Transfer\Contract:ShowLoadTableList', (params) => {
      this.load_data_message = params.load_data_message
      this.load_data = !params.load_data ? true : params.load_data
    })

    this.$bus.$on('Register\Transfer\Contract:HideLoadTableList', (params) => {
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