export const queryZipCodeMixin = {
  data () {
    return {
      check_zip_code: ''
    }
  },
  methods: {
    queryZipCode (zipCode) {

      if (zipCode.length === 8 && zipCode != this.check_zip_code) {

        this.check_zip_code = zipCode

        http.get(`api/query-cep/${zipCode}`).then(res => {

          this.dataFormByCep(res.data)

        }).catch(() => { })

      }

    }
  }
}