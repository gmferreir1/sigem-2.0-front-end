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
                  <td class="text-left">Email de aviso ao locador dos dados do contrato</td>
                  <td class="text-left"> - </td>
                  <td class="text-center">
                    <a href="#" title="Enviar email" @click.prevent="getEmailDataForSend('email_send_owner')">
                      <i class="fa fa-send orange"></i>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td class="text-left">Email de boas vindas ao locatário</td>
                  <td class="text-left"> - </td>
                  <td class="text-center">
                    <a href="#" title="Enviar email">
                      <i class="fa fa-send orange"></i>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td class="text-left">Email ao condomínio dados do contrato (se existir)</td>
                  <td class="text-left"> - </td>
                  <td class="text-center">
                    <a href="#" title="Enviar email">
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
export default {
  props: ['dataModal'],
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
      $('#modalSendLetters').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    getEmailDataForSend (typeEmail) {

      this.load_data = true

      const queryParams = {
        params: {
          type_email: typeEmail,
          reserve_id: this.dataModal.data_contract.id
        }
      }

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
