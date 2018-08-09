<template>
    <div>
        <div id="modalFormContract" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">

                    <!-- modal header -->
                    <modal-header title="Rescisão de Contrato" @closeModal="closeModal">
                      <i class="fa fa-file" slot="icon_title"></i>
                      <slot>
                        <button class="button btn btn-sm btn-warning"
                                @click="showComponent"
                                v-if="showButtonToggleComponent">{{button_name}}</button>
                        <button class="button btn btn-sm btn-danger" @click="submitForm" :disabled="disabledButtonSave">Salvar Dados</button>
                      </slot>
                    </modal-header>
                    <!-- / modal footer -->

                    <div class="modal-body" style="padding: 5px 10px 5px 10px" v-loading="load_data" element-loading-text="Consultando informações...">

                      <!-- formulário de contrato -->
                      <form-contract :dataModalOpened="data_modal_opened"
                        v-show="show_component === 'form_contract'"
                        @openModalGuarantors="contract => $emit('openModalGuarantors', contract)"
                        @edit="id => $emit('edit', id)"/>
                      <!-- / formulário de contrato -->


                      <!-- acessórios da locação -->
                      <rent-accessory :inactivationData="inactivation_data" v-show="show_component === 'rent_accessory'" />
                      <!-- /acessórios da locação -->

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
import RentAccessory from './RentAccessory'

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
    FormContract,
    RentAccessory
  },
  data() {
    return {
      load_data: false,
      show_component: 'form_contract',
      button_name: 'Acessórios Locação',
      data_modal_opened: {},
      inactivation_data: {}
    }
  },
  methods: {
    openModal() {
      $('#modalFormContract').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    submitForm () {
      if (this.show_component === 'form_contract') {
        this.$bus.$emit('Termination\Contract:SubmitFomContract')
      } else {
        this.$bus.$emit('Termination\Contract:SubmitRentAccessory')
      }
    },
    showComponent () {
      if (this.show_component === 'form_contract') {

        this.inactivation_data = {
          data: this.dataModal.data
        }

        this.show_component = 'rent_accessory'
        this.button_name = 'Dados Inativação'
      } else {
        this.show_component = 'form_contract'
        this.button_name = 'Acessórios da Locação'
      }
    },
    closeModal() {
      $('#modalFormContract').modal('hide')
    }
  },
  watch: {
    dataModal() {

      this.show_component = 'form_contract'
      this.button_name = 'Acessórios da Locação'

      this.data_modal_opened = {
        type_action: this.dataModal.type_action,
        data: this.dataModal.data
      }

      this.openModal()
    }
  },
  computed: {
    disabledButtonSave () {
      if (this.dataModal && this.dataModal.data && this.dataModal.data.status != 'p') {
        return true
      }
      return false
    },
    showButtonToggleComponent () {
      if (this.dataModal && this.dataModal.data && this.dataModal.data.id) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>

  .modal-body {
    max-height: calc(100vh - 210px);
    min-height: calc(100vh - 800px);
    overflow-y: auto;
  }

</style>
