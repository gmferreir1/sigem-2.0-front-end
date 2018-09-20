<template>

  <div>

    <div class="panel" v-loading="load_data" element-loading-text="Processando sua solicitação, aguarde ...">

      <div class="panel-body">

        <div class="row">
          <div class="col-md-12">
            <editor :setText="form.text" @textEditor="text => form.text = text"/>
          </div>
        </div>


        <div class="row" style="margin-top: 10px">
          <div class="col-md-12">
            <button class="button btn btn-sm btn-danger" @click="update" :disabled="!form.text">Salvar Dados</button>
          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import Editor from '@/components/Editor'
import {mapState} from 'vuex'
export default {
  components: {
    Editor
  },
  data () {
    return {
      load_data: false,
      form: {
        id: null,
        name: '',
        text: ''
      }
    }
  },
  methods: {
    update () {
      this.load_data = true

      http.put(`control-letter/${this.form.id}`, this.form).then(res => {
        setTimeout(() => {
          this.load_data = false
        }, 600)
      }).catch(() => {
        this.load_data = false
      })
    },
    cleanForm () {
      this.form = {
        id: null,
        name: '',
        text: ''
      }
    }
  },
  computed: {
    ...mapState('ControlLetter', ['letter_current_edit'])
  },
  watch: {
    letter_current_edit () {
      this.cleanForm()

      this.form = this.letter_current_edit
    }
  }
}
</script>