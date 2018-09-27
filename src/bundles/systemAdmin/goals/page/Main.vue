<template>

  <div>
    <form-goal />

    <table-list-goals />
  </div>

</template>

<script>
import FormGoal from '../components/FormGoal'
import TableListGoals from '../components/TableListGoals'
export default {
  components: {
    FormGoal,
    TableListGoals
  }
}
</script>