<template>

  <div>

    <div class="well" style="margin-right: 5px; margin-left: 5px">

      <div class="row">

        <div class="col-md-3">
          <input type="text" class="form-control input-sm" title="Pesquisa de dados"
                 placeholder="Pesquisa de dados: Contrato, Arquivo, Caixa" v-model="filter.search" @keypress.enter="search">
        </div>

        <div class="col-md-2" style="width: 125px">
          <select-status :select="select.status" @valueSelected="value => filter.status = value"/>
        </div>

        <div class="col-md-2" style="width: 125px">
          <date-picker class="form-control input-sm" v-model="filter.init_date" placeholder="dd/mm/aaaa" />
        </div>

        <div class="col-md-2" style="width: 125px">
          <date-picker class="form-control input-sm" v-model="filter.end_date" placeholder="dd/mm/aaaa" />
        </div>


        <div class="col-md-2">
          <button class="button btn btn-sm btn-primary" @click="search">Pesquisar</button>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import {mapActions, mapState} from 'vuex'
import SelectStatus from '@/components/MultipleSelect'
import DatePicker from '@/components/DatePicker'

export default {
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
            name: 'Não Lançado'
          }, {
            id: 'r',
            name: 'Lançado'
          }]
        }
      },
      filter: {
        status: [],
        init_date: '',
        end_date: '',
        search: '',
        searchFields: 'contract:like;immobile_code:like;address:like;neighborhood:like;owner_name:like',
      }
    }
  },
  components: {
    SelectStatus,
    DatePicker
  },
  methods: {
    ...mapActions('Financial', ['getContractsCelebrated']),
    search () {

      this.$bus.$emit('Financial\ContractCelebrated:InitLoadSearch')

      const queryParams = {
        params: this.filter
      }

      this.getContractsCelebrated(queryParams).then(res => {

        setTimeout(() => {
          this.$bus.$emit('Financial\ContractCelebrated:EndLoadSearch')
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    }
  }
}
</script>