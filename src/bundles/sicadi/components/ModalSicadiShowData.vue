<template>
  <div>
    <div id="modalSicadiShowData" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- modal header -->
          <modal-header title="Resultados Busca Modulo (SICADI)" @closeModal="closeModal">
            <i class="fa fa-search" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body" style="padding: 5px 10px 5px 10px" v-loading="load_data" element-loading-text="Consultando informações...">

            <!-- tabela listagem de dados -->
            <table-list-immobile-data @closeModal="closeModal"/>
            <!-- / tabela listagem de dados -->

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

import {mapState} from 'vuex'
import ModalHeader from '@/components/ModalHeader'
import ModalFooter from '@/components/ModalFooter'
import TableListImmobileData from './TableListImmobileData'

export default {
  components: {
    ModalHeader,
    ModalFooter,
    TableListImmobileData
  },
  data() {
    return {
      load_data: false
    }
  },
  methods: {
    openModal() {
      $('#modalSicadiShowData').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    closeModal() {
      $('#modalSicadiShowData').modal('hide')
    }
  },
  computed: {
    ...mapState('Sicadi', ['immobile_data'])
  },
  watch: {
    immobile_data () {
      if (this.immobile_data.length > 1) {
        this.openModal()
      }
    }
  }
}
</script>

