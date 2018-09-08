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

      <!-- logo
      <div class="brand-logo">
        <img src="images/logo-dark.png" height="15" alt="">
      </div>
      <!-- /logo -->

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
      <li>
        <a href="javascript:;" data-toggle="quick-launch-panel">
          <i class="fa fa-circle-thin"></i>
        </a>
      </li>

      <li>
        <a href="javascript:;" data-toggle="dropdown">
          <i class="fa fa-bell-o"></i>
          <div class="status bg-danger border-danger animated bounce"></div>
        </a>
        <ul class="dropdown-menu notifications">
          <li class="notifications-header">
            <p class="text-muted small">You have 3 new messages</p>
          </li>
          <li>
            <ul class="notifications-list">
              <li>
                <a href="javascript:;">
                      <span class="pull-left mt2 mr15">
                                                <img src="images/avatar.jpg" class="avatar avatar-xs img-circle" alt="">
                                            </span>
                  <div class="overflow-hidden">
                    <span>Sean launched a new application</span>
                    <span class="time">2 seconds ago</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                  <div class="pull-left mt2 mr15">
                    <div class="circle-icon bg-danger">
                      <i class="fa fa-chain-broken"></i>
                    </div>
                  </div>
                  <div class="overflow-hidden">
                    <span>Removed chrome from app list</span>
                    <span class="time">4 Hours ago</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:;">
                      <span class="pull-left mt2 mr15">
                                                <img src="images/face3.jpg" class="avatar avatar-xs img-circle" alt="">
                                            </span>
                  <div class="overflow-hidden">
                    <span class="text-muted">Jack Hunt has registered</span>
                    <span class="time">9 hours ago</span>
                  </div>
                </a>
              </li>
            </ul>
          </li>
          <li class="notifications-footer">
            <a href="javascript:;">See all messages</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="javascript:;" data-toggle="dropdown">
          <img src="../../assets/images/avatar.jpg" class="header-avatar img-circle ml10" alt="user" title="user">
          <span class="pull-left">{{wordUpper(userNameLogged)}}</span>
        </a>
        <ul class="dropdown-menu">
          <li>
            <router-link :to="{name: 'systemAdmin.Dashboard'}">
              Admin Sistema
            </router-link>
          </li>
          <li>
            <a href="javascript:;">Upgrade</a>
          </li>
          <li>
            <a href="javascript:;">
              <span class="label bg-danger pull-right">34</span>
              <span>Notifications</span>
            </a>
          </li>
          <li>
            <a href="javascript:;">Help</a>
          </li>
          <li>
            <a href="#" @click.prevent="logoutSystem">Logout</a>
          </li>
        </ul>

      </li>

      <li>
        <a href="javascript:;" class="hamburger-icon v2" data-toggle="layout-chat-open">
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

export default {
  methods: {
    wordUpper,
    logoutSystem () {
      localStorage.clear()
      window.location.href = '/'
    }
  },
  computed: {
    userNameLogged () {
      const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'))
      return dataUserLogged.name
    }
  }
}
</script>

<style>

  .main-panel > .header {
    background-color: #E98531;
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