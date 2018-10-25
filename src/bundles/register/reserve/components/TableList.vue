<template>

  <div class="panel" v-loading="load_data" :element-loading-text="load_data_message">

    <div class="panel-heading">

      <div class="row">
        <div class="col-md-12">
          <div style="float: left; width: 180px">
            <span class="title">Total: </span>
            <span class="number">&nbsp;({{resume.total.qt}}) R$ {{moneyFormat(resume.total.value)}}</span>
          </div>

          <div style="float: left; width: 180px" class="reserve">
            <span class="title">Reserva: </span>
            <span class="number">&nbsp;({{resume.reserve.qt}}) R$ {{moneyFormat(resume.reserve.value)}}</span>
          </div>

          <div style="float: left; width: 180px" class="documentation">
            <span class="title">Documentação: </span>
            <span class="number">&nbsp;({{resume.documentation.qt}}) R$ {{moneyFormat(resume.documentation.value)}}</span>
          </div>

          <div style="float: left; width: 180px" class="in-progress">
            <span class="title">Análise: </span>
            <span class="number">&nbsp;({{resume.analyze.qt}}) R$ {{moneyFormat(resume.analyze.value)}}</span>
          </div>

          <div style="float: left; width: 180px" class="in-progress">
            <span class="title">Cadastro: </span>
            <span class="number">&nbsp;({{resume.register.qt}}) R$ {{moneyFormat(resume.register.value)}}</span>
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

          <div style="float: left; width: 180px" class="pending">
            <span class="title">Pendente: </span>
            <span class="number">&nbsp;({{resume.pending.qt}}) R$ {{moneyFormat(resume.pending.value)}}</span>
          </div>

          <div style="float: left; width: 180px" class="signed">
            <span class="title">Assinado: </span>
            <span class="number">&nbsp;({{resume.signed.qt}}) R$ {{moneyFormat(resume.signed.value)}}</span>
          </div>

          <div style="float: left; width: 180px" class="signed">
            <span class="title">Ass c/ Pend: </span>
            <span class="number">&nbsp;({{resume.signed_with_pending.qt}}) R$ {{moneyFormat(resume.signed_with_pending.value)}}</span>
          </div>

          <div style="float: left; width: 180px" class="final_active">
            <span class="title">Ativ. Finais: </span>
            <span class="number">&nbsp;({{resume.final_activity.qt}}) R$ {{moneyFormat(resume.final_activity.value)}}</span>
          </div>

          <div style="float: left; width: 180px" class="cancel">
            <span class="title">Cancelados: </span>
            <span class="number">&nbsp;({{resume.canceled.qt}}) R$ {{moneyFormat(resume.canceled.value)}}</span>
          </div>
        </div>
      </div>

    </div>

    <panel-search
      @openModalFormReserve="params => $emit('openModalFormReserve', params)"
      @openModalDocumentation="$emit('openModalDocumentation')"
      @openModalScoreAttendance="$emit('openModalScoreAttendance')"
      @openModalReasonCancel="$emit('openModalReasonCancel')"
      @openModalSelectTypePrint="filter => $emit('openModalSelectTypePrint', filter)"
      :sortBy="sort_by_data"/>

    <div class="panel-body">


      <div class="row" v-if="!data_list.data.length" style="padding-bottom: 10px">
        <div class="col-md-6 col-md-offset-5">
          <not-found />
        </div>
      </div>

      <div class="table-responsive" v-if="data_list.data.length">
        <table class="table table-striped table-bordered table-hover table-condensed" id="table">
          <thead>
          <tr>
            <!-- hidden md -->
            <th class="text-center hidden-md" title="Código da reserva" style="width: 80px;">
              <a href="#" @click.prevent="sort('code_reserve')">
                <span v-if="sort_by == 'code_reserve' ">
                    <i class="fa" v-if="sort_by == 'code_reserve'"
                       :class="{'fa-sort-amount-desc': sort_order == true , 'fa-sort-amount-asc': sort_order == false}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Reserva
              </a>
            </th>
            <!-- / hidden md -->

            <th class="text-center" style="width: 70px">
              <a href="#" @click.prevent="sort('immobile_code')">
                <span v-if="sort_by == 'immobile_code' ">
                    <i class="fa" v-if="sort_by == 'immobile_code'"
                       :class="{'fa-sort-amount-desc': sort_order == true , 'fa-sort-amount-asc': sort_order == false}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                <span class="hidden-md">Código</span>
                <span class="hidden-lg" title="Código">Cód</span>
              </a>
            </th>
            <th class="text-center" style="width: 80px">
              <a href="#" @click.prevent="sort('contract')">
                <span v-if="sort_by == 'contract' ">
                    <i class="fa" v-if="sort_by == 'contract'"
                       :class="{'fa-sort-amount-desc': sort_order == true , 'fa-sort-amount-asc': sort_order == false}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                <span class="hidden-md">Contrato</span>
                <span class="hidden-lg" title="Contrato">Cont</span>
              </a>
            </th>
            <th class="text-center" style="width: 80px">Dt. Res</th>

            <th class="text-center" style="width: 100px">
              <a href="#" @click.prevent="sort('value_negotiated')">
                <span v-if="sort_by == 'value_negotiated' ">
                    <i class="fa" v-if="sort_by == 'value_negotiated'"
                       :class="{'fa-sort-amount-desc': sort_order == true , 'fa-sort-amount-asc': sort_order == false}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                VR. Neg
              </a>
            </th>
            <th class="text-left" style="width: 100px">
              <a href="#" @click.prevent="sort('client_name')">
                <span v-if="sort_by == 'client_name' ">
                    <i class="fa" v-if="sort_by == 'client_name'"
                       :class="{'fa-sort-amount-desc': sort_order == true , 'fa-sort-amount-asc': sort_order == false}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Cliente
              </a>
            </th>
            <th class="text-center" style="width: 80px">Previsão</th>

            <th class="text-center" style="width: 80px">Status</th>
            <th class="text-left" style="width: 70px">Cadastro</th>
            <th class="text-left" style="width: 70px">
              <span class="hidden-md">Recepção</span>
              <span class="hidden-lg" title="Recepção">Recp</span>
            </th>
            <th class="text-center" style="width: 80px">Conc</th>
            <th class="text-center" style="width: 50px">
              <span class="hidden-md">Tempo</span>
              <span class="hidden-lg" title="Tempo">TP</span>
            </th>
            <th class="text-center" style="width: 50px"> - </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="list in data_list.data">
            <td class="text-center hidden-md" style="width: 80px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">
                {{list.code_reserve.toUpperCase()}}
              </a>
            </td>
            <td class="text-center" style="width: 70px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">
                {{list.immobile_code.toUpperCase()}}
              </a>
             </td>
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">
                {{list.contract ? list.contract.toUpperCase() : ' - '}}
              </a>
            </td>
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">
                {{dateFormat(list.date_reserve)}}
              </a>
            </td>

            <td class="text-center" style="width: 100px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">
                <div style="float: left">R$</div>
                <div style="float: right">{{ moneyFormat(list.value_negotiated) }}</div>
              </a>
            </td>
            <td class="text-left" :title="wordUpper(list.client_name)" style="width: 110px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">
                {{strLimit(wordUpper(list.client_name), 10)}}
              </a>
            </td>
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">
                {{(list.situation === 'as' || list.situation === 'ap' || list.situation === 'af' || list.situation === 'c') ? ' - ' : dateFormat(list.prevision)}}
              </a>
            </td>

            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">


                 <span class="hidden-md" :class="{
                  'reserve': list.situation === 'r',
                  'documentation': list.situation === 'd',
                  'in-progress': list.situation === 'a',
                  'in-progress': list.situation === 'cd',
                  'pending': list.situation === 'p',
                  'signed': list.situation === 'as',
                  'final_active': list.situation === 'af',
                  'cancel': list.situation === 'c'}"> {{wordUpper(getSituation(list.situation))}} </span>


                <span class="hidden-lg" :title="wordUpper(getSituation(list.situation))" :class="{
                  'reserve': list.situation === 'r',
                  'documentation': list.situation === 'd',
                  'in-progress': list.situation === 'a',
                  'in-progress': list.situation === 'cd',
                  'pending': list.situation === 'p',
                  'signed': list.situation === 'as',
                  'final_active': list.situation === 'af',
                  'cancel': list.situation === 'c'}"> {{strLimit(wordUpper(getSituation(list.situation)), 6)}} </span>


              </a>
            </td>
            <td class="text-left" :title="wordUpper(list.attendant_register_name)" style="width: 70px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">
                <span class="hidden-md">{{strLimit(wordUpper(list.attendant_register_name), 6)}}</span>
                <span class="hidden-lg">{{strLimit(wordUpper(list.attendant_register_name), 6)}}</span>
              </a>
            </td>
            <td class="text-left" :title="wordUpper(list.attendant_reception_name)" style="width: 70px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">
                {{strLimit(wordUpper(list.attendant_reception_name), 6)}}
              </a>
            </td>
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">
                {{!list.conclusion ? '-' : dateFormat(list.conclusion)}}
              </a>
            </td>
            <td class="text-center" style="width: 50px">
              <a href="#" @click.prevent="$emit('openModalFormReserve', {type_action: 'edit_register', id: list.id})">
                {{list.duration_process}}(D)
              </a>
            </td>
            <td class="text-center" style="width: 50px">

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

import NotFound from '@/components/NotFound'
import {mapActions, mapState} from 'vuex'
import {wordUpper, strLimit, moneyFormat} from '@/util/stringHelpers'
import {dateFormat} from '@/util/dateTime'
import PanelSearch from './PanelSearch'
import {getSituation} from '../util/util'

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
      printer: false,
      resume: {
        total: {
          qt: 0,
          value: 0
        },
        reserve: {
          qt: 0,
          value: 0
        },
        documentation: {
          qt: 0,
          value: 0
        },
        analyze: {
          qt: 0,
          value: 0
        },
        register: {
          qt: 0,
          value: 0
        },
        pending: {
          qt: 0,
          value: 0
        },
        signed: {
          qt: 0,
          value: 0
        },
        signed_with_pending: {
          qt: 0,
          value: 0
        },
        final_activity: {
          qt: 0,
          value: 0
        },
        canceled: {
          qt: 0,
          value: 0
        }
      }
    }
  },
  methods: {
    wordUpper,
    dateFormat,
    strLimit,
    moneyFormat,
    ...mapActions('Register', ['getReserveContracts']),
    getSituation,
    sort(sortBy = null) {

      this.sort_by = !sortBy ? this.sort_by : sortBy

      this.sort_order = sortBy ? !this.sort_order : this.sort_order
      /*
       * se a ordenação for pelo código da reserva
       */
      if (this.sort_by === 'code_reserve') {
        this.sort_by = 'code_reserve'
        if (this.sort_order) {
          this.data_list.data = _.orderBy(this.data_list.data, ['year_r', 'code_r'], ['desc', 'desc'])
        } else {
          this.data_list.data = _.orderBy(this.data_list.data, ['year_r', 'code_r'], ['asc', 'asc'])
        }

      } else {
        const collection = collect(this.data_list.data)
        let sort

        if (!this.sort_order) {
          sort = collection.sortBy(this.sort_by)
        } else {
          sort = collection.sortByDesc(this.sort_by)
        }
        this.data_list.data = sort.all()
      }

      this.sort_by_data = {
        sort_by: this.sort_by,
        sort_order: this.sort_order
      }
    },
    getResumeVal () {

      const collection = collect(this.data_list.data)

      this.resume = {
        total: {
          qt: collection.count(),
          value: collection.sum('value_negotiated')
        },
        reserve: {
          qt: collection.where('situation', 'r').count(),
          value: collection.where('situation', 'r').sum('value_negotiated')
        },
        documentation: {
          qt: collection.where('situation', 'd').count(),
          value: collection.where('situation', 'd').sum('value_negotiated')
        },
        analyze: {
          qt: collection.where('situation', 'a').count(),
          value: collection.where('situation', 'a').sum('value_negotiated')
        },
        register: {
          qt: collection.where('situation', 'cd').count(),
          value: collection.where('situation', 'cd').sum('value_negotiated')
        },
        pending: {
          qt: collection.where('situation', 'p').count(),
          value: collection.where('situation', 'p').sum('value_negotiated')
        },
        signed: {
          qt: collection.where('situation', 'as').count(),
          value: collection.where('situation', 'as').sum('value_negotiated')
        },
        signed_with_pending: {
          qt: collection.where('situation', 'ap').count(),
          value: collection.where('situation', 'ap').sum('value_negotiated')
        },
        final_activity: {
          qt: collection.where('situation', 'af').count(),
          value: collection.where('situation', 'af').sum('value_negotiated')
        },
        canceled: {
          qt: collection.where('situation', 'c').count(),
          value: collection.where('situation', 'c').sum('value_negotiated')
        }
      }
    }
  },
  computed: {
    ...mapState('Register', ['reserve_contracts'])
  },
  watch: {
    reserve_contracts () {
      this.data_list.data = this.reserve_contracts
      this.getResumeVal()
      setTimeout(() => {
        this.load_data = false
      }, 600)
    }
  },
  mounted () {
    this.load_data = true

    this.getReserveContracts()

    this.$bus.$on('Register\Reserve:LoadingTableList', () => {
      this.load_data_message = 'Processando sua solicitação, aguarde ...'
      this.load_data = true
    })

    this.$bus.$on('Register\Reserve:HideLoadingTableList', () => {
      this.load_data = false
    })


    this.$bus.$on('Register\Reserve:RefreshTableList', () => {
      this.getReserveContracts()
      this.sort()
    })
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

  .reserve {
    font-weight: bold;
  }

  .is-release {
    opacity: 0.5;
  }

  .in-progress {
    color: darkgreen;
  }

  .documentation {
    color: #1B6AAA;
    font-weight: bold;
  }

  .pending {
    color: darkorange;
  }

  .signed {
    color: darkblue;
    font-weight: bold;
  }

  .final_active {
    color: darkblue;
  }

  .cancel {
    color: darkred;
  }

</style>