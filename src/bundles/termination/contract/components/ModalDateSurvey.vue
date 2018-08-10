<template>
  <div>
    <div id="modalDateSurvey" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Dados Extras Para Impressão" @closeModal="closeModal">
            <i class="fa fa-print" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">

            <div class="row">

              <div class="col-md-4">
                <label>Data da Vistoria</label>
                <date-picker class="form-control input-sm" v-model="survey_date" placeholder="dd/mm/aaaa" />
              </div>

              <div class="col-md-3" style="margin-top: 20px">
                <button class="button btn btn-default btn-sm" @click="generatePrinter" :disabled="!survey_date">Gerar Impressão</button>
              </div>

            </div>


          </div>

          <!-- modal footer -->
          <modal-footer />
          <!-- / modal footer -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalHeader from '@/components/ModalHeader'
import ModalFooter from '@/components/ModalFooter'
import DatePicker from '@/components/DatePicker'

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
    DatePicker
  },
  data () {
    return {
      survey_date: '',
      params_printer: {}
    }
  },
  methods: {
    openModal() {
      $('#modalDateSurvey').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    generatePrinter () {
      this.closeModal()
      this.params_printer.survey_date = this.survey_date
      this.$bus.$emit('Termination\Contract:GenerateRecord', this.params_printer)
    },
    closeModal() {
      $('#modalDateSurvey').modal('hide')
    }
  },
  watch: {
    dataModal(data) {
      this.params_printer = data.data
      this.openModal()
    }
  }
}
</script>