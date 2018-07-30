<template>

  <div>

    <div class="full-height" v-loading="load_data" :element-loading-text="message_load">
      <div class="center-wrapper">
        <div class="center-content">
          <div class="row">
            <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">

              <form role="form" @submit.prevent="doLogin" class="form-layout">

                <div class="text-center mb15">
                  <img src="../../../assets/images/logo-dark.png"/>
                </div>

                <p class="text-center mb30">Welcome to Urban. Please sign in to your account</p>

                <div class="form-inputs">
                  <input type="email" class="form-control input-lg" v-model="form.username" placeholder="Email">
                  <input type="password" class="form-control input-lg" v-model="form.password" placeholder="Senha">
                </div>

                <p v-if="error_login">
                  <span style="font-weight: bold; color: red">Erro: {{error_login}}</span>
                </p>

                <button class="btn btn-success btn-block btn-lg mb15" type="submit">
                  <span>Sign in</span>
                </button>

                <p>
                  <a href="#" @click.prevent>Esqueceu a senha?</a>
                </p>

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
        error_login: ''
      }
    },
    methods: {
      /**
       * Efetua o login no sistema
       */
      doLogin () {
        this.error_login = ''

        this.message_load = 'Efetuando login, aguarde ....'
        this.load_data = true;

        const data = {
          grant_type: 'password',
          client_secret: 'a537PXPdYTgUpwPiCVNCiFilRFRHCYvA1Lsd1wuK',
          client_id: 3,
          username: this.form.username,
          password: this.form.password
        };

        http.post('oauth/token', data).then(res => {

          const dataUserLogged = {
            access_token: res.data.access_token
          }

          localStorage.setItem('dataUserLogged', JSON.stringify(dataUserLogged))

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
          }

          localStorage.setItem('dataUserLogged', JSON.stringify(dataUserLogged))

          setTimeout(() => {
            window.location.href = '/'
          }, 1500)

        }).catch(() => {
          _notification.error('Erro ao buscar dados do usuário !')
        })

      }
    }
  }
</script>