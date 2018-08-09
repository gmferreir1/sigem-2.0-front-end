<template>
  <div>
    <div id="modalSelectTypePrinter" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Seleção Tipo de Impressão" @closeModal="closeModal">
            <i class="fa fa-print" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">

            <div class="row">
              <div class="col-md-12">
                <span>
                  <input type="radio" id="owner" value="owner" v-model="type_printer">
                  Com o nome do proprietário
                </span>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <span>
                  <input type="radio" id="tenant" value="tenant" v-model="type_printer">
                  Com o nome do inquilino
                </span>
              </div>
            </div>

            <div class="row" style="margin-top: 20px">
              <div class="col-md-12">
                <button class="button btn btn-sm btn-primary" :disabled="!type_printer" @click="generatePrinter">Gerar Impressão</button>
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
      type_printer: ''
    }
  },
  methods: {
    openModal() {
      $('#modalSelectTypePrinter').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    closeModal() {
      $('#modalSelectTypePrinter').modal('hide')
    },
    generatePrinter () {
      this.closeModal()
      this.$bus.$emit('Termination\Contract:PrinterList', this.type_printer)
    }
  },
  watch: {
    dataModal() {
      this.type_printer = ''

      this.openModal()
    }
  }
}
</script>