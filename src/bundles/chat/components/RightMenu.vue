<template>

  <div id="chat-panel" class="chat-panel">
    <div class="chat-inner">
      <div class="chat-users">
        <div class="nav-justified-xs">

          <ul class="nav nav-tabs nav-justified ">
            <li class="active">
              <a href="#chat-list" data-toggle="tab">Chat</a>
            </li>
          </ul>
        </div>

        <div class="tab-content">

          <div class="tab-pane active" id="chat-list">

            <div class="chat-group">
              <div class="chat-group-header">
                Online
              </div>
              <a v-for="user in users.online" :title="wordUpper(user.name)" @click.prevent="openChatConversationPanel(user)">
                <span class="status-online"></span>
                <span>{{strLimit(wordUpper(user.name), 25)}} <span class="label label-danger">{{user.qt}}</span> </span>
              </a>
            </div>

            <div class="chat-group">
              <div class="chat-group-header">
                Offline
              </div>
              <a v-for="user in users.offline" :title="wordUpper(user.name)" @click.prevent="openChatConversationPanel(user)">
                <span class="status-offline"></span>
                <span>{{strLimit(wordUpper(user.name), 25)}}</span>
              </a>

            </div>
          </div>

        </div>

      </div>


      <div class="chat-conversation">

        <div class="chat-header">
          <a class="chat-back" href="javascript:;">
            <i class="fa fa-angle-left"></i>
          </a>
          <div class="chat-header-title" style="padding-bottom: 10px">
            {{wordUpper(conversation_panel.destination.name)}}
            <p v-if="show_message_typing" style="font-weight: bold; color: #e98531; margin-top: 0px; padding-top: 0px">digitando ...</p>
          </div>
          <a class="chat-right" href="javascript:;">
            <i class="fa fa-circle-thin"></i>
          </a>
        </div>

        <div class="chat-conversation-content" style="margin-top: 10px">

          <div v-for="message in messages_chat">

            <div class="chat-conversation-user" :class="{me: message.user_id_sender === user_id, them: message.user_id_sender != user_id}">
              <div style="font-size: 10px; color: #cccccc">
                <span>{{dateFormat(message.created_at, 'DD/MM/YYYY HH:mm:ss')}}</span>
              </div>
              <div class="chat-conversation-message break-line">
                <p>{{message.message}}</p>
                <span style="font-weight: bold; font-size: 10px; float: right"  v-if="message.date_read && message.user_id_sender == user_id">{{dateFormat(message.date_read, 'DD/MM/YYYY HH:mm:ss')}}</span>
              </div>
            </div>

          </div>

        </div>

        <div class="chat-conversation-footer">
          <textarea class="chat-input" id="search" v-model="data_message_send.message"></textarea>

          <button class="chat-send" @click="sendMessage">
            <i class="fa fa-paper-plane"></i>
          </button>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapState} from 'vuex'
import {wordUpper, strLimit} from '@/util/stringHelpers'
import {dateFormat} from '@/util/dateTime'

export default {
  data () {
    return {
      users: {
        online: [],
        offline: []
      },
      conversation_panel: {
        destination: {
          name: ''
        }
      },
      messages_chat: [],
      user_id: null,
      user_id_select_to: null,
      data_message_send: {
        message: '',
        user_id_destination: null
      },
      input_text: '',
      input_qt_check: 0,
      show_message_typing: false
    }
  },
  methods: {
    ...mapActions('Chat', ['getConversations', 'getUsersChat']),
    wordUpper,
    strLimit,
    dateFormat,
    openChatConversationPanel (userData) {

      this.user_id_select_to = userData.id

      if (this.user_id === userData.id) {
        return
      }

      this.conversation_panel.destination.name = userData.name

      const queryParams = {
        params: {
          in: this.user_id,
          to: userData.id,
          read: true
        }
      }

      this.getConversations(queryParams).then(res => {

        $('#chat-panel').addClass('conversation-open')

        this.shootRealTime()

      }).catch(() => {})

    },
    sendMessage () {
      this.data_message_send.user_id_destination = this.user_id_select_to

      http.post('chat/conversations', this.data_message_send).then((res) => {
        this.refreshData()
      })

    },
    refreshData (params = null) {

      const queryParams = {
        params: {
          in: this.user_id,
          to: this.user_id_select_to,
          read: $('#chat-panel').hasClass('conversation-open')
        }
      }

      ////
      this.getConversations(queryParams).then(res => {
        this.data_message_send.message = ''

        this.shootRealTime()

      }).catch(() => {
        // error
      })

    },
    shootRealTime () {

      // shoot real time
      http.get(`chat/real-time/shoot/${this.user_id_select_to}`).then(res => {

        $('.chat-conversation-content').scrollTop($('.chat-conversation-content')[0].scrollHeight)

      }).catch(() => {})

    },
    dataRealTime () {
      const channel = this.$pusher.subscribe('refreshDataChat')
      channel.bind('App\\Events\\RefreshDataChat', (data) => {

        this.getUsersChat()

        if (!$('#chat-panel').hasClass('conversation-open')) return

        if (data.params.to === this.user_id_select_to || data.params.in === this.user_id_select_to) {

          // marca as mensagens como lida
          const queryParams = {
            params: {
              to: data.params.to,
              in: data.params.in
            }
          }

          http.get('chat/conversations/mark-read', queryParams).then(res => {

            const queryParams = {
              params: {
                in: this.user_id,
                to: this.user_id_select_to,
                read: false
              }
            }

            this.getConversations(queryParams).then(res => {}).catch(() => {})

          }).catch(() => {
            // error
          })

        }

      })

      // verifica os usuários online
      const channelCheckUsersOnline = this.$pusher.subscribe('checkUsersOnlineChat')
      channelCheckUsersOnline.bind('App\\Events\\CheckUsersOnlineChat', () => {
        this.getUsersChat()
      })

      // verifica se o usuário esta digitabdo ou não mensagem
      const typing = this.$pusher.subscribe('typing')
      typing.bind('App\\Events\\Typing', (data) => {

        const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'))

        if (data.params.to === dataUserLogged.id) {
          this.show_message_typing = data.params.typing
        }

      })
    },
    checkCreatingMessage () {

      let qt_words = 0

      const check = setInterval(() => {

        if (this.data_message_send.message.length > qt_words) {
          qt_words = this.data_message_send.message.length
        } else {
          clearInterval(check)
        }


      }, 5000)

    },
    debounce (func, threshold) {
      var timeout;

      return function () {
        var context = this, args = arguments;

        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(function () {
          func.apply(context, args);
          timeout = null;
        }, threshold);
      };
    },
    checkTyping (queryParams) {
      http.get('chat/real-time/typing', queryParams).then((res) => {
      }).catch(() => {})
    }
  },
  computed: {
    ...mapState('Chat', ['users_chat', 'messages'])
  },
  watch: {
    users_chat () {
      this.users = this.users_chat
    },
    messages () {

      this.messages_chat = this.messages

      setTimeout(() => {
        $('.chat-conversation-content').scrollTop($('.chat-conversation-content')[0].scrollHeight)
      })
    },
    'data_message_send.message' () {

      if (this.data_message_send.message.length === 1 || this.data_message_send.message.length === this.input_qt_check + 1) {
        const queryParams = {
          params: {
            to: this.user_id_select_to,
            typing: true
          }
        }
        this.checkTyping(queryParams)
      }

    }
  },
  mounted () {

    const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'))
    this.user_id = dataUserLogged.id

    this.dataRealTime()

    const self = this

    search.addEventListener('keyup', this.debounce(function (e) {
      self.show_message_typing = false

      const queryParams = {
        params: {
          to: self.user_id_select_to,
          typing: false
        }
      }

      self.checkTyping(queryParams)

      self.input_qt_check = this.value.length
    }, 600))

  }
}
</script>

<style>

  .break-line {
    width:200px;
    word-wrap: break-word;
  }
</style>