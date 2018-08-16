<template>
  <div>
    <div id="modalWarnClient" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Confirmação de Ação" @closeModal="closeModal">
            <i class="fa fa-check-circle" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body" v-if="dataModal && dataModal.data">


            <div class="row">
              <div class="col-md-12">
                <span style="font-weight: bold; color: red">Atenção: </span>
                <span>O código informado esta na base de dados a pouco tempo, portando verifique se deseja mesmo abrir uma nova reserva com este código.</span>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <p style="font-weight: bold; color: red">Dados da Reserva</p>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-4">
                <label>Código</label>
                <p>{{dataModal.data.immobile_code.toUpperCase()}}</p>
              </div>
              <div class="col-md-8">
                <label>Endereço</label>
                <p>{{wordUpper(dataModal.data.address)}} {{wordUpper(dataModal.data.neighborhood)}}</p>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-4">
                <label>Reserva</label>
                <p>{{dataModal.data.code_reserve}}</p>
              </div>
              <div class="col-md-4">
                <label>Data Situação</label>
                <p>{{!dataModal.data.conclusion ? dateFormat(dataModal.data.date_reserve) : dateFormat(dataModal.data.conclusion)}}</p>
              </div>
              <div class="col-md-4">
                <label>Situação</label>
                <p>{{wordUpper(getSituation(dataModal.data.situation))}}</p>
              </div>
            </div>


            <div class="row" style="margin-top: 20px">
              <div class="col-md-12">
                <span style="color: red; font-weight: bold">Deseja confirmar a abertura da reserva ?</span>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <button class="button btn btn-sm btn-danger" @click="confirm" :disabled="!dataModal.data">Sim, confirmar</button>
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
import {wordUpper} from '@/util/stringHelpers'
import {getSituation} from '../util/util'
import {dateFormat} from '@/util/dateTime'

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
      survey_date: '',
      params_printer: {}
    }
  },
  methods: {
    wordUpper,
    getSituation,
    dateFormat,
    openModal() {
      $('#modalWarnClient').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    confirm () {
      this.closeModal()
      this.$bus.$emit('Register\Reserve:ConfirmReleaseExists', this.dataModal.data)
    },
    closeModal() {
      $('#modalWarnClient').modal('hide')
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

  label {
    font-weight: bold !important;
  }

</style>
