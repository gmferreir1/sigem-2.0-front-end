<template>
  <div>
    <div id="modalConfirmCloseReserve" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Confirmação Finalização Reserva" @closeModal="closeModal">
            <i class="fa fa-check-circle" slot="icon_title"></i>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">


            <div class="row">
              <div class="col-md-12">
                Tem certeza que deseja finalizar a reserva ?
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <span style="font-weight: bold; color: red">
                  Nenhuma alteração poderá ser mais realizada depois desta operação !
                </span>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <button class="button btn btn-sm btn-danger" @click="confirm">Confirmar Operação</button>
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
export default {
  components: {
    ModalHeader,
    ModalFooter
  },
  data () {
    return {
      load_data: false,
      data_modal_opened: {}
    }
  },
  methods: {
    openModal() {
      $('#modalConfirmCloseReserve').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    confirm () {
      this.$bus.$emit('Register\Reserve:ConfirmCloseReserve')
      this.closeModal()
    },
    closeModal() {
      $('#modalConfirmCloseReserve').modal('hide')
    }
  },
  mounted () {
    this.$bus.$on('Register\Reserve:OpenModalConfirmCloseReserve', () => {
      this.openModal()
    })
  }
}
</script>
