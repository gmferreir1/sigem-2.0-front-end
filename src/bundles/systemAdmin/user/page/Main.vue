<template>
  <div>

    <form-user />

    <table-list-users />

  </div>
</template>

<script>
  import FormUser from '../components/FormUser'
  import TableListUsers from '../components/TableListUsers'
  export default {
    components: {
      FormUser,
      TableListUsers
    }
  }
</script>

