<template>
  <a-card
    title="История записей"
  >
    <AppLoader v-if="loading"/>
    <HistoryTable
      v-else
      :records="records"
    />
  </a-card>
</template>

<script>
import HistoryTable from '@/components/history/HistoryTable.vue';
import AppLoader from '@/components/app/AppLoader.vue';

export default {
  name: 'HistoryView',
  components: { AppLoader, HistoryTable },
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    // this.records = await this.$store.dispatch('fetchRecords');
    this.categories = await this.$store.dispatch('fetchCategories');
    const records = await this.$store.dispatch('fetchRecords');
    this.records = records.map((record, index) => ({
      ...record,
      index: index + 1,
      categoryName: this.categories.find((c) => c.id === record.categoryId).title,
      typeColor: record.type === 'income' ? 'green' : 'red',
      typeText: record.type === 'income' ? 'Доход' : 'Расход',
    }));
    this.loading = false;
  },
};
</script>
