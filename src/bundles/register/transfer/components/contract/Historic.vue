<template>

  <div>

    <editor @textEditor="text => $emit('textEditor', text)" />

    <!-- table -->
    <div class="row" style="margin-top: 20px; margin-bottom: 10px" v-if="!historic_contract_transfer.length">
      <div class="col-md-6 col-md-offset-5">
        <not-found />
      </div>
    </div>

    <!-- -->
    <div class="table-responsive" style="margin-top: 20px" v-if="historic_contract_transfer.length">
      <table class="table table-striped table-bordered table-hover table-condensed">
        <thead>
        <tr>
          <th class="text-left">Histórico</th>
          <th class="text-left" style="width: 100px">Responsável</th>
          <th class="text-center" style="width: 150px">Data/Hora</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="historic in historic_contract_transfer">
          <td class="text-left" v-html="historic.historic"></td>
          <td class="text-left" style="width: 100px" :title="wordUpper(historic.rp_last_action_name)">{{wordUpper(strLimit(historic.rp_last_action_name, 10))}}</td>
          <td class="text-center" style="width: 150px">{{dateFormat(historic.created_at, 'DD/MM/YYYY hh:mm')}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- / table -->

  </div>

</template>

<script>
import Editor from '@/components/Editor'
import NotFound from '@/components/NotFound'
import {dateFormat} from '@/util/dateTime'
import {mapState} from 'vuex'
import {strLimit, wordUpper} from '@/util/stringHelpers'

export default {
  components: {
    Editor,
    NotFound
  },
  computed: {
    ...mapState('Register', ['historic_contract_transfer'])
  },
  methods: {
    dateFormat,
    strLimit,
    wordUpper
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

  thead, tbody {
    display: block;
  }

  tbody {
    max-height: calc(100vh - 600px) !important;
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