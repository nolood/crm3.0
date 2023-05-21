<template>
  <a-card
    title="Курс валюты"
  >
    <a-table
      :columns="columns"
      :data-source="tableData"
      size="middle"
      :pagination="false"
    >

    </a-table>
  </a-card>
</template>

<script>
export default {
  name: 'HomeCurrency',
  props: {
    rates: Object,
    date: String,
  },
  data: () => ({
    currencies: ['RUB', 'EUR', 'USD'],
  }),
  setup(props) {
    const currencies = ['RUB', 'EUR', 'USD'];
    return {
      columns: [
        {
          title: 'Валюта',
          dataIndex: 'currency',
          key: 'currency',
        },
        {
          title: 'Курс',
          dataIndex: 'rate',
          key: 'rate',
        },
        {
          title: 'Дата',
          dataIndex: 'date',
          key: 'date',
        },
      ],
      tableData: [
        {
          key: 1,
          currency: currencies[0],
          rate: props.rates[currencies[0]],
          date: props.date.split('-').reverse().join('.'),
        },
        {
          key: 2,
          currency: currencies[1],
          rate: props.rates[currencies[1]],
          date: props.date.split('-').reverse().join('.'),
        },
        {
          key: 3,
          currency: currencies[2],
          rate: props.rates[currencies[2]],
          date: props.date.split('-').reverse().join('.'),
        },
      ],
    };
  },
};
</script>
