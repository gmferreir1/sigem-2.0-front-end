<template>
  <div>
    <div id="modalFormTransfer" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xl">
        <div class="modal-content" v-loading="load_data" element-loading-text="Consultando informações, aguarde ...">

          <!-- modal header -->
          <modal-header title="Formulário de Transferência" @closeModal="closeModal">
            <button class="button btn btn-sm btn-danger" @click="submitForm" :disabled="contract_transfer_edit_current.status === 'c' || contract_transfer_edit_current.status === 'r'">Salvar Dados</button>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body" style="padding: 5px 10px 5px 10px">
            <form-contract :dataModalOpened="data_modal_opened" />
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

import ModalHeader from '@/components/ModalHeader'
import ModalFooter from '@/components/ModalFooter'
import {mapActions, mapState} from 'vuex'
import FormContract from './FormContract'

export default {
  props: ['dataModal'],
  components: {
    ModalHeader,
    ModalFooter,
    FormContract
  },
  data () {
    return {
      load_data: false,
      data_modal_opened: {}
    }
  },
  methods: {
    ...mapActions('Register', ['getReasonsTransfer']),
    openModal () {
      $('#modalFormTransfer').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    submitForm () {
      this.$bus.$emit('Register\Transfer\Contract:SubmitForm')
    },
    closeModal () {
      $('#modalFormTransfer').modal('hide')
    }
  },
  computed: {
    ...mapState('Register', ['contract_transfer_edit_current'])
  },
  watch: {
    dataModal () {
      this.openModal()
      this.data_modal_opened = this.dataModal

    },
    contract_transfer_edit_current () {
      // this.load_data = true
      this.openModal()
      this.data_modal_opened = {
        type_action: ''
      }
    }
  }
}

</script>


<style scoped>


  .modal-body {
    min-height: calc(100vh - 600px) !important;
    max-height: calc(100vh - 160px) !important;
    overflow-y: auto !important;
    overflow-x: hidden;
  }

</style>