<template>

  <header class="header navbar">

    <div class="brand visible-xs">
      <!-- toggle offscreen menu -->
      <div class="toggle-offscreen">
        <a href="#" class="hamburger-icon visible-xs" data-toggle="offscreen" data-move="ltr">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <!-- /toggle offscreen menu -->

      <!-- toggle chat sidebar small screen-->
      <div class="toggle-chat">
        <a href="javascript:;" class="hamburger-icon v2 visible-xs" data-toggle="layout-chat-open">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <!-- /toggle chat sidebar small screen-->
    </div>

    <ul class="nav navbar-nav hidden-xs">
      <li>
        <p class="navbar-text">
          Sistema de Gestão Master RSM Imóveis
        </p>
      </li>
    </ul>

    <ul class="nav navbar-nav navbar-right hidden-xs">

      <li id="panel_alert">
        <a href="javascript:;" data-toggle="dropdown" @click="getAlerts(true)">
          <i class="fa fa-bell-o"></i>
          <div class="bg-danger border-danger animated bounce" style="position: absolute; top: 2px; left: 25px; border-radius: 10px">
            <span style="margin: 5px">{{messages.length}}</span>
          </div>
        </a>
        <ul class="dropdown-menu notifications">
          <li class="notifications-header">
            <p class="text-muted small">Você tem {{messages.length}} mensagens</p>
          </li>
          <li>
            <ul class="notifications-list">
              <li v-for="message in messages.slice(0, 5)">
                <a href="javascript:;">
                  <span class="pull-left mt2 mr15">
                      <img :src="icons.notification" class="avatar avatar-xs img-circle" alt="">
                  </span>
                  <div class="overflow-hidden">
                    <span style="font-size: 11px">{{message.message}}</span>
                    <span class="time">{{getTimeAgo(message.created_at)}}</span>
                  </div>
                </a>
              </li>
            </ul>
          </li>
          <li class="notifications-footer" v-if="messages.length">
            <a href="javascript:;">Veja mais ...</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="javascript:;" data-toggle="dropdown">
          <img :src="image_profile" class="header-avatar img-circle ml10" alt="user" title="user" v-if="!load_avatar">
          <span v-if="load_avatar">
            <img :src="spinner" alt="" style="margin-top: -6px; margin-left: 10px">
          </span>
          <span class="pull-left">{{wordUpper(userNameLogged)}}</span>
        </a>
        <ul class="dropdown-menu">
          <li>
            <router-link :to="{name: 'systemAdmin.Dashboard'}">
              Admin Sistema
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'myProfile'}">
              Meu Perfil
            </router-link>
          </li>
          <li>
            <a href="#" @click.prevent="logoutSystem">Logout</a>
          </li>
        </ul>

      </li>

      <li>
        <a href="javascript:;" class="hamburger-icon v2" data-toggle="layout-chat-open" @click.prevent="openPanelChat">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </li>
    </ul>
  </header>

</template>

<script>
import {wordUpper} from '@/util/stringHelpers'
import {mapActions} from 'vuex'

export default {
  data () {
    return {
      image_profile: '',
      load_avatar: false,
      spinner: require('@/assets/images/loading.gif'),
      messages: [],
      icons: {
        notification: require('@icons/notification.png')
      }
    }
  },
  methods: {
    ...mapActions('Chat', ['getUsersChat']),
    ...mapActions('Notification', ['setNotification']),
    wordUpper,
    logoutSystem () {
      // logout chat
      this.chatLogout().then(res => {
        localStorage.clear()
        window.location.href = '/'
      }).catch(() => {
        localStorage.clear()
        window.location.href = '/'
      })
    },
    async chatLogout () {
      try {
        return await http.get('chat/transaction-actions/logout')
      } catch (e) {
        reject(e)
      }
    },
    setImageProfile () {
      this.load_avatar = true
      const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'))
      this.image_profile = dataUserLogged.image_profile

      setTimeout(() => {
        this.load_avatar = false
      }, 600)
    },
    openPanelChat () {

      this.$bus.$emit('chatPanelOpened')

      http.get('chat/transaction-actions/login').then(res => {

      }).catch(() => {})
    },
    getAlerts (read = false) {

      const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'))

      const queryParams = {
        params: {
          user_id: dataUserLogged.id,
          only_read: false,
          mark_read: read
        }
      }

      http.get(`system-alert/find`, queryParams).then(res => {

        this.messages = res.data

      }).catch(() => { })
    },
    realTime () {

      const channel = this.$pusher.subscribe('checkAlertSystem')
      channel.bind('App\\Events\\CheckAlertSystem', (data) => {


        if (!$('.app').hasClass('layout-chat-open')) {

          const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'))
          const arrayLength = data.messages.length

          if (arrayLength) {

            if (dataUserLogged) {

              if (dataUserLogged.id === data.messages[arrayLength - 1].responsible) {
                const message = arrayLength === 1 ? 'Voce possui uma nova  mensagem do chat' : 'Você possui novas mensagens do chat'
                this.setNotification({id_responsible: data.messages[arrayLength - 1].responsible, message: message})
              }

            }

          }

          this.messages = data.messages

        }

      })

    },
    getTimeAgo (date) {
      return timeago(null, 'pt_BR').format(date)
    }
  },
  computed: {
    userNameLogged () {
      const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'))
      return dataUserLogged.name
    }
  },
  mounted () {
    this.setImageProfile()

    this.$bus.$on('TemplateParts\TopHeader:LoadAvatar', () => {
      this.setImageProfile()
    })

    this.realTime()
    this.getAlerts()
    this.getUsersChat()
  }
}
</script>

<style>

  .main-panel > .header {
    background-color: #E98531;
  }

  .main-panel > .header .header-avatar {
    width: 45px;
    max-height: 45px;
    margin-top: -12px;
  }


  .main-panel > .header .nav > li > a:hover, .main-panel > .header .nav > li > a:focus {
    background-color: inherit;
    color: inherit;
  }

  .main-panel > .header .nav .open > a, .main-panel > .header .nav .open > a:hover, .main-panel > .header .nav .open > a:focus {
    background-color: inherit;
    color: inherit;
  }

</style>