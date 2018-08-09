<template>

  <div v-loading="load_data" :element-loading-text="text_load">
    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover table-condensed">
        <thead>
        <tr>
          <th class="text-left" style="width: 370px">Destino / Motivo</th>
          <th class="text-left" style="width: 60px">Tipo</th>
          <th class="text-center width-edit" style="width: 50px"> - </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="list in destination_or_reason">
          <td class="text-left" style="width: 400px">
            <a href="#" @click.prevent="edit(list)">
              {{wordUpper(list.text)}}
            </a>
          </td>
          <td class="text-left" style="width: 60px">
            <a href="#" @click.prevent="edit(list)">
              {{list.type === 'reason' ? 'Motivo' : 'Destino'}}
            </a>
          </td>
          <td class="text-center" style="width: 50px">
            <a href="" @click.prevent="edit(list)">
              <i class="fa fa-pencil size-icon-table"></i>
            </a>

            <a href="" @click.prevent="remove(list.id)" style="margin-left: 5px">
              <i class="fa fa-trash size-icon-table"></i>
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import {mapState, mapActions} from 'vuex'
import {wordUpper} from '@/util/stringHelpers'

export default {
  props: {
    modalOpened: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      load_data: false,
      text_load: 'Carregando dados, aguarde ...',
      data_list: {
        data: []
      }
    }
  },
  methods: {
    ...mapActions('Termination', ['getDestinationAndReason']),
    wordUpper,
    edit (data) {
      this.$bus.$emit('Termination\DestinationOrReason:Edit', data)
    },
    remove (id) {
      this.text_load = 'Processando sua solicitação, aguarde ...'
      this.load_data = true

      http.delete(`termination/destination-or-reason/${id}`).then(res => {

        if (res.data.success) {
          _notification.success()
          this.getDestinationAndReason()
        }

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    }
  },
  computed: {
    ...mapState('Termination', ['destination_or_reason'])
  },
  watch: {
    modalOpened () {
      this.text_load = 'Carregando dados, aguarde ...'
      this.load_data = true

      this.getDestinationAndReason().then(res => {

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })

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