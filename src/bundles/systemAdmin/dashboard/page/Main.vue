<template>

  <div>

    <div class="row">

      <!-- usuários registrados -->
      <router-link :to="{name: 'systemAdmin.User'}">
        <div class="col-md-3">
          <div class="widget bg-white">
            <div class="widget-icon bg-blue pull-left fa fa-users">
            </div>
            <div class="overflow-hidden">
              <span class="widget-title">8,372K</span>
              <span class="widget-subtitle">Usuários registrados</span>
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

  }
</script>