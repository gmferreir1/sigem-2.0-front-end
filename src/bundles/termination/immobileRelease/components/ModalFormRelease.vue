<template>
  <div>
    <div id="modalFormRelease" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Dados da Liberação" @closeModal="closeModal">
            <button class="button btn btn-sm btn-danger" @click="submitForm">Salvar Dados</button>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">

            <form-release :dataForm="dataModal" />

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
import FormRelease from './FormRelease'

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
    FormRelease
  },
  data () {
    return {
      load_data: false
    }
  },
  methods: {
    openModal() {
      $('#modalFormRelease').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    submitForm () {
      this.$bus.$emit('Termination\ImmobileRelease:SubmitForm')
    },
    closeModal() {
      $('#modalFormRelease').modal('hide')
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
    padding-bottom: 5px !important;
  }
</style>