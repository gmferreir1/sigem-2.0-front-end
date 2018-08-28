<template>

<div>


  <table-list @openModalScoreAttendant="data_modal_score_attendant = {data: ''}" />

  <modal-score-attendant :dataModal="data_modal_score_attendant" />

</div>

</template>

<script>
import TableList from '../components/list/TableList'
import ModalScoreAttendant from '../components/scoreAttendant/ModalScoreAttendant'
export default {
  components: {
    TableList,
    ModalScoreAttendant
  },
  data () {
    return {
      data_modal_score_attendant: {}
    }
  }
}

</script>