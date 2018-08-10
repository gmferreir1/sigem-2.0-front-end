<template>

  <div class="panel" v-loading="load_data" :element-loading-text="message_load">

    <div class="panel-heading">
      Lista de Contratos (<span style="font-weight: bold">{{ data_list.data.length }}</span>) - <span style="font-weight: bold; color: red;">R$ {{moneyFormat(value_total)}}</span>
    </div>

    <div style="position: absolute; right: 10px; top: 10px">
      <button class="button btn btn-sm btn-primary" @click="$emit('openModalFormContract', 'new_release')">Novo Lançamento</button>
      <button class="button btn btn-sm btn-default" @click="$emit('openModalScoreAttendance')">Score Atendimento</button>
      <button class="button btn btn-sm btn-warning" @click="$emit('openModalDestinationOrReason')">Motivos / Destinos</button>
      <button class="button btn btn-sm btn-default">Baixa em Lote</button>
      <button class="button btn btn-sm btn-default" @click="$emit('openModalSelectTypePrinter')">
        <i class="fa fa-print"></i>
      </button>
    </div>

    <!-- painel de pesquisa -->
    <panel-search />
    <!-- / painel de pesquisa -->

    <div class="panel-body">

      <div class="row" v-if="!data_list.data.length" style="padding-bottom: 15px">
        <div class="col-md-6 col-md-offset-5">
          <not-found />
        </div>
      </div>

      <div class="table-responsive" v-if="data_list.data.length">
        <table class="table table-striped table-bordered table-condensed">
          <thead>
          <tr>
            <th class="text-center" style="width: 60px">
              <a href="#" @click.prevent="sort('id')">
                <span v-if="sort_by == 'id' ">
                    <i class="fa" v-if="sort_by == 'id'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                #
              </a>
            </th>

            <!-- hidden md -->
            <th class="text-left hidden-md" style="width: 150px" title="Responsável pela inativação">
              <a href="#" @click.prevent="sort('rp_per_inactive_name')">
                <span v-if="sort_by == 'rp_per_inactive_name' ">
                    <i class="fa" v-if="sort_by == 'rp_per_inactive_name'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Responsável
              </a>
            </th>

            <!-- hidden lg -->
            <th class="text-left hidden-lg" style="width: 100px" title="Responsável pela inativação">
              <a href="#" @click.prevent="sort('rp_per_inactive_name')">
                <span v-if="sort_by == 'rp_per_inactive_name' ">
                    <i class="fa" v-if="sort_by == 'rp_per_inactive_name'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Resp
              </a>
            </th>


            <!-- hidden md -->
            <th class="text-left hidden-md" style="width: 110px">
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

            <!-- hidden lg -->
            <th class="text-left hidden-lg" style="width: 80px" title="Contrato">
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
                Cont
              </a>
            </th>


            <!-- hidden md -->
            <th class="text-left hidden-md" style="width: 100px">
              <a href="#" @click.prevent="sort('immobile_type')">
                <span v-if="sort_by == 'immobile_type' ">
                    <i class="fa" v-if="sort_by == 'immobile_type'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Tipo
              </a>
            </th>

            <th class="text-left" style="width: 120px">
              <a href="#" @click.prevent="sort('tenant')">
                <span v-if="sort_by == 'tenant' ">
                    <i class="fa" v-if="sort_by == 'tenant'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Locatário
              </a>
            </th>


            <th class="text-left hidden-lg" style="width: 50px">R/T</th>
            <th class="text-left hidden-md" style="width: 100px">R/T</th>


            <th class="text-center" style="width: 100px">
              <a href="#" @click.prevent="sort('termination_date')">
                <span v-if="sort_by == 'termination_date' ">
                    <i class="fa" v-if="sort_by == 'termination_date'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Entrega
              </a>
            </th>
            <th class="text-center" style="width: 100px">Aluguel</th>

            <th class="text-left hidden-md" style="width: 150px">Motivo</th>

            <th class="text-left" style="width: 100px">Status</th>
            <th class="text-center" style="width: 100px">FIM</th>
            <th class="text-center" style="width: 50px">TMP</th>
            <!-- hidden md -->
            <th class="text-left hidden-md" style="width: 150px">Destino</th>

            <th class="text-center width-edit" style="width: 50px"> - </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="list in data_list.data">
            <td style="width: 60px" class="text-center">
              <a href="#" @click.prevent="edit(list)">
                {{list.id}}
              </a>
            </td>

            <!-- hidden lg -->
            <td class="hidden-lg text-left" style="width: 100px">
              <a href="#" @click.prevent="edit(list)">
                {{ strLimit(wordUpper(list.rp_per_inactive_name), 10) }}
              </a>
            </td>
            <!-- hidden md -->
            <td class="hidden-md text-left" style="width: 150px">
              <a href="#" @click.prevent="edit(list)">
                {{ strLimit(wordUpper(list.rp_per_inactive_name), 10) }}
              </a>
            </td>


            <!-- hidden md -->
            <td class="hidden-md" style="width: 110px">
              <a href="#" @click.prevent="edit(list)">
                {{ list.contract.toUpperCase() }}
              </a>
            </td>
            <!-- hidden lg -->
            <td class="hidden-lg" style="width: 80px">
              <a href="#" @click.prevent="edit(list)">
                {{ list.contract.toUpperCase() }}
              </a>
            </td>

            <!-- hidden md -->
            <td class="text-left hidden-md" :title="wordUpper(list.immobile_type)" style="width: 100px">
              <a href="#" @click.prevent="edit(list)">
                {{ wordUpper(strLimit(list.immobile_type, 8)) }}
              </a>
            </td>

            <td class="text-left" :title="wordUpper(list.tenant)" style="width: 120px">
              <a href="#" @click.prevent="edit(list)">
                {{ wordUpper(strLimit(list.tenant, 10 )) }}
              </a>
            </td>

            <!-- hidden lg -->
            <td class="hidden-lg text-left" style="width: 50px" :title="list.type_register === 'termination' ? 'Rescisão' : 'Transferência'">
              <a href="#" @click.prevent="edit(list)">
                {{ list.type_register === 'termination' ? 'R' : 'T'}}
              </a>
            </td>
            <!-- hidden md -->
            <td class="hidden-md text-left" style="width: 100px" :title="list.type_register === 'termination' ? 'Rescisão' : 'Transferência'">
              <a href="#" @click.prevent="edit(list)">
                {{ strLimit(list.type_register === 'termination' ? 'Rescisão' : 'Transferência', 7) }}
              </a>
            </td>

            <td class="text-center" style="width: 100px">
              <a href="#" @click.prevent="edit(list)">
                {{ dateFormat(list.termination_date, 'DD/MM/YYYY') }}
              </a>
            </td>

            <td style="width: 100px">
              <a href="#" @click.prevent="edit(list)">
                <div style="float: left">R$</div>
                <div style="float: right">{{ moneyFormat(list.value) }}</div>
              </a>
            </td>

            <!-- hidden md -->
            <td class="hidden-md" style="width: 150px" :title="wordUpper(list.reason_name)">
              <a href="#" @click.prevent="edit(list)">
                {{ strLimit(wordUpper(list.reason_name), 15) }}
              </a>
            </td>

            <td class="text-left" style="width: 100px">
              <a href="#" @click.prevent="edit(list)">
                <span :class="{'orange' : list.status === 'pendente', 'success': list.status === 'resolvido'}">
                 {{ wordUpper(list.status) }}
                </span>
              </a>
            </td>

            <td class="text-center" style="width: 100px">
              <a href="#" @click.prevent="edit(list)">
                {{ !list.end_process ? ' - ' : dateFormat(list.end_process, 'DD/MM/YYYY') }}
              </a>
            </td>
            <td class="text-center" style="width: 50px">
              <a href="#" @click.prevent="edit(list)">
                {{ list.duration_process }}
              </a>
            </td>

            <!-- hidden md -->
            <td class="text-left hidden-md" style="width: 150px" :title="wordUpper(list.destination_name)">
              <a href="#" @click.prevent="edit(list)">
                {{ !list.destination_name ? ' - ' : strLimit(wordUpper(list.destination_name), 15) }}
              </a>
            </td>

            <td class="text-center width-edit" style="width: 50px">
              <a href="" @click.prevent="edit(list)">
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
import {wordUpper, moneyFormat, strLimit} from '@/util/stringHelpers'
import PanelSearch from './PanelSearch'
import {dateFormat} from '@/util/dateTime'

export default {
  components: {
    NotFound,
    PanelSearch
  },
  data () {
    return {
      message_load: 'Carregando dados, aguarde ...',
      load_data: true,
      sort_by: 'id',
      sort_order: false,
      printer: false,
      type_printer: '',
      data_list: {
        data: []
      },
      value_total: 0,
      filter: {
        input: '',
        sort_by: 'id',
        sort_order: false,
        status: ['p'],
        responsible: [],
        type_register: ['termination'],
        init_date: window.moment().startOf('month').format('DD/MM/YYYY'),
        end_date: window.moment().endOf('month').format('DD/MM/YYYY'),
        date_conclusion: false,
        search: '',
        searchFields: 'contract:like;immobile_type:like;tenant:like',
      }
    }
  },
  methods: {
    wordUpper,
    moneyFormat,
    strLimit,
    dateFormat,
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
      this.data_list.data = sort.all()
    },
    getData () {

      const queryParams = {
        params: {
          sort_by: this.sort_by,
          sort_order: this.sort_order,
          init_date: this.filter.init_date,
          end_date: this.filter.end_date,
          responsible: this.filter.responsible,
          status: this.filter.status,
          type_register: this.filter.type_register,
          date_conclusion: this.filter.date_conclusion,
          search: this.filter.input,
          searchFields: 'contract:like;immobile_type:like;tenant:like',
          printer: this.printer,
          type_printer: this.type_printer
        }
      }

      http.get('termination/contract', queryParams).then(res => {

        if (this.printer) {
          this.printer = false
          const url = window.URL_API + '/' + res.data.file_name
          window.open(url)

          const params = {
            params: {
              file_name: res.data.file_name
            }
          }

          setTimeout(() => {
            http.get('api/remove-file', params)
          }, 1500)

        } else {
          this.data_list.data = res.data.data
          this.value_total = collect(this.data_list.data).sum('value')
        }

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    edit (dataEdit) {
      this.$emit('edit', dataEdit.id)
    }
  },
  mounted () {
    this.message_load = 'Carregando dados, aguarde ...'
    this.load_data = true

    this.getData()

    this.$bus.$on('Termination\Contract:Filter', filter => {
      this.message_load = 'Carregando dados, aguarde ...'
      this.load_data = true

      this.filter = {
        input: filter.input,
        init_date: filter.init_date,
        end_date: filter.end_date,
        responsible: filter.responsible,
        status: filter.status,
        type_register: filter.type_register,
        date_conclusion: filter.date_conclusion,
      }
      this.getData()
    })


    this.$bus.$on('Termination\Contract:RefreshList', () => {
      this.getData()
    })

    // chama a impressão da janela modal
    this.$bus.$on('Termination\Contract:PrinterList', (typePrinter) => {
      this.message_load = 'Gerando impressão, aguarde ...'
      this.load_data = true
      this.printer = true
      this.type_printer = typePrinter
      this.getData()
    })

  }
}
</script>

<style scoped>

  th {
    font-weight: normal !important;
    font-size: 12px;
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