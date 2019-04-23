<template>
  <v-data-table :headers="headers" :items="items" :pagination.sync="pagination">
    <template v-slot:items="props">
      <td class="text-xs-center">{{ props.item.name }}</td>
      <td class="text-xs-center">{{ props.item.numSumPre }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    selected: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      raw: null,
      pagination: {
        descending: true,
        rowsPerPage: 10,
        sortBy: 'numSumPre'
      },
      headers: [
        {
          text: '常用字 Top 100',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        {
          text: '使用字频',
          value: 'numSumPre',
          align: 'center',
          sortable: true
        }
      ],
      items: []
    }
  },
  watch: {
    selected(newValue) {
      const _this = this

      _this.raw = _this.$store.state.poetry.rawCharsSummary[newValue]
      _this.items = []
      for (const key in _this.raw) {
        const obj = {
          name: key,
          numSumPre: _this.raw[key][newValue]
        }
        _this.items.push(obj)
      }
    }
  }
}
</script>
