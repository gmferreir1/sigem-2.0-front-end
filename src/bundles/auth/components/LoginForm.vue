<template>

  <div>

    <div class="full-height" v-loading="load_data" :element-loading-text="message_load">
      <div class="center-wrapper">
        <div class="center-content">
          <div class="row">
            <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">

              <form role="form" @submit.prevent class="form-layout" style="background-color: #ffffff; border-radius: 2%">


                <!-- form login -->
                <div v-if="show_form_login && !email_recovery_send">

                  <div class="text-center">
                    <div>
                      <img :src="images.logo" height="40"/>
                    </div>
                    Bem vindo ao Sistema de Gestão Master
                  </div>

                  <div class="form-inputs">
                    <input type="email" class="form-control input-lg" v-model="form.username" placeholder="Email">
                    <input type="password" class="form-control input-lg" v-model="form.password" placeholder="Senha" @keypress.enter="doLogin">
                  </div>

                  <p v-if="error_login">
                    <span style="font-weight: bold; color: red">Erro: {{error_login}}</span>
                  </p>

                  <button class="btn btn-success btn-block btn-lg mb15" type="button" :disabled="!form.username || !form.password" @click="doLogin">
                    <span>Efetuar Login</span>
                  </button>

                  <p>
                    <a href="#" @click.prevent="(show_form_login = false), email_recovery = form.username">Esqueceu a senha?</a>

                    <span style="float: right; font-weight: bold">versão: {{$systemVersion}}</span>
                  </p>


                </div>
                <!-- / form login -->

                <!-- form send email -->
                <div v-if="!show_form_login && !email_recovery_send">

                  <div class="text-center">
                    <div>
                      <img :src="images.logo" height="40"/>
                    </div>
                    Informe o email cadastrado no sistema
                  </div>

                  <div class="form-inputs">
                    <input type="email" class="form-control input-lg" v-model="email_recovery" placeholder="Email de recuperação" @keypress.enter="sendEmailRecoveryPassword">
                  </div>


                  <button class="btn btn-success btn-block btn-lg mb15" type="button" :disabled="!email_recovery" @click="sendEmailRecoveryPassword">
                    <span>Enviar Email</span>
                  </button>

                  <p>
                    <a href="#" @click.prevent="show_form_login = true">Voltar tela de login</a>
                  </p>

                </div>
                <!-- / form send email -->

                <!-- message check email -->
                <div class="text-center" v-if="email_recovery_send">
                  <p>Foi enviado um email de recuperação de senha para: {{email_recovery}}</p>
                  <p>Verifique e siga os passos para alterar a senha</p>
                  <p>
                    <a href="#" @click.prevent="reset">
                      <span style="color: orange">Voltar a tela de login</span>
                    </a>
                  </p>
                </div>
                <!-- / message check email -->

              </form>
            </div>
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
        message_load: '',
        load_data: false,
        form: {
          username: '',
          password: ''
        },
        error_login: '',
        show_form_login: true,
        email_recovery: '',
        email_recovery_send: false,
        images: {
          logo: require('@/assets/images/master.png')
        }
      }
    },
    methods: {
      /**
       * Efetua o login no sistema
       */
      doLogin () {

        if (!this.form.username || !this.form.password) {
          return
        }

        this.error_login = ''

        this.message_load = 'Efetuando login, aguarde ....'
        this.load_data = true;

        const data = {
          grant_type: 'password',
          client_secret: 'HNacujglNrlaUm059gOMInmD5fXZtmZCIn3Vphlo',
          client_id: 2,
          username: this.form.username,
          password: this.form.password
        };

        http.post('oauth/token', data).then(res => {

          const dataUserLogged = {
            access_token: res.data.access_token
          }

          localStorage.setItem('dataUserLogged', JSON.stringify(dataUserLogged))

          // login no chat
          this.chatLogin()

          setTimeout(() => {
            this.message_load = 'Login efetuado, carregando sistema ...'
            this.getUserLoggedData()
          }, 1000)

        }).catch((error) => {

          this.load_data = false

          if (error.response.status === 401) {
            this.error_login = 'Usuário e/ou senha inválidos'
          }

        })
      },
      /**
       * Pega os dados do usuário logado na api
       */
      getUserLoggedData () {

        http.get('user/get-data-user-logged').then(res => {

          const dataUserLogged = localStorage.getItem('dataUserLogged') ? JSON.parse(localStorage.getItem('dataUserLogged')) : null

          if (dataUserLogged) {
            dataUserLogged.id = res.data.id
            dataUserLogged.name = res.data.name
            dataUserLogged.last_name = res.data.last_name
            dataUserLogged.email = res.data.email
            dataUserLogged.image_profile = res.data.image_profile
          }

          localStorage.setItem('dataUserLogged', JSON.stringify(dataUserLogged))

          setTimeout(() => {
            window.location.href = '/'
          }, 1500)

        }).catch(() => {
          _notification.error('Erro ao buscar dados do usuário !')
        })

      },
      /**
       * Envio de email para recuperação de senha
       */
      sendEmailRecoveryPassword () {
        this.message_load = 'Enviando email, aguarde ...'
        this.load_data = true

        const queryParams = {
          params: {
            email: this.email_recovery
          }
        }

        http.get('external-access/recovery-password/send-email', queryParams).then(res => {

          setTimeout(() => {
            this.email_recovery_send = true
            this.load_data = false
          }, 600)

        }).catch(() => {
          this.load_data = false
        })
      },
      chatLogin () {
        http.get('chat/transaction-actions/login').then(res => {
          return true
        }).catch(() => {
          return false
        })
      },
      reset () {
        this.show_form_login = true
        this.email_recovery = ''
        this.email_recovery_send = false
      }
    },
    watch: {
      'form.username' () {
        this.error_login = false
      },
      'form.password' () {
        this.error_login = false
      }
    }
  }
</script>