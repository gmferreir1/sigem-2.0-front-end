<template>

  <div  v-loading="load_data" element-loading-text="Carregando dados, aguarde ...">

    <!-- not found component -->
    <div class="row" v-if="!reasons_transfer.length" style="margin-top: 10px">
      <div class="col-md-5 col-md-offset-5">
        <not-found />
      </div>
    </div>
    <!-- / not found component -->

    <!-- table -->
    <div class="row" style="margin-top: 10px" v-if="reasons_transfer.length">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped table-bordered table-hover table-condensed">
            <thead>
            <tr>
              <th class="text-left">Motivo</th>
              <th class="text-center" style="width: 100px"> - </th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="list in reasons_transfer">
              <td>
                <a href="#" @click.prevent="edit(list)">
                  {{wordUpper(list.reason)}}
                </a>
              </td>
              <td class="text-center" style="width: 100px">

                <a href="#" @click.prevent="edit(list)">
                  <i class="fa fa-pencil size-icon-table orange"></i>
                </a>

                <a href="#" @click.prevent="remove(list.id)" style="margin-left: 5px">
                  <i class="fa fa-trash size-icon-table red"></i>
                </a>

              </td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- / table -->

  </div>

</template>

<script>
import {mapActions, mapState} from 'vuex'
import {wordUpper} from '@/util/stringHelpers'
import NotFound from '@/components/NotFound'

export default {
  props: ['loadData'],
  components: {
    NotFound
  },
  data () {
    return {
      load_data: true
    }
  },
  methods: {
    ...mapActions('Register', ['getReasonsTransfer']),
    wordUpper,
    edit (data) {
      this.$bus.$emit('Register\Transfer\Reason:Edit', data)
    },
    remove (id) {
      this.load_data = true

      http.delete(`register/transfer/reason/${id}`).then(res => {
        this.getReasonsTransfer()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    }
  },
  computed: {
    ...mapState('Register', ['reasons_transfer'])
  },
  watch: {
    loadData () {
      this.load_data = true
    },
    reasons_transfer () {
      setTimeout(() => {
        this.load_data = false
      }, 600)
    }
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

  .panel-body {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

</style>