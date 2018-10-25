<template>
  <div id="app">
    <vue-editor v-model="text_editor" :editorToolbar="customToolbar" placeholder="Escreva aqui ..."></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: ['setText'],
  name: 'app',
  components: {
    VueEditor
  },
  data () {
    return {
      text_editor: '',
      customToolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ color: ['back', 'red', 'blue', 'yellow', 'Silver'] }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
      ]
    }
  },
  watch: {
    text_editor () {
      this.$emit('textEditor', this.text_editor)
    },
    setText () {
      this.text_editor = this.setText
    }
  },
  mounted () {
    this.$bus.$on('CleanHistoric', () => {
      this.text_editor = ''
    })
  }
}
</script>