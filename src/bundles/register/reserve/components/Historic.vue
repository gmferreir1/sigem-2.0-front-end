<template>

  <div>
    <editor />

    <!-- tabela de listagem -->
    <div class="table-responsive" style="margin-top: 10px">
      <table class="table table-striped table-bordered table-hover table-condensed">
        <thead>
        <tr>
          <th class="text-center">Histórico</th>
          <th class="text-center">Responsável</th>
          <th class="text-center">Data/Hora</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="text-center">aaaaa</td>
          <td class="text-center">aaaa</td>
          <td class="text-center">

            <a href="" @click.prevent="">
              <i class="fa fa-ban size-icon-table" style="color: #CCCCCC"></i>
            </a>

          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- / tabela de listagem -->


  </div>

</template>

<script>
import Editor from '@/components/Editor'
export default {
  components: {
    Editor
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
    max-height: calc(100vh - 340px) !important;
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