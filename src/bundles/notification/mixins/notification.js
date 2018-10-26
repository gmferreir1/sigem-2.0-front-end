import {mapState} from 'vuex'
export const notification = {
  methods: {
    requestDesktopNotificationPermission (){
      Push.Permission.request()
    },
    desktopNotification () {
      if (Notification.permission === 'granted') {
        var text = 'Você tem uma nova'
        this.sendDesktopNotification(text);
      }
    },
    sendDesktopNotification () {

      // verifica se o id_responsible da notificação é o mesmo do usuário logado

      const dataUserLogged = localStorage.getItem('dataUserLogged')

      if (dataUserLogged) {

        if (JSON.parse(dataUserLogged).id != this.notification.id_responsible) {
          return
        }

        Push.create('Sistema de Gestão Master', {
          body: this.notification.message,
          icon: require('@icons/notification.png'),
          icon: require('@icons/alert.png'),
          timeout: 9999999,
          onClick: function () {
            this.close()
          }
        })

      }


    }
  },
  computed: {
    ...mapState('Notification', ['notification'])
  },
  watch: {
    notification () {
      this.sendDesktopNotification()
    }
  }
}