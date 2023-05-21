<template>
<a-card
  title="Счёт в валюте"
>
  <a-table
    :columns="columns"
    :data-source="tableData"
    size="middle"
    :pagination="false"
  />
</a-card>
</template>

<script>

import { watch } from 'vue';

export default {
  name: 'HomeBill',
  props: {
    rates: Object,
  },
  data: () => ({
    columns: [
      {
        title: 'Валюта',
        dataIndex: 'currency',
        key: 'currency',
      },
      {
        title: 'Счёт',
        dataIndex: 'rate',
        key: 'rate',
      },
    ],
    tableData: [],
    bill: 0,
    currencies: ['RUB', 'USD', 'EUR'],
  }),
  mounted() {
    // this.tableData = this.currencies.map((currency, index) => ({
    //   key: index,
    //   currency,
    //   rate: (this.balance * this.rates[currency]).toFixed(2),
    // }));
    watch(
      () => this.$store.getters.info?.balance,
      (newBalance) => {
        this.bill = newBalance;
        this.tableData = this.currencies.map((currency, index) => ({
          key: index,
          currency,
          rate: (newBalance * this.rates[currency]).toFixed(2),
        }));
      },
    );
  },
};
</script>
