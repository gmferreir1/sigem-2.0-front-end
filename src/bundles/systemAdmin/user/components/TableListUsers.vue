<template>

  <div class="panel">
    <div class="panel-heading">
      Total de Usuários: (222)
    </div>
    <div class="panel-body">
      <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover table-condensed responsive mb0" data-sortable>
          <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">Email</th>
            <th class="text-left">Tipo de Usuário</th>
            <th class="text-left">Status</th>
            <th class="text-center width-edit"> - </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Other browsers</td>
            <td>All others</td>
            <td>-</td>
            <td>-</td>
            <td class="text-center width-edit">
              <a href="" @click.prevent="edit">
                <i class="fa fa-pencil size-icon-table"></i>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

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

  .panel-body {
    padding-top: 0px !important;
  }

  .width-edit {
    width: 70px;
  }

</style>