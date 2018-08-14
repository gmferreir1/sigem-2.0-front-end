<template>
  <div>
    <div id="modalArchiveProcess" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content" v-loading="load_data" :element-loading-text="message_load">

          <!-- modal header -->
          <modal-header title="Arquivamento de Processo" @closeModal="closeModal">
            <i class="fa fa-archive" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">


            <div v-if="!data_archived || !data_archived.id">
              <div class="row">
                <div class="col-md-12">
                <span style="font-weight: bold">
                  Deseja iniciar o processo de arquivamento ?
                </span>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                <span style="font-weight: bold; color: red">
                  Uma vez iniciado, não poderá ser desfeito
                </span>
                </div>
              </div>

              <div class="row" style="margin-top: 10px">
                <div class="col-md-12">
                <span style="font-weight: bold">
                  Deseja continuar ?
                </span>
                </div>
              </div>


              <div class="row" style="margin-top: 10px">
                <div class="col-md-12">
                  <button class="button btn btn-sm btn-danger" @click="confirm">Sim, Confirmar</button>
                </div>
              </div>
            </div>

            <div v-else>

              <div class="row">
                <div class="col-md-12">
                  <span>Processo arquivado em: </span>
                  <span style="font-weight: bold">{{dateFormat(data_archived.created_at, 'DD/MM/YYYY HH:mm:ss')}}</span>
                </div>
              </div>

              <div class="row">
                <div class="col-md-2 div-140">
                  <span>Arquivo: </span>
                  <span style="font-weight: bold">{{data_archived.file}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-md-2 div-140">
                  <span>Caixa: </span>
                  <span style="font-weight: bold">{{data_archived.cashier}}</span>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <span>Responsável: </span>
                  <span style="font-weight: bold">{{wordUpper(data_archived.rp_last_action_name)}}</span>
                </div>
              </div>

            </div>



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
import {dateFormat} from '@/util/dateTime'
import {wordUpper} from '@/util/stringHelpers'

export default {
  props: {
    dataModal: {
      required: true,
      type: Object
    }
  },
  components: {
    ModalHeader,
    ModalFooter
  },
  data () {
    return {
      message_load: 'Verificando arquivo morto, aguarde ...',
      load_data: false,
      data_archived: {

      }
    }
  },
  methods: {
    dateFormat,
    wordUpper,
    openModal() {
      $('#modalArchiveProcess').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    checkProcessIsArchived (terminationId = null, contract = null) {

      this.load_data = true

      const queryParams = {
        params: {
          termination_id: !terminationId ? this.dataModal.termination_data.id : terminationId,
          contract: !contract ? this.dataModal.termination_data.contract : contract
        }
      }

      http.get('dead-file/check-is-archived', queryParams).then(res => {

        this.data_archived = res.data

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    confirm () {
      this.message_load = 'Arquivando processo, aguarde ...'
      this.load_data = true

      const dataToSave = {
        termination_id: this.dataModal.termination_data.id,
        contract: this.dataModal.termination_data.contract
      }

      http.post('dead-file', dataToSave).then(res => {
        _notification.success()
        this.$bus.$emit('Termination\Contract:RefreshList')

        setTimeout(() => {
          this.checkProcessIsArchived(dataToSave.termination_id, dataToSave.contract)
        }, 300)
      }).catch(() => {
        this.load_data = false
      })

    },
    closeModal() {
      $('#modalArchiveProcess').modal('hide')
    }
  },
  watch: {
    dataModal(data) {
      this.message_load = 'Verificando arquivo morto, aguarde ...'
      this.load_data = true
      this.checkProcessIsArchived()
      this.openModal()
    }
  }
}
</script>

<style scoped>
  .modal-body {
    padding-bottom: 5px !important;
  }
</style>