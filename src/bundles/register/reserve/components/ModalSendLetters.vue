<template>
  <div>
    <div id="modalSendLetters" class="modal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" v-loading="load_data" element-loading-text="Consultando dados, aguarde ...">

          <!-- modal header -->
          <modal-header title="Envios de Email" @closeModal="closeModal">
            <i class="fa fa-file-archive-o" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">

            <div class="table-responsive">
              <table class="table table-striped table-bordered table-hover table-condensed" id="table">
                <thead>
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Dados de Envio</th>
                  <th class="text-center"> - </th>
                </tr>
                </thead>
                <tbody>

                <tr>
                  <td class="text-left">{{data_emails.owner_contract.letter_name.toUpperCase()}}</td>
                  <td class="text-left" :title="wordUpper(data_emails.owner_contract.rp_last_action)">
                    <span v-if="data_emails.owner_contract.rp_last_action">
                      {{dateFormat(data_emails.owner_contract.date_last_update, 'DD/MM/YYYY HH:mm:ss')}}, por {{wordUpper(strLimit(data_emails.owner_contract.rp_last_action, 12))}}
                    </span>
                    <span v-else> - </span>
                  </td>
                  <td class="text-center">
                    <a href="#" title="Enviar email" @click.prevent="getEmailDataForSend('email_send_owner')">
                      <i class="fa fa-send orange"></i>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td class="text-left">{{data_emails.welcome_tenant.letter_name.toUpperCase()}}</td>
                  <td class="text-left" :title="wordUpper(data_emails.welcome_tenant.rp_last_action)">
                    <span v-if="data_emails.welcome_tenant.rp_last_action">
                      {{dateFormat(data_emails.welcome_tenant.date_last_update, 'DD/MM/YYYY HH:mm:ss')}}, por {{wordUpper(strLimit(data_emails.welcome_tenant.rp_last_action, 12))}}
                    </span>
                    <span v-else> - </span>
                  </td>
                  <td class="text-center">
                    <a href="#" title="Enviar email" @click.prevent="getEmailDataForSend('email_send_tenant')">
                      <i class="fa fa-send orange"></i>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td class="text-left">{{data_emails.condominium_contract.letter_name.toUpperCase()}}</td>
                  <td class="text-left" :title="wordUpper(data_emails.condominium_contract.rp_last_action)">
                    <span v-if="data_emails.condominium_contract.rp_last_action">
                      {{dateFormat(data_emails.condominium_contract.date_last_update, 'DD/MM/YYYY HH:mm:ss')}}, por {{wordUpper(strLimit(data_emails.condominium_contract.rp_last_action, 12))}}
                    </span>
                    <span v-else> - </span>
                  </td>
                  <td class="text-center">
                    <a href="#" title="Enviar email" @click.prevent="getEmailDataForSend('email_send_condominium')">
                      <i class="fa fa-send orange"></i>
                    </a>
                  </td>
                </tr>

                </tbody>
              </table>
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
import {strLimit, wordUpper} from '@/util/stringHelpers'

export default {
  props: ['dataModal'],
  components: {
    ModalHeader,
    ModalFooter
  },
  data () {
    return {
      load_data: false,
      data_emails: {
        owner_contract: {
          letter_name: ''
        },
        condominium_contract: {
          letter_name: ''
        },
        welcome_tenant: {
          letter_name: ''
        }
      }
    }
  },
  methods: {
    dateFormat,
    strLimit,
    wordUpper,
    /**
     * Verifica os dados do email enviado, como data e responsável.
     */
    queryEmailsSend () {
      this.load_data = true

      http.get(`register/reserve-contract/query/email-letters/${this.dataModal.data_contract.id}`).then(res => {

        this.data_emails = res.data

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    openModal() {
      $('#modalSendLetters').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    getEmailDataForSend (typeEmail) {

      const queryParams = {
        params: {
          type_email: typeEmail,
          reserve_id: this.dataModal.data_contract.id
        }
      }

      this.load_data = true

      http.get('register/reserve-contract/email-data', queryParams).then(res => {

        setTimeout(() => {
          this.$bus.$emit('Register\Reserve:OpenModalLetterData', res.data)

          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    closeModal() {
      $('#modalSendLetters').modal('hide')
    }
  },
  watch: {
    dataModal () {
      this.queryEmailsSend()
      this.openModal()
    }
  },
  mounted () {
    this.$bus.$on('Register\Reserve:refreshDataEmailSend', () => {
      this.queryEmailsSend()
    })
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
