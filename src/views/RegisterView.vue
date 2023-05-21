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

      <a-form-item
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Please input your name!' }]"
      >
        <a-input
          v-model:value="formState.name"
          size="large"
        />
      </a-form-item>

      <a-form-item
        name="agree"
        :rules="[{ required: true }]"
      >
        <a-checkbox
          v-model:checked="formState.agree"
        >
          Я принимаю условия
        </a-checkbox>
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="width: 100%"
          size="large"
        >
          Зарегистрироваться
        </a-button>
      </a-form-item>
    </a-form>
    <a-space
      size="large"
    >
        <span>
            Есть аккаунт?
            <router-link to="/login">
                <a-typography-text
                  type="warning"
                  style="text-transform: uppercase; cursor: pointer"
                  strong
                  html-type="submit"
                >
                    Войти!
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
      name: '',
      agree: false,
    });
    const onFinish = async (values) => {
      if (values.agree && values.email.includes('@') && values.password.length >= 6) {
        const formData = {
          email: values.email,
          password: values.password,
          name: values.name,
        };
        try {
          await store.dispatch('register', formData);
          props.openNotification('Выполняется вход', 'Регистрация прошла успешно. Выполняется вход..');
          await router.push('/');
        } catch (e) {
          console.error(e);
        }
      } else {
        props.openNotification('Не все поля заполнены', 'Не все поля верно заполнены. Email должен содержаться "@", а password должен быть не менее 6 символов');
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
