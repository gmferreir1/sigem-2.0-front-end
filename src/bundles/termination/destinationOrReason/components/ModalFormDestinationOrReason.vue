<template>
  <div>
    <div id="modalFormDestinationOrReason" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Motivos e Destinos" @closeModal="closeModal">

          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body" style="padding: 5px 10px 5px 10px" v-loading="load_data" element-loading-text="Consultando informações...">

            <!-- form destino -->
            <form-destination :modalOpened="modal_opened"/>
            <!-- / form destino -->

            <!-- tabela listagem de destino ou motivo -->
            <table-list-destination-or-reason
              :modalOpened="modal_opened"
              style="margin-top: 10px"/>
            <!-- tabela listagem de destino ou motivo -->

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
import FormDestination from './FormDestinationOrReason'
import TableListDestinationOrReason from './TableListDestinationOrReason'

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
    FormDestination,
    TableListDestinationOrReason
  },
  data() {
    return {
      load_data: false,
      modal_opened: false
    }
  },
  methods: {
    openModal() {

      $('#modalFormDestinationOrReason').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    closeModal() {
      $('#modalFormDestinationOrReason').modal('hide')
    }
  },
  watch: {
    dataModal() {

      this.modal_opened = !this.modal_opened

      this.openModal()
    }
  }
}
</script>
