<template>

  <div class="full-height" v-loading="load_data" element-loading-text="Alterando a senha, aguarde ...">
    <div class="center-wrapper">
      <div class="center-content">
        <div class="row">
          <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">

            <form role="form" @submit.prevent="submitForm" class="form-layout" style="background-color: #ffffff; border-radius: 2%">

              <div class="text-center mb10" v-if="!change_success">

                <div>
                  <img :src="images.logo" height="40"/>
                </div>

                <span style="font-size: 15px">
                  Formulário Para Alteração de Senha
                </span>
              </div>

              <div class="form-inputs">

                <div v-if="!change_success">

                  <div class="row">
                    <div class="col-md-12" :class="{error: validation.hasError('form.password'), 'has-error': validation.hasError('form.password')}">
                      <input type="password" class="form-control input-lg" placeholder="Informe a nova senha" v-model="form.password" autocomplete="off">
                      <div class="message">{{ validation.firstError('form.password') }}</div>
                    </div>
                  </div>


                  <div class="row">
                    <div class="col-md-12" :class="{error: validation.hasError('form.password_confirmation'), 'has-error': validation.hasError('form.password_confirmation')}">
                      <input type="password" class="form-control input-lg" placeholder="Repita a nova senha" v-model="form.password_confirmation" autocomplete="off">
                      <div class="message">{{ validation.firstError('form.password_confirmation') }}</div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <button class="btn btn-danger btn-block btn-lg mb15" type="submit">
                        <span>Alterar Senha</span>
                      </button>
                    </div>
                  </div>

                </div>

                <div v-if="change_success">

                  <div class="row">
                    <div class="col-md-12">
                      Sua senha foi alterada com sucesso !!
                    </div>
                  </div>


                  <div class="row" style="margin-top: 10px">
                    <div class="col-md-12">
                      <router-link :to="{name: 'auth'}">
                        <span style="color: red">Clique aqui </span>
                      </router-link> para efetuar o login novamente
                    </div>
                  </div>

                </div>

              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      load_data: false,
      form: {
        password: '',
        password_confirmation: ''
      },
      change_success: false,
      images: {
        logo: require('@/assets/images/master.png')
      }
    }
  },
  validators: {
    'form.password': function (value) {
      return Validator.value(value).required('Obrigatório').minLength(6, 'Minímo 6 caracteres')
    },
    'form.password_confirmation, form.password': function (repeat, password) {
      return Validator.value(repeat).required('Obrigatório').minLength(6, 'Minímo 6 caracteres').match(password, 'Senhas não conferem')
    }
  },
  methods: {
    submitForm () {
      const self = this
      this.$validate()
      .then(function (success) {
        if (success) {
          self.changePassword()
        }
      })
    },
    changePassword () {
      this.load_data = true

      const token = this.$route.query.token

      if (!token) {
        _notification.error('Nenhum token localizado !')
        return
      }

      this.form.token = token

      http.put('external-access/recovery-password/change-password', this.form).then(res => {

        if (res.data.success) {

          setTimeout(() => {
            this.change_success = true
            this.load_data = false
          }, 600)

          return
        }

      }).catch(() => {
        this.load_data = false
      })
    }
  },
  mounted () {
    this.change_success = false
  }
}
</script>