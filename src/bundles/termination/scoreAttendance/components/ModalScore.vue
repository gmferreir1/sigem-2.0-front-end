<template>
  <div>
    <div id="modalScoreAttendance" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Score de Atendimento" @closeModal="closeModal">

          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body" style="padding: 5px 10px 5px 10px" v-loading="load_data" :element-loading-text="message_load">


            <!-- form -->
            <div class="row">

              <div class="col-md-6 col-lg-5">
                <label>Usuários</label>
                <users-system @userSelected="user_id => form.attendant_id = user_id"
                  :setUser="form.attendant_id"
                  :cleanComponent="clean_user_component"/>
              </div>

              <div class="col-md-2">
                <label>Score</label>
                <input type="text" class="form-control input-sm" v-model="form.score" @keypress.enter="submitForm">
              </div>

              <div class="col-md-2" style="margin-top: 20px">
                <button class="button btn btn-sm btn-danger" :disabled="!form.attendant_id || !form.score"
                  @click="submitForm">Salvar Dados</button>
              </div>

            </div>
            <!--  / form -->

            <!-- component not found -->
            <div class="row" style="margin-top: 30px" v-if="!data_list.data.length">
              <div class="col-md-6 col-md-offset-5">
                <not-found />
              </div>
            </div>
            <!-- / component not found -->


            <!-- tabela de listagem -->
            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <div class="table-responsive" v-if="data_list.data.length">
                  <table class="table table-striped table-bordered table-hover table-condensed">
                    <thead>
                    <tr>
                      <th class="text-left">Nome</th>
                      <th class="text-center" style="width: 30px">Score</th>
                      <th class="text-center" style="width: 100px"> - </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="list in data_list.data">
                      <td>
                        <a href="#" @click.prevent="edit(list)">
                          {{wordUpper(list.name)}}
                        </a>
                      </td>
                      <td class="text-center" style="width: 30px">
                        <a href="#" @click.prevent="edit(list)">
                          {{list.score}}
                        </a>
                      </td>
                      <td class="text-center" style="width: 100px">

                        <a href="#" @click.prevent="edit(list)">
                          <i class="fa fa-pencil size-icon-table orange"></i>
                        </a>

                        <a href="#" @click.prevent="remove(list.id)" style="margin-left: 5px">
                          <i class="fa fa-trash size-icon-table red"></i>
                        </a>

                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
import NotFound from '@/components/NotFound'
import UsersSystem from '@/components/UsersSystem'
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
    NotFound,
    UsersSystem
  },
  data() {
    return {
      message_load: 'Consultando informações, aguarde ...',
      load_data: true,
      clean_user_component: false,
      form: {
        attendant_id: null,
        score: null
      },
      data_list: {
        data: []
      }
    }
  },
  methods: {
    wordUpper,
    openModal() {
      $('#modalScoreAttendance').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    getData () {
      this.load_data = true

      http.get('termination/score').then(res => {

        this.data_list.data = res.data.data

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    submitForm () {
      if (!this.form.id) {
        this.save()
      } else {
        this.update()
      }
    },
    save () {
      this.load_message = 'Processando sua solicitação, aguarde ...'
      this.load_data = true

      http.post('termination/score', this.form).then(res => {

        this.getData()
        _notification.success()
        this.cleanForm()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    edit (data) {
      this.form = Object.assign({}, data)
    },
    update () {
      this.load_message = 'Processando sua solicitação, aguarde ...'
      this.load_data = true

      http.put(`termination/score/${this.form.id}`, this.form).then(res => {

        this.getData()
        _notification.success()
        this.cleanForm()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    remove (id) {
      this.load_message = 'Processando sua solicitação, aguarde ...'
      this.load_data = true

      http.delete(`termination/score/${id}`).then(res => {

        this.getData()
        _notification.success()
        this.cleanForm()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    cleanForm () {
      this.form = {
        attendant_id: null,
        score: null
      }

      this.clean_user_component = !this.clean_user_component
    },
    closeModal() {
      $('#modalScoreAttendance').modal('hide')
    }
  },
  watch: {
    dataModal() {
      this.load_message = 'Consultando informações, aguarde ...'
      this.load_data = true

      this.cleanForm()

      this.getData()
      this.openModal()
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

