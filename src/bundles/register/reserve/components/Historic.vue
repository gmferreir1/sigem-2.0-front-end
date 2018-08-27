<template>

  <div>
    <editor @textEditor="text => $emit('textEditor', text)" />


    <!-- not found component -->
    <div class="row" v-if="!historic_contract.length" style="margin-top: 10px">
      <div class="col-md-5 col-md-offset-5">
        <not-found />
      </div>
    </div>
    <!-- / not found component -->

    <!-- tabela de listagem -->
    <div class="table-responsive" style="margin-top: 10px" v-if="historic_contract.length">
      <table class="table table-striped table-bordered table-hover table-condensed">
        <thead>
        <tr>
          <th class="text-left" style="width: 75%">Histórico</th>
          <th class="text-left" style="width: 10%">Responsável</th>
          <th class="text-center" style="width: 14%">Data/Hora</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="list in historic_contract">
          <td class="text-left" v-html="list.historic" style="width: 75%"></td>
          <td class="text-left" style="width: 10%" :title="wordUpper(list.rp_last_action_name)">{{strLimit(wordUpper(list.rp_last_action_name), 10)}}</td>
          <td class="text-center" style="width: 14%">{{dateFormat(list.created_at, 'DD/MM/YYYY HH:mm:ss')}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- / tabela de listagem -->


  </div>

</template>

<script>
import {mapState} from 'vuex'
import {wordUpper, strLimit} from '@/util/stringHelpers'
import Editor from '@/components/Editor'
import {dateFormat} from '@/util/dateTime'
import NotFound from '@/components/NotFound'

export default {
  components: {
    Editor,
    NotFound
  },
  methods: {
    wordUpper,
    strLimit,
    dateFormat
  },
  computed: {
    ...mapState('Register', ['historic_contract'])
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