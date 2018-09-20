<template>
  <div>
    <div id="modalFormReserve" class="modal" tabindex="-1" role="dialog" v-loading="load_data" element-loading-text="Gerando impressão, aguarde ...">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Formulário Reserva de Imóvel" @closeModal="closeModal">
            <i class="fa fa-home" slot="icon_title"></i>

            <!-- buttons -->
            <button class="button btn btn-sm btn-danger" @click="submitForm"
              :disabled="contract_edit_current.situation === 'as' || contract_edit_current.situation === 'ap'
                      || contract_edit_current.situation === 'af' || contract_edit_current.situation === 'c'">Salvar Dados</button>
            <!-- / buttons -->

            <!-- botão envio de cartas -->
            <button class="button btn btn-sm btn-warning" v-if="contract_edit_current.situation === 'as' || contract_edit_current.situation === 'ap'
                      || contract_edit_current.situation === 'af'" @click="$emit('openModalSendLetters', contract_edit_current)">Envio de cartas</button>
            <!-- /botão envio de cartas -->

            <!-- buttons -->
            <button class="button btn btn-sm btn-primary" @click="printRecordLocation" v-if="$store.state.Register.contract_edit_current.id"
              :disabled="contract_edit_current.situation === 'c'">
              <i class="fa fa-print"></i>
              Ficha Reserva
            </button>
            <!-- / buttons -->

          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">

            <form-reserve @openModalWarnClient="data => $emit('openModalWarnClient', data)"
              :dataModalOpened="data_modal_opened"/>

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
import {mapState} from 'vuex'
import ModalHeader from '@/components/ModalHeader'
import ModalFooter from '@/components/ModalFooter'
import FormReserve from './FormReserve'
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
    FormReserve
  },
  data () {
    return {
      load_data: false,
      data_modal_opened: {}
    }
  },
  methods: {
    openModal() {
      $('#modalFormReserve').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    submitForm () {
      this.$bus.$emit('Register\Reserve:SubmitFormReserve')
    },
    printRecordLocation () {
      if (this.data_modal_opened.id) {

        this.load_data = true

        const queryParams = {
          params: {
            reserve_id: this.data_modal_opened.id,
            type_printer: 'record_location'
          }
        }

        http.get('register/reserve-contract/printer', queryParams).then(res => {

          const url = window.URL_API + '/' + res.data.file_name
          window.open(url)

          const params = {
            params: {
              file_name: res.data.file_name
            }
          }

          setTimeout(() => {
            http.get('api/remove-file', params)
          }, 1500)

          setTimeout(() => {
            this.load_data = false
          }, 600)

        }).catch(() => { this.load_data = false })


      }
    },
    closeModal() {
      $('#modalFormReserve').modal('hide')
    }
  },
  computed: {
    ...mapState('Register', ['contract_edit_current'])
  },
  watch: {
    dataModal(data) {
      this.data_modal_opened = data
      this.openModal()
    }
  }
}
</script>

<style scoped>

  .modal-body {
    /*
    max-height: calc(100vh - 160px) !important;
    min-height: calc(100vh - 820px) !important;
    */
    min-height: calc(100vh - 600px) !important;
    max-height: calc(100vh - 160px) !important;
    overflow-y: auto !important;
    overflow-x: hidden;
  }

</style>