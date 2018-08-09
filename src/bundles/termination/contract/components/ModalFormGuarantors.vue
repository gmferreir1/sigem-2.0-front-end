<template>
  <div>
    <div id="modalFormGuarantors" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Fiadores do Contrato" @closeModal="closeModal">
            <i class="fa fa-shield" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body" style="padding: 5px 10px 5px 10px" v-loading="load_data" element-loading-text="Consultando informações...">


            <div class="row" v-if="!guarantors.length">

              <div class="col-md-5 col-md-offset-5" style="margin-top: 55px">
                <not-found />
              </div>

            </div>

            <div v-for="(guarantor, index) in guarantors">

              <div class="title-form">Dados do Fiador #{{ index + 1 }}</div>
              <hr class="h-row">
              <div class="row">

                <div class="col-md-4">
                  <label>Nome</label>
                  <p>{{wordUpper(guarantor.guarantors_name)}}</p>
                </div>

                <div class="col-md-2 div-120">
                  <label>Telefone</label>
                  <p>{{!guarantor.guarantors_cell_phone ? ' - ' : guarantor.guarantors_cell_phone}}</p>
                </div>

                <div class="col-md-2 div-120">
                  <label>Telefone</label>
                  <p>{{!guarantor.guarantors_phone_commercial ? ' - ' : guarantor.guarantors_phone_commercial}}</p>
                </div>


                <div class="col-md-2 div-120">
                  <label>Telefone</label>
                  <p>{{!guarantor.guarantors_phone_residential ? ' - ' : guarantor.guarantors_phone_residential}}</p>
                </div>

                <div class="col-md-2">
                  <label>Email</label>
                  <p>{{!guarantor.guarantors_email ? ' - ' : guarantor.guarantors_email}}</p>
                </div>

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
import NotFound from '@/components/NotFound'
import {wordUpper} from '@/util/stringHelpers'

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
    NotFound
  },
  data() {
    return {
      load_data: false,
      guarantors: []
    }
  },
  methods: {
    wordUpper,
    openModal() {
      this.getData()

      $('#modalFormGuarantors').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    getData () {

      const queryParams = {
        params: {
          contract: this.dataModal.contract
        }
      }

      http.get('termination/query/guarantors', queryParams).then(res => {
        this.guarantors = res.data

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    closeModal() {
      $('#modalFormGuarantors').modal('hide')
    }
  },
  watch: {
    dataModal() {

      this.load_data = true

      this.openModal()
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

  label {
    font-weight: bold;
  }

</style>
