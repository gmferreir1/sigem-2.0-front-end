<template>

<div>


  <table-list
    @openModalScoreAttendant="data_modal_score_attendant = {data: ''}"
    @openModalReason="open_modal_reason = !open_modal_reason"
    @openModalFormContract="params => data_modal_form_contract = params"/>

  <!-- modal score de atendimento -->
  <modal-score-attendant :dataModal="data_modal_score_attendant" />
  <!-- / modal score de atendimento -->

  <!-- modal reason -->
  <modal-reason :openModalReason="open_modal_reason" />
  <!-- / modal reason -->

  <!-- modal form transfer -->
  <modal-form-contract :dataModal="data_modal_form_contract"/>
  <!-- / modal form transfer -->

  <!-- modal motivo para o cancelamento -->
  <modal-reason-cancel :dataModal="data_modal_reason_cancel" />
  <!-- modal motivo para o cancelamento -->

</div>

</template>

<script>
import TableList from '../components/contract/TableList'
import ModalScoreAttendant from '../components/scoreAttendant/ModalScoreAttendant'
import ModalReason from '../components/reason/ModalReason'
import ModalFormContract from '../components/contract/ModalFormContract'
import ModalReasonCancel from '../components/contract/ModalReasonCancel'

export default {
  components: {
    TableList,
    ModalScoreAttendant,
    ModalReason,
    ModalFormContract,
    ModalReasonCancel
  },
  data () {
    return {
      data_modal_score_attendant: {},
      open_modal_reason: false,
      data_modal_form_contract: {},
      data_modal_reason_cancel: {}
    }
  }
}

</script>