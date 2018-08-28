<template>

  <div>

    <!-- not found component -->

    <div class="row" v-if="!reasons_cancel.length" style="margin-top: 10px">
      <div class="col-md-6 col-md-offset-5">
        <not-found />
      </div>
    </div>

    <!-- / not found component -->

    <!-- table -->
    <div class="row" style="margin-top: 10px">
      <div class="col-md-12">
        <div class="table-responsive" v-if="reasons_cancel.length">
          <table class="table table-striped table-bordered table-hover table-condensed">
            <thead>
            <tr>
              <th class="text-left">Motivo</th>
              <th class="text-center" style="width: 100px"> - </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="list in reasons_cancel">
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
import {wordUpper} from '@/util/stringHelpers'
import {mapActions, mapState} from 'vuex'
import NotFound from '@/components/NotFound'

export default {
  props: ['dataModalOpened'],
  components: {
    NotFound
  },
  methods: {
    ...mapActions('Register', ['getReasonsCancel']),
    wordUpper,
    edit (dataEdit) {
      this.$bus.$emit('Register\ReasonCancel:Edit', dataEdit)
    },
    remove (id) {
      this.$emit('showLoading')
      http.delete(`register/reserve-contract/reason-cancel/${id}`).then(res => {
        _notification.success()
        this.getReasonsCancel()
        setTimeout(() => this.$emit('hideLoading'), 600)

      }).catch(() => {
        this.$emit('hideLoading')
      })
    }
  },
  computed: {
    ...mapState('Register', ['reasons_cancel'])
  },
  watch: {
    dataModalOpened () {
      this.getReasonsCancel().then(res => {

        setTimeout(() => {
          this.$emit('hideLoading')
        }, 600)

      }).catch(() => {
        this.$emit('hideLoading')
      })
    }
  }
}
</script>

<style scoped>

  .title {
    font-size: 10px;
    font-weight: bold;
  }

  .number {
    font-size: 10px;
  }

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
    max-height: calc(100vh - 400px) !important;
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