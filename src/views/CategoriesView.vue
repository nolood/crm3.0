<template>
  <a-card
    title="Категории"
  >
    <AppLoader v-if="loading"/>
    <a-row v-else>
      <a-col :span="12">
        <CreateForm
          @created="addNewCategory"
          :openNotification="openNotification"
        />
      </a-col>
      <a-col :span="12">
        <EditForm
          :categories="categories"
          :openNotification="openNotification"
          @updated="updateCategories"
        />
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import CreateForm from '@/components/categories/CreateForm.vue';
import EditForm from '@/components/categories/EditForm.vue';
import AppLoader from '@/components/app/AppLoader.vue';
// import { watch } from 'vue';

export default {
  name: 'CategoriesView',
  components: { AppLoader, EditForm, CreateForm },
  props: {
    openNotification: Function,
  },
  data: () => ({
    categories: [],
    loading: true,
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
    },
  },
  async mounted() {
    // watch(
    //   () => this.$store.getters.info?.categories,
    //   (categories) => {
    //     this.categories = [...Object.values(categories)];
    //   },
    // );
    setTimeout(async () => {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;
    }, 1000);
  },
};
</script>
