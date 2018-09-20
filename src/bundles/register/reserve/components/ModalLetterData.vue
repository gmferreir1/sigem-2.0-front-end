<template>
  <div>
    <div id="modalLetterData" class="modal" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content" v-loading="load_data" element-loading-text="Consultando dados, aguarde ...">

          <!-- modal header -->
          <modal-header @closeModal="closeModal">
            <button class="button btn btn-sm btn-danger" @click="sendEmail">
              <i class="fa fa-mail-forward"></i>
              Enviar Email
            </button>
          </modal-header>
          <!-- / modal header -->

          <div class="modal-body">

            <div class="row">
              <div class="col-md-12">
                <editor :setText="text_letter" @textEditor="text => text_letter = text"/>
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
import Editor from '@/components/Editor'

export default {
  components: {
    ModalHeader,
    ModalFooter,
    Editor
  },
  data () {
    return {
      load_data: false,
      text_letter: ''
    }
  },
  methods: {
    openModal() {
      $('#modalLetterData').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    sendEmail () {
      // parei aqui
      console.log(this.text_letter)
    },
    closeModal() {
      $('#modalLetterData').modal('hide')
    }
  },
  mounted () {
    this.$bus.$on('Register\Reserve:OpenModalLetterData', (data) => {
      this.text_letter = data.text
      this.openModal()
    })
  }
}
</script>

<style scoped>

  .modal-body {
    padding: 5px;
  }

  th {
    font-weight: normal !important;
    font-size: 11px;
  }

  tr {
    font-size: 11px;
  }

</style>
