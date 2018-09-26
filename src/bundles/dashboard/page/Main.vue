<template>

  <div>

    <div class="row">
      <div class="col-md-4" style="margin-right: 50px">
        <contract-celebrated-charts />
      </div>

      <div class="col-md-6">
        <contract-celebrated-status />
      </div>

    </div>


  </div>

</template>

<script>
import ContractCelebratedCharts from '../components/charts/ContractCelebrated'
import ContractCelebratedStatus from '../components/charts/ContractCelebratedStatus'
export default {
  components: {
    ContractCelebratedCharts,
    ContractCelebratedStatus
  }
}
</script>