<template>
  <a-dropdown>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1">
          <router-link to="/profile">
            <UserOutlined />
            Профиль
          </router-link>
        </a-menu-item>
        <a-menu-item
          key="2"
          @click="logout"
        >
          <CloseCircleOutlined />
          Выйти
        </a-menu-item>
      </a-menu>
    </template>
    <a-button>
      <UserOutlined />
      {{ name }}
      <DownOutlined />
    </a-button>
  </a-dropdown>
</template>

<script>
import { defineComponent } from 'vue';
import { DownOutlined, UserOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'DropDownMenu',
  components: {
    DownOutlined, UserOutlined, CloseCircleOutlined,
  },
  computed: {
    name() {
      return this.$store.getters.info?.name || 'USERNAME';
    },
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const logout = async () => {
      await store.dispatch('logout');
      await router.push('/login');
    };
    return {
      logout,
    };
  },
});
</script>
