<template>
  <div>
    <div id="modalForgotPassword" class="modal" tabindex="-1">
      <div class="modal-dialog modal-sm">
        <div class="modal-content" v-loading="load_data" element-loading-text="Processando sua solicitação, aguarde ...">

          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="Recuperação de Senha" />
          <!-- / modal header -->

          <div class="modal-body">

            <div class="row" style="padding: 5px">
              <div class="col-md-12" :class="{error: validation.hasError('email_recovery')}">
                <label>Informe o Email de Recuperação</label>
                <input type="text" class="form-control input-sm" v-model="email_recovery">
                <div class="message">{{ validation.firstError('email_recovery') }}</div>
              </div>
            </div>

            <div class="row" style="padding: 5px">
              <div class="col-md-12">
                <button class="button btn btn-sm btn-default" @click="sendEmail">Enviar</button>
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
  props: ['dataModal'],
  components: {
    ModalHeader,
    ModalFooter
  },
  data () {
    return {
      load_data: false,
      email_recovery: ''
    }
  },
  validators: {
    'email_recovery': function (value) {
      return Validator.value(value).required('Obrigatório').email('Email inválido')
    }
  },
  methods: {
    openModal() {
      $('#modalForgotPassword').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    submitForm () {
      const self = this
      this.$validate()
      .then(function (success) {
        if (success) {
          self.sendEmail()
        }
      })
    },
    sendEmail () {
      this.load_data = true

      const queryParams = {
        params: {
          email: this.email_recovery
        }
      }

      http.get('external-access/recovery-password/send-email', queryParams).then(res => {

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    closeModal() {
      $('#modalForgotPassword').modal('hide')
    }
  },
  watch: {
    dataModal () {
      this.email_recovery = this.dataModal.email

      this.validation.reset()
      this.openModal()
    }
  }
}
</script>

<style scoped>

  .modal-body {
    padding: 5px;
  }

  th {
    font-weight: normal !important;
    font-size: 11px;
  }

  tr {
    font-size: 11px;
  }


</style>
