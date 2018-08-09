<template>

  <div>

    <table-list-contracts @openModalFormContract="openModalFormContract"
      @openModalDestinationOrReason="data_modal_destination_or_reason = {data: ''}"
      @edit="editContract"
      @openModalScoreAttendance="openModalScoreAttendance"
      @openModalSelectTypePrinter="data_modal_select_type_printer = {data: ''}"/>

    <!-- modal formulário de contrato -->
    <modal-form-contract :dataModal="data_modal_form_contract"
      @openModalGuarantors="openModalGuarantors"
      @edit="editContract"/>
    <!-- / modal formulário de contrato -->

    <!-- modal destinos e motivos -->
    <modal-form-destination-or-reason :dataModal="data_modal_destination_or_reason" />
    <!-- / modal destinos e motivos -->

    <!-- modal form guarantors -->
    <modal-form-guarantors :dataModal="data_modal_form_guarantors" />
    <!-- / modal form guarantors -->

    <!-- modal score atendimento -->
    <modal-score :dataModal="data_modal_score_attendance" />
    <!-- / modal score atendimento -->

    <!-- modal seleção tipo de impressão -->
    <modal-select-type-printer :dataModal="data_modal_select_type_printer" />
    <!-- / modal seleção tipo de impressão -->

  </div>

</template>

<script>
import TableListContracts from '../components/TableListContracts'
import ModalFormContract from '../components/ModalFormContract'
import ModalFormDestinationOrReason from '../../destinationOrReason/components/ModalFormDestinationOrReason'
import ModalFormGuarantors from '../components/ModalFormGuarantors'
import ModalScore from '../../scoreAttendance/components/ModalScore'
import ModalSelectTypePrinter from '../components/ModalSelectTypePrinter'

export default {
  components: {
    TableListContracts,
    ModalFormContract,
    ModalFormDestinationOrReason,
    ModalFormGuarantors,
    ModalScore,
    ModalSelectTypePrinter
  },
  data () {
    return {
      data_modal_form_contract: {},
      data_modal_destination_or_reason: {},
      data_modal_form_guarantors: {},
      data_modal_score_attendance: {},
      data_modal_select_type_printer: {}
    }
  },
  methods: {
    openModalFormContract (typeAction) {
      this.data_modal_form_contract = {
        type_action: typeAction
      }
    },
    openModalGuarantors (contract) {
      this.data_modal_form_guarantors = {
        contract
      }
    },
    editContract (id) {
      http.get(`termination/contract/${id}`).then(res => {

        this.data_modal_form_contract = {
          type_action: 'edit',
          data: res.data
        }

      }).catch(() => { })
    },
    openModalScoreAttendance () {
      this.data_modal_score_attendance = {
        data: ''
      }
    }
  }
}
</script>