<template>

  <div>

    <!-- component notFound -->
    <div class="row" v-if="!data_list.data.length">
      <div class="col-md-5 col-md-offset-6">
        <not-found />
      </div>
    </div>
    <!-- / component notFound -->

    <div class="table-responsive" v-loading="load_data" element-loading-text="Consultando informações, aguarde..." v-if="data_list.data.length">
      <table class="table table-striped table-bordered table-hover table-condensed">
        <thead>
        <tr>
          <th class="text-left" style="width: 600px">Histórico</th>
          <th class="text-left" style="width: 100px">Responsável</th>
          <th class="text-center" style="width: 120px">Data/Hora</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="list in data_list.data">
          <td v-html="list.historic" style="width: 600px"></td>
          <td style="width: 100px" :title="wordUpper(list.rp_last_action_name)">{{strLimit(wordUpper(list.rp_last_action_name), 15)}}</td>
          <td class="text-center" style="width: 120px">{{dateFormat(list.created_at, 'DD/MM/YYYY HH:mm:ss')}}</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script>
import {wordUpper, strLimit} from '@/util/stringHelpers'
import {dateFormat} from '@/util/dateTime'
import NotFound from '@/components/NotFound'

export default {
  props: {
    dataContract: {
      type: Object,
      required: true
    }
  },
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
    strLimit,
    dateFormat,
    getData () {
      http.get(`termination/contract/${this.dataContract.contract_id}/historic`).then(res => {

        this.data_list.data = res.data.data

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    }
  },
  watch: {
    dataContract () {

      if (this.dataContract.contract_id) {
        this.load_data = true
        this.getData()
      }
    }
  },
  mounted () {
    this.$bus.$on('Termination\Contract:RefreshHistoric', () => {
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
    max-height: calc(100vh - 580px) !important;
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

</style>