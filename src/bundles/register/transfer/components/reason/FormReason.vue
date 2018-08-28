<template>

  <div>

    <div class="row" v-loading="load_data" :element-loading-text="message_load">

      <div class="col-md-10">
        <label>Motivo</label>
        <input type="text" class="form-control input-sm" v-model="form.reason" @keypress.enter="submitForm">
        <div class="message" :class="{error: form.reason.length > 100}">{{form.reason.length}} / 100 (max)</div>
      </div>

      <div class="col-md-2" style="margin-top: 20px">
        <button class="button btn btn-sm btn-default" title="Novo Score" @click="cleanForm" :disabled="!form.id && !form.reason">
          <i class="fa fa-plus-circle"></i>
        </button>
      </div>

    </div>

  </div>

</template>

<script>
import {mapActions} from 'vuex'
import {wordUpper} from "../../../../../util/stringHelpers";
export default {
  data () {
    return {
      message_load: 'Processando sua solicitação, aguarde ...',
      load_data: false,
      form: {
        id: null,
        reason: ''
      }
    }
  },
  methods: {
    ...mapActions('Register', ['getReasonsTransfer']),
    submitForm () {
      if (!this.form.id) {
        this.save()
      } else {
        this.update()
      }
    },
    save () {
      if (!this.form.reason || this.form.reason.length > 100) return
      this.load_data = true
      http.post('register/transfer/reason', this.form).then(res => {
        this.cleanForm()
        this.getReasonsTransfer()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    update () {
      if (!this.form.reason && !this.form.id || this.form.reason.length > 100 & !this.form.id) return
      this.load_data = true
      http.put(`register/transfer/reason/${this.form.id}`, this.form).then(res => {
        this.cleanForm()
        this.getReasonsTransfer()

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
        reason: ''
      }
    }
  },
  watch: {
    'form.reason' () {
      if (!this.form.reason || this.form.reason.length > 100) {
        this.$emit('disabledSubmitButton', true)
      } else {
        this.$emit('disabledSubmitButton', false)
      }
    }
  },
  mounted () {
    this.$bus.$on('Register\Transfer\Reason:SubmitForm', () => {
      this.submitForm()
    })

    this.$bus.$on('Register\Transfer\Reason:Edit', (data) => {
      this.form = {
        id: data.id,
        reason: wordUpper(data.reason)
      }
    })
  }
}
</script>