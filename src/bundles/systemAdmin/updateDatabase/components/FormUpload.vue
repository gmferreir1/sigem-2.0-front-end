<template>

  <div class="row">
    <div class="col-md-6" v-loading="load_data" :element-loading-text="message_send">
      <div class="panel">
        <div class="panel-heading border">
          Atualização Sistema - <span class="error">Somente Arquivos .ZIP</span>
        </div>
        <div class="panel-body">

          <form @submit.prevent="attachmentFile">
            <div class="row">
              <div class="col-md-5">
                <label>Envio da Base de Dados</label>
                <input multiple type="file" id="file" accept=".zip"/>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-4">
                <button class="button btn btn-sm btn-danger" type="submit" >Enviar Arquivo</button>
              </div>
            </div>
          </form>

        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      load_data: false,
      message_send: '',
      files: []
    }
  },
  methods: {
    /**
     * envio da base de dados para o servidor
     * @param e
     */
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

          const config = {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              this.message_send = progress != 100 ? 'Enviando arquivo: ' + progress + ' %' : 'Alocando arquivo na memória, aguarde ...'
            }
          }

          http.post('sicadi/upload-database', form, config).then((res) => {

            this.updateDatabase()

          }).catch(() => {
            this.load_data = false
          })

        }
      }

    },
    /**
     * leitura da base de dados
     */
    updateDatabase () {

      this.message_send = 'Atualizando tabelas, aguarde ...'

      http.get('sicadi/read-file').then(res => {
        _notification.success()
        document.querySelector('#file').value = ''
        this.files = []
        this.load_data = false

      }).catch(() => {
        this.load_data = false
      })
    }
  }
}
</script>