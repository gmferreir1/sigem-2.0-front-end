<template>
  <div>
    <div id="modalReasonCancel" class="modal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" v-loading="load_data" :element-loading-text="message_load">

          <!-- modal header -->
          <modal-header title="Motivos Para Cancelamento Reserva" @closeModal="closeModal">
            <i class="fa fa-check-circle" slot="icon_title"></i>

            <button class="button btn btn-sm btn-danger" :disabled="disabled_submit_button" @click="submitForm">
              Salvar Dados
            </button>

          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">

            <!-- form reason cancel -->
            <form-reason-cancel @disabledSubmitButton="param => disabled_submit_button = param" @hideLoading="hideLoading"/>
            <!-- / form reason cancel -->

            <table-list-reasons-cancel :dataModalOpened="data_modal_opened" @hideLoading="load_data = false" @showLoading="showLoading" />

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
import FormReasonCancel from './FormReasonCancel'
import TableListReasonsCancel from './TableListReasonsCancel'

export default {
  props: ['dataModal'],
  components: {
    ModalHeader,
    ModalFooter,
    FormReasonCancel,
    TableListReasonsCancel
  },
  data () {
    return {
      message_load: 'Consultando informações, aguarde ...',
      load_data: false,
      data_modal_opened: false,
      disabled_submit_button: true
    }
  },
  methods: {
    openModal() {
      $('#modalReasonCancel').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    submitForm () {
      this.message_load = 'Processando sua solicitação, aguarde ...'
      this.load_data = true
      this.$bus.$emit('Register\ReasonCancel:SubmitForm')
    },
    showLoading () {
      this.message_load = 'Processando sua solicitação, aguarde ...'
      this.load_data = true
    },
    hideLoading () {
      this.load_data = false
    },
    closeModal() {
      $('#modalReasonCancel').modal('hide')
    }
  },
  watch: {
    dataModal () {
      this.load_data = true
      this.data_modal_opened = !this.data_modal_opened
      this.openModal()
    }
  }
}
</script>
