<template>

  <div>

    <select class="form-control chosen input-sm" data-placeholder="Usuários" :id="id_component" v-model="user_selected">
      <option value=""></option>
      <option v-for="user in users" :value="user.id">{{wordUpper(`${user.name} ${user.last_name}`)}}</option>
    </select>

  </div>

</template>

<script>
import {mapActions, mapState} from 'vuex'
import {wordUpper} from '@/util/stringHelpers'

export default {
  props: {
    cleanComponent: {
      required: false,
      type: Boolean
    },
    setUser: {
      required: false
    },
    id_component: {
      required: false,
      default: 'users_select'
    }
  },
  data () {
    return {
      user_selected: null
    }
  },
  methods: {
    wordUpper,
    ...mapActions('Auth', ['getAllUsers']),
    chosenSelect () {
      const self = this

      $('.chosen').chosen({
        width: '100%',
        height: '25px',
        no_results_text: "Oops, nada encontrado para: "
      })

      $('#' + this.id_component).on('change', function(evt, params) {
        self.$emit('userSelected', (params ? params.selected : ''))
      })

    }
  },
  computed: {
    ...mapState('Auth', ['users'])
  },
  watch: {
    users () {
      setTimeout(() => {
        $(".chosen").trigger("chosen:updated")
      }, 200)
    },
    cleanComponent () {

      this.user_selected = ''

      setTimeout(() => {
        $(".chosen").val('').trigger("chosen:updated");
      }, 100)
    },
    setUser () {
      this.user_selected = this.setUser
      setTimeout(() => {
        $(".chosen").trigger("chosen:updated")
      }, 100)
    }
  },
  mounted () {
    this.getAllUsers()
    this.chosenSelect()
  }
}
</script>