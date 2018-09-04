<template>

  <div>

    <div class="well" style="margin-right: 5px; margin-left: 5px">

      <div class="row">

        <div class="col-md-3">
          <input type="text" class="form-control input-sm" placeholder="Pesquisa de dados" v-model="filter.input_search" @keypress.enter="search">
        </div>

        <div class="col-md-2 col-lg-2" style="width: 125px">
          <select-status :select="select.status" @valueSelected="value => filter.status = value"/>
        </div>

        <div class="col-md-2 col-lg-2" style="width: 125px">
          <select-responsible-register-sector :select="select.responsible_contract_transfer" @valueSelected="value => filter.responsible_contract_transfer = value"/>
        </div>

        <div class="col-md-2 col-lg-2" style="padding-right: 0px; width: 105px">
          <date-picker class="form-control input-sm" v-model="filter.init_date" placeholder="dd/mm/aaaa"/>
        </div>

        <div class="col-md-2 col-lg-2" style="padding-left: 5px; padding-right: 0px; width: 95px;">
          <date-picker class="form-control input-sm" v-model="filter.end_date" placeholder="dd/mm/aaaa"/>
        </div>

        <div class="col-md-1" style="width: 60px" title="Pesquisa pela data da conclusão">
          <input type="checkbox" style="margin-top: 10px" v-model="filter.search_for_conclusion_date">
          <span style="font-size: 10px">DC</span>
        </div>

        <div class="col-md-2">
          <button class="button btn btn-sm btn-primary" @click="search">Pesquisar</button>
        </div>

        <!-- buttons -->
        <div style="float: right">

          <button class="button btn btn-sm btn-default" title="Nova Transferência" @click="$emit('openModalFormContract')">
            <i class="fa fa-plus-circle"></i>
          </button>

          <button class="button btn btn-sm btn-default" title="Score de Atendimento" @click="$emit('openModalScoreAttendant')">
            <i class="fa fa-user"></i>
          </button>

          <button class="button btn btn-sm btn-default" title="Motivos Para Transferência" @click="$emit('openModalReason')">
            <i class="fa fa-comment"></i>
          </button>

          <button class="button btn btn-sm btn-default" title="Imprimir" @click="print">
            <i class="fa fa-print"></i>
          </button>

        </div>
        <!-- / buttons -->

      </div>

    </div>

  </div>

</template>

<script>
import SelectStatus from '@/components/MultipleSelect'
import SelectResponsibleRegisterSector from '@/components/MultipleSelect'
import DatePicker from '@/components/DatePicker'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    SelectStatus,
    SelectResponsibleRegisterSector,
    DatePicker
  },
  data () {
    return {
      select: {
        status: {
          id: 'status',
          allSelected: 'Todos selecionados',
          nonSelected: 'Informe o Status',
          selectAll: 'Todos',
          defaultValue: ['p'],
          data: [{
            id: 'p',
            name: 'Pendente'
          }, {
            id: 'r',
            name: 'Resolvido'
          }, {
            id: 'c',
            name: 'Cancelado'
          }]
        },
        responsible_contract_transfer: {
          id: 'responsible_contract_transfer',
          allSelected: 'Todos Selecionados (Todos Selecionados)',
          nonSelected: 'Responsável Cadastro',
          selectAll: 'Todos',
          select_all: true,
          defaultValue: [],
          data: []
        }
      },
      filter: {
        input_search: '',
        status: [],
        responsible_contract_transfer: [],
        init_date: '',
        end_date: '',
        search_for_conclusion_date: false,
        print: false
      },
      sort_values: {
        sort_by: '',
        sort_order: ''
      }
    }
  },
  methods: {
    ...mapActions('Register', ['getContractsTransfer', 'getResponsibleForFilterContractsTransfer']),
    print () {

      this.$bus.$emit('Register\Transfer\Contract:ShowLoadTableList', {load_data_message: 'Gerando impressão, aguarde ...'})

      const queryParams = {
        params: {
          sort_by: this.sort_values.sort_by,
          sort_order: this.sort_values.sort_order,
          printer: true
        }
      }

      this.getContractsTransfer(queryParams).then(res => {

        const url = window.URL_API + '/' + res.data.file_name
        window.open(url)

        setTimeout(() => {
          this.$bus.$emit('Register\Transfer\Contract:HideLoadTableList')
        }, 300)

        const params = {
          params: {
            file_name: res.data.file_name
          }
        }

        setTimeout(() => {
          http.get('api/remove-file', params)
        }, 1500)

      }).catch(() => {
        this.$bus.$emit('Register\Transfer\Contract:HideLoadTableList')
      })
    },
    search (loadData = true) {

      const queryParams = {
        params: {
          sort_by: this.sort_values.sort_by,
          sort_order: this.sort_values.sort_order,
          status: this.filter.status,
          responsible_contract_transfer: this.filter.responsible_contract_transfer,
          init_date: this.filter.init_date,
          end_date: this.filter.end_date,
          search_for_conclusion_date: this.filter.search_for_conclusion_date,
          search: this.filter.input_search,
          searchFields: 'contract:like'
        }
      }

      this.$bus.$emit('Register\Transfer\Contract:ShowLoadTableList', {load_data_message: 'Processando sua solicitação, aguarde ...', load_data: loadData})

      this.getContractsTransfer(queryParams).then(res => {

      }).catch(() => {
        this.$bus.$emit('Register\Transfer\Contract:HideLoadTableList')
      })

    }
  },
  computed: {
    ...mapState('Register', ['responsible_filter_contracts_transfer'])
  },
  watch: {
    responsible_filter_contracts_transfer () {
      this.select.responsible_contract_transfer.data = this.responsible_filter_contracts_transfer
    }
  },
  mounted () {
    this.getResponsibleForFilterContractsTransfer()

    this.$bus.$on('Register\Transfer\Contract:SortData', (sortValues) => {
      this.sort_values = sortValues
    })

    this.$bus.$on('Register\Transfer\PanelSearch:Search', () => {
      this.search(false)
    })
  }
}
</script>