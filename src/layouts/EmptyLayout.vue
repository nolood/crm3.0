<template>
  <div class="emptylayout__wrapper">
    <div class="content">
      <router-view :openNotification="openNotification"/>
    </div>
  </div>
</template>

<script>
import { notification } from 'ant-design-vue';
import { defineComponent } from 'vue';
import messages from '@/messages/messages';

export default defineComponent({
  name: 'empty-layout',
  setup() {
    const openNotification = (message, description) => {
      notification.open({
        message,
        description,
      });
    };
    return {
      openNotification,
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.openNotification(messages[fbError.code] || 'Что-то пошло не так');
    },
  },
});
</script>

<style scoped>
.emptylayout__wrapper {
  display: flex;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.content {
  margin-top: 50px;
}
</style>
