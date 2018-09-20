<template>

  <div>

    <form-select-letter />

    <editor-letter />

  </div>

</template>

<script>
import FormSelectLetter from '../components/FormSelectLetter'
import EditorLetter from '../components/EditorLetter'
export default {
  components: {
    FormSelectLetter,
    EditorLetter
  }
}
</script>