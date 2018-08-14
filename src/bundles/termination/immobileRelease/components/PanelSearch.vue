<template>

  <div>

    <div class="well" style="margin-right: 5px; margin-left: 5px">

      <div class="row">

        <div class="col-md-3">
          <input type="text" class="form-control input-sm" title="Pesquisa de dados: Código"
                 placeholder="Pesquisa de dados: Código" v-model="filter.input_search" @keypress.enter="search">
        </div>

        <div class="col-md-2" style="width: 125px">
          <select-status :select="select.status" @valueSelected="value => filter.status = value"/>
        </div>

        <div class="col-md-2" style="width: 125px">
          <select-responsible :select="select.responsible" @valueSelected="value => filter.responsible = value"/>
        </div>

        <div class="col-md-2 div-120" style="padding-right: 0px">
          <date-picker class="form-control input-sm" placeholder="dd/mm/aaaa" v-model="filter.init_date"/>
        </div>

        <div class="col-md-2 div-120" style="padding-right: 6px; padding-left: 5px">
          <date-picker class="form-control input-sm" placeholder="dd/mm/aaaa" v-model="filter.end_date"/>
        </div>

        <div class="col-md-2" style="width: 100px">
          <button class="button btn btn-sm btn-primary" @click="search">Pesquisar</button>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import SelectStatus from '@/components/MultipleSelect'
import SelectResponsible from '@/components/MultipleSelect'
import DatePicker from '@/components/DatePicker'

export default {
  data () {
    return {
      select: {
        status: {
          id: 'type_archive',
          allSelected: 'Todos selecionados',
          nonSelected: 'Informe o Arquivamento',
          selectAll: 'Todos',
          defaultValue: ['p'],
          data: [{
            id: 'f',
            name: 'finalizado'
          }, {
            id: 'p',
            name: 'Pedente'
          }]
        },
        responsible: {
          id: 'responsible',
          allSelected: 'Todos selecionados',
          nonSelected: 'Informe o Responsável',
          selectAll: 'Todos',
          select_all: true,
          defaultValue: [],
          data: []
        }
      },
      filter: {
        input_search: '',
        status: [],
        responsible: [],
        init_date: window.moment().startOf('month').format('DD/MM/YYYY'),
        end_date: window.moment().endOf('month').format('DD/MM/YYYY')
      }
    }
  },
  components: {
    SelectStatus,
    SelectResponsible,
    DatePicker
  },
  methods: {
    getAllResponsible () {
      http.get('termination/immobile-release/get-all-responsible').then(res => {
        this.select.responsible.data = res.data
      }).catch(() => { })
    },
    search () {
      this.$bus.$emit('Termination\ImmobileRelease:Search', this.filter)
    }
  },
  mounted () {
    this.getAllResponsible()
  }
}
</script>