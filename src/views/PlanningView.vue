<template>
  <a-card
    title="Планирование"
  >
    <template
      v-if="!loading"
      #extra
    >
      {{ info?.balance.toFixed(2) }} RUB
    </template>
    <AppLoader v-if="loading"/>
    <a-card
      v-else
      v-for="cat of categories"
      :key="cat.id"
      :title="cat.title"
    >
      <template
        #extra
      >
        {{ cat.spend.toFixed(2) }} RUB из {{ cat.limit.toFixed(2) }} RUB
      </template>
      <a-tooltip>
        <template #title>
          {{ cat.tooltip }} RUB
        </template>
        <a-progress
          :stroke-color="cat.progressColor"
          :percent="cat.progressPercent > 0 ? Number(cat.progressPercent.toFixed(2)) : 0"
        />
      </a-tooltip>
    </a-card>
  </a-card>
</template>

<script>
import AppLoader from '@/components/app/AppLoader.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'PlanningView',
  components: { AppLoader },
  data: () => ({
    categories: [],
    loading: true,
  }),
  computed: {
    ...mapGetters(['info']),
  },
  mounted() {
    setTimeout(async () => {
      const records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');
      // eslint-disable-next-line array-callback-return
      this.categories = categories.map((cat) => {
        const spend = records
          .filter((r) => r.categoryId === cat.id)
          .filter((r) => r.type === 'expense')
          // eslint-disable-next-line no-return-assign,no-param-reassign
          .reduce((total, record) => total += +record.amount, 0);
        // eslint-disable-next-line no-mixed-operators
        const percent = 100 * spend / cat.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        // eslint-disable-next-line no-nested-ternary
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red';
        const toolTipValue = cat.limit - spend;
        const tooltip = `${toolTipValue < 0 ? 'Превышение на ' : 'Осталось'} ${Math.abs(toolTipValue).toFixed(2)}`;
        return {
          ...cat,
          progressColor,
          progressPercent,
          spend,
          tooltip,
        };
      });
      console.log(categories);
      this.loading = false;
    }, 1000);
  },
};
</script>
