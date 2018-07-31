<template>

  <div>

    <div class="row">

      <!-- usuários registrados -->
      <router-link :to="{name: 'systemAdmin.User'}">
        <div class="col-md-3" v-loading="load_total_users" element-loading-text="Consultando dados, aguarde ...">
          <div class="widget bg-white">
            <div class="widget-icon bg-blue pull-left fa fa-users">
            </div>
            <div class="overflow-hidden">
              <span class="widget-title">{{total_users_registered}}</span>
              <span class="widget-subtitle">Usuários Registrados</span>
            </div>
          </div>
        </div>
      </router-link>
      <!-- / usuários registrados -->

    </div>

  </div>

</template>

<script>
  export default {
    data () {
      return {
        load_total_users: true,
        total_users_registered: 0
      }
    },
    methods: {
      getTotalUsersRegistered () {

        this.load_total_users = true

        http.get('user/query-extra-module/qtd-users-registered').then(res => {

          setTimeout(() => {
            this.load_total_users = false
            this.total_users_registered = res.data
          }, 600)

        }).catch(() => {
          this.load_total_users = false
        })
      }
    },
    mounted () {
      this.getTotalUsersRegistered()
    }
  }
</script>