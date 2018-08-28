<template>

  <div>

    <table-list
      @openModalFormReserve="params => data_modal_form_reserve = params"
      @openModalScoreAttendance="data_modal_score_attendance = {data: ''}"
      @openModalSelectTypePrint="filter => data_open_modal_select_type_print = {filter}"
      @openModalReasonCancel="data_modal_reason_cancel = {data: ''}"/>

    <!-- modal formulário de reserva -->
    <modal-form-reserve :dataModal="data_modal_form_reserve"
      @openModalWarnClient="data => data_modal_warn_client = {data}"/>
    <!-- modal formulário de reserva -->

    <!-- modal avisando o cliente que o codigo do imovel esta ativo a ponto tempo no sistema -->
    <modal-warn-client :dataModal="data_modal_warn_client" />
    <!-- / modal avisando o cliente que o codigo esta ativo a ponto tempo no sistema -->

    <!-- modal score de atendimento -->
    <modal-score-attendance :dataModal="data_modal_score_attendance" @openModalFormReserve="params => data_modal_form_reserve = params" />
    <!-- / modal score de atendimento -->

    <!-- modal confirm close reserve -->
    <modal-confirm-close-reserve />
    <!-- / modal confirm close reserve -->

    <!-- modal dados de contratos celebrados x tesouraria -->
    <modal-financial-final-data />
    <!-- / modal dados de contratos celebrados x tesouraria -->

    <!-- modal envio de email fechamento da reserva -->
    <modal-send-email-close-reserve />
    <!-- / modal envio de email fechamento da reserva -->

    <!-- modal seleção do tipo de impressão -->
    <modal-select-type-print :dataModal="data_open_modal_select_type_print" />
    <!-- / modal seleção do tipo de impressão -->

    <!-- modal motivos cancelamento -->
    <modal-reason-cancel :dataModal="data_modal_reason_cancel" />
    <!-- / modal motivos cancelamento -->

  </div>

</template>

<script>
import TableList from '../components/TableList'
import ModalFormReserve from '../components/ModalFormReserve'
import ModalWarnClient from '../components/ModalWarnClient'
import ModalScoreAttendance from '../../reserve/components/score/components/ModalScoreAttendance'
import ModalConfirmCloseReserve from '../components/ModalConfirmCloseReserve'
import ModalFinancialFinalData from '../components/ModalFinancialFinalData'
import ModalSendEmailCloseReserve from '../components/ModalSendEmailCloseReserve'
import ModalSelectTypePrint from '../components/ModalSelectTypePrint'
import ModalReasonCancel from '../components/reasonsCancel/ModalReasonCancel'

export default {
  components: {
    ModalConfirmCloseReserve,
    TableList,
    ModalFormReserve,
    ModalWarnClient,
    ModalScoreAttendance,
    ModalFinancialFinalData,
    ModalSendEmailCloseReserve,
    ModalSelectTypePrint,
    ModalReasonCancel
  },
  data () {
    return {
      data_modal_form_reserve: {},
      data_modal_warn_client: {},
      data_modal_score_attendance: {},
      data_open_modal_select_type_print: {},
      data_modal_reason_cancel: {}
    }
  },
  methods: {
    openModalScore () {
      console.log('sss')
    }
  }
}
</script>