<template>
<a-card
  title="Счёт"
>
  <AppLoader v-if="loading"/>
  <a-row v-else>
    <a-col :span="12">
      <HomeBill
        :rates="currency.rates"
      />
    </a-col>
    <a-col :span="12">
      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />
    </a-col>
  </a-row>
</a-card>
</template>

<script>
import HomeBill from '@/components/Home/HomeBill.vue';
import HomeCurrency from '@/components/Home/HomeCurrency.vue';
import AppLoader from '@/components/app/AppLoader.vue';

export default {
  name: 'HomeView',
  components: {
    AppLoader,
    HomeCurrency,
    HomeBill,
  },
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    try {
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
