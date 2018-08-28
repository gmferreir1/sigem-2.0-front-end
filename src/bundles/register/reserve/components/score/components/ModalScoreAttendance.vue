<template>
  <div>
    <div id="modalScoreAttendance" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Score de Atendimento" @closeModal="closeModal">
            <button class="button btn btn-sm btn-danger" @click="submitForm">Salvar Dados</button>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body" style="padding: 5px 10px 5px 10px" v-loading="load_data" :element-loading-text="message_load">

            <!-- form -->
            <div class="row">

              <div class="col-md-6 col-lg-5">
                <label>Usuários</label>
                <users-system id_component="user_score_reserve"
                              @userSelected="user_id => form.attendant_id = user_id"
                              :setUser="form.attendant_id"
                              :cleanComponent="clean_user_component"/>
              </div>

              <div class="col-md-2">
                <label>Score</label>
                <input type="text" class="form-control input-sm" v-model="form.score" @keypress.enter="submitForm">
              </div>

              <div class="col-md-2" style="margin-top: 20px">
                <button class="button btn btn-sm btn-default" title="Novo Score" @click="cleanForm">
                  <i class="fa fa-plus-circle"></i>
                </button>
              </div>

            </div>
            <!--  / form -->

            <!-- component not found -->
            <div class="row" style="margin-top: 30px" v-if="!attendants_score.length">
              <div class="col-md-6 col-md-offset-5">
                <not-found />
              </div>
            </div>
            <!-- / component not found -->

            <!-- table -->
            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <div class="table-responsive" v-if="attendants_score.length">
                  <table class="table table-striped table-bordered table-hover table-condensed">
                    <thead>
                    <tr>
                      <th class="text-left">Nome</th>
                      <th class="text-center" style="width: 30px">Score</th>
                      <th class="text-center" style="width: 100px"> - </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="list in attendants_score">
                      <td>
                        <a href="#" @click.prevent="edit(list)">
                          {{wordUpper(list.attendance_name)}}
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
            <!-- / table -->

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
import NotFound from '@/components/NotFound'
import {wordUpper} from '@/util/stringHelpers'
import {mapActions, mapState} from 'vuex'

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
    NotFound
  },
  data() {
    return {
      message_load: 'Consultando informações, aguarde ...',
      load_data: false,
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
    ...mapActions('Register', ['getAttendantsScore']),
    wordUpper,
    openModal() {
      $('#modalScoreAttendance').modal({
        keyboard: false,
        backdrop: 'static'
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
      this.load_data = true
      http.post('register/reserve-contract/score', this.form).then(res => {

        this.getAttendantsScore()
        this.cleanForm()

        _notification.success()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    edit (data) {
      this.form.id = data.id
      this.form.attendant_id = data.attendant_id
      this.form.score = data.score
    },
    update () {
      this.load_data = true
      http.put(`register/reserve-contract/score/${this.form.id}`, this.form).then(res => {

        this.getAttendantsScore()
        this.cleanForm()

        _notification.success()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    remove (id) {
      this.load_data = true
      http.delete(`register/reserve-contract/score/${id}`).then(res => {

        this.getAttendantsScore()
        this.cleanForm()

        _notification.success()

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
    },
    closeModal() {
      $('#modalScoreAttendance').modal('hide')
    }
  },
  computed: {
    ...mapState('Register', ['attendants_score'])
  },
  watch: {
    dataModal() {
      this.message_load = 'Consultando informações, aguarde ...'
      this.load_data = true
      this.openModal()
      this.getAttendantsScore()
    },
    attendants_score () {
      setTimeout(() => {
        this.load_data = false
      }, 600)
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

