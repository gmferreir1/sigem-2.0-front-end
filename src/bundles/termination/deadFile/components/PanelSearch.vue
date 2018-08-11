<template>

  <div>

    <div class="well" style="margin-right: 5px; margin-left: 5px">

      <div class="row">

        <div class="col-md-3">
          <input type="text" class="form-control input-sm" placeholder="Pesquisa de dados: Contrato, Arquivo, Caixa" v-model="filter.input_search" @keypress.enter="search">
        </div>

        <div class="col-md-2" style="width: 125px">
          <select-type-archive :select="select.type_archive" @valueSelected="value => filter.type_release = value"/>
        </div>

        <div class="col-md-2" style="width: 125px">
          <select-years-available :select="select.years_available" @valueSelected="value => filter.year_release = value"/>
        </div>

        <div class="col-md-2">
          <button class="button btn btn-sm btn-primary" @click="search">Pesquisar</button>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import SelectTypeArchive from '@/components/MultipleSelect'
import SelectYearsAvailable from '@/components/MultipleSelect'

export default {
  data () {
    return {
      select: {
        type_archive: {
          id: 'type_archive',
          allSelected: 'Todos selecionados',
          nonSelected: 'Informe o Arquivamento',
          selectAll: 'Todos',
          defaultValue: ['rent'],
          data: [{
            id: 'rent',
            name: 'Aluguel'
          }, {
            id: 'justice',
            name: 'Justiça'
          }]
        },
        years_available: {
          id: 'years_available',
          allSelected: 'Todos selecionados',
          nonSelected: 'Informe o Ano',
          selectAll: 'Todos',
          defaultValue: [],
          data: []
        }
      },
      filter: {
        input_search: '',
        type_release: [],
        year_release: []
      }
    }
  },
  components: {
    SelectTypeArchive,
    SelectYearsAvailable
  },
  methods: {
    getYearsAvailable () {
      http.get('dead-file/years-available').then(res => {

        this.select.years_available.data = res.data
        this.select.years_available.defaultValue.push(moment().format('YYYY'))

      }).catch(() => { })
    },
    search () {
      this.$bus.$emit('Termination\DeadFile:Search', this.filter)
    }
  },
  mounted () {
    this.getYearsAvailable()
  }
}
</script>