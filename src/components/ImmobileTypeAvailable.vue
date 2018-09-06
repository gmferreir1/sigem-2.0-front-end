<template>

  <div>

    <select class="form-control chosen input-sm" data-placeholder="Tipos de Imóvel" :id="id_component" v-model="type_immobile">
      <option value=""></option>
      <option v-for="type in types" :value="type.id">{{wordUpper(`${type.name}`)}}</option>
    </select>

  </div>

</template>

<script>
import {wordUpper} from '@/util/stringHelpers'

export default {
  props: {
    cleanComponent: {
      required: false,
      type: Boolean
    },
    setData: {
      required: false
    },
    id_component: {
      required: false,
      default: 'type_immobile'
    }
  },
  data () {
    return {
      type_immobile: null,
      types: []
    }
  },
  methods: {
    wordUpper,
    getTypesImmobileAvailable () {
      http.get('sicadi/query/types-immobile-available').then(res => {

        this.types = res.data

      }).catch(() => {

      })
    },
    chosenSelect () {
      const self = this

      $('.chosen').chosen({
        width: '100%',
        height: '25px',
        no_results_text: "Oops, nada encontrado para: "
      })

      $('#' + this.id_component).on('change', function(evt, params) {
        self.$emit('typeImmobile', (params ? params.selected : ''))
      })

      setTimeout(() => {
        $(".chosen").trigger("chosen:updated")
      }, 200)

    }
  },
  watch: {
    cleanComponent () {
      this.type_immobile = ''

      setTimeout(() => {
        $(".chosen").val('').trigger("chosen:updated");
      }, 100)
    },
    setData () {
      this.type_immobile = this.setData
      setTimeout(() => {
        $(".chosen").trigger("chosen:updated")
      }, 100)
    }
  },
  mounted () {
    this.getTypesImmobileAvailable()
    this.chosenSelect()
  }
}
</script>