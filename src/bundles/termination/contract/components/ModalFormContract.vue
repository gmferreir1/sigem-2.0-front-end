<template>
    <div>
        <div id="modalFormContract" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">

                    <!-- modal header -->
                    <modal-header title="Rescisão de Contrato" @closeModal="closeModal">
                      <i class="fa fa-file" slot="icon_title"></i>
                    </modal-header>
                    <!-- / modal footer -->

                    <div class="modal-body" style="padding: 5px 10px 5px 10px" v-loading="load_data" element-loading-text="Consultando informações...">

                      <form-contract />

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
import FormContract from './FormContract'

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
    FormContract
  },
  data() {
    return {
      load_data: false
    }
  },
  methods: {
    openModal() {
      $('#modalFormContract').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    closeModal() {
      $('#modalFormContract').modal('hide')
    }
  },
  watch: {
    dataModal() {
      this.openModal()
    }
  }
}
</script>

<style scoped>
    .modal-body {
        min-height: calc(100vh - 500px) !important;
        max-height: calc(100vh - 160px) !important;
        overflow-y: auto !important;
        overflow-x: hidden;
    }
</style>
