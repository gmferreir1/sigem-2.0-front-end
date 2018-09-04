<template>
  <div v-loading="load_data" :element-loading-text="message_load">

    <!-- dados do imovel -->
    <div class="title-form">
      Dados do Imóvel
    </div>
    <hr class="h-row">
    <div class="row">

      <div class="col-md-2 div-140" :class="{error: validation.hasError('form.contract')}">
        <label>Contrato <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.contract"
               @blur="checkContractIsRelease" @keypress.enter="checkContractIsRelease"
              :disabled="contract_transfer_edit_current.id">
        <div class="message">{{ validation.firstError('form.contract') }}</div>
      </div>

      <div class="col-md-2 div-140" :class="{error: validation.hasError('form.immobile_code')}">
        <label>Código <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.immobile_code" @blur="getImmobileDataPerCode"
               :disabled="contract_transfer_edit_current.id">
        <div class="message">{{ validation.firstError('form.immobile_code') }}</div>
      </div>

      <div class="col-md-4" :class="{error: validation.hasError('form.address')}">
        <label>Endereço <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.address"
               :disabled="contract_transfer_edit_current.id">
        <div class="message">{{ validation.firstError('form.address') }}</div>
      </div>

      <div class="col-md-3" :class="{error: validation.hasError('form.neighborhood')}">
        <label>Bairro <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.neighborhood"
               :disabled="contract_transfer_edit_current.id">
        <div class="message">{{ validation.firstError('form.neighborhood') }}</div>
      </div>

      <div class="col-md-2 div-140" :class="{error: validation.hasError('form.value')}">
        <label>Valor <span class="required">*</span></label>
        <money v-model="form.value" class="form-control input-sm"/>
        <div class="message">{{ validation.firstError('form.value') }}</div>
      </div>

    </div>
    <!-- / dados do imóvel -->

    <!-- dados do proprietário -->
    <div class="title-form">
      Dados do Proprietário
    </div>
    <hr class="h-row">
    <div class="row">
      <div class="col-md-4" :class="{error: validation.hasError('form.owner')}">
        <label>Proprietário <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.owner">
        <div class="message">{{ validation.firstError('form.owner') }}</div>
      </div>

      <div class="col-md-2 div-140">
        <label>Telefone</label>
        <the-mask type="text" class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']" v-model="form.owner_phone_residential" placeholder="som. números"/>
      </div>

      <div class="col-md-2 div-140">
        <label>Telefone</label>
        <the-mask type="text" class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']" v-model="form.owner_phone_commercial" placeholder="som. números"/>
      </div>

      <div class="col-md-2 div-140">
        <label>Telefone</label>
        <the-mask type="text" class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']" v-model="form.owner_cell_phone" placeholder="som. números"/>
      </div>

      <div class="col-md-3" :class="{error: validation.hasError('form.owner_email')}">
        <label>Email</label>
        <input type="text" class="form-control input-sm" v-model="form.owner_email">
        <div class="message">{{ validation.firstError('form.owner_email') }}</div>
      </div>

    </div>
    <!-- / dados do proprietário -->

    <!-- dados da transferencia -->
    <div class="title-form">
      Dados da Transferência
    </div>
    <hr class="h-row">
    <div class="row">
      <div class="col-md-2 div-140" :class="{error: validation.hasError('form.transfer_date')}">
        <label>Abertura <span class="required">*</span></label>
        <date-picker class="form-control input-sm" v-model="form.transfer_date" placeholder="dd/mm/aaaa"/>
        <div class="message">{{ validation.firstError('form.transfer_date') }}</div>
      </div>

      <div class="col-md-3 col-lg-2" :class="{error: validation.hasError('form.reason_id'), 'has-error': validation.hasError('form.reason_id')}">
        <label>Motivo <span class="required">*</span></label>
        <select class="form-control chosen input-sm"
                data-placeholder="Informe o motivo" id="reason" v-model="form.reason_id" style="height: 20px !important;"
                :disabled="contract_transfer_edit_current.status === 'c' || contract_transfer_edit_current.status === 'r'">
          <option :value="reason.id" v-for="reason in reasons_transfer">{{wordUpper(reason.reason)}}</option>
        </select>
        <div class="message">{{ validation.firstError('form.reason_id') }}</div>
      </div>

      <div class="col-md-2 div-140" :class="{error: validation.hasError('form.status')}">
        <label>Status <span class="required">*</span></label>
        <select v-model="form.status" class="form-control input-sm" :disabled="contract_transfer_edit_current.status === 'c' || contract_transfer_edit_current.status === 'r'">
          <option value="p">Pendente</option>
          <option value="r">Resolvido</option>
          <option value="c">Cancelado</option>
        </select>
        <div class="message">{{ validation.firstError('form.status') }}</div>
      </div>

      <div class="col-md-2 div-140" :class="{error: validation.hasError('form.new_contract')}" v-if="form.status === 'r'">
        <label>Novo Contrato <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.new_contract" :disabled="contract_transfer_edit_current.new_contract">
        <div class="message">{{ validation.firstError('form.new_contract') }}</div>
      </div>

      <div class="col-md-4 col-lg-3" :class="{error: validation.hasError('form.responsible_transfer_id')}">
        <label>Responsável <span class="required">*</span></label>
        <div v-show="load_responsible_transfer">
          <img :src="images.load_responsible_transfer"/>
          <span style="font-size: 10px">carregando ...</span>
        </div>
        <users-system id_component="responsible_transfer_id" :setUser="form.responsible_transfer_id" @userSelected="id => form.responsible_transfer_id = id" v-show="!load_responsible_transfer"/>
        <div class="message">{{ validation.firstError('form.responsible_transfer_id') }}</div>
      </div>

    </div>
    <!-- / dados do transferencia -->

    <!-- dados do solicitante -->
    <div class="title-form">
      Dados do Solicitante
    </div>
    <hr class="h-row">
    <div class="row">
      <div class="col-md-3" :class="{error: validation.hasError('form.requester_name')}">
        <label>Solicitante <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.requester_name">
        <div class="message">{{ validation.firstError('form.requester_name') }}</div>
      </div>

      <div class="col-md-2 div-140" :class="{error: validation.hasError('form.requester_phone_01')}">
        <label>Telefone <span class="required">*</span></label>
        <the-mask type="text" class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']" v-model="form.requester_phone_01" placeholder="som. números"/>
        <div class="message">{{ validation.firstError('form.requester_phone_01') }}</div>
      </div>

      <div class="col-md-2 div-140">
        <label>Telefone</label>
        <the-mask type="text" class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']" v-model="form.requester_phone_02" placeholder="som. números"/>
      </div>

      <div class="col-md-2 div-140">
        <label>Telefone</label>
        <the-mask type="text" class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']" v-model="form.requester_phone_03" placeholder="som. números"/>
      </div>

      <div class="col-md-3" :class="{error: validation.hasError('form.requester_email')}">
        <label>Email</label>
        <input type="text" class="form-control input-sm" v-model="form.requester_email">
        <div class="message">{{ validation.firstError('form.requester_email') }}</div>
      </div>

    </div>
    <!-- / dados do solicitante -->


    <!-- dados do histórico -->
    <div class="title-form">
      Histórico
    </div>
    <hr class="h-row">
    <div class="row">
      <div class="col-md-12">
        <historic @textEditor="text => form.historic_data.historic = text"/>
      </div>
    </div>
    <!-- / dados do histórico -->

  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker'
import UsersSystem from '@/components/UsersSystem'
import {wordUpper} from '@/util/stringHelpers'
import {mapState, mapActions, mapMutations} from 'vuex'
import Historic from './Historic'
import {getSicadiDataMixin} from '../../../../sicadi/mixins/getSicadiDataMixin'
import {dateFormat} from '@/util/dateTime'

export default {
  mixins: [getSicadiDataMixin],
  props: ['dataModalOpened'],
  components: {
    DatePicker,
    UsersSystem,
    Historic
  },
  data () {
    return {
      load_data: false,
      message_load: 'Processando sua solicitação, aguarde ...',
      load_responsible_transfer: true,
      images: {
        load_responsible_transfer: require('@assets/images/loading.gif')
      },
      form: {
        contract: '',
        immobile_code: '',
        address: '',
        neighborhood: '',
        value: 0,
        owner: '',
        owner_phone_residential: '',
        owner_phone_commercial: '',
        owner_cell_phone: '',
        owner_email: '',
        transfer_date: window.moment().format('DD/MM/YYYY'),
        reason_id: '',
        new_contract: '',
        status: 'p',
        responsible_transfer_id: '',
        requester_name: '',
        requester_phone_01: '',
        requester_phone_02: '',
        requester_phone_03: '',
        requester_email: '',
        historic_data: {
          historic: ''
        }
      }
    }
  },
  validators: {
    'form.contract': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.immobile_code': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.address': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.neighborhood': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.value': function (value) {
      return Validator.custom(function () {
        var number = parseInt(value)
        if (number === 0) {
          return 'Obrigatório'
        }
      })
    },
    'form.reason_id': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.owner': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.transfer_date': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.status': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.new_contract': function (value) {
      if (this.form.status === 'r') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.responsible_transfer_id': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.requester_name': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.requester_phone_01': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.requester_email': function (value) {
      return Validator.value(value).email('Inválido')
    }
  },
  methods: {
    wordUpper,
    ...mapActions('Register', ['getReasonsTransfer', 'getContractTransfer', 'getResponsibleForFilterContractsTransfer']),
    ...mapMutations('Register', ['CLEAN_EDIT_CONTRACT_TRANSFER_CURRENT', 'CLEAN_HISTORIC_CONTRACT_TRANSFER']),
    dateFormat,
    getResponsible () {
      http.get('register/transfer/score-attendant/last-attendance').then(res => {
        this.form.responsible_transfer_id = res.data.id
        setTimeout(() => {
          this.load_responsible_transfer = false
        }, 200)
      }).catch(() => {
        this.load_responsible_transfer = false
      })
    },
    submitForm () {
      const self = this
      this.$validate()
      .then(function (success) {
        if (success) {
          if (!self.form.id) {
            self.save()
          } else {
            self.update()
          }
        }
      })
    },
    chosenSelect () {
      const self = this

      $('.chosen').chosen({
        width: '100%',
        height: '25px',
        no_results_text: "Oops, nada encontrado para: "
      })

      $('#reason').on('change', function(evt, params) {
        self.form.reason_id =  params ? params.selected : ''
      })
    },
    checkContractIsRelease () {

      if (this.form.contract.length < 4) return

      this.message_load = 'Consultado informações, aguarde ...'
      this.load_data = true

      const queryParams = {
        params: {
          contract: this.form.contract
        }
      }

      http.get('register/transfer/query/contract-is-release', queryParams).then(res => {

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        setTimeout(() => {
          this.load_data = false
        }, 600)
      })
    },
    setFormData (data) {
      this.form.immobile_code = data.immobile_code.toUpperCase()
      this.form.address = data.address.toUpperCase()
      this.form.neighborhood = data.neighborhood.toUpperCase()
      this.form.value = data.value
      this.form.owner = data.owner.toUpperCase()
      this.form.owner_phone_residential = data.owner_phone_residential
      this.form.owner_phone_commercial = data.owner_phone_commercial
      this.form.owner_cell_phone = data.owner_cell_phone
      this.form.owner_email = data.owner_email

      setTimeout(() => {
        this.load_data = false
      }, 600)
    },
    save () {
      this.message_load = 'Processando sua solicitação, aguarde ...'
      this.load_data = true

      http.post('register/transfer/contract', this.form).then((res) => {
        this.getContractTransfer(res.data.id)
        _notification.success()
        this.$bus.$emit('Register\Transfer\PanelSearch:Search')
        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    /**
     * Seta dados no formulário para edição
     * @param data
     */
    edit (data) {
      const dataForEdit = Object.assign({}, data)
      dataForEdit.contract = dataForEdit.contract.toUpperCase()
      dataForEdit.immobile_code = dataForEdit.immobile_code.toUpperCase()
      dataForEdit.address = dataForEdit.address.toUpperCase()
      dataForEdit.neighborhood = dataForEdit.neighborhood.toUpperCase()
      dataForEdit.owner = dataForEdit.owner.toUpperCase()
      dataForEdit.transfer_date = dateFormat(dataForEdit.transfer_date)

      $("#reason").val(dataForEdit.reason_id).trigger("chosen:updated")


      dataForEdit.historic_data = {
        historic: ''
      }

      this.form = dataForEdit
    },
    /**
     * Atualiza os dados
     */
    update () {
      if (this.form.status === 'c') {
        this.$bus.$emit('Register\Transfer\Contract:OpenModalReasonCancel', this.form)
        return
      }

      this.message_load = 'Processando sua solicitação, aguarde ...'
      this.load_data = true

      http.put(`register/transfer/contract/${this.form.id}`, this.form).then((res) => {
        this.getContractTransfer(this.form.id)
        this.getResponsibleForFilterContractsTransfer()
        this.$bus.$emit('Register\Transfer\PanelSearch:Search')
        this.$bus.$emit('CleanHistoric')
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
        contract: '',
        immobile_code: '',
        address: '',
        neighborhood: '',
        value: 0,
        owner: '',
        owner_phone_residential: '',
        owner_phone_commercial: '',
        owner_cell_phone: '',
        owner_email: '',
        transfer_date: window.moment().format('DD/MM/YYYY'),
        reason_id: '',
        new_contract: '',
        status: 'p',
        responsible_transfer_id: '',
        requester_name: '',
        requester_phone_01: '',
        requester_phone_02: '',
        requester_phone_03: '',
        requester_email: '',
        historic_data: {
          historic: ''
        }
      }

      this.validation.reset()
    }
  },
  computed: {
    ...mapState('Register', ['reasons_transfer', 'contract_transfer_edit_current'])
  },
  watch: {
    dataModalOpened () {

      this.cleanForm()
      this.message_load = 'Carregando dados, aguarde ...'
      this.load_data = true
      this.load_responsible_transfer = true

      if (this.dataModalOpened.type_action === 'new_transfer') {
        this.CLEAN_EDIT_CONTRACT_TRANSFER_CURRENT()
        this.CLEAN_HISTORIC_CONTRACT_TRANSFER()

        this.getReasonsTransfer().then(res => {

          setTimeout(() => {
            this.load_data = false
          }, 600)

        }).catch(() => {
          this.load_data = false
        })

      }

      this.getResponsible()
      this.chosenSelect()


      if (this.contract_transfer_edit_current.id) {

        // pega os motivos
        this.getReasonsTransfer().then(res => {

          setTimeout(() => {
            this.edit(this.contract_transfer_edit_current)
          }, 500)

          setTimeout(() => {
            this.load_data = false
          }, 600)

        }).catch(() => { this.load_data = false })
      }

    },
    'form.status' () {
      if (this.form.status != 'r') {
        this.form.new_contract = ''
      }
    }
  },
  mounted () {
    this.$bus.$on('Register\Transfer\Contract:SubmitForm', () => {
      this.submitForm()
    })

    this.$bus.$on('Sicadi:DataExported', (data) => {
      this.setFormData(data)
    })
  }
}
</script>