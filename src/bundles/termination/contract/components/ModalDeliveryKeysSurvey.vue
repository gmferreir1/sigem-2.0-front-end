<template>
  <div>
    <div id="modalDeliveryKeysSurvey" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Dados Extras Para Impressão" @closeModal="closeModal">
            <i class="fa fa-print" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">

            <div class="row">

              <div class="col-md-12">
                <label>Nome</label>
                <input type="text" class="form-control input-sm" v-model="name_rp_delivery_key" @keypress.enter="setFocus('cpf')">
              </div>

            </div>

            <div class="row" style="margin-top: 10px">

              <div class="col-md-4" :class="{'has-error': cpf_error}">
                <label>Informe o CPF</label>
                <the-mask :mask="['###.###.###-##']" class="form-control input-sm"
                          placeholder="som. números" v-model="cpf_rp_delivery_key"
                          id="cpf"
                          @keypress.enter.native="generatePrinter"/>
                <div class="error" v-if="cpf_error && cpf_rp_delivery_key">CPF Inválido</div>
              </div>

            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-2">
                <button class="button btn btn-sm btn-default" :disabled="cpf_error || !name_rp_delivery_key " @click="generatePrinter">Gerar Impressão</button>
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
import cpf from 'gerador-validador-cpf'

export default {
  props: {
    dataModal: {
      required: true,
      type: Object
    }
  },
  components: {
    ModalHeader,
    ModalFooter
  },
  data () {
    return {
      cpf_error: false,
      name_rp_delivery_key: '',
      cpf_rp_delivery_key: '',
      params_printer: {}
    }
  },
  methods: {
    openModal() {
      $('#modalDeliveryKeysSurvey').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    setFocus (field) {
      if (field === 'cpf') {
        $('#cpf').focus()
      }
    },
    generatePrinter () {
      if (this.cpf_error) {
        return
      }

      this.params_printer.cpf_rp_delivery_key = this.cpf_rp_delivery_key
      this.params_printer.name_rp_delivery_key = this.name_rp_delivery_key

      this.closeModal()
      this.$bus.$emit('Termination\Contract:GenerateRecord', this.params_printer)
    },
    closeModal() {
      $('#modalDeliveryKeysSurvey').modal('hide')
    }
  },
  watch: {
    'cpf_rp_delivery_key' () {
      if (!cpf.validate(this.cpf_rp_delivery_key) && this.cpf_rp_delivery_key.length > 0) {
        this.cpf_error = true
      } else {
        this.cpf_error = false
      }
    },
    dataModal(data) {

      this.name_rp_delivery_key = ''
      this.cpf_rp_delivery_key = ''

      this.params_printer = data.data
      this.openModal()
    }
  }
}
</script>