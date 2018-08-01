<template>

  <div class="panel" v-loading="load_data" element-loading-text="Carregando dados, aguarde ...">

    <div class="panel-heading">
      Lista de Tabelas Atualizadas no Sistema ({{data_list.data.length}})
    </div>


    <div class="panel-body">

      <div class="row" v-if="!data_list.data.length">
        <div class="col-md-5 col-md-offset-5">
          <not-found />
        </div>
      </div>


      <div class="table-responsive" v-if="data_list.data.length">
        <table class="table table-striped table-bordered table-hover table-condensed">
          <thead>
          <tr>
            <th class="text-left">Tabela</th>
            <th class="text-left">Status</th>
            <th class="text-center">Data</th>
            <th class="text-left">Responsável</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="list in data_list.data">
            <td>{{wordUpper(list.table_name)}}</td>
            <td>
              <span :class="{error: list.status === 'p', 'success': list.status === 'up'}">{{getStatus(list.status)}}</span>
            </td>
            <td class="text-center">{{dateFormat(list.created_at, 'DD/MM/YYYY HH:mm:ss')}}</td>
            <td>{{wordUpper(list.rp_action_name)}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
import NotFound from '@/components/NotFound'
import {wordUpper} from '@/util/stringHelpers'
import {dateFormat} from '@/util/dateTime'

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
    dateFormat,
    getData () {
      http.get('manager-action/show-tables-updated').then(res => {
        this.data_list.data = res.data

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    getStatus (status) {
      if (status === 'p') {
        return 'Em Processo de Atualização'
      }

      if (status === 'up') {
        return 'Atualizada'
      }

      return ' - '
    },
    /**
     * real time table
     */
    dataRealTime () {
      const channel = this.$pusher.subscribe('showTablesUpdated')

      channel.bind('App\\Events\\ShowTablesUpdated', () => {
        this.getData()
      })
    }
  },
  mounted () {
    this.getData()

    // real time
    this.dataRealTime()
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
    max-height: calc(100vh - 480px) !important;
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
  }

  .width-edit {
    width: 70px;
  }

</style>