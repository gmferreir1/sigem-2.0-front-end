<template>
  <div>
    <div id="modalReason" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header :title="title_modal" @closeModal="closeModal">
            <button class="button btn btn-sm btn-danger" @click="submitForm" :disabled="disabled_submit_button">Salvar Dados</button>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body" style="padding: 5px 10px 5px 10px">

            <!-- form reason -->
            <form-reason @disabledSubmitButton="data => disabled_submit_button = data"/>
            <!-- / form reason -->


            <!-- tabela de listagem -->
            <table-list :loadData="load_table_data"/>
            <!-- / tabela de listagem -->


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
import FormReason from './FormReason'
import TableList from './TableList'
import {mapState, mapActions} from 'vuex'

export default {
  props: ['openModalReason'],
  components: {
    ModalHeader,
    ModalFooter,
    FormReason,
    TableList
  },
  data () {
    return {
      title_modal: 'Motivos Transferência (0)',
      load_table_data: false,
      disabled_submit_button: true
    }
  },
  methods: {
    ...mapActions('Register', ['getReasonsTransfer']),
    openModal () {
      $('#modalReason').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    submitForm () {
      this.$bus.$emit('Register\Transfer\Reason:SubmitForm')
    },
    closeModal () {
      $('#modalReason').modal('hide')
    }
  },
  computed: {
    ...mapState('Register', ['reasons_transfer'])
  },
  watch: {
    openModalReason () {
      this.load_table_data = !this.load_table_data
      this.getReasonsTransfer()
      this.openModal()
    },
    reasons_transfer () {
      this.title_modal = `Motivos Transferência (${this.reasons_transfer.length})`
    }
  }
}

</script>

<style scoped>

  th {
    font-weight: normal !important;
    font-size: 12px;
  }

  tr {
    font-size: 11px;
  }

</style>

