<template>
  <a-card
    style="width: 100vw; max-width: 600px"
    title="Домашняя бухгалтерия"
  >
    <a-form
      :model="formState"
      layout="vertical"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Username"
        name="email"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input
          v-model:value="formState.email"
          size="large"
        />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password
          v-model:value="formState.password"
          size="large"
        />
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="width: 100%"
          size="large"
        >
          Войти
        </a-button>
      </a-form-item>
    </a-form>
    <a-space
      size="large"
    >
      <span>
        Есть аккаунт?
        <router-link to="/register">
          <a-typography-text
            type="warning"
            style="text-transform: uppercase; cursor: pointer"
            strong
            html-type="submit"
          >
            Зарегистрироваться!
          </a-typography-text>
        </router-link>
      </span>
    </a-space>
  </a-card>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    openNotification: Function,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const formState = reactive({
      email: '',
      password: '',
    });
    const onFinish = async (values) => {
      if (values.password.length >= 6 && values.email.includes('@')) {
        const formData = {
          email: formState.email,
          password: formState.password,
        };
        try {
          await store.dispatch('login', formData);
          props.openNotification('Вход успешно выполнен');
          await router.push('/');
        } catch (e) {
          console.error(e);
        }
      } else {
        props.openNotification('Не действительный email или password', 'Email должен содержать "@", а пароль должен быть не меньше 6 символов');
      }
    };
    const onFinishFailed = () => {
      props.openNotification('Не все поля заполнены');
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
