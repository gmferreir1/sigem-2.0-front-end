<template>

  <div>

    <div class="row">

      <div class="col-md-6" style="width: 430px">
        <contract-celebrated-charts />
      </div>

      <div class="col-md-6" style="width: 490px">
        <contract-celebrated-status />
      </div>


      <div class="col-md-6" style="width: 430px">
        <p class="hidden-lg">&nbsp;</p>
        <contract-inactivated />
      </div>
    </div>

  </div>

</template>

<script>
import ContractCelebratedCharts from '../components/charts/ContractCelebrated'
import ContractCelebratedStatus from '../components/charts/ContractCelebratedStatus'
import ContractInactivated from '../components/charts/ContractInactivated'
import {mapActions} from 'vuex'
export default {
  components: {
    ContractCelebratedCharts,
    ContractCelebratedStatus,
    ContractInactivated
  },
  methods: {
    ...mapActions('Chat', ['checkUsersOnline'])
  },
  mounted () {
    this.checkUsersOnline()
  }
}
</script>

<style>
  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }
</style>