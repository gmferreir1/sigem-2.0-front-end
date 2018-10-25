import {mapState} from 'vuex'
export const notification = {
  methods: {
    requestDesktopNotificationPermission (){

      if(Notification && Notification.permission === 'denied') {

        Notification.requestPermission( (permission) => {
          if(!('permission' in Notification)) {
            Notification.permission = permission
          }
        })

      }
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


        /*

        if(window.Notification && Notification.permission !== 'denied') {
          Notification.requestPermission(function(status) {
            var n = new Notification('Sistema de Gestão Master', {
              icon: require('@icons/notification.png'),
              body: this.notification.message
            });
          });
        }

        */

        Push.create('Sistema de Gestão Master', {
          body: this.notification.message,
          icon: require('@icons/notification.png'),
          timeout: 4000,
          onClick: function () {
            window.focus()
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
      // this.requestDesktopNotificationPermission()
      this.sendDesktopNotification()
    }
  }
}