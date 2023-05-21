<template>
  <a-table
    :columns="columns"
    :data-source="records"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'amount'">
        {{ record.amount.toFixed(2) }} RUB
      </template>
      <template v-else-if="column.key === 'typeText'">
        <a-tag
          :color="record.typeColor"
        >
          {{ record.typeText }}
        </a-tag>
      </template>
      <template v-else-if="column.key === 'open'">
        <a-tooltip
          title="Посмотреть запись"
        >
          <a-button
            type="primary"
            @click="$router.push('/detail/' + record.id)"
          >
            Открыть
          </a-button>
        </a-tooltip>
      </template>
    </template>
  </a-table>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
  data: () => ({
    columns: [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: 'Сумма',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Категория',
        dataIndex: 'categoryName',
        key: 'categoryName',
      },
      {
        title: 'Тип',
        dataIndex: 'typeText',
        key: 'typeText',
      },
      {
        title: 'Открыть',
        dataIndex: 'open',
        key: 'open',
      },
    ],
  }),
  mounted() {
    console.log(this.records);
  },
};
</script>
