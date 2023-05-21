<template>
  <a-layout
    style="min-height: 100vh"
  >
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
      >
        <menu-component
          v-for="item in menuItemsProp"
          :item="item"
          :key="item.id"
        />
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <DropDownMenu/>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view :openNotification="openNotification"/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent, ref } from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import MenuComponent from '@/components/MenuComponents/MenuComponent.vue';
import { menuItems } from '@/utils/MenuItems';
import DropDownMenu from '@/components/DropDownMenu/DropDownMenu.vue';
import { notification } from 'ant-design-vue';

export default defineComponent({
  name: 'main-layout',
  data: () => ({
    menuItemsProp: menuItems,
  }),
  components: {
    DropDownMenu,
    MenuComponent,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    const openNotification = (message, description) => {
      notification.open({
        message,
        description,
      });
    };
    return {
      selectedKeys: ref(['1']),
      collapsed: ref(false),
      openNotification,
    };
  },
  async mounted() {
    if (this.$store.getters?.info && !Object.keys(this.$store.getters?.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
  },
});
</script>
<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.anticon-menu-fold,
.anticon-menu-unfold {
  margin-left: 20px;
}

.ant-layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 0;
  background: #fff;
}
</style>
