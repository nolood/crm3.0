<template>
<a-card
  title="Профиль"
>
  <a-form
    :model="formState"
    layout="vertical"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Имя"
      name="username"
      :rules="[{ required: true, message: 'Введите ваше имя' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        style="width: 100%"
      >
        Сохранить
      </a-button>
    </a-form-item>
  </a-form>
</a-card>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ProfileView',
  props: {
    openNotification: Function,
  },
  setup(props) {
    const store = useStore();
    const formState = reactive({
      username: '',
    });
    const onFinish = (values) => {
      store.dispatch('updateInfo', { name: values.username });
      props.openNotification('Имя пользователя успешно измененено');
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
