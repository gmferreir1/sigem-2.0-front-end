<template>
  <div>
    <div id="modalReleaseImmobile" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content" v-loading="load_data" :element-loading-text="message_load">

          <!-- modal header -->
          <modal-header title="Liberação de Chaves" @closeModal="closeModal">
            <i class="fa fa-key" slot="icon_title"></i>
            <button class="button btn btn-sm btn-danger" :disabled="!form.date_send" @click="confirm">Confirmar</button>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body" style="padding: 5px 10px 5px 10px" >


            <!-- form -->
            <div v-show="!data_release.date_send">

              <div class="row">
                <div class="col-md-12">
                  <label>Usuários</label>
                  <users-system @userSelected="user_id => form.rp_receive = user_id"
                                id_component="users"
                                :cleanComponent="clean_user_component"/>
                </div>
              </div>

              <div class="row" style="margin-top: 10px">
                <div class="col-md-2 div-140">
                  <label>Repasse <span class="required">*</span></label>
                  <date-picker class="form-control input-sm" v-model="form.date_send" placeholder="dd/mm/aaaa" />
                </div>
              </div>

            </div>
            <!--  / form -->

            <div v-show="data_release.date_send">
              <div class="row">
                <div class="col-md-12">
                  <label>Liberado Para</label>
                  <p style="font-weight: bold">{{wordUpper(data_release.rp_receive_name)}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label>Data Liberação</label>
                  <p style="font-weight: bold">{{dateFormat(data_release.date_send)}}</p>
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
import UsersSystem from '@/components/UsersSystem'
import DatePicker from '@/components/DatePicker'
import {wordUpper} from '@/util/stringHelpers'
import {dateFormat} from '@/util/dateTime'

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
    UsersSystem,
    DatePicker
  },
  data() {
    return {
      message_load: 'Consultando informações, aguarde ...',
      load_data: true,
      clean_user_component: false,
      form: {
        rp_receive: null,
        date_send: ''
      },
      data_release: {
        date_send: '',
        rp_receive_name: ''
      }
    }
  },
  methods: {
    wordUpper,
    dateFormat,
    openModal() {
      $('#modalReleaseImmobile').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    checkIsRelease (terminationId = null) {
      const termination = !terminationId ? this.dataModal.termination_data.id : terminationId

      http.get(`termination/immobile-release/check-immobile-is-release/${termination}`).then(res => {
        this.data_release = res.data

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    confirm () {
      this.message_load = 'Processando sua solicitação, aguarde ...'
      this.load_data = true
      this.form.termination_id = this.dataModal.termination_data.id

      http.post('termination/immobile-release', this.form).then(res => {

        this.$bus.$emit('Termination\Contract:RefreshList')
        _notification.success()
        this.checkIsRelease()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    cleanForm () {
      this.form = {
        rp_receive: null,
        date_send: ''
      }
      this.clean_user_component = !this.clean_user_component
    },
    closeModal() {
      $('#modalReleaseImmobile').modal('hide')
    }
  },
  watch: {
    dataModal() {
      this.load_data = true
      this.load_message = 'Consultando informações, aguarde ...'
      this.cleanForm()
      this.openModal()
      this.checkIsRelease()
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

