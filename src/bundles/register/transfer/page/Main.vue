<template>

<div>


  <table-list
    @openModalScoreAttendant="data_modal_score_attendant = {data: ''}"
    @openModalReason="open_modal_reason = !open_modal_reason"/>

  <!-- modal score de atendimento -->
  <modal-score-attendant :dataModal="data_modal_score_attendant" />
  <!-- / modal score de atendimento -->

  <!-- modal reason -->
  <modal-reason :openModalReason="open_modal_reason" />
  <!-- / modal reason -->

</div>

</template>

<script>
import TableList from '../components/list/TableList'
import ModalScoreAttendant from '../components/scoreAttendant/ModalScoreAttendant'
import ModalReason from '../components/reason/ModalReason'

export default {
  components: {
    TableList,
    ModalScoreAttendant,
    ModalReason
  },
  data () {
    return {
      data_modal_score_attendant: {},
      open_modal_reason: false
    }
  }
}

</script>