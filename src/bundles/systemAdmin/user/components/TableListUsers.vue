<template>

  <div class="panel" v-loading="load_data" element-loading-text="Carregando dados, aguarde ...">
    
    <div class="panel-heading">
      Total de Usuários: ({{users.length}})
    </div>

    <div style="position: absolute; right: 15px; top: 10px">
      <input type="text" class="form-control input-sm" size="50" placeholder="pesquisa dados ..." v-model="form_filter.input_search" @keypress.enter="searchData">
    </div>

    <div class="panel-body">

      <div class="row" v-if="!data_list.data.length">
        <div class="col-md-6 col-md-offset-5">
          <not-found />
        </div>
      </div>

      <div class="table-responsive" v-if="data_list.data.length">
        <table class="table table-striped table-bordered table-hover table-condensed">
          <thead>
          <tr>
            <th class="text-left">
              <a href="#" @click.prevent="sort('name')">
                <span v-if="sort_by == 'name' ">
                    <i class="fa" v-if="sort_by == 'name'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Nome
              </a>
            </th>
            <th class="text-left">
              <a href="#" @click.prevent="sort('email')">
                <span v-if="sort_by == 'email' ">
                    <i class="fa" v-if="sort_by == 'email'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Email
              </a>
            </th>
            <th class="text-left">
              <a href="#" @click.prevent="sort('type_profile')">
                <span v-if="sort_by == 'type_profile' ">
                    <i class="fa" v-if="sort_by == 'type_profile'"
                       :class="{'fa-sort-amount-desc': sort_order == false , 'fa-sort-amount-asc': sort_order == true}"
                       aria-hidden="true">
                    </i>
                </span>
                <span v-else>
                    <i class="fa fa-sort" aria-hidden="true"></i>
                </span>
                Tipo Usuário
              </a>
            </th>
            <th class="text-left">Status</th>
            <th class="text-center width-edit"> - </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="list in data_list.data">
            <td>{{wordUpper(list.name)}}</td>
            <td>{{list.email}}</td>
            <td>
              <span :class="{error: list.type_profile === 'admin'}">
                {{wordUpper(list.type_profile)}}
              </span>
            </td>
            <td>
              <span :class="{error: !list.status, success: list.status}">
                {{list.status ? 'Ativo' : 'Inativo'}}
              </span>
            </td>
            <td class="text-center width-edit">
              <a href="" @click.prevent="edit(list)">
                <i class="fa fa-pencil size-icon-table"></i>
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
import {mapActions, mapState} from 'vuex'
import {wordUpper} from '@/util/stringHelpers'

export default {
  components: {
    NotFound
  },
  data () {
    return {
      load_data: true,
      sort_by: 'name',
      sort_order: false,
      data_list: {
        data: []
      },
      form_filter: {
        search: ''
      }
    }
  },
  methods: {
    ...mapActions('Auth', ['getAllUsers']),
    wordUpper,
    searchData () {

      this.load_data = true

      const queryParams = {
        params: {
          search: this.form_filter.input_search,
          searchFields: 'name:like;last_name:like;email:like',
        }
      }

      this.getAllUsers(queryParams).then(res => {
        setTimeout(() => {
          this.load_data = false
        }, 600)
      })

    },
    sort(sortBy = null) {
      this.sort_order = !this.sort_order
      const collection = collect(this.data_list.data)
      let sort

      this.sort_by = !sortBy ? this.sort_by : sortBy

      if (this.sort_order) {
        sort = collection.sortBy(sortBy)
      } else {
        sort = collection.sortByDesc(sortBy)
      }
      this.data_list.data = sort.all()
    },
    edit (data) {
      this.$bus.$emit('SystemAdmin\User:Edit', data)
    }
  },
  computed: {
    ...mapState('Auth', ['users'])
  },
  watch: {
    users () {
      this.data_list.data = this.users
      this.sort()
    }
  },
  mounted () {
    this.getAllUsers().then(res => {
      setTimeout(() => {
        this.load_data = false
      }, 600)
    })
  }
}
</script>

<style scoped>

  th {
    font-weight: normal !important;
    font-size: 12px;
  }

  tr {
    font-size: 11px;
  }

  thead, tbody {
    display: block;
  }

  tbody {
    max-height: calc(100vh - 580px) !important;
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
  }

  .width-edit {
    width: 70px;
  }

</style>