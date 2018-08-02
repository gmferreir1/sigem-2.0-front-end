<template>
  <div>
    <select :id="select.id" multiple="multiple" v-model="value_selected" style="margin-left: 10px">
      <option v-for="(sel, index) in select.data" :key="index" :value="sel.id" :title="sel.name.toUpperCase()">
        {{ strLimit(sel.name.toUpperCase(), 10) }}
      </option>
    </select>
  </div>
</template>

<script>
import {strLimit} from '@/util/stringHelpers'
export default {
  props: {
    select: {
      required: true
    }
  },
  data () {
    return {
      value_selected: []
    }
  },
  methods: {
    strLimit,
    refreshSelect () {
      $('#' + this.select.id).multiselect('updateButtonText')
      $('#' + this.select.id).multiselect('rebuild')
    },
    setDefaultValue () {
      if (this.select.defaultValue && this.select.defaultValue.length) {
        this.value_selected = this.select.defaultValue
        setTimeout(() => {
          this.refreshSelect()
          this.$emit('valueSelected', this.value_selected)
        }, 500)
      }
    }
  },
  mounted () {
    const self = this

    $('#' + self.select.id).multiselect({
      buttonWidth: '120px',
      numberDisplayed: 8,
      includeSelectAllOption: true,
      allSelectedText: self.select.allSelected,
      nonSelectedText: self.select.nonSelected,
      selectAllText: self.select.selectAll,
      onChange: function (option, checked, select) {
        self.value_selected = $('#' + self.select.id).val()
        self.$emit('valueSelected', self.value_selected)
      }
    })

    $('.multiselect').addClass('btn btn-sm btn-round')

    this.setDefaultValue()
  },
  watch: {
    'select.data' () {
      setTimeout(() => {
        if (this.select.select_all) {
          $('#' + this.select.id).multiselect('selectAll', false)
        }
        $('#' + this.select.id).multiselect('updateButtonText')
        $('#' + this.select.id).multiselect('rebuild')

        this.setDefaultValue()
      }, 1000)
    }
  }
}
</script>


<style>
  .btn-round, .btn-round a, .btn-round .btn {
    border-radius: 5px;
  }
</style>
