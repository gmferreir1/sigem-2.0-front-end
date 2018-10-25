<template>
  <div>
    <div id="modalReasonCancelReserve" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content" v-loading="load_data" element-loading-text="Carregando motivos, aguarde ...">

          <!-- modal header -->
          <modal-header title="Motivo Para Cancelamento da Reserva" @closeModal="closeModal">
            <i class="fa fa-check-circle" slot="icon_title"></i>
            <button class="btn btn-sm btn-danger" :disabled="!form.id_reason_cancel" @click="confirm">Salvar Dados</button>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">

            <div class="row">
              <div class="col-md-12">
                <label>Informe o Motivo <span class="required">*</span></label>
                <select class="form-control chosen input-sm" data-placeholder="Motivos Cancelamento" v-model="form.id_reason_cancel" id="reason_cancel">
                  <option value=""></option>
                  <option v-for="reason in reasons_cancel" :value="reason.id">{{wordUpper(reason.reason)}}</option>
                </select>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <label>Observações</label>
                <textarea class="form-control input-sm" v-model="form.reason_cancel_detail"></textarea>
              </div>
            </div>

          </div>

          <!-- modal footer -->
          <modal-footer>
            <field-required />
          </modal-footer>
          <!-- / modal footer -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalHeader from '@/components/ModalHeader'
import ModalFooter from '@/components/ModalFooter'
import {mapState, mapActions} from 'vuex'
import {wordUpper} from '@/util/stringHelpers'
import FieldRequired from '@/components/FieldRequired'

export default {
  props: {
    dataModal: {
      required: true,
      type: Object
    }
  },
  components: {
    ModalHeader,
    ModalFooter,
    FieldRequired
  },
  data () {
    return {
      load_data: false,
      survey_date: '',
      params_printer: {},
      form: {
        id_reason_cancel: '',
        reason_cancel_detail: ''
      }
    }
  },
  methods: {
    ...mapActions('Register', ['getReasonsCancel']),
    wordUpper,
    openModal() {
      $('#modalReasonCancelReserve').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    chosenSelect () {
       const self = this

      $('.chosen').chosen({
        width: '100%',
        height: '25px',
        no_results_text: "Oops, nada encontrado para: "
      })

      $('#reason_cancel').on('change', function(evt, params) {
        self.form.id_reason_cancel = params.selected
      })

    },
    confirm () {
      this.$bus.$emit('Register\Reserve:ConfirmCancelReserve', this.form)
      this.closeModal()
    },
    closeModal() {
      $('#modalReasonCancelReserve').modal('hide')
    }
  },
  computed: {
    ...mapState('Register', ['reasons_cancel'])
  },
  watch: {
    dataModal(data) {
      this.load_data = true

      this.openModal()
      this.chosenSelect()

      this.getReasonsCancel().then(res => {

        setTimeout(() => {
          $("#reason_cancel").val('').trigger("chosen:updated");
        }, 100)


        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })

    }
  }
}
</script>

<style scoped>

  label {
    font-weight: bold !important;
  }

</style>
