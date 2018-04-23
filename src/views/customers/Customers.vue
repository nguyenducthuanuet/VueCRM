<template>
<div class="animated fadeIn">
    <b-row>
      <b-col lg="3">
        <input width="200" v-model="filterName" />
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-card :header="caption">
          <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" fixed responsive="sm" :items="filterCustomersByName" :fields="fields" :current-page="currentPage" :per-page="perPage">
            <template slot="status" slot-scope="data">
              <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
            </template>
            <template slot="actions" slot-scope="row">
              <a class="btn btn-info" href="#">
                <i class="fa fa-edit "></i>
              </a>
              <a class="btn btn-danger" href="#">
                <i class="fa fa-trash-o "></i>
              </a>
            </template>
          </b-table>
          <nav>
            <b-pagination :total-rows="getRowCount(customers)" :per-page="perPage" v-model="currentPage" prev-text="Trước" next-text="Sau" hide-goto-end-buttons/>
          </nav>
        </b-card>
      </b-col><!--/.col-->
    </b-row><!--/.row-->
  </div>
</template>

<script>
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export default {
  name: 'customer-table',
  props: {
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      customers: shuffleArray([
        {
          username: 'Samppa Nori',
          registered: '2012/01/01',
          role: 'Member',
          status: 'Active'
        },
        {
          username: 'Estavan Lykos',
          registered: '2012/02/01',
          role: 'Staff',
          status: 'Banned'
        },
        {
          username: 'Chetan Mohamed',
          registered: '2012/02/01',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          username: 'Derick Maximinus',
          registered: '2012/03/01',
          role: 'Member',
          status: 'Pending'
        },
        {
          username: 'Friderik Dávid',
          registered: '2012/01/21',
          role: 'Staff',
          status: 'Active'
        },
        {
          username: 'Yiorgos Avraamu',
          registered: '2012/01/01',
          role: 'Member',
          status: 'Active'
        },
        {
          username: 'Avram Tarasios',
          registered: '2012/02/01',
          role: 'Staff',
          status: 'Banned'
        },
        {
          username: 'Quintin Ed',
          registered: '2012/02/01',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          username: 'Enéas Kwadwo',
          registered: '2012/03/01',
          role: 'Member',
          status: 'Pending'
        },
        {
          username: 'Agapetus Tadeáš',
          registered: '2012/01/21',
          role: 'Staff',
          status: 'Active'
        },
        {
          username: 'Carwyn Fachtna',
          registered: '2012/01/01',
          role: 'Member',
          status: 'Active'
        },
        {
          username: 'Nehemiah Tatius',
          registered: '2012/02/01',
          role: 'Staff',
          status: 'Banned'
        },
        {
          username: 'Ebbe Gemariah',
          registered: '2012/02/01',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          username: 'Eustorgios Amulius',
          registered: '2012/03/01',
          role: 'Member',
          status: 'Pending'
        },
        {
          username: 'Leopold Gáspár',
          registered: '2012/01/21',
          role: 'Staff',
          status: 'Active'
        },
        {
          username: 'Pompeius René',
          registered: '2012/01/01',
          role: 'Member',
          status: 'Active'
        },
        {
          username: 'Paĉjo Jadon',
          registered: '2012/02/01',
          role: 'Staff',
          status: 'Banned'
        },
        {
          username: 'Micheal Mercurius',
          registered: '2012/02/01',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          username: 'Ganesha Dubhghall',
          registered: '2012/03/01',
          role: 'Member',
          status: 'Pending'
        },
        {
          username: 'Hiroto Šimun',
          registered: '2012/01/21',
          role: 'Staff',
          status: 'Active'
        },
        {
          username: 'Vishnu Serghei',
          registered: '2012/01/01',
          role: 'Member',
          status: 'Active'
        },
        {
          username: 'Zbyněk Phoibos',
          registered: '2012/02/01',
          role: 'Staff',
          status: 'Banned'
        },
        {
          username: 'Einar Randall',
          registered: '2012/02/01',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          username: 'Félix Troels',
          registered: '2012/03/21',
          role: 'Staff',
          status: 'Active'
        },
        {
          username: 'Aulus Agmundr',
          registered: '2012/01/01',
          role: 'Member',
          status: 'Pending'
        }
      ]),
      fields: [
        { key: 'username', sortable: true },
        { key: 'registered' },
        { key: 'role' },
        { key: 'status' },
        { key: 'actions' }
      ],
      currentPage: 1,
      perPage: 8,
      totalRows: 0,
      caption: "<i class='fa fa-align-justify'></i> Customers Table",
      filterName: ''
    }
  },
  computed: {
    filterCustomersByName () {
      console.log(this.filterName)
      return this.customers.filter(customer => customer.username.toLowerCase().match(this.filterName.toLowerCase()))
    }
  },
  methods: {
    getBadge (status) {
      return status === 'Active'
        ? 'success'
        : status === 'Inactive'
          ? 'secondary'
          : status === 'Pending'
            ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount (items) {
      return items.length
    }
  }
}
</script>
