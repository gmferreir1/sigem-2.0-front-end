<template>
  <div id="app">


    <!-- somente login -->
    <div class="overflow-hidden" style="margin-top: 10%" v-if="!show_template_parts">
      <router-view />
    </div>
    <!-- / somente login -->


    <!-- quick launch panel -->
    <quick-lunch-panel v-if="show_template_parts"/>
    <!-- /quick launch panel -->

    <div class="app layout-fixed-header" v-if="show_template_parts">

      <!-- sidebar panel -->
      <div class="sidebar-panel">

        <div class="brand">

          <!-- logo -->
          <div class="brand-logo">

            <router-link :to="{name: 'dashboard'}">
              <img src="../src/assets/images/master_white.png" height="25" alt="">
            </router-link>

          </div>
          <!-- /logo -->

          <!-- toggle small sidebar menu -->
          <a href="javascript:;" class="toggle-sidebar hidden-xs hamburger-icon v3" data-toggle="layout-small-menu">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </a>
          <!-- /toggle small sidebar menu -->

        </div>

        <!-- main navigation -->

        <nav-bar/>

        <!-- /main navigation -->

      </div>
      <!-- /sidebar panel -->

      <!-- content panel -->
      <div class="main-panel">

        <!-- top header -->
        <top-header v-if="show_template_parts"/>
        <!-- /top header -->

        <!-- main area -->
        <div class="main-content min-height">

          <router-view />

        </div>
        <!-- /main area -->
      </div>
      <!-- /content panel -->

      <!-- bottom footer -->
      <footer-page v-if="show_template_parts"/>
      <!-- /bottom footer -->

      <!-- right menu -->
      <right-menu v-if="show_template_parts"/>
      <!-- /right menu -->
    </div>


    <!-- modal Sicadi data -->
    <modal-sicadi-show-data />
    <!-- / modal Sicadi data -->


  </div>
</template>

<script>

import QuickLunchPanel from '@bundles/templateParts/QuickLunchPanel'
import TopHeader from '@bundles/templateParts/TopHeader'
import NavBar from '@bundles/templateParts/NavBar'
import FooterPage from '@bundles/templateParts/FooterPage'
import RightMenu from '@bundles/templateParts/RightMenu'
import ModalSicadiShowData from '@bundles/sicadi/components/ModalSicadiShowData'
import {notification} from '@bundles/notification/mixins/notification'
import {mapMutations} from 'vuex'

export default {
  mixins: [notification],
  components: {
    QuickLunchPanel,
    TopHeader,
    NavBar,
    FooterPage,
    RightMenu,
    ModalSicadiShowData
  },
  name: 'App',
  data () {
    return {
      show_template_parts: false
    }
  },
  methods: {
    ...mapMutations('Notification', ['SET_NOTIFICATION']),
  },
  beforeMount() {
    this.show_template_parts = false
    // verifica qual rota esta
    const route = this.$route


    /*
     * Recuperação se senha
     */
    if (route.name === 'changePassword' && route.query.token) {
      return
    }


    if (route.name != 'auth') {

      const dataUserLogged = localStorage.getItem('dataUserLogged') ? JSON.parse(localStorage.getItem('dataUserLogged')) : null

      if (!dataUserLogged || !dataUserLogged.access_token) {
        window.location.href = '/#/auth'

        return
      }

      this.show_template_parts = true
    }
  },
  mounted () {
    const channel = this.$pusher.subscribe('systemAction')

    channel.bind('App\\Events\\SystemAction', () => {

    })
  }
}
</script>

<style>
  @import './assets/vendor/bootstrap/dist/css/bootstrap.css';
  @import './assets/vendor/perfect-scrollbar/css/perfect-scrollbar.css';
  @import './assets/styles/roboto.css';
  @import '../node_modules/font-awesome/css/font-awesome.min.css';
  @import './assets/styles/panel.css';
  @import './assets/styles/feather.css';
  @import './assets/styles/animate.css';
  @import './assets/styles/urban.css';
  @import './assets/styles/urban.skins.css';
  @import './assets/styles/my-style.css';
  @import './assets/styles/chosen-custom.css';

  .min-height {
    min-height: calc(100vh - 57px) !important
  }

</style>
