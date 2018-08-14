<template>

  <div class="panel" v-loading="load_data" :element-loading-text="load_data_message">

    <div class="panel-heading">
      Total de Imóveis: (<span style="font-weight: bold">{{data_list.data.length}}</span>)
    </div>

    <div style="position: absolute; right: 10px; top: 10px">
      <button class="button btn btn-sm btn-default" @click="callPrinter">
        <i class="fa fa-print"></i>
      </button>
    </div>

    <panel-search />

    <div class="panel-body">

      <div class="row" v-if="!data_list.data.length" style="padding-bottom: 10px">
        <div class="col-md-6 col-md-offset-5">
          <not-found />
        </div>
      </div>

      <div class="table-responsive" v-if="data_list.data.length">
        <table class="table table-striped table-bordered table-hover table-condensed">
          <thead>
          <tr>
            <th class="text-center" style="width: 80px">Código</th>
            <th class="text-center" style="width: 80px">Inativação</th>

            <!-- hidden md -->
            <th class="text-left hidden-md" style="width: 150px">Para</th>
            <th class="text-left hidden-lg" style="width: 100px">Para</th>


            <th class="text-center" style="width: 80px">Repasse</th>

            <th class="text-center" style="width: 60px">Tempo</th>

            <th class="text-center" style="width: 60px">Site</th>

            <th class="text-center hidden-md" style="width: 80px">Fotos Site</th>
            <th class="text-center hidden-lg" style="width: 80px">Ft. Site</th>

            <th class="text-center hidden-md" style="width: 80px">Fotos Int.</th>
            <th class="text-center hidden-lg" style="width: 80px">Ft. Int.</th>

            <th class="text-left hidden-md" style="width: 100px">Observação</th>
            <th class="text-center hidden-md" style="width: 90px">Anúncio</th>
            <th class="text-center" style="width: 90px">Status</th>
            <th class="text-center" style="width: 75px">TMP. 2</th>
            <th class="text-center" style="width: 75px">TMP. 3</th>
            <th class="text-center" style="width: 40px"> - </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="list in data_list.data">
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="$emit('edit', list)">{{list.immobile_code.toUpperCase()}}</a>
            </td>
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="$emit('edit', list)">
                {{dateFormat(list.inactivate_date)}}
              </a>
            </td>

            <!-- hidden md -->
            <td class="text-left hidden-md" style="width: 150px">
              <a href="#" @click.prevent="$emit('edit', list)">
                {{strLimit(wordUpper(list.rp_receive_name), 10)}}
              </a>
            </td>
            <!-- hidden lg -->
            <td class="text-left hidden-lg" style="width: 100px">
              <a href="#" @click.prevent="$emit('edit', list)">
                {{strLimit(wordUpper(list.rp_receive_name), 10)}}
              </a>
            </td>

            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="$emit('edit', list)">
                {{dateFormat(list.date_send)}}
              </a>
            </td>
            <td class="text-center" style="width: 60px">
              <a href="#" @click.prevent="edit(list)">
                {{list.duration_inactivate_to_release}}
              </a>
            </td>
            <td class="text-center" style="width: 60px">
              <a href="#" @click.prevent="$emit('edit', list)">
                {{list.site === 1 ? 'Sim' : 'Não'}}
              </a>
            </td>
            <td class="text-center" style="width: 80px">
              <a href="#" @click.prevent="$emit('edit', list)">
                {{list.picture_site === 1 ? 'Sim' : 'Não'}}
              </a>
            </td>
            <td class="text-center" style="width: 90px">
              <a href="#" @click.prevent="$emit('edit', list)">
                {{list.internal_picture === 1 ? 'Sim' : 'Não'}}
              </a>
            </td>
            <td class="text-left hidden-md" style="width: 100px" :title="list.observation">
              <a href="#" @click.prevent="$emit('edit', list)">
                {{strLimit(list.observation, 15)}}
              </a>
            </td>
            <td class="text-center hidden-md" style="width: 90px">
              <a href="#" @click.prevent="$emit('edit', list)">
                {{!list.advertisement ? ' - ' : dateFormat(list.advertisement)}}
              </a>
            </td>
            <td class="text-center" style="width: 90px">
              <a href="#" @click.prevent="$emit('edit', list)">
                <span :class="{error: list.status === 'p', 'success': list.status === 'f'}">
                  {{list.status === 'f' ? 'Finalizado' : 'Pendente'}}
                </span>
              </a>
            </td>
            <td class="text-center" style="width: 75px">
              <a href="#" @click.prevent="$emit('edit', list)">
                {{list.duration_immobile_release_process}}
              </a>
            </td>
            <td class="text-center" style="width: 75px">
              <a href="#" @click.prevent="$emit('edit', list)">
                {{list.duration_total_process}}
              </a>
            </td>
            <td class="text-center" style="width: 40px">
              <a href="#" @click.prevent="$emit('edit', list)">
                <i class="fa fa-pencil size-icon-table orange"></i>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>

import NotFound from '@/components/NotFound'
import {wordUpper, strLimit} from '@/util/stringHelpers'
import {dateFormat} from '@/util/dateTime'
import PanelSearch from './PanelSearch'

export default {
  components: {
    NotFound,
    PanelSearch
  },
  data () {
    return {
      load_data_message: 'Carregando dados, aguarde ...',
      load_data: true,
      data_list: {
        data: []
      },
      filter: {
        input_search: '',
        status: ['p'],
        responsible: [],
        init_date: window.moment().startOf('month').format('DD/MM/YYYY'),
        end_date: window.moment().endOf('month').format('DD/MM/YYYY')
      },
      printer: false
    }
  },
  methods: {
    wordUpper,
    dateFormat,
    strLimit,
    getData () {

      const queryParams = {
        params: {
          status: this.filter.status,
          responsible: this.filter.responsible,
          init_date: this.filter.init_date,
          end_date: this.filter.end_date,
          search: this.filter.input_search,
          searchFields: 'immobile_code:like',
          printer: this.printer
        }
      }

      http.get('termination/immobile-release', queryParams).then(res => {

        if (this.printer) {
          this.printer = false
          const url = window.URL_API + '/' + res.data.file_name
          window.open(url)

          const params = {
            params: {
              file_name: res.data.file_name
            }
          }

          setTimeout(() => {
            http.get('api/remove-file', params)
          }, 1500)

        } else {
          this.data_list.data = res.data.data
        }

        setTimeout(() => {
          this.load_data = false
        }, 600)

      }).catch(() => {
        this.load_data = false
      })
    },
    callPrinter () {
      this.printer = true
      this.load_data = true
      this.load_data_message = 'Gerando impressão, aguarde ...'
      this.getData()
    }
  },
  mounted () {
    this.getData()

    this.$bus.$on('Termination\ImmobileRelease:Search', (filter) => {

      this.load_data_message = 'Carregando dados, aguarde ...'
      this.load_data = true

      this.filter.input_search = filter.input_search
      this.filter.status = filter.status
      this.filter.responsible = filter.responsible
      this.filter.init_date = filter.init_date
      this.filter.end_date = filter.end_date

      this.getData()
    })


    this.$bus.$on('Termination\ImmobileRelease:RefreshTableList', () => {
      this.getData()
    })
  }
}
</script>

<style scoped>

  th {
    font-weight: normal !important;
    font-size: 11px;
  }

  tr {
    font-size: 11px;
  }

  thead, tbody {
    display: block;
  }

  tbody {
    max-height: calc(100vh - 340px) !important;
    overflow-y: auto;    /* Trigger vertical scroll    */
    overflow-x: hidden;  /* Hide the horizontal scroll */
  }

  thead, tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
  }

  thead {
    width: 100%
  }

  thead > tr > th {
    border-right: none !important;
  }

  .panel-body {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

</style>