<template>

  <div>

    <div class="row" v-loading="load_data" element-loading-text="Processando sua requisição, aguarde...">

      <div class="col-md-8" :class="{error: validation.hasError('form.text'), 'has-error': validation.hasError('form.text')}">
        <label>{{form.type === 'destination' ? 'Destino' : 'Motivo'}} <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.text" @keypress.enter="submitForm">
        <div class="message">{{ validation.firstError('form.text') }}</div>
      </div>

      <div class="col-md-2">
        <label>Tipo <span class="required">*</span></label>
        <select class="form-control input-sm" v-model="form.type">
          <option value="destination">Destino</option>
          <option value="reason">Motivo</option>
        </select>
      </div>

      <div class="col-md-2" style="margin-top: 20px">
        <button class="button btn btn-sm btn-danger" @click="submitForm">
          Salvar Dados
        </button>
      </div>

    </div>

  </div>

</template>

<script>
import {mapActions} from 'vuex'
import {wordUpper} from '@/util/stringHelpers'

export default {
  props: {
    modalOpened: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      load_data: false,
      form: {
        type: 'reason',
        text: ''
      }
    }
  },
  validators: {
    'form.text': function (value) {
      return Validator.value(value).required('Obrigatório')
    }
  },
  methods: {
    ...mapActions('Termination', ['saveDestinationOrReason', 'updateDestinationOrReason', 'getDestinationAndReason']),
    wordUpper,
    submitForm () {
      const self = this
      this.$validate()
      .then(function (success) {
        if (success) {
          if (!self.form.id) {
            self.save()
          } else {
            self.update()
          }
        }
      })
    },
    save () {
      this.load_data = true

      this.saveDestinationOrReason(this.form).then(res => {

        _notification.success()

        this.getDestinationAndReason()

        this.cleanForm()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    update () {

      this.load_data = true

      this.updateDestinationOrReason(this.form).then(res => {

        _notification.success()

        this.getDestinationAndReason()

        this.cleanForm()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    cleanForm () {
      this.form = {
        type: 'reason',
        text: ''
      }
      this.validation.reset()
    }
  },
  watch: {
    modalOpened () {
      this.cleanForm()
    }
  },
  mounted () {
    this.$bus.$on('Termination\DestinationOrReason:Edit', (data) => {
      const dataForEdit = Object.assign({}, data)

      this.form.id = dataForEdit.id
      this.form.text = this.wordUpper(dataForEdit.text)
      this.form.type = dataForEdit.type
    })
  }
}
</script>