<template>
  <div id="app">
    <froala :tag="'textarea'" :config="config" v-model="text_editor"></froala>
  </div>
</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';

export default {
  props: ['setText'],
  name: 'app',
  data () {
    return {
      config: {
        language: 'pt_br',
        events: {
          'froalaEditor.initialized': () => {
            this.text_editor = ''
          }
        },
        placeholderText: 'Escreva aqui...',
        toolbarButtons: ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'insertTable', 'insertHR', 'undo', 'selectAll']
      },
      text_editor: ''
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