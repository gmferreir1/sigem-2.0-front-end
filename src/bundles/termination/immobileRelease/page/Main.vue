<template>

  <div>

    <table-list @edit="data => data_modal_form_release = {data}" />

    <!-- modal form release -->
    <modal-form-release :dataModal="data_modal_form_release" />
    <!-- / modal form release -->

  </div>

</template>

<script>
import TableList from '../components/TableList'
import ModalFormRelease from '../components/ModalFormRelease'
export default {
  components: {
    ModalFormRelease,
    TableList
  },
  data () {
    return {
      data_modal_form_release: {}
    }
  }
}
</script>