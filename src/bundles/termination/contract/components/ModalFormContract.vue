<template>
    <div>
        <div id="modalFormContract" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl">
                <div class="modal-content" v-loading="load_data" element-loading-text="Gerando impressão, aguarde ...">

                    <!-- modal header -->
                    <modal-header title="Rescisão de Contrato" @closeModal="closeModal">
                      <i class="fa fa-file" slot="icon_title"></i>
                      <slot>

                        <div style="position: absolute; right: 353px;" v-if="dataModal && dataModal.data && dataModal.data.id">

                          <div class="btn-group mr15">
                            <button type="button" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown">Impressão Fichas
                              <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                              <li>
                                <a href="javascript:;" @click.prevent="generateRecord({name: 'termination', type: 'pdf'})">Ficha Rescisão de Contrato (PDF)</a>
                              </li>
                              <li class="divider"></li>
                              <li>
                                <a href="javascript:;" @click.prevent="generateRecord({name: 'transfer', type: 'pdf'})">Ficha Transferencia de Contrato (PDF)</a>
                              </li>
                              <li class="divider"></li>
                              <li>
                                <a href="javascript:;" @click.prevent="$emit('openModalDateSurvey', {name: 'delivery_keys_pendencie', type: 'pdf'})">
                                  Termo Ent. de Chaves Ressalva (PDF)
                                </a>
                                <a href="javascript:;" @click.prevent="$emit('openModalDateSurvey', {name: 'delivery_keys_pendencie', type: 'word'})">
                                  Termo Ent. de Chaves Ressalva (WORD)
                                </a>
                              </li>
                              <li class="divider"></li>
                              <li>
                                <a href="javascript:;" @click.prevent="$emit('openModalDeliveryKeysBeforeSurvey', {name: 'delivery_keys_before_survey', type: 'pdf'})">
                                  Termo Ent. de Chaves Antes Vistoria (PDF)
                                </a>
                                <a href="javascript:;" @click.prevent="$emit('openModalDeliveryKeysBeforeSurvey', {name: 'delivery_keys_before_survey', type: 'word'})">
                                  Termo Ent. de Chaves Antes Vistoria (WORD)
                                </a>
                              </li>
                              <li class="divider"></li>
                              <li>
                                <a href="javascript:;" @click.prevent="$emit('openModalDeliveryKeysBeforeSurvey', {name: 'delivery_keys_after_survey', type: 'pdf'})">
                                  Termo Ent. de Chaves Apos Vistoria (PDF)
                                </a>
                                <a href="javascript:;" @click.prevent="$emit('openModalDeliveryKeysBeforeSurvey', {name: 'delivery_keys_after_survey', type: 'word'})">
                                  Termo Ent. de Chaves Apos Vistoria (WORD)
                                </a>
                              </li>
                            </ul>
                          </div>

                        </div>

                        <button class="button btn btn-sm btn-warning"
                                @click="showComponent"
                                v-if="showButtonToggleComponent">{{button_name}}</button>
                        <button class="button btn btn-sm btn-danger" @click="submitForm" :disabled="disabled_submit_button">Salvar Dados</button>
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
      inactivation_data: {},
      disabled_submit_button: false
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
    /**
     * Metodo para geração de fichas
     * @param params
     */
    generateRecord (params) {
      this.load_data = true

      params.termination_id = this.dataModal.data.id
      const queryParams = {
        params
      }

      http.get('termination/record', queryParams).then(res => {

        const url = window.URL_API + '/' + res.data.file_name
        window.open(url)

        const params = {
          params: {
            file_name: res.data.file_name
          }
        }

        setTimeout(() => {
          this.load_data = false
          http.get('api/remove-file', params)
        }, 1500)

      }).catch(() => {
        this.load_data = false
      })
    },
    closeModal() {
      $('#modalFormContract').modal('hide')
    }
  },
  watch: {
    dataModal() {
      this.show_component = 'form_contract'
      this.button_name = 'Acessórios da Locação'


      if (this.dataModal && this.dataModal.data && this.dataModal.data.status) {

        const status = this.dataModal.data.status

        if (status === 'c' || status === 'r' || status === 'a' || status === 'j' || status === 'cej') {
          this.disabled_submit_button = true
        } else {
          this.disabled_submit_button = false
        }

      }


      this.data_modal_opened = {
        type_action: this.dataModal.type_action,
        data: this.dataModal.data
      }

      this.openModal()
    }
  },
  computed: {
    showButtonToggleComponent () {
      if (this.dataModal && this.dataModal.data && this.dataModal.data.id) {
        return true
      }
      return false
    }
  },
  mounted (){
    this.$bus.$on('Termination\Contract:GenerateRecord', (params) => {
      this.generateRecord(params)
    })
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
