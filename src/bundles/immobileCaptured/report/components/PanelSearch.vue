<template>

  <div>

    <div class="well" style="margin-right: 5px; margin-left: 5px">

      <div class="row">

        <div class="col-md-3">
          <input type="text" class="form-control input-sm" placeholder="Pesquisa: proprietário, código, endereço" v-model="filter.input_search" @keypress.enter="search">
        </div>

        <div class="col-md-2 col-lg-2" style="width: 125px">
          <select-type-location :select="select.type_location" @valueSelected="value => filter.type_location = value"/>
        </div>

        <div class="col-md-2 col-lg-2" style="width: 125px">
          <select-responsible :select="select.responsible" @valueSelected="value => filter.responsible = value"/>
        </div>

        <div class="col-md-2 col-lg-2" style="padding-right: 0px; width: 105px">
          <date-picker class="form-control input-sm" v-model="filter.init_date" placeholder="dd/mm/aaaa"/>
        </div>

        <div class="col-md-2 col-lg-2" style="padding-left: 5px; padding-right: 0px; width: 95px;">
          <date-picker class="form-control input-sm" v-model="filter.end_date" placeholder="dd/mm/aaaa"/>
        </div>

        <div class="col-md-2">
          <button class="button btn btn-sm btn-primary" @click="search">Pesquisar</button>
        </div>

        <!-- buttons -->
        <div style="float: right">

          <button class="button btn btn-sm btn-default" title="Nova Transferência" @click="$emit('openModalFormCaptured', {type_action: 'new_captured'})">
            <i class="fa fa-plus-circle"></i>
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
import SelectTypeLocation from '@/components/MultipleSelect'
import SelectResponsible from '@/components/MultipleSelect'
import DatePicker from '@/components/DatePicker'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    SelectTypeLocation,
    SelectResponsible,
    DatePicker
  },
  data () {
    return {
      select: {
        type_location: {
          id: 'type_location',
          allSelected: 'Todos selecionados',
          nonSelected: 'Informe a Finalidade',
          selectAll: 'Todos',
          defaultValue: ['r', 'nr'],
          data: [{
            id: 'r',
            name: 'Residencial'
          }, {
            id: 'nr',
            name: 'Não Residencial'
          }]
        },
        responsible: {
          id: 'responsible',
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
        type_location: [],
        responsible: [],
        init_date: window.moment().startOf('month').format('DD/MM/YYYY'),
        end_date: window.moment().endOf('month').format('DD/MM/YYYY'),
        print: false
      },
      sort_values: {
        sort_by: '',
        sort_order: ''
      }
    }
  },
  methods: {
    ...mapActions('ImmobileCaptured', ['getListReportImmobileCaptured', 'getResponsibleForFilter']),
    print () {

      this.$emit('showLoad', {load_data_message: 'Gerando impressão, aguarde ...', load_data: true})

      const queryParams = {
        params: {
          sort_by: this.sort_values.sort_by,
          sort_order: this.sort_values.sort_order,
          type_location: this.filter.type_location,
          responsible: this.filter.responsible,
          init_date: this.filter.init_date,
          end_date: this.filter.end_date,
          search: this.filter.input_search,
          searchFields: 'owner:like;immobile_code:like;address:like;neighborhood:like',
          print: true
        }
      }

      this.getListReportImmobileCaptured(queryParams).then(res => {

        const url = window.URL_API + '/' + res.data.file_name
        window.open(url)

        this.$emit('showLoad', {load_data_message: 'Gerando impressão, aguarde ...', load_data: false})

        const params = {
          params: {
            file_name: res.data.file_name
          }
        }

        setTimeout(() => {
          http.get('api/remove-file', params)
        }, 1500)

      }).catch(() => {})
    },
    search (useLoading = true) {

      const queryParams = {
        params: {
          sort_by: this.sort_values.sort_by,
          sort_order: this.sort_values.sort_order,
          type_location: this.filter.type_location,
          responsible: this.filter.responsible,
          init_date: this.filter.init_date,
          end_date: this.filter.end_date,
          search: this.filter.input_search,
          searchFields: 'owner:like;immobile_code:like;address:like;neighborhood:like'
        }
      }

      this.$emit('showLoad', {load_data_message: 'Processando sua solicitação, aguarde ...', load_data: useLoading})

      this.getListReportImmobileCaptured(queryParams).then(res => {

      }).catch(() => {
        this.$emit('showLoad', {load_data_message: 'Gerando impressão, aguarde ...', load_data: false})
      })

    }
  },
  computed: {
    ...mapState('ImmobileCaptured', ['responsible_for_filter'])
  },
  watch: {
    responsible_for_filter () {
      this.select.responsible.data = this.responsible_for_filter
    }
  },
  mounted () {
    this.getResponsibleForFilter()

    this.$bus.$on('ImmobileCaptured\Report\PanelSearch:Filter', () => {
      this.search(false)
    })
  }
}
</script>