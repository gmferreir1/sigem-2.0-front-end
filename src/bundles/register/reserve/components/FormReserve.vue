<template>

  <div v-loading="load_data" :element-loading-text="message_load">

    <!-- dados do imóvel -->
    <div class="title-form">
      Dados do Imóvel
    </div>
    <hr class="h-row">
    <div class="row">

      <div class="col-md-2 col-lg-2 div-120" style="padding-right: 0px" :class="{error: validation.hasError('form.immobile_code')}">
        <label title="Código imóvel">Cod.Imóvel <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.immobile_code"
               @blur="getImmobileDataPerCode" @keyup.enter="getImmobileDataPerCode" :disabled="contract_edit_current.id">
        <div class="message">{{ validation.firstError('form.immobile_code') }}</div>
      </div>

      <div class="col-md-3 col-lg-3" :class="{error: validation.hasError('form.address')}">
        <label>Endereço <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.address">
        <div class="message">{{ validation.firstError('form.address') }}</div>
      </div>
      <div class="col-md-3 col-lg-2" :class="{error: validation.hasError('form.neighborhood')}">
        <label>Bairro <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.neighborhood">
        <div class="message">{{ validation.firstError('form.neighborhood') }}</div>
      </div>
      <div class="col-md-2 col-lg-2 div-160" :class="{error: validation.hasError('form.type_location')}">
        <label title="Tipo de Locação">Tp. Locação <span class="required">*</span></label>
        <select class="form-control input-sm" v-model="form.type_location">
          <option value="">Informe</option>
          <option value="c">Comercial</option>
          <option value="r">Residencial</option>
        </select>
        <div class="message">{{ validation.firstError('form.type_location') }}</div>
      </div>

      <div class="col-md-2">
        <label>Tipos Imóvel <span class="required">*</span></label>
        <immobile-type-available :setData="form.immobile_type"/>
      </div>
      <div class="col-md-2 col-lg-2 div-140" :class="{error: validation.hasError('form.value')}">
        <label>Valor Anunciado<span class="required">*</span></label>
        <money v-model="form.value" class="form-control input-sm"/>
        <div class="message">{{ validation.firstError('form.value') }}</div>
      </div>
      <div class="col-md-2 col-lg-2 div-140" :class="{error: validation.hasError('form.value_negotiated')}">
        <label>Valor Negociado <span class="required">*</span></label>
        <money v-model="form.value_negotiated" class="form-control input-sm" id="value_negotiated"/>
        <div class="message">{{ validation.firstError('form.value_negotiated') }}</div>
      </div>
    </div>
    <!-- / dados do imóvel -->

    <!-- dados da reserva -->
    <div class="title-form">
      Dados da Reserva
    </div>
    <hr class="h-row">
    <div class="row" style="margin-top: 10px">
      <div class="col-md-2 col-lg-2 div-120" v-if="form.id">
        <label>Cod.Reserva</label>
        <input type="text" class="form-control input-sm" v-model="form.code_reserve" disabled>
      </div>
      <div class="col-md-2 col-lg-2 div-120" :class="{error: validation.hasError('form.date_reserve')}">
        <label>Reserva <span class="required">*</span></label>
        <date-picker class="form-control input-sm" placeholder="dd/mm/aaaa" v-model="form.date_reserve"/>
        <div class="message">{{ validation.firstError('form.date_reserve') }}</div>
      </div>
      <div class="col-md-2 col-lg-1 div-120" :class="{error: validation.hasError('form.prevision')}" v-if="fields_before_assigned">
        <label>Previsão <span class="required">*</span></label>
        <date-picker class="form-control input-sm" placeholder="dd/mm/aaaa" v-model="form.prevision"/>
        <div class="message">{{ validation.firstError('form.prevision') }}</div>
      </div>
      <div class="col-md-2" style="width: 180px" :class="{error: validation.hasError('form.situation')}">
        <label>Situação <span class="required">*</span></label>
        <select class="form-control input-sm" v-model="form.situation"
                :disabled="!form.id">
          <option value="r">Reserva</option>
          <option value="d">Documentação</option>
          <option value="a" >Análise</option>
          <option value="cd" >Cadastro</option>
          <option value="p" >Pendente</option>
          <option value="as" >Assinado</option>
          <option value="ap">Ass. com Pendência</option>
          <option value="af">At. Finais</option>
          <option value="c">Cancelado</option>
        </select>
        <div class="message">{{ validation.firstError('form.situation') }}</div>
      </div>

      <div class="col-md-2 col-lg-2 div-120" :class="{error: validation.hasError('form.contract')}" v-if="fields_after_assigned">
        <label>Contrato <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.contract" @blur="checkContractIsRelease" @keypress.enter="checkContractIsRelease">
        <div class="message">{{ validation.firstError('form.contract') }}</div>
      </div>
      <div class="col-md-2 col-lg-2 div-140" :class="{error: validation.hasError('form.conclusion')}" v-if="fields_after_assigned">
        <label title="Data entrega das chaves">Ent. Chaves <span class="required">*</span></label>
        <date-picker type="text" class="form-control input-sm" v-model="form.conclusion" placeholder="dd/mm/aaaa"/>
        <div class="message">{{ validation.firstError('form.conclusion') }}</div>
      </div>
      <div class="col-md-2 col-lg-2 div-120" :class="{error: validation.hasError('form.deadline')}" v-if="fields_after_assigned">
        <label>Prazo(meses) <span class="required">*</span></label>
        <select class="form-control input-sm" v-model="form.deadline">
          <option value="">Informe</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
          <option value="48">48</option>
          <option value="60">60</option>
          <option value="72">72</option>
          <option value="84">84</option>
          <option value="96">96</option>
          <option value="108">108</option>
          <option value="120">120</option>
          <option value="132">132</option>
        </select>
        <div class="message">{{ validation.firstError('form.deadline') }}</div>
      </div>
      <div class="col-md-2 col-lg-2" style="width: 80px;" :class="{error: validation.hasError('form.taxa')}" v-if="fields_after_assigned">
        <label>Taxa %<span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.taxa">
        <div class="message">{{ validation.firstError('form.taxa') }}</div>
      </div>
    </div>

    <div class="row" style="margin-top: 20px" v-if="fields_after_assigned">
      <div class="col-md-3 col-lg-2" :class="{error: validation.hasError('form.observation')}">
        <label>Origem <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.observation">
        <div class="message">{{ validation.firstError('form.observation') }}</div>
      </div>

      <div class="col-md-3 col-lg-2" :class="{error: validation.hasError('form.origin_city')}">
        <label>Cidade Origem <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.origin_city">
        <div class="message">{{ validation.firstError('form.origin_city') }}</div>
      </div>

      <div class="col-md-2 col-lg-2 div-140" :class="{error: validation.hasError('form.origin_state')}">
        <label>Estado Origem <span class="required">*</span></label>
        <select class="form-control input-sm" v-model="form.origin_state">
          <option value="">Informe</option>
          <option value="ac">AC</option>
          <option value="al">AL</option>
          <option value="ap">AP</option>
          <option value="am">AM</option>
          <option value="ba">BA</option>
          <option value="ce">CE</option>
          <option value="df">DF</option>
          <option value="es">ES</option>
          <option value="go">GO</option>
          <option value="ma">MA</option>
          <option value="mt">MT</option>
          <option value="ms">MS</option>
          <option value="mg">MG</option>
          <option value="pa">PA</option>
          <option value="pb">PB</option>
          <option value="pr">PR</option>
          <option value="pe">PE</option>
          <option value="pi">PI</option>
          <option value="rj">RJ</option>
          <option value="rn">RN</option>
          <option value="rs">RS</option>
          <option value="ro">RO</option>
          <option value="rr">RR</option>
          <option value="sc">SC</option>
          <option value="sp">SP</option>
          <option value="se">SE</option>
          <option value="to">TO</option>
        </select>
        <div class="message">{{ validation.firstError('form.origin_state') }}</div>
      </div>

      <div class="col-md-2 col-lg-2 div-140" :class="{error: validation.hasError('form.finality')}">
        <label>Finalidade <span class="required">*</span></label>
        <select class="form-control input-sm" v-model="form.finality">
          <option value="">Informe</option>
          <option value="c">Comercio</option>
          <option value="e">Estudante</option>
          <option value="t">Trabalho</option>
          <option value="r">Residencial</option>
        </select>
        <div class="message">{{ validation.firstError('form.finality') }}</div>
      </div>
    </div>
    <!-- / dados da reserva -->

    <!-- dados do cliente -->
    <div class="title-form">
      Dados do cliente
    </div>
    <hr class="h-row">
    <div class="row" style="margin-top: 10px; margin-bottom: 10px;">
      <div class="col-md-2 col-lg-2" style="width: 160px" :class="{error: validation.hasError('form.client_cpf')}">
        <label>CPF</label>
        <the-mask class="form-control input-sm" :mask="['###.###.###-##']" v-model="form.client_cpf" placeholder="som. números"
                  @blur.native="getClientData" @keypress.enter.native="getClientData" :disabled="disabledEdit"/>
        <div class="message">{{ validation.firstError('form.client_cpf') }}</div>
      </div>
      <div class="col-md-3 col-lg-4" :class="{error: validation.hasError('form.client_name')}">
        <label>Cliente <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.client_name" ref="client_name">
        <div class="message">{{ validation.firstError('form.client_name') }}</div>
      </div>
      <div class="col-md-2 col-lg-2" style="width: 160px">
        <label>RG</label>
        <input type="text" class="form-control input-sm" v-model="form.client_rg">
      </div>
      <div class="col-md-2 col-lg-2">
        <label>Profissão</label>
        <input type="text" class="form-control input-sm" v-model="form.client_profession">
      </div>
      <div class="col-md-2 col-lg-2">
        <label>Empresa</label>
        <input type="text" class="form-control input-sm" v-model="form.client_company">
      </div>
    </div>

    <div class="row">
      <div class="col-md-2 div-140">
        <span v-if="load_data_query_cep">
            <img :src="images.loading" style="position: absolute; right: 60px; top: 20px;"/>
          </span>
        <label>
          CEP
        </label>
        <the-mask type="text" class="form-control input-sm" :mask="['#####-###']" v-model="form.client_zip_code" placeholder="som. números"
                  @blur.native="queryZipCode(form.client_zip_code)" @keypress.enter.native="queryZipCode(form.client_zip_code)"
                  :disabled="load_data_query_cep || disabledEdit"/>
      </div>
      <div class="col-md-3 col-lg-4">
        <label>Endereço</label>
        <input type="text" class="form-control input-sm" v-model="form.client_address">
      </div>
      <div class="col-md-3 col-lg-3">
        <label>Bairro</label>
        <input type="text" class="form-control input-sm" v-model="form.client_neighborhood">
      </div>
      <div class="col-md-3 col-lg-2">
        <label>Cidade</label>
        <input type="text" class="form-control input-sm" v-model="form.client_city">
      </div>
      <div class="col-md-2 col-lg-1">
        <label>Estado</label>
        <select class="form-control input-sm" v-model="form.client_state">
          <option value="">Informe</option>
          <option value="ac">AC</option>
          <option value="al">AL</option>
          <option value="ap">AP</option>
          <option value="am">AM</option>
          <option value="ba">BA</option>
          <option value="ce">CE</option>
          <option value="df">DF</option>
          <option value="es">ES</option>
          <option value="go">GO</option>
          <option value="ma">MA</option>
          <option value="mt">MT</option>
          <option value="ms">MS</option>
          <option value="mg">MG</option>
          <option value="pa">PA</option>
          <option value="pb">PB</option>
          <option value="pr">PR</option>
          <option value="pe">PE</option>
          <option value="pi">PI</option>
          <option value="rj">RJ</option>
          <option value="rn">RN</option>
          <option value="rs">RS</option>
          <option value="ro">RO</option>
          <option value="rr">RR</option>
          <option value="sc">SC</option>
          <option value="sp">SP</option>
          <option value="se">SE</option>
          <option value="to">TO</option>
        </select>
      </div>
    </div>
    <div class="row" style="margin-top: 10px;">
      <div class="col-md-2 col-lg-2" style="width: 160px" :class="{error: validation.hasError('form.client_phone_01')}">
        <label>Telefone <span class="required">*</span></label>
        <the-mask type="text" class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.client_phone_01" placeholder="som. números"/>
        <div class="message">{{ validation.firstError('form.client_phone_01') }}</div>
      </div>
      <div class="col-md-2 col-lg-2" style="width: 160px">
        <label>Telefone</label>
        <the-mask type="text" class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.client_phone_02" placeholder="som. números"/>
      </div>
      <div class="col-md-2 col-lg-2" style="width: 160px">
        <label>Telefone</label>
        <the-mask type="text" class="form-control input-sm" :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.client_phone_03" placeholder="som. números"/>
      </div>
      <div class="col-md-3 col-lg-2" :class="{error: validation.hasError('form.client_email')}">
        <label>Email</label>
        <input type="text" class="form-control input-sm" v-model="form.client_email">
        <div class="message">{{ validation.firstError('form.client_email') }}</div>
      </div>
    </div>
    <!-- / dados do cliente -->


    <!-- responsáveis -->
    <div class="title-form">
      Responsáveis
    </div>
    <hr class="h-row">
    <div class="row">
      <div class="col-md-4 col-lg-3" :class="{error: validation.hasError('form.attendant_register_id')}">
        <label>Cadastro <span class="required">*</span></label>
        <users-system id_component="attendant_register" :setUser="form.attendant_register_id" @userSelected="id => form.attendant_register_id = id"/>
        <div class="message">{{ validation.firstError('form.attendant_register_id') }}</div>
      </div>

      <div class="col-md-4 col-lg-3" :class="{error: validation.hasError('form.attendant_reception_id')}">
        <label>Recepção <span class="required">*</span></label>
        <users-system id_component="attendant_reception" :setUser="form.attendant_reception_id" @userSelected="id => form.attendant_reception_id = id"/>
        <div class="message">{{ validation.firstError('form.attendant_reception_id') }}</div>
      </div>
    </div>
    <!-- / responsáveis -->


    <!-- responsáveis -->
    <div class="title-form">
      Históricos
    </div>
    <hr class="h-row">
    <historic @textEditor="text => form.historic_data.historic = text" />
  </div>

</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import {getSicadiDataMixin} from '../../../sicadi/mixins/getSicadiDataMixin'
import {queryZipCodeMixin} from '@/mixins/queryCep'
import ImmobileTypeAvailable from '@/components/ImmobileTypeAvailable'
import DatePicker from '@/components/DatePicker'
import cpf from 'gerador-validador-cpf'
import {wordUpper} from '@/util/stringHelpers'
import UsersSystem from '@/components/UsersSystem'
import Historic from './Historic'
import {dateFormat} from '@/util/dateTime'

export default {
  props: {
    dataModalOpened: {
      required: true,
      type: Object
    }
  },
  components: {
    ImmobileTypeAvailable,
    DatePicker,
    UsersSystem,
    Historic
  },
  mixins: [getSicadiDataMixin, queryZipCodeMixin],
  data () {
    return {
      message_load: 'Consultando informações, aguarde ...',
      load_data: false,
      data_before_change: {},
      load_data_query_cep: false,
      form: {
        id: null,
        immobile_code: '',
        address: '',
        neighborhood: '',
        value: 0,
        value_negotiated: 0,
        type_location: '',
        immobile_type: '',
        code_reserve: '',
        date_reserve: window.moment().format('DD/MM/YYYY'),
        prevision: window.moment().add(4, 'days').format('DD/MM/YYYY'),
        situation: 'r',
        contract: '',
        conclusion: '',
        deadline: '',
        taxa: '',
        observation: '',
        origin_city: '',
        origin_state: '',
        client_name: '',
        client_cpf: '',
        client_rg: '',
        client_profession: '',
        client_company: '',
        client_zip_code: '',
        client_address: '',
        client_neighborhood: '',
        client_city: '',
        client_state: '',
        client_phone_01: '',
        client_phone_02: '',
        client_phone_03: '',
        state_city: '',
        finality: '',
        client_email: '',
        attendant_register_id: null,
        attendant_reception_id: null,
        id_reason_cancel: null,
        reason_cancel_detail: '',
        historic_data: {
          reserve_id: null,
          historic: ''
        },
        force_submit: false, // força salvar dados mesmo que o sistema informe sobre duplicidade ....
      },
      fields_before_assigned: true,
      fields_after_assigned: false,
      images: {
        loading: require('@assets/images/loading.gif')
      }
    }
  },
  validators: {
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
    'form.value_negotiated': function (value) {
      return Validator.custom(function () {
        var number = parseInt(value)
        if (number === 0) {
          return 'Obrigatório'
        }
      })
    },
    'form.type_location': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.immobile_type': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.date_reserve': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.prevision': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.situation': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.contract': function (value) {
      if (this.form.situation === 'as' || this.form.situation === 'ap' || this.form.situation === 'af') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.deadline': function (value) {
      if (this.form.situation === 'as' || this.form.situation === 'ap' || this.form.situation === 'af') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.conclusion': function (value) {
      if (this.form.situation === 'as' || this.form.situation === 'ap' || this.form.situation === 'af') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.taxa': function (value) {
      if (this.form.situation === 'as' || this.form.situation === 'ap' || this.form.situation === 'af') {
        return Validator.custom(function () {
          if (!Validator.isEmpty(value)) {
            var number = parseInt(value)
            if (isNaN(value) || number < 0 || number > 100) {
              return 'Inválido'
            }
          } else {
            return 'Obrigatório'
          }
        })
      }
    },
    'form.observation': function (value) {
      if (this.form.situation === 'as') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.origin_city': function (value) {
      if (this.form.situation === 'as' || this.form.situation === 'ap' || this.form.situation === 'af') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.origin_state': function (value) {
      if (this.form.situation === 'as' || this.form.situation === 'ap' || this.form.situation === 'af') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.finality': function (value) {
      if (this.form.situation === 'as' || this.form.situation === 'ap' || this.form.situation === 'af') {
        return Validator.value(value).required('Obrigatório')
      }
    },
    'form.client_name': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.client_cpf': function (value) {
      return Validator.custom(function () {
        if (!Validator.isEmpty(value)) {
          if (!cpf.validate(value)) {
            return 'Inválido'
          }
        }
      })
    },
    'form.client_phone_01': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.client_email': function (value) {
      return Validator.value(value).email('Email inválido')
    },
    'form.attendant_register_id': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.attendant_reception_id': function (value) {
      return Validator.value(value).required('Obrigatório')
    }
  },
  methods: {
    wordUpper,
    ...mapActions('Register', ['getNextAttendance', 'getReserveContract', 'getResponsibleForFilter']),
    ...mapActions('Financial', ['saveContractCelebrated']),
    ...mapMutations('Register', ['CLEAR_EDIT_CONTRACT_CURRENT', 'CLEAN_HISTORIC_CONTRACT']),
    dateFormat,
    setFormData (data) {
      if (data) {
        // verifica se o imovel esta lançado em alguma reserva
        const queryParams = {
          params: {
            immobile_code: data.immobile_code
          }
        }

        http.get('register/reserve-contract/query/immobile-is-release', queryParams).then(res => {

          // avisa o usuário que o codigo esta ativo no sistema a menos de 60 dias
          if (res.data) {
            this.$emit('openModalWarnClient', res.data)
          } else {
            this.setForm(data)
          }

          setTimeout(() => {
            this.load_data = false
          }, 600)
        }).catch(() => {
          this.load_data = false
        })

      }
    },
    /**
     * Se não encontrar a busca do imovel pelo codigo no sicadi
     */
    notResultsFoundSicadi () {
      this.form.address = ''
      this.form.neighborhood = ''
      this.form.type_location = ''
      this.form.immobile_type = ''
      this.form.value = ''

      this.validation.reset()
    },
    setForm (data) {


      this.form.immobile_code = data.immobile_code.toUpperCase()
      this.form.address = wordUpper(data.address)
      this.form.neighborhood = wordUpper(data.neighborhood)
      this.form.type_location = data.type_location
      this.form.immobile_type = !data.id ? data.type_immobile_id : data.immobile_type
      this.form.value = data.value

      if (!data.id)
        setTimeout(() => $('#value_negotiated').focus(), 200)

      // somente edição
      this.form.id = data.id
      this.form.immobile_code = data.id ? data.immobile_code.toUpperCase() : this.form.immobile_code
      this.form.value_negotiated = data.id ? data.value_negotiated : this.form.value_negotiated
      this.form.situation = data.id ? data.situation : this.form.situation
      this.form.contract = data.id ? (data.contract ? this.form.contract = data.contract.toUpperCase() : '') : this.form.contract
      this.form.conclusion = data.id ? (data.conclusion ? this.form.conclusion = dateFormat(data.conclusion) : '') : this.form.conclusion
      this.form.deadline = data.id ? (data.deadline ? this.form.deadline = data.deadline : '') : this.form.deadline
      this.form.taxa = data.id ? (data.taxa ? this.form.taxa = data.taxa : '') : this.form.taxa
      this.form.client_cpf = data.id ? (data.client_cpf ? this.form.client_cpf = data.client_cpf : '') : this.form.client_cpf
      this.form.client_name = data.id ? wordUpper(data.client_name) : this.form.client_name
      this.form.client_rg = data.id ? (data.client_rg ? this.form.client_rg = data.client_rg.toUpperCase() : '') : this.form.client_rg
      this.form.client_profession = data.id ? (data.client_profession ? this.form.client_profession = wordUpper(data.client_profession) : '') : this.form.client_profession
      this.form.client_company = data.id ? (data.client_company ? this.form.client_company = wordUpper(data.client_company) : '') : this.form.client_company
      this.form.client_zip_code = data.id ? (data.client_zip_code ? this.form.client_zip_code = data.client_zip_code : '') : this.form.client_zip_code
      this.form.client_address = data.id ? (data.client_address ? this.form.client_address = wordUpper(data.client_address) : '') : this.form.client_address
      this.form.client_neighborhood = data.id ? (data.client_neighborhood ? this.form.client_neighborhood = wordUpper(data.client_neighborhood) : '') : this.form.client_neighborhood
      this.form.client_city = data.id ? (data.client_city ? this.form.client_city = wordUpper(data.client_city) : '') : this.form.client_city
      this.form.client_state = data.id ? (data.client_state ? this.form.client_state = data.client_state : '') : this.form.client_state
      this.form.client_phone_01 = data.id ? (data.client_phone_01 ? this.form.client_phone_01 = data.client_phone_01 : '') : this.form.client_phone_01
      this.form.client_phone_02 = data.id ? (data.client_phone_02 ? this.form.client_phone_02 = data.client_phone_02 : '') : this.form.client_phone_02
      this.form.client_phone_03 = data.id ? (data.client_phone_03 ? this.form.client_phone_03 = data.client_phone_03 : '') : this.form.client_phone_03
      this.form.client_email = data.id ? (data.client_email ? this.form.client_email = data.client_email.toLowerCase() : '') : this.form.client_email

      this.form.code_reserve = data.id ? data.id + '/' + data.year_reserve : null

      this.form.date_reserve = data.id ? dateFormat(data.date_reserve) : this.form.date_reserve,
      this.form.prevision = data.id ? dateFormat(data.prevision) : this.form.prevision,

      this.form.attendant_register_id = data.id ? data.attendant_register_id : this.form.attendant_register_id
      this.form.attendant_reception_id = data.id ? data.attendant_reception_id : this.form.attendant_reception_id

      this.form.observation = data.id ? (data.observation ? this.form.observation = wordUpper(data.observation) : '') : this.form.observation
      this.form.origin_city = data.id ? (data.origin_city ? this.form.origin_city = wordUpper(data.origin_city) : '') : this.form.origin_city
      this.form.origin_state = data.id ? (data.origin_state ? this.form.origin_state = data.origin_state : '') : this.form.origin_state
      this.form.finality = data.id ? (data.finality ? this.form.finality = data.finality : '') : this.form.finality

    },
    getClientData () {

      if (this.form.client_cpf.length != 11 || !cpf.validate(this.form.client_cpf)) {
        this.$refs.client_name.focus()
        return
      }
      this.message_load = 'Consultando informações, aguarde ...'
      this.load_data = true

      setTimeout(() => {

        const queryParams = {
          params: {
            client_cpf: this.form.client_cpf
          }
        }

        http.get('register/reserve-contract/query/client', queryParams).then(res => {

          this.form.client_name = res.data.client_name ? wordUpper(res.data.client_name) : ''
          this.form.client_cpf = res.data.client_cpf ? res.data.client_cpf : this.form.client_cpf
          this.form.client_rg = res.data.client_rg ? res.data.client_rg.toUpperCase() : ''
          this.form.client_profession = res.data.client_profession ? wordUpper(res.data.client_profession) : ''
          this.form.client_company = res.data.client_company ? wordUpper(res.data.client_company) : ''
          this.form.client_address = res.data.client_address ? wordUpper(res.data.client_address) : ''
          this.form.client_neighborhood = res.data.client_neighborhood ? wordUpper(res.data.client_neighborhood) : ''
          this.form.client_city = res.data.client_city ? wordUpper(res.data.client_city) : ''
          this.form.client_state = res.data.client_state ? res.data.client_state : ''
          this.form.client_phone_01 = res.data.client_phone_01 ? res.data.client_phone_01 : ''
          this.form.client_phone_02 = res.data.client_phone_02 ? res.data.client_phone_02 : ''
          this.form.client_phone_03 = res.data.client_phone_03 ? res.data.client_phone_03 : ''
          this.form.client_email = res.data.client_email ? res.data.client_email : ''

          this.$refs.client_name.focus()

          setTimeout(() => {
            this.load_data = false
          }, 600)

        }).catch(() => {
          this.load_data = false
        })

      }, 300)
    },
    dataFormByCep (data) {
      if (data.error) {
        this.load_data_query_cep = true
        return
      }

      if (!data.erro) {
        this.form.client_address = this.wordUpper(data.logradouro) + ', ' + (data.complemento ? this.wordUpper(data.complemento) : '')
        this.form.client_neighborhood = this.wordUpper(data.bairro)
        this.form.client_city = this.wordUpper(data.localidade)
        this.form.client_state = data.uf.toLowerCase()
      }
      this.load_data_query_cep = false
    },
    submitForm () {
      const self = this
      this.$validate()
      .then(function (success) {
        if (success) {
          if (!self.form.id) {
            self.save()
          } else {

            // modal confirmação de fechamento da reserva
            if (self.contract_edit_current.situation === 'r' || self.contract_edit_current.situation === 'd' || self.contract_edit_current.situation === 'a'
              ||  self.contract_edit_current.situation === 'cd'  || self.contract_edit_current.situation === 'p') {

              if (self.form.situation === 'as' || self.form.situation === 'ap') {
                self.$bus.$emit('Register\Reserve:OpenModalConfirmCloseReserve')
                return
              }
            }

            self.update()
          }
        }
      })
    },
    save () {
      this.message_load = "Processando sua solicitação, aguarde ..."
      this.load_data = true
      http.post('register/reserve-contract', this.form).then(res => {

        this.edit(res.data.id)

        _notification.success()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    edit (id) {
      this.getReserveContract(id).then(res => {

        this.setForm(res.data.reserve)

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    checkContractIsRelease () {
      if (this.form.contract.length < 4) return

      this.message_load = 'Consultando dados, aguarde ...'
      this.load_data = true

      const queryParams = {
        params: {
          contract: this.form.contract
        }
      }

      http.get('register/reserve-contract/query/check-contract-is-release', queryParams).then(res => {

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        setTimeout(() => {
          this.load_data = false
        }, 600)
      })
    },
    update (confirmCancelReserve = false) {

      // abre modal solicitando motivo do cancelamento
      if (this.form.situation === 'c' && !confirmCancelReserve) {
        this.$emit('openModalReasonCancelReserve', this.form)
        return
      }

      this.message_load = 'Processando sua solicitação, aguarde ...'

      this.load_data = true

      http.put(`register/reserve-contract/${this.form.id}`, this.form).then(res => {

        if (this.contract_edit_current.situation === 'r' || this.contract_edit_current.situation === 'd' || this.contract_edit_current.situation === 'a'
            || this.contract_edit_current.situation === 'cd'  || this.contract_edit_current.situation === 'p') {
          if (this.form.situation === 'as' || this.form.situation === 'ap') {

            //gravar no modulo de contratos celebrados
            if (res.data.financial_data && res.data.financial_data.contract) {
              setTimeout(() => {
                this.message_load = 'Informando o setor financeiro os dados do contrato, aguarde ...'
                this.createContractCelebrated(res.data.financial_data)
              }, 1600)
              return
            }

          }
        }

        // verifica se esta alterando responsavel para atualizar o filtro
        if (this.contract_edit_current.attendant_register_id != this.form.attendant_register_id || this.contract_edit_current.attendant_reception_id != this.form.attendant_reception_id) {
          this.getResponsibleForFilter()
        }

        this.$bus.$emit('Register\Reserve:RefreshTableList')

        setTimeout(() => {
          this.load_data = false
        }, 600)

        this.edit(this.form.id)
        _notification.success()

      }).catch(() => {
        this.load_data = false
      })

    },
    /*****
     * salva os dados no modulo financeiro de contratos celebrados
     */
    createContractCelebrated (financialData) {

      this.saveContractCelebrated(financialData).then(res => {

        setTimeout(() => {
          this.$bus.$emit('Register\Reserve:OpenModalSendEmailCloseReserve', financialData)
          this.$bus.$emit('Register\Reserve:RefreshTableList')
        }, 1200)

        setTimeout(() =>  {
          this.edit(this.form.id)
          _notification.success()
          this.load_data = false
        }, 2000)


      }).catch(() => {
        this.load_data = false
      })

    },
    cleanForm () {
      this.form = {
        id: null,
        immobile_code: '',
        address: '',
        neighborhood: '',
        value: 0,
        value_negotiated: 0,
        type_location: '',
        immobile_type: '',
        code_reserve: '',
        date_reserve: window.moment().format('DD/MM/YYYY'),
        prevision: window.moment().add(4, 'days').format('DD/MM/YYYY'),
        situation: 'r',
        contract: '',
        conclusion: '',
        deadline: '',
        taxa: '',
        observation: '',
        origin_city: '',
        origin_state: '',
        client_name: '',
        client_cpf: '',
        client_rg: '',
        client_profession: '',
        client_company: '',
        client_zip_code: '',
        client_address: '',
        client_neighborhood: '',
        client_city: '',
        client_state: '',
        client_phone_01: '',
        client_phone_02: '',
        client_phone_03: '',
        state_city: '',
        finality: '',
        client_email: '',
        attendant_register_id: null,
        attendant_reception_id: null,
        id_reason_cancel: null,
        reason_cancel_detail: '',
        historic_data: {
          reserve_id: null,
          historic: ''
        },
        force_submit: false, // força salvar dados mesmo que o sistema informe sobre duplicidade ....
      }

      this.CLEAR_EDIT_CONTRACT_CURRENT()
      this.CLEAN_HISTORIC_CONTRACT()

      this.validation.reset()
    }
  },
  computed: {
    ...mapState('Register', ['contract_edit_current']),
    disabledEdit () {
      if (this.contract_edit_current.situation === 'as' || this.contract_edit_current.situation === 'ap' || this.contract_edit_current.situation === 'af' || this.contract_edit_current.situation === 'c') {
        return true
      }

      return false
    }
  },
  watch: {
    'form.situation' () {
      if (this.form.situation === 'r' || this.form.situation === 'd' || this.form.situation === 'a' || this.form.situation === 'cd'
        || this.form.situation === 'p' || this.form.situation === 'c') {
        this.fields_before_assigned = true
        this.fields_after_assigned = false
      } else {
        this.fields_before_assigned = false
        this.fields_after_assigned = true
      }
    },
    dataModalOpened () {

      this.cleanForm()

      this.message_load = 'Carregando dados, aguarde ...'
      this.load_data = true

      if (this.dataModalOpened && this.dataModalOpened.type_action === 'edit_register') {
        this.edit(this.dataModalOpened.id)
      } else {
        // pega dados do usuário logado
        const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'))

        // pega o responsável do setor de cadastro
        this.getNextAttendance().then(res => {
          if (res.data)
            this.form.attendant_register_id = res.data
        })
        // seta o responsável da recepção
        setTimeout(() => {
          this.form.attendant_reception_id = dataUserLogged.id
        }, 200)


        setTimeout(() => {
          this.load_data = false
        }, 600)

      }
    }
  },
  mounted () {
    this.$bus.$on('Register\Reserve:ConfirmReleaseExists', (data) => {
      this.setForm(data)
    })

    this.$bus.$on('Sicadi:DataExported', (data) => {
      this.setForm(data)
    })

    this.$bus.$on('Register\Reserve:SubmitFormReserve', () => {
      this.submitForm()
      this.$bus.$emit('CleanHistoric')
    })

    /**
     * Abre a modal para informar os dados financeiros do contrato celebrado x tesouraria
     */
    this.$bus.$on('Register\Reserve:ConfirmCloseReserve', () => {
      setTimeout(() => {
        this.$bus.$emit('Register\Reserve:OpenModalFinancialFinalData', this.form)
      }, 200)
    })

    this.$bus.$on('Register\Reserve:ConfirmEndReserve', (data) => {
      this.form.contract = data.contract
      this.form.conclusion = data.delivery_key
      this.form.financial_data = data

      this.update()
    })


    // confirma o cancelamento da reserva
    this.$bus.$on('Register\Reserve:ConfirmCancelReserve', (data) => {
      this.form.id_reason_cancel = data.id_reason_cancel
      this.form.reason_cancel_detail = data.reason_cancel_detail
      this.update(true)
    })
  }
}
</script>