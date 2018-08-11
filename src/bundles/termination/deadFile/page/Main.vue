<template>

  <div>
    <table-list @showModalConfirmCancel="data => data_modal_confirm_cancel_archive = {data}"/>


    <!-- modal confirmação desarquivar o processo -->
    <modal-confirm-cancel-archive :dataModal="data_modal_confirm_cancel_archive" />
    <!-- / modal confirmação desarquivar processo -->

  </div>

</template>

<script>
import TableList from '../components/TableList'
import ModalConfirmCancelArchive from '../components/ModalConfirmCancelArchive'

export default {
  components: {
    TableList,
    ModalConfirmCancelArchive
  },
  data () {
    return {
      data_modal_confirm_cancel_archive: {}
    }
  },
  methods: {
  }
}
</script>