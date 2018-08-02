<template>

  <div>

    <div class="well" style="margin-right: 5px; margin-left: 5px">

      <div class="row">
        <div class="col-md-2 col-lg-3">
          <input type="text" class="form-control input-sm" placeholder="pesquisa dados ...">
        </div>

        <div class="col-md-2" style="width: 125px">
          <select-status :select="select.status" @valueSelected="value => filter.status = value"/>
        </div>

        <div class="col-md-2" style="width: 125px">
          <select-responsible :select="select.responsible" @valueSelected="value => filter.responsible = value"/>
        </div>

        <div class="col-md-2" style="width: 125px">
          <select-type-register :select="select.type_register" @valueSelected="value => filter.type_register = value"/>
        </div>

        <div class="col-md-2" style="margin-right: 0px; padding-right: 0px; width: 100px">
          <date-picker class="form-control input-sm" v-model="filter.init_date" placeholder="dd/mm/aaaa" />
        </div>

        <div class="col-md-2" style="margin-right: 0px; padding-right: 0px; width: 100px">
          <date-picker class="form-control input-sm" v-model="filter.end_date" placeholder="dd/mm/aaaa" />
        </div>

        <div class="col-md-1">
          <button class="button btn btn-sm btn-primary">Pesquisar</button>
        </div>

      </div>

    </div>


  </div>

</template>

<script>
import SelectStatus from '@/components/MultipleSelect'
import SelectResponsible from '@/components/MultipleSelect'
import SelectTypeRegister from '@/components/MultipleSelect'
import DatePicker from '@/components/DatePicker'

export default {
  components: {
    SelectStatus,
    SelectResponsible,
    SelectTypeRegister,
    DatePicker
  },
  data () {
    return {
      init_date: false,
      end_date: false,
      select: {
        status: {
          id: 'status',
          allSelected: 'Todos selecionados',
          nonSelected: 'Informe o Status',
          selectAll: 'Todos',
          defaultValue: ['p'],
          data: [{
            id: 'p',
            name: 'Pendente'
          }, {
            id: 'r',
            name: 'Resolvido'
          }, {
            id: 'a',
            name: 'Acordo'
          }, {
            id: 'j',
            name: 'Justiça'
          }, {
            id: 'cej',
            name: 'Cob.Ext.Jud'
          }, {
            id: 'c',
            name: 'Cancelado'
          }]
        },
        responsible: {
          id: 'responsible',
          allSelected: 'Responsável (Todos Selecionados)',
          nonSelected: 'Responsável',
          selectAll: 'Todos',
          select_all: true,
          defaultValue: [],
          data: []
        },
        type_register: {
          id: 'type_register',
          allSelected: 'Todos selecionados',
          nonSelected: 'Tipo de Registro',
          selectAll: 'Todos',
          defaultValue: ['termination'],
          data: [{
            id: 'transfer',
            name: 'Transferência'
          }, {
            id: 'termination',
            name: 'Rescisão'
          }]
        }
      },
      filter: {
        status: [],
        responsible: [],
        type_register: [],
        init_date: '',
        end_date: ''
      }
    }
  }
}
</script>