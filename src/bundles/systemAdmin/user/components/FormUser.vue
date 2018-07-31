<template>

  <div class="panel mb25" v-loading="load_data" element-loading-text="Processando sua solicitação, aguarde">
    <div class="panel-heading border">
      Formulário de Usuário
    </div>
    <div class="panel-body">

      <!-- form -->
      <form @submit.prevent="submitForm">

        <div class="row">

          <div class="col-md-5" :class="{error: validation.hasError('form.name'), 'has-error': validation.hasError('form.name')}">
            <label>Nome <span class="required">*</span></label>
            <input type="text" class="form-control input-sm" v-model="form.name">
            <div class="message">{{ validation.firstError('form.name') }}</div>
          </div>

          <div class="col-md-3" :class="{error: validation.hasError('form.last_name'), 'has-error': validation.hasError('form.last_name')}" >
            <label>Sobrenome <span class="required">*</span></label>
            <input type="text" class="form-control input-sm" v-model="form.last_name">
            <div class="message">{{ validation.firstError('form.last_name') }}</div>
          </div>

          <div class="col-md-2" :class="{error: validation.hasError('form.type_profile'), 'has-error': validation.hasError('form.type_profile')}">
            <label>Perfil <span class="required">*</span></label>
            <select value="" class="form-control input-sm" v-model="form.type_profile">
              <option value="">Admin</option>
              <option value="">Normal</option>
            </select>
            <div class="message">{{ validation.firstError('form.type_profile') }}</div>
          </div>

          <div class="col-md-2" :class="{error: validation.hasError('form.status'), 'has-error': validation.hasError('form.status')}">
            <label>Status <span class="required">*</span></label>
            <select value="" class="form-control input-sm" v-model="form.status">
              <option value="">Ativo</option>
              <option value="">Inativo</option>
            </select>
            <div class="message">{{ validation.firstError('form.status') }}</div>
          </div>

        </div>

        <div class="row" style="margin-top: 10px">

          <div class="col-md-3" :class="{error: validation.hasError('form.email'), 'has-error': validation.hasError('form.email')}">
            <label>Email <span class="required">*</span></label>
            <input type="text" class="form-control input-sm" v-model="form.email">
            <div class="message">{{ validation.firstError('form.email') }}</div>
          </div>

          <div class="col-md-3 col-lg-2" :class="{error: validation.hasError('form.password'), 'has-error': validation.hasError('form.password')}">
            <label>Senha <span class="required">*</span></label>
            <input type="password" class="form-control input-sm" v-model="form.password">
            <div class="message">{{ validation.firstError('form.password') }}</div>
          </div>

          <div class="col-md-3 col-lg-2" :class="{error: validation.hasError('form.password_confirmation'), 'has-error': validation.hasError('form.password_confirmation')}">
            <label>Repita a Senha <span class="required">*</span></label>
            <input type="password" class="form-control input-sm" v-model="form.password_confirmation">
            <div class="message">{{ validation.firstError('form.password_confirmation') }}</div>
          </div>

        </div>

        <div class="row" style="margin-top: 10px">

          <div class="col-md-2">
            <button class="button btn btn-danger btn-sm" type="submit">Salvar Dados</button>
          </div>

        </div>

        <div class="row">
          <div class="col-md-5">
            <span class="required">*</span>
            <span>Campos Obrigatórios</span>
          </div>
        </div>

      </form>
      <!-- / form -->

    </div>

  </div>

</template>

<script>
export default {
  data () {
    return {
      load_data: false,
      form: {
        name: '',
        last_name: '',
        type_profile: '',
        status: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  validators: {
    'form.name': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.last_name': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.email': function (value) {
      return Validator.value(value).required('Obrigatório').email('Email inválido')
    },
    'form.type_profile': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.status': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.password': function (value) {
      return Validator.value(value).required('Obrigatório').minLength(6, 'Minímo 6 caracteres')
    },
    'form.password_confirmation, form.password': function (repeat, password) {
      return Validator.value(repeat).required('Obrigatório').minLength(6, 'Minímo 6 caracteres').match(password, 'Senhas não conferem')
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
    },
    update () {

    }
  }
}
</script>