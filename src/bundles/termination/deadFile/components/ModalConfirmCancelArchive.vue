<template>
  <div>
    <div id="modalConfirmCancel" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content" v-loading="load_data" element-loading-text="Processando sua solicitação, aguarde ...">

          <!-- modal header -->
          <modal-header title="Confirmação de Ação" @closeModal="closeModal">
            <i class="fa fa-check-circle" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">

            <div class="row">
              <div class="col-md-12">
                <span style="font-weight: bold">
                  Deseja mesmo cancelar o arquivamento do processo ?
                </span>
              </div>
            </div>

            <div class="row" style="margin-top: 5px" v-if="dataModal.data && dataModal.data.termination_id">
              <div class="col-md-12">
                <span style="font-weight: bold; color: red">Atenção: </span>
                <span>Este processo vai remover o arquivamento da inativação contrato: </span>
                <span style="font-weight: bold">{{dataModal.data.contract.toUpperCase()}}</span>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <button class="button btn btn-sm btn-danger" @click="confirm">Sim, Confirmar Desarquivamento</button>
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
      load_data: false
    }
  },
  methods: {
    openModal() {
      $('#modalConfirmCancel').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    confirm () {
      this.load_data = true

      http.put(`dead-file/${this.dataModal.data.id}`).then(res => {
        _notification.success()

        this.$bus.$emit('Termination\DeadFile:RefreshTableList')

        setTimeout(() => {
          this.closeModal()
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })

    },
    closeModal() {
      $('#modalConfirmCancel').modal('hide')
    }
  },
  watch: {
    dataModal(data) {
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