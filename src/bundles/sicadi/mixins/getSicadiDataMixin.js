import {mapActions} from 'vuex'
export const getSicadiDataMixin = {
  methods: {
    ...mapActions('Sicadi', ['getImmobileData']),
    getImmobileDataPerCode () {

      if (this.form.immobile_code.length < 3) return

      this.load_data = true

      const queryParams = {
        params: {
          query_by: 'immobile_code',
          value_query: this.form.immobile_code,
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
          this.notResultsFoundSicadi()
          setTimeout(() => {
            this.load_data = false
          }, 600)
        }

      }).catch(() => {
        this.load_data = false
      })
    }
  }
}