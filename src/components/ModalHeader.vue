<template>

  <div class="modal-header">

    <h4 class="modal-title">
      &nbsp;

      <div class="title">
        <slot name="icon_title"></slot>
        {{title}}
      </div>

      <!-- buttons -->
      <div style="float: right">
        <slot></slot>
        <button class="button btn btn-sm btn-default" @click="$emit('closeModal')">Fechar Janela</button>
      </div>
      <!-- / buttons -->

    </h4>

  </div>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    }
  }
}
</script>

<style>

  .title {
    font-size: 16px;
    float: left;
    margin-top: 5px;
  }

  .modal-header {
    padding-top: 5px;
    padding-bottom: 10px;
    background-color: #495469!important;
    font-weight: 700;
    color: #fff;
  }


</style>