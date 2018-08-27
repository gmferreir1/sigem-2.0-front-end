<template>
  <div>
    <div id="modalSendEmailCloseReserve" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content" v-loading="load_data" element-loading-text="Processando sua solicitação, aguarde">

          <!-- modal header -->
          <modal-header title="Envio de Email" @closeModal="closeModal">
            <i class="fa fa-mail-forward" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">


            <div class="row">
              <div class="col-md-12">
                <label>Email Financeiro (Envio Boleto)</label>
                <input type="text" class="form-control input-sm" v-model="form.email_financial" placeholder="Email não será enviado">
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <label>Email Aux. Aluguel (Inativar Imóvel)</label>
                <input type="text" class="form-control input-sm" v-model="form.email_aux_rent" placeholder="Email não será enviado">
              </div>
            </div>


            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <button class="button btn btn-sm btn-danger" @click="confirm">Confirmar Operação</button>
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
  components: {
    ModalHeader,
    ModalFooter
  },
  data () {
    return {
      load_data: false,
      form: {
        email_financial: 'financeiro@masterimoveis.com.br',
        email_aux_rent: 'apoio@masterimoveis.com.br',
        reserve_id: null
      }
    }
  },
  methods: {
    openModal() {
      $('#modalSendEmailCloseReserve').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    confirm () {

      this.load_data = true

      const queryParams = {
        params: this.form
      }

      http.get('register/reserve-contract/emails/send-email-end-reserve', queryParams).then(res => {

        setTimeout(() => {
          this.closeModal()
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    cleanForm () {
      this.form = {
        email_financial: 'financeiro@masterimoveis.com.br',
        email_aux_rent: 'apoio@masterimoveis.com.br',
        reserve_id: null
      }
    },
    closeModal() {
      $('#modalSendEmailCloseReserve').modal('hide')
    }
  },
  mounted () {
    this.$bus.$on('Register\Reserve:OpenModalSendEmailCloseReserve', (financialReserveData) => {

      this.cleanForm()

      this.form.reserve_id = financialReserveData.reserve_id

      if (financialReserveData.ticket === 'n') {
        this.form.email_financial = ''
      }

      this.openModal()
    })
  }
}
</script>
