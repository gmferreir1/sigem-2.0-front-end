<template>
  <div>
    <div id="modalFormCaptured" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Formulário Captação de Imóvel" @closeModal="closeModal">
            <i class="fa fa-home" slot="icon_title"></i>

            <!-- buttons -->
            <button class="button btn btn-sm btn-danger" @click="submitForm">Salvar Dados</button>
            <!-- / buttons -->

          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body" style="padding-top: 0px !important;">

            <form-captured :dataModalOpened="data_modal_opened" />

          </div>

          <!-- modal footer -->
          <modal-footer>
            <div style="float: left">
              <span style="font-weight: bold">Atenção: </span>
              <span class="required">*</span>
              <span style="font-weight: bold">Dados obrigatórios</span>
            </div>
          </modal-footer>
          <!-- / modal footer -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import ModalHeader from '@/components/ModalHeader'
import ModalFooter from '@/components/ModalFooter'
import FormCaptured from '../components/FormCaptured'

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
    FormCaptured
  },
  data () {
    return {
      data_modal_opened: {}
    }
  },
  methods: {
    ...mapActions('ImmobileCaptured', ['getReportImmobileCaptured']),
    ...mapMutations('ImmobileCaptured', ['CLEAR_EDIT_CURRENT_REPORT_IMMOBILE_CAPTURED']),
    openModal() {
      $('#modalFormCaptured').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    submitForm () {
      this.$bus.$emit('ImmobileCaptured\Report\FormCaptured:SubmitForm')
    },
    closeModal() {
      $('#modalFormCaptured').modal('hide')
    }
  },
  computed: {
    ...mapState('ImmobileCaptured', ['edit_current_report_immobile_captured'])
  },
  watch: {
    dataModal() {
      // new
      if (this.dataModal.type_action === 'new_captured') {
        this.CLEAR_EDIT_CURRENT_REPORT_IMMOBILE_CAPTURED()
        this.data_modal_opened = this.dataModal
        this.openModal()
      }

      // edit
      if (this.dataModal.type_action === 'edit_captured') {
        this.$bus.$emit('ImmobileCaptured\Report\FormCaptured:GetLoading', {load_data: true})
        this.openModal()
        this.getReportImmobileCaptured(this.dataModal.id)
      }
    }
  }
}
</script>

<style scoped>


</style>