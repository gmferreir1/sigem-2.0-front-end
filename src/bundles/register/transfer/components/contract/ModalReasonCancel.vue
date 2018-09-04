<template>
  <div>
    <div id="modalReasonCancel" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" v-loading="load_data" element-loading-text="Processando sua solicitação, aguarde...">

          <!-- modal header -->
          <modal-header title="Motivo Para Cancelamento de Transferência" @closeModal="closeModal">
            <button class="button btn btn-sm btn-danger" @click="submitForm" :disabled="reason_cancel.length < 5">
              <i class="fa fa-check-circle"></i>
              Confirmar
            </button>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body" style="padding: 5px 10px 5px 10px">


            <div class="row">
              <div class="col-md-12">
                <label><span class="required">*</span> Informe o Motivo do Cancelamento</label>
                <textarea class="form-control" rows="5" v-model="reason_cancel"></textarea>
              </div>
            </div>

          </div>

          <!-- modal footer -->
          <modal-footer>
            <div style="float: left">
              <span class="required">*</span>
              <span style="font-weight: bold; font-size: 12px">Campo Obrigatório</span>
            </div>
          </modal-footer>
          <!-- / modal footer -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ModalHeader from '@/components/ModalHeader'
import ModalFooter from '@/components/ModalFooter'
import {mapActions} from 'vuex'

export default {
  props: ['dataModal'],
  components: {
    ModalHeader,
    ModalFooter
  },
  data () {
    return {
      reason_cancel: '',
      load_data: false,
      form_contract_data: {}
    }
  },
  methods: {
    ...mapActions('Register', ['getContractTransfer']),
    openModal () {
      $('#modalReasonCancel').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    submitForm () {
      this.load_data = true
      this.form_contract_data.reason_cancel = this.reason_cancel

      http.put(`register/transfer/contract/${this.form_contract_data.id}`, this.form_contract_data).then((res) => {

        this.getContractTransfer(this.form_contract_data.id)
        _notification.success()

        setTimeout(() => {
          this.closeModal()
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })

    },
    closeModal () {
      $('#modalReasonCancel').modal('hide')
    }
  },
  mounted () {
    this.$bus.$on('Register\Transfer\Contract:OpenModalReasonCancel', (dataContract) => {
      this.form_contract_data = dataContract
      this.openModal()
    })
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

</style>

