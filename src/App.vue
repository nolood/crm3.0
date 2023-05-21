<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  components: {
    EmptyLayout, MainLayout,
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout}-layout`;
    },
  },
};
</script>
