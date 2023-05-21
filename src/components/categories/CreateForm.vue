<template>
  <a-card
    title="Создать"
  >
    <a-form
      :model="formState"
      name="basic"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        name="title"
        :rules="[{ required: true, message: 'Это поле обязательно к заполнению' }]"
      >
        <a-input
          placeholder="Название"
          v-model:value="formState.title"
        />
      </a-form-item>
      <a-form-item
        name="limit"
        :rules="[{ required: true, message: 'Это поле обязательно к заполнению' }]"
      >
        <a-input-number
          placeholder="Лимит"
          v-model:value.number="formState.limit"
          :min="1"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          style="width: 100%"
          size="large"
          html-type="submit"
        >
          Создать
          <SendOutlined/>
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive } from 'vue';
import { SendOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CreateForm',
  components: {
    SendOutlined,
  },
  props: {
    openNotification: Function,
  },
  setup(props) {
    const store = useStore();
    const ctx = getCurrentInstance();
    const formState = reactive({
      title: '',
      limit: 1,
    });
    const onFinish = async (values) => {
      try {
        const category = await store.dispatch('createCategory', {
          title: values.title,
          limit: values.limit,
        });
        console.log(category);
        props.openNotification('Категория была добавлена');
        ctx.emit('created', category);
      } catch (e) {
        console.log(e);
      }
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
