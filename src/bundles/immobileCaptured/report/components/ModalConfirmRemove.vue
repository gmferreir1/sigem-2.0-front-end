<template>
  <div>
    <div id="modalConfirmRemove" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content" v-loading="load_data" element-loading-text="Processando sua solicitação, aguarde ...">

          <!-- modal header -->
          <modal-header title="Confirmação de Ação" @closeModal="closeModal" />
          <!-- / modal footer -->

          <div class="modal-body">

            <div class="row">
              <div class="col-md-12">
                <span style="font-weight: bold">Tem certeza que deseja remover a captação selecionada ?</span>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <span style="font-weight: bold">Atenção: </span>
                <span style="color: red">Esta operação não poderá ser desfeita</span>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <button class="button btn btn-sm btn-danger" @click="confirmRemove">Sim, confirmar</button>
              </div>
            </div>

          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalHeader from '@/components/ModalHeader'
import ModalFooter from '@/components/ModalFooter'
import FormCaptured from '../components/FormCaptured'

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
    FormCaptured
  },
  data() {
    return {
      load_data: false,
      data_modal_opened: {}
    }
  },
  methods: {
    openModal() {
      $('#modalConfirmRemove').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    confirmRemove() {
      this.load_data = true

      http.delete(`immobile-captured/report-list/${this.dataModal.id}`).then(res => {

        this.$bus.$emit('ImmobileCaptured\Report\PanelSearch:Filter')
        _notification.success()

        setTimeout(() => {
          this.load_data = false
          this.closeModal()
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    closeModal() {
      $('#modalConfirmRemove').modal('hide')
    }
  },
  watch: {
    dataModal() {
      this.openModal()
    }
  }
}
</script>

<style scoped>


</style>