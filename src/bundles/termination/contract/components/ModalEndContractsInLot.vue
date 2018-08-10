<template>
  <div>
    <div id="modalEndContractsInLote" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Baixa de Contratos em Lote" @closeModal="closeModal">
            <i class="fa fa-check-circle" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body" v-loading="load_data" :element-loading-text="message_load">

            <!-- form -->
            <div class="row">
              <div class="col-md-2 div-140">
                <label>Contrato <span class="required">*</span></label>
                <input type="text" class="form-control input-sm" v-model="contract" ref="contract" @keypress.enter="searchTermination">
              </div>

              <div class="col-md-2" style="margin-top: 20px">
                <button class="button btn btn-sm btn-default" :disabled="!contract" @click="searchTermination">Pesquisar Contrato</button>
              </div>

            </div>

            <!-- / form -->

            <!-- contratos selecionados para baixa -->
            <div class="title-form" style="margin-top: 20px">Contratos Para Baixa</div>
            <hr class="h-row" style="margin-bottom: 5px">

            <div class="row" v-if="!contracts_selected.length">
              <div class="col-md-6 col-md-offset-5">
                <not-found />
              </div>
            </div>

            <div class="row" v-if="contracts_selected.length">
              <div class="col-md-2">
                <button class="button btn btn-sm btn-danger" @click="confirmEndInLot">Baixar Lista de Contratos</button>
              </div>
            </div>

            <div class="row" style="margin-top: 5px" v-if="contracts_selected.length">
              <div class="col-md-12 col-lg-7">
                <div class="table-responsive">
                  <table class="table table-striped table-bordered table-hover table-condensed">
                    <thead>
                    <tr>
                      <th class="text-left" style="width: 150px">Contrato</th>
                      <th class="text-left" style="width: 200px">Status</th>
                      <th style="width: 150px">Rescisão</th>
                      <th class="text-center" style="width: 100px"> - </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(list, index) in contracts_selected">
                      <td class="adjust-td" style="width: 150px">
                        <input type="text" class="form-control input-sm" v-model="contracts_selected[index].contract">
                      </td>
                      <td class="adjust-td" style="width: 200px">
                        <select class="form-control input-sm" v-model="contracts_selected[index].status">
                          <option value="r">Resolvido</option>
                          <option value="a">Acordo</option>
                          <option value="j">Justiça</option>
                          <option value="cej">Cob.Ext.Jud</option>
                          <option value="c">Cancelado</option>
                        </select>
                      </td>
                      <td class="adjust-td" style="width: 150px">
                        <date-picker class="form-control input-sm" v-model="contracts_selected[index].end_process" placeholder="dd/mm/aaaa" />
                      </td>
                      <td class="text-center adjust-td" style="width: 100px; padding-top: 10px !important;">
                        <a href="#" @click.prevent="removeContractArray(index)">
                          <i class="fa fa-trash size-icon-table red"></i>
                        </a>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- / contratos selecionados para baixa -->

          </div>

          <!-- modal footer -->
          <modal-footer />
          <!-- / modal footer -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ModalHeader from '@/components/ModalHeader'
import ModalFooter from '@/components/ModalFooter'
import DatePicker from '@/components/DatePicker'
import NotFound from '@/components/NotFound'

export default {
  props: {
    dataModal: {
      required: true,
      type: Object
    }
  },
  components: {
    ModalHeader,
    ModalFooter,
    DatePicker,
    NotFound
  },
  data () {
    return {
      message_load: 'Consultando informações, aguarde...',
      load_data: false,
      contract: '',
      contracts_selected: []
    }
  },
  methods: {
    openModal() {
      $('#modalEndContractsInLote').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    closeModal() {
      $('#modalEndContractsInLote').modal('hide')
    },
    /**
     * Busca a inativação pelo contrato
     */
    searchTermination () {
      if (!this.contract) return

      this.load_data = true

      const queryParams = {
        params: {
          contract: this.contract
        }
      }

      http.get('termination/end-contract-in-lot/search-termination', queryParams).then(res => {

        this.contract = ""
        this.$refs.contract.focus()
        const data = res.data
        data.status = 'r'
        data.end_process = window.moment().format('DD/MM/YYYY')

        // verifica se o contrato ja esta na lista
        if (_.find(this.contracts_selected, (o) => o.id === data.id)) {
          _notification.error('Contrato ja consta na lista')
        } else {
          this.contracts_selected.push(data)
        }

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    confirmEndInLot () {
      this.message_load = 'Processando sua solicitação, aguarde ...'
      this.load_data = true

      http.put('termination/end-contract-in-lot', this.contracts_selected).then(res => {

        if (res.data.success) {
          if (res.data.has_error) {
            _notification.warning('O processo teve ' + res.data.has_error + ' erros. Verifique na lista de contratos')
          } else {
            _notification.success()
          }
        }

        this.contracts_selected = []
        this.$bus.$emit('Termination\Contract:RefreshList')

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    removeContractArray (index) {
      this.contracts_selected.splice(index, 1)
    }
  },
  watch: {
    dataModal() {
      this.contract = ''
      this.contracts_selected = []
      this.openModal()
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

</style>