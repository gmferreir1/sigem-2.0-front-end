import {mapState} from 'vuex'
export const notification = {
  methods: {
    requestDesktopNotificationPermission (){
      if(Notification && Notification.permission === 'default') {
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
    sendDesktopNotification (text) {

      // verifica se o id_responsible da notificação é o mesmo do usuário logado

      const dataUserLogged = localStorage.getItem('dataUserLogged')

      if (dataUserLogged) {

        if (JSON.parse(dataUserLogged).id != this.notification.id_responsible) {
          return
        }


        if(window.Notification && Notification.permission !== 'denied') {
          Notification.requestPermission(function(status) {
            var n = new Notification('Sistema de Gestão Master', {
              icon: require('@icons/notification.png'),
              body: this.notification.message
            });
          });
        }

      }


    }
  },
  computed: {
    ...mapState('Notification', ['notification'])
  },
  watch: {
    notification () {
      this.requestDesktopNotificationPermission()
      this.desktopNotification()
    }
  }
}