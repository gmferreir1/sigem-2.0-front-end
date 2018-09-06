<template>
  <div v-loading="load_data" :element-loading-text="message_load">

    <!-- dados do imovel -->
    <div class="title-form">
      Dados do Imóvel
    </div>
    <hr class="h-row">
    <div class="row">

      <div class="col-md-2 div-140" :class="{error: validation.hasError('form.immobile_code')}">
        <label>Código <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.immobile_code" @blur="getImmobileDataPerCode" @keypress.enter="getImmobileDataPerCode"
               :disabled="edit_current_report_immobile_captured.id">
        <div class="message">{{ validation.firstError('form.immobile_code') }}</div>
      </div>

      <div class="col-md-4" :class="{error: validation.hasError('form.address')}">
        <label>Endereço <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" id="address" v-model="form.address"
               :disabled="edit_current_report_immobile_captured.id">
        <div class="message">{{ validation.firstError('form.address') }}</div>
      </div>

      <div class="col-md-3" :class="{error: validation.hasError('form.neighborhood')}">
        <label>Bairro <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.neighborhood"
               :disabled="edit_current_report_immobile_captured.id">
        <div class="message">{{ validation.firstError('form.neighborhood') }}</div>
      </div>

      <div class="col-md-2 div-140" :class="{error: validation.hasError('form.value')}">
        <label>Valor <span class="required">*</span></label>
        <money v-model="form.value" class="form-control input-sm" id="value"
               :disabled="edit_current_report_immobile_captured.id"/>
        <div class="message">{{ validation.firstError('form.value') }}</div>
      </div>

    </div>

    <div class="row" style="margin-top: 20px">

      <div class="col-md-3" :class="{error: validation.hasError('form.owner')}">
        <label>Proprietário <span class="required">*</span></label>
        <input type="text" class="form-control input-sm" v-model="form.owner"
               :disabled="edit_current_report_immobile_captured.id">
        <div class="message">{{ validation.firstError('form.owner') }}</div>
      </div>

      <div class="col-md-2" :class="{error: validation.hasError('form.type_immobile')}">
        <label>Tipo Imóvel <span class="required">*</span></label>
        <immobile-type-available
          @typeImmobile="value => form.type_immobile = value"
          :setData="form.type_immobile"
          :disabled="edit_current_report_immobile_captured.id" id_component="type_immobile_available" v-model="form.type_immobile"/>
        <div class="message">{{ validation.firstError('form.type_immobile') }}</div>
      </div>

      <div class="col-md-2" :class="{error: validation.hasError('form.type_location')}">
        <label>Tipo Imóvel <span class="required">*</span></label>
        <select class="form-control input-sm" v-model="form.type_location">
          <option value="">Informe</option>
          <option value="r">Residencial</option>
          <option value="nr">Não Residencial</option>
        </select>
        <div class="message">{{ validation.firstError('form.type_location') }}</div>
      </div>

      <div class="col-md-2 div-140" :class="{error: validation.hasError('form.captured_date')}">
        <label>Captação <span class="required">*</span></label>
        <date-picker class="form-control input-sm" v-model="form.captured_date" placeholder="dd/mm/aaaa" />
        <div class="message">{{ validation.firstError('form.captured_date') }}</div>
      </div>

      <div class="col-md-3 col-lg-3" :class="{error: validation.hasError('form.responsible')}">
        <label>Responsável <span class="required">*</span></label>
        <users-system id_component="responsible_transfer_id" :setUser="form.responsible" @userSelected="id => form.responsible = id" :disabled="edit_current_report_immobile_captured.id"/>
        <div class="message">{{ validation.firstError('form.responsible') }}</div>
      </div>

    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {getSicadiDataMixin} from '@bundles/sicadi/mixins/getSicadiDataMixin'
import DatePicker from '@/components/DatePicker'
import UsersSystem from '@/components/UsersSystem'
import ImmobileTypeAvailable from '@/components/ImmobileTypeAvailable'
import {dateFormat} from "../../../../util/dateTime";

export default {
  props: ['dataModalOpened'],
  mixins: [getSicadiDataMixin],
  components: {
    DatePicker,
    UsersSystem,
    ImmobileTypeAvailable
  },
  data () {
    return {
      message_load: 'Consultando informações, aguarde ...',
      load_data: false,
      form: {
        immobile_code: '',
        address: '',
        neighborhood: '',
        value: 0,
        owner: '',
        type_immobile: '',
        type_location: '',
        captured_date: moment().format('DD/MM/YYYY'),
        responsible: ''
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
    'form.type_immobile': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.owner': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.type_immobile': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.type_location': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.captured_date': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.responsible': function (value) {
      return Validator.value(value).required('Obrigatório')
    }
  },
  methods: {
    ...mapActions('ImmobileCaptured', ['getReportImmobileCaptured', 'getListReportImmobileCaptured']),
    dateFormat,
    setFormData (data) {
      /*
       * verifica se o imovel esta lançado no sistema
       */
      const queryParams = {
        params: {
          immobile_code: data.immobile_code
        }
      }

      http.get('immobile-captured/report-list/query-immobile-is-release', queryParams).then(res => {

        this.form.immobile_code = data.immobile_code.toUpperCase()
        this.form.address = data.address.toUpperCase()
        this.form.neighborhood = data.neighborhood.toUpperCase()
        this.form.value = data.value
        this.form.owner = data.owner.toUpperCase()
        this.form.type_immobile = data.type_immobile_id
        this.form.type_location = data.type_location === 'r' ? 'r' : (data.type_location === 'c' ? 'nr' : '')

        setTimeout(() => {
          $('#address').focus()
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
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
    save () {
      this.message_load = 'Processando sua solicitação, aguarde ...'
      this.load_data = true

      http.post('immobile-captured/report-list', this.form).then(res => {

        this.$bus.$emit('ImmobileCaptured\Report\PanelSearch:Filter')
        _notification.success()
        this.cleanForm()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    edit (id) {
      this.getReportImmobileCaptured(id).then(res => {

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    /**
     * Seta os dados do no form para edição
     * @param data
     */
    setFormEdit (data) {

      const dataEdit = data
      dataEdit.immobile_code = dataEdit.immobile_code.toUpperCase()
      dataEdit.address = dataEdit.address.toUpperCase()
      dataEdit.neighborhood = dataEdit.neighborhood.toUpperCase()
      dataEdit.owner = dataEdit.owner.toUpperCase()
      dataEdit.captured_date = this.dateFormat(dataEdit.captured_date)

      this.form = dataEdit
    },
    update () {

      this.message_load = 'Processando sua solicitação, aguarde ...'
      this.load_data = true

      http.put(`immobile-captured/report-list/${this.form.id}`, this.form).then(res => {

        this.$bus.$emit('ImmobileCaptured\Report\PanelSearch:Filter')
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
        immobile_code: '',
        address: '',
        neighborhood: '',
        value: 0,
        owner: '',
        type_immobile: '',
        type_location: '',
        captured_date: moment().format('DD/MM/YYYY'),
        responsible: ''
      }

      this.validation.reset()
    }
  },
  computed: {
    ...mapState('ImmobileCaptured', ['edit_current_report_immobile_captured'])
  },
  watch: {
    dataModalOpened () {
      if (this.dataModalOpened.type_action === 'new_captured') {
        this.cleanForm()
      }
    },
    edit_current_report_immobile_captured () {
      if (this.edit_current_report_immobile_captured.id) {
        this.setFormEdit(this.edit_current_report_immobile_captured)

        setTimeout(() => {
          this.load_data = false
        }, 600)
      }
    }
  },
  mounted () {
    this.$bus.$on('Sicadi:DataExported', (data) => {
      this.setFormData(data)
    })

    this.$bus.$on('ImmobileCaptured\Report\FormCaptured:SubmitForm', () => {
      this.submitForm()
    })

    this.$bus.$on('ImmobileCaptured\Report\FormCaptured:GetLoading', (params) => {
      this.message_load = !params.message_load ? 'Consultando informações, aguarde ...' : params.message_load
      this.load_data = params.load_data
    })
  }
}
</script>