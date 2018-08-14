<template>

  <div v-loading="load_data" :element-loading-text="load_message">

    <div class="row">
      <div class="col-md-2 div-120">
        <label>Código Imóvel</label>
        <input type="text" class="form-control input-sm" v-model="form.immobile_code" disabled>
      </div>

      <div class="col-md-2 div-120">
        <label>Inativação</label>
        <date-picker type="text" class="form-control input-sm" v-model="form.inactivate_date" placeholder="dd/mm/aaaa" disabled/>
      </div>

      <div class="col-md-5 col-lg-4">
        <label>Liberado Para</label>
        <input type="text" class="form-control input-sm" v-model="form.rp_receive_name" disabled>
      </div>

      <div class="col-md-2 div-140">
        <label>Repasse</label>
        <date-picker type="text" class="form-control input-sm" v-model="form.date_send" placeholder="dd/mm/aaaa" disabled/>
      </div>
    </div>

    <div class="row" style="margin-top: 20px">

      <div class="col-md-2" style="width: 180px">
        <input type="checkbox" v-model="select_all" @click="selectAll">
        Selecionar Todos
      </div>

      <div class="col-md-2" style="width: 130px">
        <input type="checkbox" v-model="form.site">
        Site
      </div>

      <div class="col-md-2" style="width: 160px">
        <input type="checkbox" v-model="form.picture_site">
        Fotos Site
      </div>

      <div class="col-md-2" style="width: 150px">
        <input type="checkbox" v-model="form.internal_picture">
        Fotos Internas
      </div>

    </div>

    <div class="row" style="margin-top: 20px">
      <div class="col-md-2 div-140">
        <label>Data Anúncio</label>
        <date-picker type="text" class="form-control input-sm" v-model="form.advertisement" placeholder="dd/mm/aaaa" />
      </div>

      <div class="col-md-2">
        <label>Status</label>
        <select class="form-control input-sm" v-model="form.status">
          <option value="p">Pendente</option>
          <option value="f">Finalizado</option>
        </select>
      </div>
    </div>

    <div class="row" style="margin-top: 20px">
      <div class="col-md-12 col-lg-12">
        <label>Observação</label>
        <textarea rows="4" class="form-control" v-model="form.observation"></textarea>
      </div>
    </div>

  </div>

</template>

<script>
import DatePicker from '@/components/DatePicker'
import {dateFormat} from '@/util/dateTime'
import {wordUpper} from '@/util/stringHelpers'

export default {
  props: {
    dataForm: {
      required: true,
      type: Object
    }
  },
  components: {
    DatePicker
  },
  data () {
    return {
      load_message: 'Carregado dados, aguarde ...',
      load_data: true,
      select_all: false,
      form: {
        immobile_code: '',
        inactivate_date: '',
        rp_receive_name: '',
        date_send: '',
        site: false,
        picture_site: false,
        internal_picture: false,
        advertisement: '',
        status: '',
        observation: ''
      }
    }
  },
  methods: {
    dateFormat,
    wordUpper,
    selectAll () {
      if (!this.select_all) {
        this.form.site = true
        this.form.picture_site = true
        this.form.internal_picture = true
      } else {
        this.form.site = false
        this.form.picture_site = false
        this.form.internal_picture = false
      }
    },
    checkSelected () {
      if (this.form.site && this.form.picture_site && this.form.internal_picture) {
        this.select_all = true
      } else  {
        this.select_all = false
      }
    },
    edit () {
      http.get(`termination/immobile-release/${this.dataForm.data.id}`).then(res => {
        const dataEdit = res.data
        dataEdit.immobile_code = dataEdit.immobile_code.toUpperCase()
        dataEdit.inactivate_date = this.dateFormat(dataEdit.inactivate_date)
        dataEdit.date_send = this.dateFormat(dataEdit.date_send)
        dataEdit.advertisement = dataEdit.advertisement ? this.dateFormat(dataEdit.advertisement) : ''
        dataEdit.rp_receive_name = this.wordUpper(dataEdit.rp_receive_name)

        this.form = dataEdit
        this.checkSelected()

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    submitForm () {
      this.load_message = 'Processando sua solicitação, aguarde ...'
      this.load_data = true

      http.put(`termination/immobile-release/${this.dataForm.data.id}`, this.form).then(res => {
        _notification.success()

        this.$bus.$emit('Termination\ImmobileRelease:RefreshTableList')

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    }
  },
  mounted () {
    this.$bus.$on('Termination\ImmobileRelease:SubmitForm', () => {
      this.submitForm()
    })
  },
  watch: {
    dataForm () {
      this.load_message = 'Carregando dados, aguarde ...'
      this.load_data = true
      this.edit()
    }
  }
}
</script>