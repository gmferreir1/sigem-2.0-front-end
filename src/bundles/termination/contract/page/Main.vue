<template>

  <div>

    <table-list-contracts @openModalFormContract="openModalFormContract" @openModalDestinationOrReason="data_modal_destination_or_reason = {data: ''}"/>

    <!-- modal formulário de contrato -->
    <modal-form-contract :dataModal="data_modal_form_contract " />
    <!-- / modal formulário de contrato -->

    <!-- modal destinos e motivos -->
    <modal-form-destination-or-reason :dataModal="data_modal_destination_or_reason" />
    <!-- / modal destinos e motivos -->

  </div>

</template>

<script>
import TableListContracts from '../components/TableListContracts'
import ModalFormContract from '../components/ModalFormContract'
import ModalFormDestinationOrReason from '../../destinationOrReason/components/ModalFormDestinationOrReason'

export default {
  components: {
    TableListContracts,
    ModalFormContract,
    ModalFormDestinationOrReason
  },
  data () {
    return {
      data_modal_form_contract: {},
      data_modal_destination_or_reason: {}
    }
  },
  methods: {
    openModalFormContract (typeAction) {
      this.data_modal_form_contract = {
        type_action: typeAction
      }
    }
  }
}
</script>