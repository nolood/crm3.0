<template>
  <a-menu-item :key="item.id">
    <router-link :to="item.route">
      <component :is="item.icon"/>
      <span>{{ item.title }}</span>
    </router-link>
  </a-menu-item>
</template>

<script>
export default {
  name: 'MenuComponent',
  props: {
    item: {
      id: Number,
      title: String,
      route: String,
      icon: Function,
    },
  },
};
</script>
