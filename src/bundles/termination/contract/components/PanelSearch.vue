<template>

  <div>

    <div class="well" style="margin-right: 5px; margin-left: 5px">

      <div class="row">
        <div class="col-md-2 col-lg-3">
          <input type="text" class="form-control input-sm" placeholder="pesquisa dados ..." v-model="filter.input" @keypress.enter="filterData">
        </div>

        <div class="col-md-2" style="width: 125px">
          <select-status :select="select.status" @valueSelected="value => filter.status = value"/>
        </div>

        <div class="col-md-2" style="width: 125px">
          <select-responsible :select="select.responsible" @valueSelected="value => filter.responsible = value"/>
        </div>

        <div class="col-md-2" style="width: 125px">
          <select-type-register :select="select.type_register" @valueSelected="value => filter.type_register = value"/>
        </div>

        <div class="col-md-2" style="margin-right: 0px; padding-right: 0px; width: 100px">
          <date-picker class="form-control input-sm" v-model="filter.init_date" placeholder="dd/mm/aaaa" />
        </div>

        <div class="col-md-2" style="margin-right: 0px; padding-right: 0px; width: 100px">
          <date-picker class="form-control input-sm" v-model="filter.end_date" placeholder="dd/mm/aaaa" />
        </div>

        <div class="col-md-2" style="margin-right: 0px; padding-right: 0px; width: 60px; margin-top: 10px">
          <input type="checkbox" v-model="filter.date_conclusion">
          DC
        </div>

        <div class="col-md-1">
          <button class="button btn btn-sm btn-primary" @click="filterData">Pesquisar</button>
        </div>

      </div>

    </div>


  </div>

</template>

<script>
import SelectStatus from '@/components/MultipleSelect'
import SelectResponsible from '@/components/MultipleSelect'
import SelectTypeRegister from '@/components/MultipleSelect'
import DatePicker from '@/components/DatePicker'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    SelectStatus,
    SelectResponsible,
    SelectTypeRegister,
    DatePicker
  },
  data () {
    return {
      init_date: false,
      end_date: false,
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
            id: 'a',
            name: 'Acordo'
          }, {
            id: 'j',
            name: 'Justiça'
          }, {
            id: 'cej',
            name: 'Cob.Ext.Jud'
          }, {
            id: 'c',
            name: 'Cancelado'
          }]
        },
        responsible: {
          id: 'responsible',
          allSelected: 'Responsável (Todos Selecionados)',
          nonSelected: 'Responsável',
          selectAll: 'Todos',
          select_all: true,
          defaultValue: [],
          data: []
        },
        type_register: {
          id: 'type_register',
          allSelected: 'Todos selecionados',
          nonSelected: 'Tipo de Registro',
          selectAll: 'Todos',
          defaultValue: ['termination'],
          data: [{
            id: 'transfer',
            name: 'Transferência'
          }, {
            id: 'termination',
            name: 'Rescisão'
          }]
        }
      },
      filter: {
        input: '',
        status: ['p'],
        responsible: [],
        type_register: ['termination'],
        init_date: window.moment().startOf('month').format('DD/MM/YYYY'),
        end_date: window.moment().endOf('month').format('DD/MM/YYYY'),
        date_conclusion: false
      }
    }
  },
  methods: {
    ...mapActions('Termination', ['getAllResponsible']),
    filterData () {
      this.$bus.$emit('Termination\Contract:Filter', this.filter)
    }
  },
  computed: {
    ...mapState('Termination', ['all_responsible'])
  },
  mounted () {
    this.getAllResponsible()
  },
  watch: {
    all_responsible () {
      // popula o select responsável
      this.select.responsible.data = this.all_responsible
      // define o valor default do select
      this.all_responsible.forEach((data) => {
        this.select.responsible.defaultValue.push(data.id)
      })
    }
  }
}
</script>