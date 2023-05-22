<template>
  <a-breadcrumb
    style="margin-bottom: 25px"
  >
    <a-breadcrumb-item>
      <router-link to="/history">
        История
      </router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      {{ record?.type === 'income' ? 'Доход' : 'Расход' }}
    </a-breadcrumb-item>
  </a-breadcrumb>
  <AppLoader v-if="loading"/>
  <a-card
    v-else-if="record"
    :title="record?.type === 'income' ? 'Доход' : 'Расход'"
  >
    <p>Описание: {{ record.desc }}</p>
    <p>Сумма: {{ record.amount.toFixed(2) }} RUB</p>
    <p>Категория: {{ record.categoryName }}</p>
    <p>
      {{ record.date.substr(0, 10).split('-').reverse().join('.') }}
      {{ record.date.slice(11, 19) }}
    </p>
  </a-card>
</template>

<script>
import AppLoader from '@/components/app/AppLoader.vue';

export default {
  name: 'DetailView',
  components: { AppLoader },
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const { id } = this.$route.params;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);
    this.record = {
      ...record,
      categoryName: category.title,
    };
    this.loading = false;
  },
};
</script>
