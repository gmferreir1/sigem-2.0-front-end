<template>

  <div>

    <div class="row">
      <div class="col-md-8">
        <label>Motivo <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.reason" @keypress.enter="submitForm">
        <div class="message" :class="{error: form.reason.length > 50}">{{form.reason.length}} / 50 (max)</div>
      </div>
      <div class="col-md-2" style="margin-top: 20px">
        <button class="button btn btn-sm btn-default" title="Novo Motivo" @click="cleanForm" :disabled="!form.id">
          <i class="fa fa-plus-circle"></i>
        </button>
      </div>
    </div>

  </div>

</template>

<script>
import {mapActions} from 'vuex'
import {wordUpper} from "../../../../util/stringHelpers";
export default {
  data () {
    return {
      form: {
        id: null,
        reason: ''
      }
    }
  },
  methods: {
    ...mapActions('Register', ['getReasonsCancel']),
    submitForm () {

      if (!this.form.reason) return

      if (!this.form.id) {
        this.save()
        return
      }

      this.update()
    },
    save () {
      http.post('register/reserve-contract/reason-cancel', this.form).then(res => {
        _notification.success()
        this.getReasonsCancel()
        this.cleanForm()
        setTimeout(() => this.$emit('hideLoading'), 600)

      }).catch(() => {
        this.$emit('hideLoading')
      })

    },
    update () {
      http.put(`register/reserve-contract/reason-cancel/${this.form.id}}`, this.form).then(res => {
        _notification.success()
        this.getReasonsCancel()
        this.cleanForm()
        setTimeout(() => this.$emit('hideLoading'), 600)

      }).catch(() => {
        this.$emit('hideLoading')
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
      if (this.form.reason.length > 50) {
        this.$emit('disabledSubmitButton', true)
      } else  if (this.form.reason.length > 1 && this.form.reason.length <= 50) {
        this.$emit('disabledSubmitButton', false)
      }
    }
  },
  mounted () {
    this.$bus.$on('Register\ReasonCancel:SubmitForm', () => {
      this.submitForm()
    })

    this.$bus.$on('Register\ReasonCancel:Edit', (dataEdit) => {
      const dataToEdit = Object.assign({}, dataEdit)

      this.form.id = dataToEdit.id
      this.form.reason = wordUpper(dataToEdit.reason)
    })
  }
}
</script>

<style scoped>
  .message {
    font-weight: bold !important;
    font-size: 11px;
  }
</style>