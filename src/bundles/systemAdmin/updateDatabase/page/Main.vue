<template>

  <div>

    <form-upload />

    <table-list-show-update />

  </div>

</template>

<script>
import FormUpload from '../components/FormUpload'
import TableListShowUpdate from '../components/TableListShowUpdate'

export default {
  components: {
    FormUpload,
    TableListShowUpdate
  }
}
</script>