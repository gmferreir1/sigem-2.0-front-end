<template>
  <div>
    <div id="modalFormReserve" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Formulário Reserva de Imóvel" @closeModal="closeModal">
            <i class="fa fa-home" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">

            <form-reserve @openModalWarnClient="data => $emit('openModalWarnClient', data)"
              :dataModalOpened="data_modal_opened"/>

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
import FormReserve from './FormReserve'
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
    FormReserve
  },
  data () {
    return {
      data_modal_opened: {}
    }
  },
  methods: {
    openModal() {
      $('#modalFormReserve').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    closeModal() {
      $('#modalFormReserve').modal('hide')
    }
  },
  watch: {
    dataModal(data) {
      this.data_modal_opened = data
      this.openModal()
    }
  }
}
</script>

<style scoped>

  .modal-body {
    /*
    max-height: calc(100vh - 160px) !important;
    min-height: calc(100vh - 820px) !important;
    */
    min-height: calc(100vh - 600px) !important;
    max-height: calc(100vh - 160px) !important;
    overflow-y: auto !important;
    overflow-x: hidden;
  }

</style>