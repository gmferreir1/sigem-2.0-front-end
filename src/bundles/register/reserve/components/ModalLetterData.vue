<template>
  <div>
    <div id="modalLetterData" class="modal" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content" v-loading="load_data" element-loading-text="Aguarde, enviando email ...">

          <!-- modal header -->
          <modal-header @closeModal="closeModal">
            <button class="button btn btn-sm btn-danger" @click="sendEmail" :disabled="!form.email_send || block_send">
              <i class="fa fa-mail-forward"></i>
              Enviar Email
            </button>
          </modal-header>
          <!-- / modal header -->

          <div class="modal-body">

            <div class="row">
              <div class="col-md-4" :class="{error: validation.hasError('form.email_send')}">
                <label>Email Para Envio</label>
                <input type="text" class="form-control input-sm" v-model="form.email_send">
                <div class="message">{{ validation.firstError('form.email_send') }}</div>
              </div>
            </div>


            <div class="row" style="margin-top: 20px">
              <div class="col-md-12">
                <editor :setText="form.text_letter" @textEditor="text => form.text_letter = text"/>
              </div>
            </div>

            <div class="row" style="margin-top: 10px" v-if="form.type_email === 'email_send_tenant'">
              <div class="col-md-12">
                <img :src="image_64"/>
              </div>
            </div>

          </div>

          <!-- modal footer -->
          <modal-footer>
            <div style="float: left" v-if="block_send">
              <span style="font-weight: bold; color: red">Atenção</span>: texto com @, verifique antes de enviar
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
import Editor from '@/components/Editor'
import {mapActions} from 'vuex'

export default {
  components: {
    ModalHeader,
    ModalFooter,
    Editor
  },
  data () {
    return {
      load_data: false,
      form: {
        email_send: '',
        text_letter: ''
      },
      block_send: '',
      image_64: ''
    }
  },
  validators: {
    'form.email_send': function (value) {
      return Validator.value(value).required('Obrigatório').email('Email inválido')
    }
  },
  methods: {
    ...mapActions('Register', ['getReserveContract']),
    openModal() {
      $('#modalLetterData').modal({
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
          email_send: this.form.email_send,
          text_letter: this.form.text_letter,
          reserve_id: this.form.reserve_id,
          type_email: this.form.type_email
        }
      }

      http.get('register/reserve-contract/emails/send-email-letters', queryParams).then(res => {

        // pega os dados da reserve novamente para atualizar os históricos
        this.getReserveContract(this.form.reserve_id)

        // pega os dados novos de envio para mostrar o usuário
        this.$bus.$emit('Register\Reserve:refreshDataEmailSend')

        setTimeout(() => {
          _notification.success()
          this.closeModal()
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    closeModal() {
      $('#modalLetterData').modal('hide')
    }
  },
  mounted () {
    this.$bus.$on('Register\Reserve:OpenModalLetterData', (data) => {

      this.form.email_send = data.email_send
      this.form.text_letter = data.type_email === 'email_send_tenant' ? `<span style="font-weight: bold">${data.client_name.toUpperCase()}</span>` :  data.text_letter
      this.form.reserve_id = data.reserve_id
      this.form.type_email = data.type_email
      this.form.client_name = !data.client_name ? '' : data.client_name

      this.image_64 = data.type_email === 'email_send_tenant' ? data.text_letter : ''

      this.validation.reset()

      this.openModal()
    })
  },
  watch: {
    /**
     * verifica a existencia de @ no texto
     */
    'form.text_letter' () {
      if (this.form.text_letter.match(/@_/g)) {
        this.block_send = true
      } else {
        this.block_send = false
      }
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


  .modal-body {
    min-height: calc(100vh - 600px) !important;
    max-height: calc(100vh - 160px) !important;
    overflow-y: auto !important;
    overflow-x: hidden;
  }

</style>
