<template>


 <div v-loading="load_data" :element-loading-text="message_load">

   <div style="float: right" v-show="form.contract && form.immobile_code">
     <button class="button btn btn-primary btn-sm" @click="$emit('openModalGuarantors', form.contract)">
       Fiadores do Contrato
     </button>
   </div>

   <!-- dados do imóvel -->
   <div class="title-form">
     Dados do Imóvel
   </div>

   <hr class="h-row">
   <div class="row">

     <div class="col-md-2 div-140" :class="{error: validation.hasError('form.contract'), 'has-error': validation.hasError('form.contract')}">
       <label>Contrato <span class="required">*</span></label>
       <input type="text" class="form-control input-sm" v-model="form.contract" @keypress.enter="getImmobileDataPerContract" :disabled="disabledInput">
       <div class="message">{{ validation.firstError('form.contract') }}</div>
     </div>

     <div class="col-md-2 div-140" :class="{error: validation.hasError('form.immobile_code'), 'has-error': validation.hasError('form.immobile_code')}">
       <label>Código <span class="required">*</span></label>
       <input type="text" class="form-control input-sm" v-model="form.immobile_code" disabled>
       <div class="message">{{ validation.firstError('form.immobile_code') }}</div>
     </div>

     <div class="col-md-4 col-lg-3" :class="{error: validation.hasError('form.address'), 'has-error': validation.hasError('form.address')}">
       <label>Endereço <span class="required">*</span></label>
       <input type="text" class="form-control input-sm" v-model="form.address" disabled>
       <div class="message">{{ validation.firstError('form.address') }}</div>
     </div>

     <div class="col-md-3 col-lg-2" :class="{error: validation.hasError('form.neighborhood'), 'has-error': validation.hasError('form.neighborhood')}">
       <label>Bairro <span class="required">*</span></label>
       <input type="text" class="form-control input-sm" v-model="form.neighborhood" disabled>
       <div class="message">{{ validation.firstError('form.neighborhood') }}</div>
     </div>

     <div class="col-md-2 div-140" :class="{error: validation.hasError('form.value'), 'has-error': validation.hasError('form.value')}">
       <label>Valor <span class="required">*</span></label>
       <money class="form-control input-sm" v-model="form.value" disabled></money>
       <div class="message">{{ validation.firstError('form.value') }}</div>
     </div>

   </div>
   <!-- / dados do imóvel -->


   <!-- dados do proprietário -->
   <div class="title-form" style="margin-top: 20px">Dados do Proprietário</div>
   <hr class="h-row">
   <div class="row sp-row">

     <div class="col-md-4 col-lg-3" :class="{error: validation.hasError('form.owner'), 'has-error': validation.hasError('form.owner')}">
       <label>Proprietário <span class="required">*</span></label>
       <input type="text" class="form-control input-sm" v-model="form.owner" >
       <div class="message">{{ validation.firstError('form.owner') }}</div>
     </div>

     <div class="col-md-2 div-140">
       <label>Telefone</label>
       <the-mask class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']" v-model="form.owner_phone_residential" />
     </div>

     <div class="col-md-2 div-140">
       <label>Telefone</label>
       <the-mask class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']" v-model="form.owner_phone_commercial" />
     </div>

     <div class="col-md-2 div-140">
       <label>Telefone</label>
       <the-mask class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']" v-model="form.owner_cell_phone" />
     </div>

     <div class="col-md-3" :class="{error: validation.hasError('form.owner_email'), 'has-error': validation.hasError('form.owner_email')}">
       <label>Email</label>
       <input type="text" class="form-control input-sm" v-model="form.owner_email">
       <div class="message">{{ validation.firstError('form.owner_email') }}</div>
     </div>

   </div>
   <!-- / dados do proprietário -->

   <!-- dados do inquilino -->
   <div class="title-form" style="margin-top: 20px">Dados do Inquilino</div>
   <hr class="h-row">
   <div class="row sp-row">

     <div class="col-md-4 col-lg-3" :class="{error: validation.hasError('form.tenant'), 'has-error': validation.hasError('form.tenant')}">
       <label>Inquilino <span class="required">*</span></label>
       <input type="text" class="form-control input-sm" v-model="form.tenant">
       <div class="message">{{ validation.firstError('form.tenant') }}</div>
     </div>

     <div class="col-md-2 div-140">
       <label>Telefone</label>
       <the-mask type="text" class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']" v-model="form.tenant_phone_residential" />
     </div>

     <div class="col-md-2 div-140">
       <label>Telefone</label>
       <the-mask type="text" class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']" v-model="form.tenant_phone_commercial" />
     </div>

     <div class="col-md-2 div-140">
       <label>Telefone</label>
       <the-mask type="text" class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']" v-model="form.tenant_cell_phone" />
     </div>

     <div class="col-md-3" :class="{error: validation.hasError('form.tenant_email'), 'has-error': validation.hasError('form.tenant_email')}">
       <label>Email</label>
       <input type="text" class="form-control input-sm" v-model="form.tenant_email">
       <div class="message">{{ validation.firstError('form.tenant_email') }}</div>
     </div>

   </div>
   <!-- / dados do inquilino -->


   <!-- dados da rescisão -->
   <div class="title-form" style="margin-top: 20px">Dados da Rescisão</div>
   <hr class="h-row">
   <div class="row sp-row">

     <div class="col-md-2" :class="{error: validation.hasError('form.type_register'), 'has-error': validation.hasError('form.type_register')}">
       <label>Ação <span class="required">*</span></label>
       <select class="form-control input-sm" v-model="form.type_register">
         <option value="termination">Rescisão</option>
         <option value="transfer">Transferência</option>
       </select>
       <div class="message">{{ validation.firstError('form.type_register') }}</div>
     </div>
     
     <div class="col-md-3 col-lg-2" :class="{error: validation.hasError('form.reason_id'), 'has-error': validation.hasError('form.reason_id')}">
       <label>Motivo <span class="required">*</span></label>
       <select class="form-control chosen input-sm" data-placeholder="Informe o motivo" id="reason" v-model="form.reason_id" style="height: 20px !important;">
         <option :value="reason.id" v-for="reason in select_destination_or_reason.reasons">{{wordUpper(reason.text)}}</option>
       </select>
       <div class="message">{{ validation.firstError('form.reason_id') }}</div>
     </div>

     <div class="col-md-2 col-lg-1" :class="{error: validation.hasError('form.rent_again'), 'has-error': validation.hasError('form.rent_again')}">
       <label>Alugou Novamente ? <span class="required">*</span></label>
       <select class="form-control input-sm" v-model="form.rent_again">
         <option value="y">Sim</option>
         <option value="n">Não</option>
       </select>
       <div class="message">{{ validation.firstError('form.rent_again') }}</div>
     </div>

     <div class="col-md-2" v-show="form.rent_again === 'y'" :class="{error: validation.hasError('form.destination_id'), 'has-error': validation.hasError('form.destination_id')}">
       <label>Destino <span class="required">*</span></label>
       <select class="form-control chosen input-sm" data-placeholder="Informe o motivo" id="reason" style="height: 20px !important;" v-model="form.destination_id">
         <option :value="destination.id" v-for="destination in select_destination_or_reason.destinations">{{wordUpper(destination.text)}}</option>
       </select>
       <div class="message">{{ validation.firstError('form.destination_id') }}</div>
     </div>

     <div class="col-md-2" v-show="form.type_register === 'transfer'" :class="{error: validation.hasError('form.rp_register_sector'), 'has-error': validation.hasError('form.rp_register_sector')}">
       <label>Resp Cadastro <span class="required">*</span></label>
       <select class="form-control chosen input-sm" data-placeholder="Informe o responsável" id="rp_register_sector" v-model="form.rp_register_sector">
         <option value=""></option>
         <option v-for="user in users" :value="user.id">{{wordUpper(`${user.name} ${user.last_name}`)}}</option>
       </select>
       <div class="message">{{ validation.firstError('form.rp_register_sector') }}</div>
     </div>

     <div class="col-md-2 div-140" v-show="form.type_register === 'transfer'" :class="{error: validation.hasError('form.new_contract_code'), 'has-error': validation.hasError('form.new_contract_code')}">
       <label>Contrato <span class="required">*</span></label>
       <input type="text" class="form-control input-sm" v-model="form.new_contract_code">
       <div class="message">{{ validation.firstError('form.new_contract_code') }}</div>
     </div>

   </div>
   <div class="row" style="margin-top: 20px">
     <div class="col-md-1 div-120" :class="{error: validation.hasError('form.caveat'), 'has-error': validation.hasError('form.caveat')}">
       <label>Ressalva <span class="required">*</span></label>
       <select class="form-control input-sm" v-model="form.caveat">
         <option value="y">Sim</option>
         <option value="n">Não</option>
       </select>
       <div class="message">{{ validation.firstError('form.caveat') }}</div>
     </div>

     <div class="col-md-3 col-lg-2" :class="{error: validation.hasError('form.surveyor_id'), 'has-error': validation.hasError('form.surveyor_id')}"
          v-show="form.type_register === 'termination' && !form.survey_release">
       <label>Vistoriador <span class="required">*</span></label>
       <select class="form-control chosen input-sm" data-placeholder="Vistoriador" id="surveyor_id" v-model="form.surveyor_id">
         <option value=""></option>
         <option v-for="user in users" :value="user.id">{{wordUpper(`${user.name} ${user.last_name}`)}}</option>
       </select>
       <div class="message">{{ validation.firstError('form.surveyor_id') }}</div>
     </div>

     <div class="col-md-1" style="margin-top: 25px; width: 60px">
       <input type="checkbox" id="survey_release" title="Liberação de vistoria" v-model="form.survey_release"/>
       <label title="Sem vistoria"> SV</label>
     </div>

     <div class="col-md-3 col-lg-2" :class="{error: validation.hasError('form.rp_per_inactive'), 'has-error': validation.hasError('form.rp_per_inactive')}">
       <label>Resp Inativação <span class="required">*</span></label>
       <select class="form-control chosen input-sm" data-placeholder="Resp Inativação" id="rp_per_inactive" v-model="form.rp_per_inactive">
         <option value=""></option>
         <option v-for="user in users" :value="user.id">{{wordUpper(`${user.name} ${user.last_name}`)}}</option>
       </select>
       <div class="message">{{ validation.firstError('form.rp_per_inactive') }}</div>
     </div>

     <div class="col-md-2 div-140">
       <label title="Ultima atendente" style="font-weight: bold">Ul. Atendente</label>
       <p style="margin-top: 7px; font-weight: bold; color: red" :title="last_attendances.length ? wordUpper(last_attendances[0].name) : null">
         {{last_attendances.length ? strLimit(wordUpper(last_attendances[0].name), 13) : ' - '}}
       </p>
     </div>

     <div class="col-md-2 div-140">
       <label title="Ultima atendente">Pen. Atendente</label>
       <p style="margin-top: 7px" :title="last_attendances.length === 2 ? wordUpper(last_attendances[1].name) : null">
         {{last_attendances.length === 2 ? strLimit(wordUpper(last_attendances[1].name), 13) : ' - '}}
       </p>
     </div>


   </div>
   <div class="row" style="margin-top: 20px">

     <div class="col-md-2" :class="{error: validation.hasError('form.immobile_type'), 'has-error': validation.hasError('form.immobile_type')}">
       <label>Tipo Imóvel <span class="required">*</span></label>
       <input type="text" class="form-control input-sm" v-model="form.immobile_type">
       <div class="message">{{ validation.firstError('form.immobile_type') }}</div>
     </div>

     <div class="col-md-2" :class="{error: validation.hasError('form.type_location'), 'has-error': validation.hasError('form.type_location')}">
       <label>Tipo Locação <span class="required">*</span></label>
       <select class="form-control input-sm" v-model="form.type_location">
         <option value="">Informe</option>
         <option value="re">Residencial</option>
         <option value="co">Não Residencial</option>
       </select>
       <div class="message">{{ validation.firstError('form.type_location') }}</div>
     </div>

     <div class="col-md-2 div-140" :class="{error: validation.hasError('form.termination_date'), 'has-error': validation.hasError('form.termination_date')}">
       <label>INATIVAÇÃO <span class="required">*</span></label>
       <date-picker class="form-control input-sm" v-model="form.termination_date" placeholder="dd/mm/aaaa" />
       <div class="message">{{ validation.firstError('form.termination_date') }}</div>
     </div>

     <div class="col-md-3 col-lg-2" :class="{error: validation.hasError('form.status'), 'has-error': validation.hasError('form.status')}">
       <label>Status <span class="required">*</span></label>
       <select class="form-control input-sm" v-model="form.status" :disabled="disabledUpdate">
         <option value="p">Pendente</option>
         <option value="r">Resolvido</option>
         <option value="a">Acordo</option>
         <option value="j">Justiça</option>
         <option value="cej">Cob.Ext.Jud</option>
         <option value="c">Cancelado</option>
       </select>
       <div class="message">{{ validation.firstError('form.status') }}</div>
     </div>

     <div class="col-md-2 div-140" :class="{error: validation.hasError('form.end_process'), 'has-error': validation.hasError('form.end_process')}" v-show="form.status != 'p' && form.status != 'c'">
       <label>Rescisão <span class="required">*</span></label>
       <date-picker class="form-control input-sm" v-model="form.end_process" placeholder="dd/mm/aaaa" :disabled="disabledUpdate"/>
       <div class="message">{{ validation.firstError('form.end_process') }}</div>
     </div>

   </div>
   <div class="row" style="margin-top: 20px">
     <div class="col-md-12" :class="{error: validation.hasError('form.observation'), 'has-error': validation.hasError('form.observation')}">
       <label>Ressalvas</label>
       <textarea placeholder="Ressalvas ..." rows="8" class="form-control" :disabled="form.caveat === 'n'" v-model="form.observation"></textarea>
       <div class="message">{{ validation.firstError('form.observation') }}</div>
     </div>
   </div>
   <!-- / dados da rescisão -->

   <!-- historicos -->
   <div class="title-form" style="margin-top: 20px" v-show="form.id">Histórico</div>
   <hr class="h-row" v-show="form.id">
   <div class="row sp-row" v-show="form.id">
     <div class="col-md-12">
       <editor @textEditor="text => form.historic = text"/>
     </div>
   </div>

   <div class="row sp-row" v-show="form.id">
     <div class="col-md-12">

       <table-list-historics :dataContract="data_historic" />

     </div>
   </div>

   <!-- / históricos -->

   <br />

 </div>


</template>

<script>
import {mapActions, mapState} from 'vuex'
import {wordUpper, strLimit} from '@/util/stringHelpers'
import DatePicker from '@/components/DatePicker'
import Editor from '@/components/Editor'
import TableListHistorics from './TableListHistorics'

export default {
  props: {
    dataModalOpened: {
      required: true,
      type: Object
    }
  },
  components: {
    DatePicker,
    Editor,
    TableListHistorics
  },
  data () {
    return {
      message_load: 'Consultando informações, aguarde...',
      load_data: false,
      last_attendances: [],
      form: {
        // dados do imóvel
        contract: '',
        immobile_code: '',
        address: '',
        neighborhood: '',
        value: '',
        // dados do proprietário
        owner: '',
        owner_phone_residential: '',
        owner_phone_commercial: '',
        owner_cell_phone: '',
        owner_email: '',
        // dados do inquilino
        tenant: '',
        tenant_phone_residential: '',
        tenant_phone_commercial: '',
        tenant_cell_phone: '',
        tenant_email: '',
        // dados da rescisão
        type_register: 'termination',
        reason_id: '',
        rent_again: 'n',
        destination_id: '',
        rp_register_sector: '',
        new_contract_code: '',
        caveat: 'n',
        surveyor_id: '',
        survey_release: false,
        rp_per_inactive: '',
        immobile_type: '',
        type_location: 're',
        termination_date: '',
        status: 'p',
        end_process: '',
        observation: '',
        historic: ''
      },
      form_before_update: {},
      data_historic: {},
      select_destination_or_reason: {
        destinations: [],
        reasons: []
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
      if (this.form.value === 0) {
        return Validator.custom(function () {
          var number = parseInt(value)
          if (number === 0) {
            return 'Obrigatório'
          }
          if (!value) {
            return 'Obrigatório'
          }
        })
      }
    },
    'form.owner': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.tenant': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.type_register': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.reason_id': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.rent_again': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.destination_id': function (value) {
      if (this.form.rent_again === 'y') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.rp_register_sector': function (value) {
      if (this.form.type_register === 'transfer') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.new_contract_code': function (value) {
      if (this.form.type_register === 'transfer') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.caveat': function (value) {
      if (this.form.type_register === 'termination') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.surveyor_id': function (value) {
      if (this.form.type_register === 'termination' && !this.form.survey_release) {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.rp_per_inactive': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.immobile_type': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.type_location': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.termination_date': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.status': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.observation': function (value) {
      if (this.form.caveat === 'y') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.end_process': function (value) {
      if (this.form.status !== 'p' && this.form.status !== 'c') {
        return Validator.value(value).required('Obrigatório')
      }
    }
  },
  methods: {
    ...mapActions('Sicadi', ['getImmobileData']),
    ...mapActions('Termination', ['getDestinationAndReason', 'getAllResponsible']),
    ...mapActions('Auth', ['getAllUsers']),
    wordUpper,
    strLimit,
    /**
     * pega o ultimo e penultimo responsável pelo atendimento
     */
    getLastAttendances () {
      http.get('termination/query/last-attendances').then(res => {
        this.last_attendances = res.data
      }).catch(() => {})
    },
    /**
     * verifica qual o proximo atendente
     */
    getNextAttendance () {
      http.get('termination/score/get-next-attendance').then(res => {
        if (res.data.attendant_id) {
          this.form.rp_per_inactive = res.data.attendant_id
        }
      }).catch(() => {})
    },
    getImmobileDataPerContract () {

      if (this.form.contract.length < 4) return

      this.load_data = true

      const queryParams = {
        params: {
          query_by: 'contract',
          value_query: this.form.contract,
        }
      }

      this.getImmobileData(queryParams).then(res => {

        if (res.data.length === 1) {
          this.setFormData(res.data[0])
          return
        }

        // abre a modal para escolha dos resultados
        if (res.data.length > 1) {
          setTimeout(() => {
            this.load_data = false
          }, 600)
          return
        }

        if (!res.data.length) {
          _notification.warning('Nenhum resultado encontrado !')
          setTimeout(() => {
            this.load_data = false
          }, 600)
        }

      }).catch(() => {
        this.load_data = false
      })

    },
    setFormData (data) {
      this.form.contract = data.contract.toUpperCase()
      this.form.immobile_code = data.immobile_code.toUpperCase()
      this.form.address = wordUpper(data.address)
      this.form.neighborhood = wordUpper(data.neighborhood)
      this.form.value = parseFloat(data.value)
      this.form.owner = wordUpper(data.owner)
      this.form.owner_phone_residential = data.owner_phone_residential
      this.form.owner_phone_commercial = data.owner_phone_commercial
      this.form.owner_cell_phone = data.owner_cell_phone
      this.form.owner_email = data.owner_email
      this.form.tenant = wordUpper(data.tenant)
      this.form.tenant_phone_residential = data.tenant_phone_residential
      this.form.tenant_phone_commercial = data.tenant_phone_commercial
      this.form.tenant_cell_phone = data.tenant_cell_phone
      this.form.tenant_email = data.tenant_email
      this.form.immobile_type = wordUpper(data.immobile_type)
      this.form.type_location = !data.type_location ? '' : data.type_location

      this.checkContractAlreadyRelease()
    },
    /**
     * metodo para verificar se o contrato esta lançado no sistema
     */
    checkContractAlreadyRelease () {

      http.get(`termination/query/contract-already-release/${this.form.contract}`).then(res => {

        if (res.data.error) {
          _notification.error(`Contrato ${this.form.contract} já lançado no sistema !`, 350)
          this.cleanForm()
        }

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
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

      $('#rp_register_sector').on('change', function(evt, params) {
        self.form.rp_register_sector = params ? params.selected : ''
      })

      $('#surveyor_id').on('change', function (evt, params) {
        self.form.surveyor_id = params ? params.selected : ''
      })

      $('#rp_per_inactive').on('change', function(evt, params) {
        self.form.rp_per_inactive = params ? params.selected : ''
      })

    },
    /**
     * Seta destino e motivo no select
     */
    setDestinationAndReason () {

      this.select_destination_or_reason = {
        destinations: [],
        reasons: []
      }

      this.destination_or_reason.forEach(data => {

        if (data.type === 'reason') {
          this.select_destination_or_reason.reasons.push(data)
        }

        if (data.type === 'destination') {
          this.select_destination_or_reason.destinations.push(data)
        }

      })

    },
    submitFormContract () {
      const self = this
      this.$validate()
      .then(function (success) {
        if (success) {
          if (!self.form.id) {
            self.save()
            return
          }
          self.update()
        }
      })
    },
    save () {
      this.message_load = 'Processando sua solicitação, aguarde ...'
      this.load_data = true

      http.post('termination/contract', this.form).then(res => {
        this.$emit('edit', res.data.id)
        this.$bus.$emit('Termination\Contract:RefreshList')
        this.cleanForm()
        _notification.success()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })

    },
    edit (dataEdit) {
      dataEdit.immobile_type = this.wordUpper(dataEdit.immobile_type)
      dataEdit.termination_date = moment(dataEdit.termination_date).format('DD/MM/YYYY')

      this.form = dataEdit
      this.form_before_update = Object.assign({}, dataEdit)

      this.data_historic = {
        contract_id: dataEdit.id
      }

    },
    update () {

      if (this.disabledUpdate) {
        _notification.error('O status atual não permite alterações')
        return
      }

      this.load_data = true

      http.put(`termination/contract/${this.form.id}`, this.form).then(res => {
        _notification.success()

        // atualiza lista de contratos
        this.$bus.$emit('Termination\Contract:RefreshList')

        // atualiza lista de históricos
        this.$bus.$emit('CleanHistoric')

        // verifica se foi alterado responsavel para atualizar a lista
        if (parseInt(this.form.rp_per_inactive) !== parseInt(this.form_before_update.rp_per_inactive)) {
          this.getLastAttendances()
          this.getAllResponsible()
        }

        this.edit(res.data)

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    cleanForm () {

      this.form = {
        // dados do imóvel
        contract: '',
        immobile_code: '',
        address: '',
        neighborhood: '',
        value: '',
        // dados do proprietário
        owner: '',
        owner_phone_residential: '',
        owner_phone_commercial: '',
        owner_cell_phone: '',
        owner_email: '',
        // dados do inquilino
        tenant: '',
        tenant_phone_residential: '',
        tenant_phone_commercial: '',
        tenant_cell_phone: '',
        tenant_email: '',
        // dados da rescisão
        type_register: 'termination',
        reason_id: '',
        rent_again: 'n',
        destination_id: '',
        rp_register_sector: '',
        new_contract_code: '',
        caveat: 'n',
        surveyor_id: '',
        survey_release: false,
        rp_per_inactive: '',
        immobile_type: '',
        type_location: 're',
        termination_date: '',
        status: 'p',
        end_process: '',
        observation: '',
        historic: ''
      }

      this.validation.reset()
    }
  },
  computed: {
    ...mapState('Termination', ['destination_or_reason']),
    ...mapState('Auth', ['users']),
    disabledInput () {
      if (this.form.id) {
        return true
      }

      return false
    },
    disabledUpdate () {
      if (this.form_before_update.status !== 'p') {
        return true
      }

      return false
    }
  },
  watch: {
    dataModalOpened () {
      this.getLastAttendances()

      this.cleanForm()

      this.load_data = true

      this.chosenSelect()

      // pega destinos e motivos
      this.getDestinationAndReason().then(res => {

        // pega usuários
        this.getAllUsers().then(res => {

          setTimeout(() => {
            $(".chosen").trigger("chosen:updated")
          }, 200)


          // Dados para edição
          if (this.dataModalOpened.type_action === 'edit') {
            this.edit(this.dataModalOpened.data)
          }

          // verifica qual o proximo atendente
          this.getNextAttendance()

        })

      })

      setTimeout(() => {
        this.load_data = false
      }, 1000)
    },
    destination_or_reason () {
      this.setDestinationAndReason()
    },
    'form.status' () {
      if (this.form.status != 'c' || this.form.status != 'p') {
        this.form.end_process = moment().format('DD/MM/YYYY')
      }
    }
  },
  mounted () {
    this.$bus.$on('Sicadi:DataExported', (data) => {
      this.setFormData(data)
    })

    this.$bus.$on('Termination\Contract:SubmitFomContract', () => {
      this.submitFormContract()
    })
  }
}
</script>

<style scoped>

  .sp-row {
    margin-top: 10px !important;
  }

</style>