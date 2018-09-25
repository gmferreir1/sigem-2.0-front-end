<template>

  <!-- main area -->
  <div>


    <login-form @openModalForgotPassword="data => data_modal_forgot_password = {email: data}" />

    <!-- modal forgot password -->
    <modal-forgot-password :dataModal="data_modal_forgot_password"/>
    <!-- / modal forgot password -->

  </div>
  <!-- /main area -->

</template>

<script>
import LoginForm from '../components/LoginForm'
import ModalForgotPassword from '../components/ModalForgotPassword'

export default {
  components: {
    LoginForm,
    ModalForgotPassword
  },
  data () {
    return {
      data_modal_forgot_password: {}
    }
  }
}
</script>