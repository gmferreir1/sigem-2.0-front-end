<template>


 <div v-loading="load_data" element-loading-text="Consultando informações, aguarde...">

   <!-- dados do imóvel -->

   <div class="title-form">Dados do Imóvel</div>
   <hr class="h-row">

   <div class="row">

     <div class="col-md-2 div-140">
       <label>Contrato</label>
       <input type="text" class="form-control input-sm" v-model="form.contract" @keypress.enter="getImmobileDataPerContract">
     </div>

     <div class="col-md-2 div-140">
       <label>Código</label>
       <input type="text" class="form-control input-sm" v-model="form.immobile_code">
     </div>

     <div class="col-md-4 col-lg-3">
       <label>Endereço</label>
       <input type="text" class="form-control input-sm" v-model="form.address">
     </div>

     <div class="col-md-3 col-lg-2">
       <label>Bairro</label>
       <input type="text" class="form-control input-sm" v-model="form.neighborhood">
     </div>

     <div class="col-md-2 div-140">
       <label>Valor</label>
       <money class="form-control input-sm" v-model="form.value" disabled></money>
     </div>

   </div>
   <!-- / dados do imóvel -->


   <!-- dados do proprietário -->
   <div class="title-form">Dados do Imóvel</div>
   <hr class="h-row">

   <div class="row sp-row">

     <div class="col-md-4 col-lg-3">
       <label>Proprietário</label>
       <input type="text" class="form-control input-sm" v-model="form.owner_name">
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

     <div class="col-md-3">
       <label>Email</label>
       <input type="text" class="form-control input-sm" v-model="form.owner_email">
     </div>

   </div>
   <!-- / dados do proprietário -->

   <!-- dados do inquilino -->
   <div class="title-form">Dados do Inquilino</div>
   <hr class="h-row">

   <div class="row sp-row">

     <div class="col-md-4 col-lg-3">
       <label>Inquilino</label>
       <input type="text" class="form-control input-sm" v-model="form.tenant">
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

     <div class="col-md-3">
       <label>Email</label>
       <input type="text" class="form-control input-sm" v-model="form.tenant_email">
     </div>

   </div>
   <!-- / dados do inquilino -->

 </div>


</template>

<script>
import {mapActions} from 'vuex'
import {wordUpper} from '@/util/stringHelpers'

export default {
  data () {
    return {
      load_data: false,
      form: {
        contract: '',
        immobile_code: '',
        address: '',
        neighborhood: '',
        value: '',
        owner_name: '',
        owner_phone_residential: '',
        owner_phone_commercial: '',
        owner_cell_phone: '',
        owner_email: '',
        tenant: '',
        tenant_phone_residential: '',
        tenant_phone_commercial: '',
        tenant_cell_phone: '',
        tenant_email: ''
      }
    }
  },
  methods: {
    ...mapActions('Sicadi', ['getImmobileData']),
    wordUpper,
    getImmobileDataPerContract () {

      this.load_data = true

      if (this.form.contract.length < 4) return

      const queryParams = {
        params: {
          query_by: 'contract',
          value_query: this.form.contract,
        }
      }

      this.getImmobileData(queryParams).then(res => {

        if (res.data.length === 1) {
          this.setFormData(res.data[0])
        }

        setTimeout(() => {
          this.load_data = false
        }, 600)

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
      this.form.owner_name = wordUpper(data.owner)
      this.form.owner_phone_residential = data.owner_phone_residential
      this.form.owner_phone_commercial = data.owner_phone_commercial
      this.form.owner_cell_phone = data.owner_cell_phone
      this.form.owner_email = data.owner_email
      this.form.tenant = wordUpper(data.tenant)
      this.form.tenant_phone_residential = data.tenant_phone_residential
      this.form.tenant_phone_commercial = data.tenant_phone_commercial
      this.form.tenant_cell_phone = data.tenant_cell_phone
      this.form.tenant_email = data.tenant_email
    }
  },
  mounted () {
    this.$bus.$on('Sicadi:DataExported', (data) => {
      this.setFormData(data)
    })
  }
}
</script>

<style>

  .h-row {
    margin-top: 0px !important;
    width: 90%;
  }

  .title-form {
    font-weight: bold;
    margin-top: 10px;
    color: #E98531;
  }

  .sp-row {
    margin-top: 10px !important;
  }

</style>