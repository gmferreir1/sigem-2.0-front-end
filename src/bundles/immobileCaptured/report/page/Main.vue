<template>

  <div>


    <table-list @openModalFormCaptured="params => data_modal_form_captured = params" @remove="id => data_modal_confirm_remove = {id}" @edit="id => data_modal_form_captured = {type_action: 'edit_captured', id: id}"/>


    <!-- modal form -->
    <modal-form-captured :dataModal="data_modal_form_captured" />
    <!-- / modal form -->

    <!-- modal confirm remove -->
    <modal-confirm-remove :dataModal="data_modal_confirm_remove" />
    <!-- / modal confirm remove -->

  </div>

</template>

<script>
import TableList from '../components/TableList'
import ModalFormCaptured from '../components/ModalFormCaptured'
import ModalConfirmRemove from '../components/ModalConfirmRemove'
export default {
  components: {
    TableList,
    ModalFormCaptured,
    ModalConfirmRemove
  },
  data () {
    return {
      data_modal_form_captured: {},
      data_modal_confirm_remove: {}
    }
  },
  methods: {
  }
}
</script>