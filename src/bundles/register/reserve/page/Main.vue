<template>

  <div>

    <table-list
      @openModalFormReserve="params => data_modal_form_reserve = params"
      @openModalScoreAttendance="data_modal_score_attendance = {data: ''}"/>

    <!-- modal formulário de reserva -->
    <modal-form-reserve :dataModal="data_modal_form_reserve"
      @openModalWarnClient="data => data_modal_warn_client = {data}"/>
    <!-- modal formulário de reserva -->

    <!-- modal avisando o cliente que o codigo do imovel esta ativo a ponto tempo no sistema -->
    <modal-warn-client :dataModal="data_modal_warn_client" />
    <!-- / modal avisando o cliente que o codigo esta ativo a ponto tempo no sistema -->

    <!-- modal score de atendimento -->
    <modal-score-attendance :dataModal="data_modal_score_attendance" />
    <!-- / modal score de atendimento -->


  </div>

</template>

<script>
import TableList from '../components/TableList'
import ModalFormReserve from '../components/ModalFormReserve'
import ModalWarnClient from '../components/ModalWarnClient'
import ModalScoreAttendance from '../../score/components/ModalScoreAttendance'

export default {
  components: {
    TableList,
    ModalFormReserve,
    ModalWarnClient,
    ModalScoreAttendance
  },
  data () {
    return {
      data_modal_form_reserve: {},
      data_modal_warn_client: {},
      data_modal_score_attendance: {}
    }
  },
  methods: {
    openModalScore () {
      console.log('sss')
    }
  }
}
</script>