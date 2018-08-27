<template>
  <div>
    <div id="modalFinancialFinalData" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md">
        <div class="modal-content">

          <!-- modal header -->
          <modal-header title="Informe os Dados Para Continuar" @closeModal="closeModal">
            <i class="fa fa-check-circle" slot="icon_title"></i>

          </modal-header>
          <!-- / modal footer -->

          <div class="modal-body">


            <!-- dados da reserva -->
            <div class="row">
              <div class="col-md-2 div-140" :class="{error: validation.hasError('form.contract')}">
                <label>Contrato <span class="required">*</span></label>
                <input type="text" class="form-control input-sm" v-model="form.contract" disabled>
                <div class="message">{{ validation.firstError('form.contract') }}</div>
              </div>
              <div class="col-md-2 div-140" :class="{error: validation.hasError('form.delivery_key')}">
                <label>Entrega Chaves <span class="required">*</span></label>
                <date-picker class="form-control input-sm" v-model="form.delivery_key" />
                <div class="message">{{ validation.firstError('form.delivery_key') }}</div>
              </div>
              <div class="col-md-2 div-120" title="Período do contrato" :class="{error: validation.hasError('form.period_contract')}">
                <label>P. Contrato <span class="required">*</span></label>
                <input type="text" class="form-control input-sm" v-model="form.period_contract" disabled>
                <div class="message">{{ validation.firstError('form.period_contract') }}</div>
              </div>
              <div class="col-md-2 div-140" title="Desconto de fidelidade" :class="{error: validation.hasError('form.loyalty_discount')}">
                <label>Desc. Fidelidade <span class="required">*</span></label>
                <select class="form-control input-sm" v-model="form.loyalty_discount">
                  <option value="">Informe</option>
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
                <div class="message">{{ validation.firstError('form.loyalty_discount') }}</div>
              </div>
              <div class="col-md-2 div-120" title="Data de vencimento do aluguel" :class="{error: validation.hasError('form.due_date_rent')}">
                <label>Venc. Aluguel <span class="required">*</span></label>
                <date-picker class="form-control input-sm" v-model="form.due_date_rent" placeholder="dd/mm/aaaa" />
                <div class="message">{{ validation.firstError('form.due_date_rent') }}</div>
              </div>
            </div>
            <!-- / dados da reserva -->


            <!-- dados para contratos celebrados x tesouraria -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2 div-140">
                <label>Tipo Contrato <span class="required">*</span></label>
                <select class="form-control input-sm" v-model="form.type_contract">
                  <option value="new">Novo</option>
                  <option value="old">Velho</option>
                </select>
              </div>
              <div class="col-md-2">
                <label>Boleto <span class="required">*</span></label>
                <select class="form-control input-sm" v-model="form.ticket">
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
              </div>
              <div class="col-md-2">
                <label>Tx.Contrato <span class="required">*</span></label>
                <select class="form-control input-sm" v-model="form.tx_contract">
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
              </div>
              <div class="col-md-2">
                <label>Desp. Banco <span class="required">*</span></label>
                <select class="form-control input-sm" v-model="form.bank_expense">
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
              </div>
            </div>
            <!-- / dados para contratos celebrados x tesouraria -->

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <span class="required">Atenção:</span>
                <span style="font-size: 12px;">
                  Depois da confirmação os dados não podem ser alterados,
                  portanto confira antes de <span class="required" style="font-weight: bold">CONFIRMAR !</span>
                </span>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <button class="button btn btn-sm btn-danger" @click="confirm">
                  <i class="ace-icon fa fa-check-circle"></i>
                  Confirmar
                  <i class="fa fa-arrow-right"></i>
                </button>

                <button class="button btn btn-sm btn-default" @click="closeModal">
                  <i class="fa fa-close"></i>
                  Cancelar
                </button>
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
import DatePicker from '@/components/DatePicker'
export default {
  components: {
    ModalHeader,
    ModalFooter,
    DatePicker
  },
  data() {
    return {
      form: {
        contract: '',
        delivery_key: moment().format('DD/MM/YYYY'),
        type_contract: 'new',
        ticket: 'y',
        tx_contract: 'y',
        bank_expense: 'y',
        period_contract: '',
        loyalty_discount: '',
        due_date_rent: ''
      }
    }
  },
  validators: {
    'form.contract': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.delivery_key': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.type_contract': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.ticket': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.tx_contract': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.bank_expense': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.period_contract': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.loyalty_discount': function (value) {
      return Validator.value(value).required('Obrigatório')
    },
    'form.due_date_rent': function (value) {
      return Validator.value(value).required('Obrigatório')
    }
  },
  methods: {
    openModal() {
      $('#modalFinancialFinalData').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    closeModal() {
      $('#modalFinancialFinalData').modal('hide')
    },
    confirm () {
      const self = this
      this.$validate()
      .then(function (success) {
        if (success) {
          self.$bus.$emit('Register\Reserve:ConfirmEndReserve', self.form)
          self.closeModal()
        }
      })
    },
    cleanForm () {
      this.form = {
        contract: '',
        delivery_key: moment().format('DD/MM/YYYY'),
        type_contract: 'new',
        ticket: 'y',
        tx_contract: 'y',
        bank_expense: 'y',
        period_contract: '',
        loyalty_discount: '',
        due_date_rent: ''
      }
      this.validation.reset()
    }
  },
  mounted () {
    this.$bus.$on('Register\Reserve:OpenModalFinancialFinalData', (data) => {

      this.cleanForm()

      this.form.contract = data.contract ? data.contract.toUpperCase() : ''
      this.form.delivery_key = data.conclusion ? data.conclusion : ''
      this.form.period_contract = data.deadline ? data.deadline : ''

      this.openModal()

    })
  }
}
</script>