<template>

  <div class="panel" v-loading="load_data" element-loading-text="Carregando dados, aguarde ...">

    <div class="panel-heading">
      Total de Cartas Registradas no Sistema (<span style="font-weight: bold">{{letters_registered.length}}</span>)
    </div>

    <div class="panel-body">

      <div class="row">

        <div class="col-md-4">
          <select class="form-control input-sm" v-model="form.select_letter">
            <option value="">Informe</option>
            <option v-for="list in letters_registered" :value="list.id">{{wordUpper(list.name)}}</option>
          </select>
        </div>

        <div class="col-md-2">
          <button class="button btn btn-sm btn-default" @click="search" :disabled="!form.select_letter">Pesquisar</button>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import {mapActions, mapState} from 'vuex'
import {wordUpper} from '@/util/stringHelpers'

export default {
  data () {
    return {
      load_data: false,
      form: {
        select_letter: ''
      }
    }
  },
  methods: {
    ...mapActions('ControlLetter', ['getLettersRegistered', 'getLetter']),
    wordUpper,
    search () {
      this.load_data = true
      this.getLetter(this.form.select_letter).then(res => {
        setTimeout(() => {
          this.load_data = false
        }, 600)
      }).catch(() => {
        this.load_data = false
      })
    }
  },
  computed: {
    ...mapState('ControlLetter', ['letters_registered'])
  },
  mounted () {
    this.load_data = true
    this.getLettersRegistered().then(res => {
      setTimeout(() => {
        this.load_data = false
      }, 600)
    }).catch(() => {
      this.load_data = false
    })
  }
}
</script>