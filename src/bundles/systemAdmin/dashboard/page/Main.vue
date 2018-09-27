<template>

  <div>

    <div class="row">

      <!-- usuários registrados -->
      <router-link :to="{name: 'systemAdmin.User'}">
        <div class="col-md-3" v-loading="load_total_users" element-loading-text="Consultando dados, aguarde ...">
          <div class="widget bg-white">
            <div class="widget-icon bg-orange pull-left fa fa-users"></div>
            <div class="overflow-hidden">
              <span class="widget-title">{{total_users_registered}}</span>
              <span class="widget-subtitle">Usuários Registrados</span>
            </div>
            <br />
          </div>
        </div>
      </router-link>
      <!-- / usuários registrados -->

      <!-- usuários registrados -->
      <router-link :to="{name: 'systemAdmin.UpdateDatabase'}">
        <div class="col-md-3" v-loading="load_total_tables_updated" element-loading-text="Consultando dados, aguarde ...">
          <div class="widget bg-white">
            <div class="widget-icon bg-orange pull-left fa fa-database"></div>
            <div class="overflow-hidden">
              <span class="widget-title">Atualização BD</span>
              <span class="widget-subtitle">
                {{!date_last_update_table ? 'nenhuma atualização' : dateFormat(date_last_update_table, 'DD/MM/YYYY HH:mm:ss')}}
              </span>
            </div>
            <br />
          </div>
        </div>
      </router-link>
      <!-- / usuários registrados -->

      <!-- controle de cartas -->
      <router-link :to="{name: 'systemAdmin.ControlLetter'}">
        <div class="col-md-3" v-loading="load_total_letters" element-loading-text="Consultando dados, aguarde ...">
          <div class="widget bg-white">
            <div class="widget-icon bg-orange pull-left fa fa-file"></div>
            <div class="overflow-hidden">
              <span class="widget-title">{{total_letters_registered}}</span>
              <span class="widget-subtitle">
                Cartas e Documentos
              </span>
            </div>
            <br />
          </div>
        </div>
      </router-link>
      <!-- / usuários registrados -->

      <!-- metas do sistema -->
      <router-link :to="{name: 'systemAdmin.Goals'}">
        <div class="col-md-3">
          <div class="widget bg-white">
            <div class="widget-icon bg-orange pull-left fa fa-bar-chart-o"></div>
            <div class="overflow-hidden">
              <span class="widget-title">Metas</span>
              <span class="widget-subtitle">
                Metas do Sistema, Gráficos, etc ...
              </span>
            </div>
            <br />
          </div>
        </div>
      </router-link>
      <!-- / metas do sistema -->

    </div>

  </div>

</template>

<script>
import {dateFormat} from '@/util/dateTime'

export default {
  data () {
    return {
      load_total_users: true,
      load_total_tables_updated: true,
      load_total_letters: true,
      total_users_registered: 0,
      total_letters_registered: 0,
      date_last_update_table: ''
    }
  },
  methods: {
    dateFormat,
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
    },
    getTotalTablesUpdate () {
      http.get('manager-action/show-tables-updated/total-tables-updated').then(res => {

        setTimeout(() => {
          this.load_total_tables_updated = false
          this.date_last_update_table = res.data
        }, 1000)

      }).catch(() => {
        this.load_total_tables_updated = false
      })
    },
    getTotalLetters () {
      http.get('control-letter/query-total-letters-registered').then(res => {

        this.total_letters_registered = res.data

        setTimeout(() => {
          this.load_total_letters = false
        }, 600)

      }).catch(() => {
        this.load_total_letters = false
      })
    }
  },
  mounted () {
    this.getTotalUsersRegistered()
    this.getTotalTablesUpdate()
    this.getTotalLetters()
  }
}
</script>