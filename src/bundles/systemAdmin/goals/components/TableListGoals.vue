<template>

  <div>

    <div class="panel" v-loading="load_data" element-loading-text="Carregando dados, aguarde ...">

      <div class="panel-heading" v-if="data_list.data.length">
        Metas Registradas no Sistema <span style="font-weight: bold">( {{data_list.data.length}} )</span>
      </div>

      <div class="panel-body" style="padding-top: 0px">

        <div class="row" v-if="!data_list.data.length" style="padding-bottom: 5px; margin-top: 20px">
          <div class="col-md-6 col-md-offset-5">
            <not-found />
          </div>
        </div>

        <div class="table-responsive" v-if="data_list.data.length">
          <table class="table table-striped table-bordered table-hover table-condensed">
            <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left" style="width: 130px">Tipo de Meta</th>
              <th class="text-center" style="width: 130px">Percentual %</th>
              <th class="text-left">Sob Meta</th>
              <th class="text-center" style="width: 120px">Valor R$</th>
              <th class="text-center" style="width: 70px"> - </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="list in data_list.data">
              <td class="text-left">
                {{wordUpper(getGoalName(list.name))}}
              </td>
              <td class="text-left">
                {{list.type === 'percent' ? 'Percentual' : 'Valor'}}
              </td>
              <td class="text-center">
                {{list.type === 'percent' ? list.percent : ' - '}}
              </td>
              <td class="text-left">
                {{!list.sob_goal ? ' - ' : wordUpper(getGoalName(list.sob_goal))}}
              </td>
              <td class="text-center">
                <div style="float: left" v-if="list.type === 'value'">R$ </div>
                <div style="float: right" v-if="list.type === 'value'">{{moneyFormat(list.value)}}</div>
                <div v-if="list.type != 'value'"> - </div>
              </td>
              <td class="text-center" style="width: 70px">
                <a href="#" @click.prevent="edit(list.id)">
                  <i class="fa fa-pencil size-icon-table orange"></i>
                </a>

                <a href="#" @click.prevent="remove(list.id)" style="margin-left: 5px">
                  <i class="fa fa-trash size-icon-table orange"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {wordUpper, moneyFormat} from '@/util/stringHelpers'
import NotFound from '@/components/NotFound'

export default {
  components: {
    NotFound
  },
  data () {
    return {
      load_data: true,
      data_list: {
        data: []
      }
    }
  },
  methods: {
    wordUpper,
    moneyFormat,
    getData () {
      http.get('system-goal').then(res => {

        this.data_list.data = res.data

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    edit (id) {
      http.get(`system-goal/${id}`).then(res => {
        this.$bus.$emit('SystemAdmin\Goals:EditGoal', res.data)
      })
    },
    remove (id) {
      this.load_data = true
      http.delete(`system-goal/${id}`).then(res => {

        this.getData()

        setTimeout(() => {
          setTimeout(() => {
            this.load_data = false
          }, 600)
        })

      }).catch(() => {
        this.load_data = false
      })
    },
    getGoalName (goal) {
      if (goal === 'cc') {
        return 'contratos celebrados'
      }

      if (goal === 'ci') {
        return 'contratos inativados'
      }

      return '##'
    }
  },
  mounted () {
    this.getData()

    this.$bus.$on('SystemAdmin\Goals:RefreshTableListGoals', () => {
      this.getData()
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

</style>