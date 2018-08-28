<template>

  <div>

    <div class="well" style="margin-right: 5px; margin-left: 5px">

      <div class="row">

        <div class="col-md-3">
          <input type="text" class="form-control input-sm" title="Pesquisa de dados: Contrato, Arquivo, Caixa" placeholder="Pesquisa de dados">
        </div>

        <div class="col-md-2 col-lg-2" style="width: 125px">
          <select-status :select="select.status" @valueSelected="value => filter.status = value"/>
        </div>

        <div class="col-md-2 col-lg-2" style="width: 125px">
          <select-responsible-register-sector :select="select.responsible_register_sector" @valueSelected="value => filter.responsible_register_sector = value"/>
        </div>

        <div class="col-md-2 col-lg-2" style="padding-right: 0px; width: 105px">
          <date-picker class="form-control input-sm" v-model="filter.init_date" placeholder="dd/mm/aaaa"/>
        </div>

        <div class="col-md-2 col-lg-2" style="padding-left: 5px; padding-right: 0px; width: 95px;">
          <date-picker class="form-control input-sm" v-model="filter.end_date" placeholder="dd/mm/aaaa"/>
        </div>

        <div class="col-md-2">
          <button class="button btn btn-sm btn-primary">Pesquisar</button>
        </div>

        <!-- buttons -->
        <div style="float: right">

          <button class="button btn btn-sm btn-default" title="Nova Transferência">
            <i class="fa fa-plus-circle"></i>
          </button>

          <button class="button btn btn-sm btn-default" title="Score de Atendimento" @click="$emit('openModalScoreAttendant')">
            <i class="fa fa-user"></i>
          </button>

          <button class="button btn btn-sm btn-default" title="Motivos Para Transferência" @click="$emit('openModalReason')">
            <i class="fa fa-comment"></i>
          </button>

          <button class="button btn btn-sm btn-default" title="Imprimir">
            <i class="fa fa-print"></i>
          </button>

        </div>
        <!-- / buttons -->

      </div>

    </div>

  </div>

</template>

<script>
import SelectStatus from '@/components/MultipleSelect'
import SelectResponsibleRegisterSector from '@/components/MultipleSelect'
import DatePicker from '@/components/DatePicker'

export default {
  components: {
    SelectStatus,
    SelectResponsibleRegisterSector,
    DatePicker
  },
  data () {
    return {
      select: {
        status: {
          id: 'status',
          allSelected: 'Todos selecionados',
          nonSelected: 'Informe o Status',
          selectAll: 'Todos',
          defaultValue: ['r', 'd', 'a', 'cd', 'p'],
          data: [{
            id: 'r',
            name: 'Reserva'
          }, {
            id: 'd',
            name: 'Documentação'
          }, {
            id: 'a',
            name: 'Análise'
          }, {
            id: 'cd',
            name: 'Cadastro'
          }, {
            id: 'p',
            name: 'Pendente'
          }, {
            id: 'as',
            name: 'Assinado'
          },{
            id: 'ap',
            name: 'Assinado c/ Pendência'
          }, {
            id: 'af',
            name: 'At.Finais'
          }, {
            id: 'c',
            name: 'Cancelado'
          }]
        },
        responsible_register_sector: {
          id: 'responsible_register_sector',
          allSelected: 'Todos Selecionados (Todos Selecionados)',
          nonSelected: 'Responsável Cadastro',
          selectAll: 'Todos',
          select_all: true,
          defaultValue: [],
          data: []
        }
      },
      filter: {
        search: '',
        status: [],
        responsible_register_sector: [],
        init_date: '',
        end_date: '',
        search_for: 'r',
        print: false
      }
    }
  },
  mounted () {

  }
}
</script>