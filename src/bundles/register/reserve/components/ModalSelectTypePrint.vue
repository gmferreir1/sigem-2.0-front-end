<template>
  <div>
    <div id="modalSelectTypePrint" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content" v-loading="load_data" element-loading-text="Gerando impressão, aguarde ...">

          <!-- modal header -->
          <modal-header title="Informe o Tipo de Impressão" @closeModal="closeModal">
            <i class="fa fa-print" slot="icon_title"></i>
            <button class="button btn btn-sm btn-warning"
                    :disabled="!form.type_printer || form.type_printer === 'reserve_tracking' && !form.month || form.type_printer === 'reserve_tracking' && !form.year"
                    @click="printer">Gerar Impressão</button>
          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">


            <div class="row">
              <div class="col-md-12">
                <input type="radio" v-model="form.type_printer" value="reserve_list">
                <span>Lista de Reservas</span>
              </div>
            </div>

            <div class="row" style="margin-top: 15px">
              <div class="col-md-12">
                <input type="radio" v-model="form.type_printer" value="contract_celebrated" :disabled="!enableContractCelebrated">
                <span>Relatório de Contratos Celebrados</span>
              </div>
            </div>

            <div class="row" style="margin-top: 15px">
              <div class="col-md-12">
                <input type="radio" v-model="form.type_printer" value="reserve_tracking">
                <span>Acompanhamento Reserva</span>
              </div>
            </div>

            <div class="row" v-if="form.type_printer === 'reserve_tracking'">
              <div class="col-md-4">
                <label>Informe o Mês</label>
                <select class="form-control input-sm" v-model="form.month">
                  <option value="">Informe</option>
                  <option value="01">Janeiro</option>
                  <option value="02">Fevereiro</option>
                  <option value="03">Março</option>
                  <option value="04">Abril</option>
                  <option value="05">Maio</option>
                  <option value="06">Junho</option>
                  <option value="07">Julho</option>
                  <option value="08">Agosto</option>
                  <option value="09">Setembro</option>
                  <option value="10">Outubro</option>
                  <option value="11">Novembro</option>
                  <option value="12">Dezembro</option>
                </select>
              </div>

              <div class="col-md-4">
               <div v-if="load_years_available" style="margin-top: 16px">
                 <img :src="images.loading"/>
                 <span style="font-size: 11px">Carregando filtro ...</span>
               </div>

                <label v-if="!load_years_available">Informe o Ano</label>
                <select class="form-control input-sm" v-model="form.year" v-if="!load_years_available">
                  <option value="">Informe</option>
                  <option :value="year.year_reserve" v-for="year in years_available">{{year.year_reserve}}</option>
                </select>
              </div>

            </div>

            <div class="row" style="margin-top: 15px">
              <div class="col-md-12">
                <input type="radio" v-model="form.type_printer" value="reserve_canceled" :disabled="!enableContractCanceled">
                <span>Reservas Canceladas</span>
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
import {mapActions} from 'vuex'
import ModalHeader from '@/components/ModalHeader'
import ModalFooter from '@/components/ModalFooter'
export default {
  props: ['dataModal'],
  components: {
    ModalHeader,
    ModalFooter
  },
  data () {
    return {
      load_data: false,
      form: {
        month: '',
        year: '',
        type_printer: '',
      },
      years_available: [],
      load_years_available: false,
      images: {
        loading: require('@assets/images/loading.gif')
      }
    }
  },
  methods: {
    ...mapActions('Register', ['getReserveContracts']),
    openModal() {
      $('#modalSelectTypePrint').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    closeModal() {
      $('#modalSelectTypePrint').modal('hide')
    },
    cleanForm () {
      this.form = {
        month: '',
        year: '',
        type_printer: ''
      }
    },
    getYearsAvailable () {
      http.get('register/reserve-contract/query/get-years-available').then(res => {

        this.years_available = res.data

        setTimeout(() => this.load_years_available = false, 600)

      }).catch(() => {
        this.load_years_available = false
      })
    },
    printer () {
      this.load_data = true

      const dataParams = this.dataModal.filter
      dataParams.type_printer = this.form.type_printer
      dataParams.print = true
      dataParams.month = this.form.month
      dataParams.year = this.form.year

      const queryParams = {
        params: dataParams
      }

      this.getReserveContracts(queryParams).then(res => {

        const url = window.URL_API + '/' + res.data.file_name

        window.open(url)

        const params = {
          params: {
            file_name: res.data.file_name
          }
        }

        setTimeout(() => {
          http.get('api/remove-file', params)
        }, 1500)

        setTimeout(() => {
          this.load_data = false
        }, 1800)

      }).catch(() => {
        this.load_data = false
      })

    }
  },
  computed: {
    enableContractCelebrated () {
      const status = (this.dataModal && this.dataModal.filter) ? this.dataModal.filter.status : ''

      let check

      if (status.length > 1) {
        check = _.find(status, (s) => s != 'as' && s != 'ap' && s != 'af')
        check = check ? false : true
      }

      if (status.length === 1) {
        check = _.find(status, (s) => s === 'as' || s === 'ap' || s === 'af')
      }

      if (check) {
        return true
      }
      return false
    },
    enableContractCanceled () {
      const status = (this.dataModal && this.dataModal.filter) ? this.dataModal.filter.status : ''

      const check = status.length > 1 ? false : _.find(status, (s) => s === 'c')

      if (check) {
        return true
      }
      return false
    }
  },
  watch: {
    dataModal () {
      console.log(this.dataModal)
      this.cleanForm()
      this.openModal()
    },
    'form.type_printer' () {
      if (this.form.type_printer === 'reserve_tracking') {
        this.load_years_available = true
        this.getYearsAvailable()
      }
    }
  }
}
</script>
