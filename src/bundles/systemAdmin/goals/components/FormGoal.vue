<template>

  <div class="row">
    <div class="col-md-12">
      <div class="panel" v-loading="load_data" element-loading-text="Processando sua solicitação, aguarde ...">
        <div class="panel-heading border">
          Definição de Metas no Sistema
        </div>
        <div class="panel-body">

          <div class="row">

            <div class="col-md-2" :class="{error: validation.hasError('form.name')}">
              <label>Nome <span class="required">*</span></label>
              <select class="form-control input-sm" v-model="form.name">
                <option value="">Informe</option>
                <option value="cc">Contratos Celebrados</option>
                <option value="ci">Contratos Inativados</option>
              </select>
              <div class="message">{{ validation.firstError('form.name') }}</div>
            </div>

            <div class="col-md-2" :class="{error: validation.hasError('form.type')}">
              <label>Tipo de Meta <span class="required">*</span></label>
              <select class="form-control input-sm" v-model="form.type">
                <option value="">Informe</option>
                <option value="percent">Percentual</option>
                <option value="value">Valor</option>
              </select>
              <div class="message">{{ validation.firstError('form.type') }}</div>
            </div>

            <!-- somente valor -->
            <div class="col-md-2 div-140" v-if="form.type === 'value'" :class="{error: validation.hasError('form.value')}">
              <label>Valor <span class="required">*</span></label>
              <money class="form-control input-sm" v-model="form.value"/>
              <div class="message">{{ validation.firstError('form.value') }}</div>
            </div>
            <!-- / somente valor -->

            <!-- somente percentual -->
            <div class="col-md-2 div-140" v-if="form.type === 'percent'" :class="{error: validation.hasError('form.percent')}">
              <label>Percentual <span class="required">*</span></label>
              <input type="text" class="form-control input-sm" v-model="form.percent" placeholder="0 - 100">
              <div class="message">{{ validation.firstError('form.percent') }}</div>
            </div>

            <div class="col-md-2" v-if="form.type === 'percent'" :class="{error: validation.hasError('form.sob_goal')}">
              <label>Sob a Meta <span class="required">*</span></label>
              <select class="form-control input-sm" v-model="form.sob_goal">
                <option value="">Informe</option>
                <option value="cc" v-if="form.name != 'cc'">Contratos Celebrados</option>
                <option value="ci" v-if="form.name != 'ci'">Contratos Inativados</option>
              </select>
              <div class="message">{{ validation.firstError('form.sob_goal') }}</div>
            </div>

            <!-- / somente percentual -->

          </div>

          <div class="row">
            <div class="col-md-4" style="margin-top: 10px">
              <button class="button btn btn-sm btn-danger" @click="submitForm">Salvar Dados</button>
              <button class="button btn btn-sm btn-default" @click="cleanForm" :disabled="!form.id">Limpar Dados</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>

</template>

<script>

export default {
  data () {
    return {
      load_data: false,
      form: {
        type: '',
        name: '',
        value: 0,
        percent: '',
        sob_goal: ''
      }
    }
  },
  validators: {
    'form.type': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.name': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.value': function (value) {
      if (this.form.type === 'value') {
        return Validator.custom(function () {
          var number = parseInt(value)
          if (number === 0) {
            return 'Obrigatório'
          }
        })
      }
    },
    'form.percent': function (value) {
      if (this.form.type === 'percent') {

        return Validator.custom(function () {
          if (!value) {
            return 'Obrigatório'
          }

          if (isNaN(value)) {
            return 'Inválido'
          }

          const number = parseInt(value)

          if (number <= 0 || number > 100) {
            return 'Inválido'
          }

        })

      }
    },
    'form.sob_goal': function (value) {
      if (this.form.type === 'percent') {
        return Validator.value(value).required('Obrigatório')
      }
    }
  },
  methods: {
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

      if (this.form.type === 'percentual') {
        this.form.value = 0
      }

      http.post('system-goal', this.form).then(res => {

        this.$bus.$emit('SystemAdmin\Goals:RefreshTableListGoals')

        setTimeout(() => {
          setTimeout(() => {
            this.cleanForm()
            this.load_data = false
          }, 600)
        })

      }).catch(() => {
        this.load_data = false
      })
    },
    update () {
      this.load_data = true

      if (this.form.type === 'percentual') {
        this.form.value = 0
      }

      http.put(`system-goal/${this.form.id}`, this.form).then(res => {

        this.$bus.$emit('SystemAdmin\Goals:RefreshTableListGoals')

        setTimeout(() => {
          setTimeout(() => {
            this.cleanForm()
            this.load_data = false
          }, 600)
        })

      }).catch(() => {
        this.load_data = false
      })
    },
    cleanForm () {
      this.form = {
        type: '',
        name: '',
        value: 0,
        percent: '',
        sob_goal: ''
      }

      this.validation.reset()
    }
  },
  watch: {
    'form.type' () {
      if (this.form.type === 'percent') {
        this.form.sob_goal = ''
        this.validation.reset()
      }
    }
  },
  mounted () {
    this.$bus.$on('SystemAdmin\Goals:EditGoal', (dataEdit) => {
      this.form = dataEdit
    })
  }
}
</script>