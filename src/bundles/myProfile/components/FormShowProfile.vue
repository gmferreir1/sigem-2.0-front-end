<template>

  <div class="panel" v-loading="load_data" :element-loading-text="load_data_message" style="padding: 20px">

    <div class="panel-body">

      <div class="row">
        <div class="col-md-3 col-lg-2">
          <label>Primeiro Nome</label>
          <input type="text" class="form-control input-sm" v-model="form.name" disabled>
        </div>

        <div class="col-md-4 col-lg-3">
          <label>Sobrenome</label>
          <input type="text" class="form-control input-sm" v-model="form.last_name" disabled>
        </div>

        <div class="col-md-4 col-lg-3">
          <label>Email de Acesso</label>
          <input type="text" class="form-control input-sm" v-model="form.email" disabled>
        </div>
      </div>

      <div class="row" style="margin-top: 10px">
        <div class="col-md-3 col-lg-2">
          <label>Senha</label>
          <input type="password" class="form-control input-sm">
        </div>

        <div class="col-md-3 col-lg-2">
          <label>Repita a senha</label>
          <input type="password" class="form-control input-sm">
        </div>
      </div>

      <div class="row" style="margin-top: 10px">
        <div class="col-md-12">
          <button class="button btn btn-danger btn-sm" type="submit">Salvar Dados</button>
        </div>
      </div>

      <!-- upload avatar -->

      <!-- dados da reserva -->
      <div class="title-form" style="margin-top: 50px">
        Atualização do Avatar
      </div>
      <hr class="h-row">

      <div class="row" style="margin-top: 10px">

        <div class="col-md-12">
          <form @submit.prevent="attachmentFile">
            <div class="row">
              <div class="col-md-5">
                <input type="file" id="file" accept=".jpg, .bmp, .png"/>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-4">
                <button class="button btn btn-sm btn-primary" type="submit" >Atualizar Avatar</button>

                <button class="button btn btn-default btn-sm" @click="setDefaultImageProfile">Definir Imagem Padrão</button>
              </div>
            </div>
          </form>
        </div>

      </div>

      <!-- / upload avatar -->



    </div>

  </div>

</template>

<script>

export default {
  data () {
    return {
      load_data_message: 'Carregando dados, aguarde ...',
      load_data: false,
      files: [],
      form: {
        name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    attachmentFile(e) {

      this.files =  e.target[0].files

      if (!this.files.length) {
        return
      }

      this.load_data = true

      if (this.files.length > 0) {
        let form = new FormData()

        for (let i = 0; i < this.files.length; i++) {

          form.append('attachment[' + i + ']', this.files[i])

          http.post(`user/profile/change-profile-image`, form).then((res) => {

            this.setImageToLocalStorage(res.data)

            document.querySelector('#file').value = ''
            this.files = []

            setTimeout(() => {
              _notification.success()
              this.load_data = false
            }, 600)

            this.$bus.$emit('TemplateParts\TopHeader:LoadAvatar')

          }).catch(() => {
            this.load_data = false
          })

        }

      }

    },
    setImageToLocalStorage (image) {
      const dataUserLogged = JSON.parse(localStorage.getItem('dataUserLogged'))
      dataUserLogged.image_profile = image
      localStorage.setItem('dataUserLogged', JSON.stringify(dataUserLogged))
    },
    setDefaultImageProfile () {
      this.load_data = true

      http.get('user/profile/set-default-image-profile').then(res => {

        this.setImageToLocalStorage(res.data)

        setTimeout(() => {
          _notification.success()
          this.load_data = false
        }, 600)

        this.$bus.$emit('TemplateParts\TopHeader:LoadAvatar')

      }).catch(() => {
        this.load_data = false
      })
    }
  }
}
</script>

<style scoped>

  th {
    font-weight: normal !important;
    font-size: 11px;
  }

  tr {
    font-size: 11px;
  }

  thead, tbody {
    display: block;
  }

  tbody {
    max-height: calc(100vh - 340px) !important;
    overflow-y: auto;    /* Trigger vertical scroll    */
    overflow-x: hidden;  /* Hide the horizontal scroll */
  }

  thead, tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
  }

  thead {
    width: 100%
  }

  thead > tr > th {
    border-right: none !important;
  }

  .panel-body {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

</style>