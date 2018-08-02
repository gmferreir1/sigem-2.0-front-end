<template>

  <div class="table-responsive">
    <table class="table table-striped table-bordered table-hover table-condensed">
      <thead>
      <tr>
        <th class="text-left" style="width: 100px">Codigo</th>
        <th class="text-left" style="width: 100px">Contrato</th>
        <th class="text-left">Endereço</th>
        <th class="text-center" style="width: 50px"> - </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="list in immobile_data">
        <td style="width: 100px">
          <a href="#" style="color: inherit" @click.prevent="dataSicadiExported(list)">
            {{list.immobile_code.toUpperCase()}}
          </a>
        </td>
        <td style="width: 100px">
          <a href="#" style="color: inherit" @click.prevent="dataSicadiExported(list)">
            {{!list.contract ? ' - ' : list.contract.toUpperCase()}}
          </a>
        </td>
        <td>
          <a href="#" style="color: inherit" @click.prevent="dataSicadiExported(list)">
            {{wordUpper(list.address)}}, {{wordUpper(list.neighborhood)}}
          </a>
        </td>
        <td class="text-center" style="width: 50px">
          <a href="#" style="color: inherit" @click.prevent="dataSicadiExported(list)" title="Exportar dados">
            <i class="fa fa-upload"></i>
          </a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>

import {mapState} from 'vuex'
import {wordUpper} from '@/util/stringHelpers'

export default {
  computed: {
    ...mapState('Sicadi', ['immobile_data'])
  },
  methods: {
    wordUpper,
    dataSicadiExported (data) {
      this.$bus.$emit('Sicadi:DataExported', data)
      this.$emit('closeModal')
    }
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
    max-height: calc(100vh - 200px) !important;
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