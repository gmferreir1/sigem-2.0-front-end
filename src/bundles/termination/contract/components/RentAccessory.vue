<template>
  <div v-loading="load_data" element-loading-text="Consultando informações...">

    <div class="row" v-if="not_results_found" style="margin-top: 3%">
      <div class="col-md-6 col-md-offset-5">
        <not-found />
      </div>
    </div>


    <div v-if="!not_results_found">

      <!-- Acessórios da locação -->
      <div class="title-form" style="margin-top: 20px">Alugueis e Encargos de Locação</div>
      <hr class="h-row">

      <div class="row" style="margin-top: 10px;">
        <div class="col-md-8 col-lg-8">
          <label>Multa Rescisória:</label>
          <textarea rows="2" class="form-control" v-model="form.fine_termination"></textarea>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Tipo</label>
          <select class="form-control input-sm" v-model="form.fine_termination_type_debit">
            <option value="c">Crédito</option>
            <option value="d">Débito</option>
          </select>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Valor</label>
          <money v-model="form.fine_termination_value_debit" class="form-control input-sm" />
        </div>
      </div>

      <div class="row" style="margin-top: 10px;">
        <div class="col-md-8 col-lg-8">
          <label title="Multa Rescisoria">Condominio:</label>
          <textarea rows="2" class="form-control" v-model="form.condominium"></textarea>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Tipo</label>
          <select class="form-control input-sm" v-model="form.condominium_type_debit">
            <option value="c">Crédito</option>
            <option value="d">Débito</option>
          </select>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Valor</label>
          <money v-model="form.condominium_value_debit" class="form-control input-sm" />
        </div>
      </div>

      <div class="row" style="margin-top: 10px;">
        <div class="col-md-10 col-lg-10">
          <label title="Cemig">Cemig:</label>
          <textarea rows="2" class="form-control" v-model="form.cemig"></textarea>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Valor</label>
          <money v-model="form.cemig_value_debit" class="form-control input-sm" />
        </div>
      </div>

      <div class="row" style="margin-top: 10px;">
        <div class="col-md-10 col-lg-10">
          <label title="Cemig">Copasa:</label>
          <textarea rows="2" class="form-control" v-model="form.copasa"></textarea>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Valor</label>
          <money v-model="form.copasa_value_debit" class="form-control input-sm" />
        </div>
      </div>

      <div class="row" style="margin-top: 10px;">
        <div class="col-md-8 col-lg-8">
          <label title="Iptu">IPTU:</label>
          <textarea rows="2" class="form-control" v-model="form.iptu"></textarea>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Tipo</label>
          <select class="form-control input-sm" v-model="form.iptu_type_debit">
            <option value="c">Crédito</option>
            <option value="d">Débito</option>
          </select>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Valor</label>
          <money v-model="form.iptu_value_debit" class="form-control input-sm" />
        </div>
      </div>
      <div class="row" style="margin-top: 10px;">
        <div class="col-md-8 col-lg-8">
          <label title="Taxa de Lixo">Taxa de Lixo (a partir de 2014):</label>
          <textarea rows="2" class="form-control" v-model="form.garbage_rate"></textarea>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Tipo</label>
          <select class="form-control input-sm" v-model="form.garbage_rate_type_debit">
            <option value="c">Crédito</option>
            <option value="d">Débito</option>
          </select>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Valor</label>
          <money v-model="form.garbage_rate_value_debit" class="form-control input-sm" />
        </div>
      </div>
      <div class="row" style="margin-top: 10px;">
        <div class="col-md-8 col-lg-8">
          <label title="Pintura">Pintura:</label>
          <textarea rows="3" class="form-control" v-model="form.paint"></textarea>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Tipo</label>
          <select class="form-control input-sm" v-model="form.paint_type_debit">
            <option value="c">Crédito</option>
            <option value="d">Débito</option>
          </select>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Valor</label>
          <money v-model="form.paint_value_debit" class="form-control input-sm" />
        </div>
      </div>
      <div class="row" style="margin-top: 10px;">
        <div class="col-md-8 col-lg-8">
          <label>Pendências</label>
          <textarea rows="3" class="form-control" v-model="form.pendencies"></textarea>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Tipo</label>
          <select class="form-control input-sm" v-model="form.pendencies_type_debit">
            <option value="c">Crédito</option>
            <option value="d">Débito</option>
          </select>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Valor</label>
          <money v-model="form.pendencies_value_debit" class="form-control input-sm" />
        </div>
      </div>
      <div class="row" style="margin-top: 10px;">
        <div class="col-md-8 col-lg-8">
          <label title="Alugueis - Valor Atual">Alugueis - Valor Atual (conferir):</label>
          <textarea rows="6" class="form-control"v-model="form.value_rent"></textarea>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Tipo</label>
          <select class="form-control input-sm" v-model="form.value_rent_type_debit">
            <option value="c">Crédito</option>
            <option value="d">Débito</option>
          </select>
        </div>
        <div class="col-md-2 col-lg-2 div-160">
          <label>Valor</label>
          <money v-model="form.value_rent_value_debit" class="form-control input-sm" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 col-md-offset-8 col-lg-4 col-lg-offset-8">
          <button type="button" class="btn btn-sm btn-warning" @click="calcDebit">Calcular</button>
          <span style="font-weight: bold; margin-left: 10px;">Total:</span>
          <span :style="number_style">{{ total_debit }}</span>
        </div>
      </div>

      <!-- Chaves e acessórios entregues -->
      <div class="title-form" style="margin-top: 20px">Chaves e Acessórios Entregues</div>
      <hr class="h-row">

      <div class="row" style="margin-top: 10px;">
        <div class="col-md-2 div-120">
          <label>Chaves(Qt)</label>
          <input type="text" class="form-control input-sm" v-model="form.keys_delivery">
        </div>
        <div class="col-md-2 div-120">
          <label title="Controle de portão">C.Po(Qt)</label>
          <input type="text" class="form-control input-sm" v-model="form.control_gate">
        </div>
        <div class="col-md-2 div-120">
          <label title="Controle do Alarme/Cerca">C.Alar/Cer(Qt)</label>
          <input type="text" class="form-control input-sm" v-model="form.control_alarm">
        </div>
        <div class="col-md-2 div-120">
          <label title="Chave Manual Portão">Ch.M.Po(Qt)</label>
          <input type="text" class="form-control input-sm" v-model="form.key_manual_gate">
        </div>
        <div class="col-md-2 div-120">
          <label title="Cartão de Feira">Car.Feira(Qt)</label>
          <input type="text" class="form-control input-sm" v-model="form.fair_card">
        </div>
      </div>
      <!-- / chaves e acessórios entregues -->

      <!-- Destino inquilino -->
      <div class="title-form" style="margin-top: 20px">Informações do Cliente</div>
      <hr class="h-row">

      <div class="row" style="margin-top: 10px" v-loading="load_query_cep" element-loading-text="Consultando cep...">

        <div class="col-md-2">
          <label>CEP</label>
          <input type="text" class="form-control input-sm" v-model="form.new_zip_code" maxlength="8"  @keypress.enter="getAddressByCep">
        </div>

        <div class="col-md-3 col-lg-3">
          <label>Endereço</label>
          <input type="text" class="form-control input-sm" v-model="form.new_address" ref="new_address">
        </div>
        <div class="col-md-2 col-lg-2">
          <label>Bairro</label>
          <input type="text" class="form-control input-sm" v-model="form.new_neighborhood">
        </div>
        <div class="col-md-3 col-lg-3">
          <label>Cidade</label>
          <input type="text" class="form-control input-sm" v-model="form.new_city">
        </div>
        <div class="col-md-2 col-lg-2">
          <label>Estado</label>
          <select class="form-control input-sm" v-model="form.new_state">
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

      <div class="row">
        <div class="col-md-12">
          &nbsp;
          &nbsp;
        </div>
      </div>


    </div>

  </div>
</template>

<script>
import {moneyFormat} from '@/util/stringHelpers'
import {wordUpper, onlyNumber} from '@/util/stringHelpers'
import NotFound from '@/components/NotFound'

export default {
  props: {
    inactivationData: {
      require: true,
      type: Object
    }
  },
  components: {
    NotFound
  },
  data () {
    return {
      load_data: false,
      load_query_cep: false,
      form: {
        id: null,
        termination_id: null,
        fine_termination: '',
        fine_termination_type_debit: 'd',
        fine_termination_value_debit: 0,

        condominium: '',
        condominium_type_debit: 'd',
        condominium_value_debit: 0,

        copasa: '',
        copasa_value_debit: 0,

        cemig: '',
        cemig_value_debit: 0,

        garbage_rate: null,
        garbage_rate_type_debit: 'd',
        garbage_rate_value_debit: 0,

        iptu: '',
        iptu_type_debit: 'd',
        iptu_value_debit: 0,

        pendencies: '',
        pendencies_type_debit: 'd',
        pendencies_value_debit: 0,

        paint: '',
        paint_type_debit: 'd',
        paint_value_debit: 0,

        value_rent: '',
        value_rent_type_debit: 'd',
        value_rent_value_debit: 0,

        keys_delivery: null,
        control_gate: null,
        control_alarm: null,
        key_manual_gate: null,
        fair_card: null,

        new_zip_code: '',
        new_address: '',
        new_neighborhood: '',
        new_city: '',
        new_state: ''
      },
      total_debit: 0,
      number_style: {},
      not_results_found: false
    }
  },
  methods: {
    moneyFormat,
    onlyNumber,
    wordUpper,
    calcDebit () {

      this.number_style = {
        'font-weight': 'bold'
      }

      let data = {}

      data = Object.assign({}, this.form)

      if (data.fine_termination_type_debit === 'd') {
        data.fine_termination_value_debit = this.numberToNegative(data.fine_termination_value_debit)
      }

      if (data.condominium_type_debit === 'd') {
        data.condominium_value_debit = this.numberToNegative(data.condominium_value_debit)
      }

      if (data.iptu_type_debit === 'd') {
        data.iptu_value_debit = this.numberToNegative(data.iptu_value_debit)
      }

      if (data.garbage_rate_type_debit === 'd') {
        data.garbage_rate_value_debit = this.numberToNegative(data.garbage_rate_value_debit)
      }

      if (data.paint_type_debit === 'd') {
        data.paint_value_debit = this.numberToNegative(data.paint_value_debit)
      }

      if (data.pendencies_type_debit === 'd') {
        data.pendencies_value_debit = this.numberToNegative(data.pendencies_value_debit)
      }

      if (data.value_rent_type_debit === 'd') {
        data.value_rent_value_debit = this.numberToNegative(data.value_rent_value_debit)
      }

      this.total_debit = data.fine_termination_value_debit +
        data.condominium_value_debit + data.iptu_value_debit +
        data.garbage_rate_value_debit + data.paint_value_debit +
        data.pendencies_value_debit + data.value_rent_value_debit +
        this.numberToNegative(data.copasa_value_debit) + this.numberToNegative(data.cemig_value_debit)

      if (this.total_debit === 0) {
        this.total_debit = 'R$ ' + moneyFormat(Math.abs(this.total_debit))
      }

      if (this.total_debit < 0) {
        this.number_style.color = 'darkred'
        this.total_debit = 'R$ ' + moneyFormat(Math.abs(this.total_debit)) + ' (d)'
      }

      if (this.total_debit > 0) {
        this.number_style.color = 'darkgreen'
        this.total_debit = 'R$ ' + moneyFormat(Math.abs(this.total_debit)) + ' (c)'
      }
    },
    /**
     * Retorna o numero para negativo
     * @param number
     * @returns {number}
     */
    numberToNegative (number) {
      return parseFloat(-Math.abs(number))
    },
    getData () {
      http.get(`termination/rent-accessory/${this.inactivationData.data.id}`).then(res => {
        const data = res.data
        this.setFormData(data)
        this.calcDebit()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    /**
     * Seta os dados no formulário
     * @param data
     */
    setFormData (data) {
      if (!data) return

      data.fine_termination_type_debit = !data.fine_termination_type_debit ? 'd' : data.fine_termination_type_debit
      data.condominium_type_debit = !data.condominium_type_debit ? 'd' : data.condominium_type_debit
      data.garbage_rate_type_debit = !data.garbage_rate_type_debit ? 'd' : data.garbage_rate_type_debit
      data.iptu_type_debit = !data.iptu_type_debit ? 'd' : data.iptu_type_debit
      data.pendencies_type_debit = !data.pendencies_type_debit ? 'd' : data.pendencies_type_debit
      data.paint_type_debit = !data.paint_type_debit ? 'd' : data.paint_type_debit
      data.value_rent_type_debit = !data.value_rent_type_debit ? 'd' : data.value_rent_type_debit
      data.new_zip_code = !data.new_zip_code ? '' : data.new_zip_code
      data.new_state = !data.new_state ? '' : data.new_state
      data.new_address = !data.new_address ? '' : wordUpper(data.new_address)
      data.new_city = !data.new_city ? '' : wordUpper(data.new_city)
      data.new_neighborhood = !data.new_neighborhood ? '' : wordUpper(data.new_neighborhood)

      this.form = data
    },
    getAddressByCep () {
      if (!this.form.new_zip_code) return

      this.load_query_cep = true
      const zipCode = this.form.new_zip_code.replace(/[^0-9]/g,'')

      http.get(`api/query-cep/${zipCode}`).then(res => {

        if (res.data.erro) {
          _notification.warning('Nenhum resultado encontrado')
        } else {
          const data = res.data
          this.form.new_address = this.wordUpper(data.logradouro) + ', ' + (data.complemento ? this.wordUpper(data.complemento) : '')
          this.form.new_neighborhood = this.wordUpper(data.bairro)
          this.form.new_city = this.wordUpper(data.localidade)
          this.form.new_state = data.uf.toLowerCase()
        }

        setTimeout(() => {
          this.$refs.new_address.focus()
          this.load_query_cep = false
        }, 600)

      }).catch(() => {
        this.load_query_cep = false
      })
    },
    update () {
      this.load_data = true
      http.put(`termination/rent-accessory/${this.form.id}`, this.form).then(res => {
        _notification.success()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    cleanForm() {
      this.form = {
        id: null,
        termination_id: null,
        fine_termination: '',
        fine_termination_type_debit: 'd',
        fine_termination_value_debit: 0,

        condominium: '',
        condominium_type_debit: 'd',
        condominium_value_debit: 0,

        copasa: '',
        copasa_value_debit: 0,

        cemig: '',
        cemig_value_debit: 0,

        garbage_rate: null,
        garbage_rate_type_debit: 'd',
        garbage_rate_value_debit: 0,

        iptu: '',
        iptu_type_debit: 'd',
        iptu_value_debit: 0,

        pendencies: '',
        pendencies_type_debit: 'd',
        pendencies_value_debit: 0,

        paint: '',
        paint_type_debit: 'd',
        paint_value_debit: 0,

        value_rent: '',
        value_rent_type_debit: 'd',
        value_rent_value_debit: 0,

        keys_delivery: null,
        control_gate: null,
        control_alarm: null,
        key_manual_gate: null,
        fair_card: null,

        new_zip_code: '',
        new_address: '',
        new_neighborhood: '',
        new_city: '',
        new_state: ''
      }
    }
  },
  watch: {
    inactivationData () {
      this.not_results_found = false
      this.load_data = true
      this.getData()
    },
    'form.new_zip_code' () {
      setTimeout(() => {
        this.form.new_zip_code = this.onlyNumber(this.form.new_zip_code)
      }, 100)
    }
  },
  mounted () {
    this.$bus.$on('Termination\Contract:SubmitRentAccessory', () => {
      this.update()
    })
  }
}
</script>
