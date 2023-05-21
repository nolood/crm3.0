<template>
  <a-card
    title="Редактировать"
  >
    <a-form
      :model="formState"
      name="basic"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item v-if="categories.length">
        <a-select
          style="width: 100%;"
          @change="handleChange"
          v-model:value="formState.select"
        >
          <a-select-option
            v-for="c of categories"
            :key="c.id"
          >
            {{ c.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
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
          :disabled="!(categories.length > 0)"
        >
          Изменить
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
  name: 'EditForm',
  components: {
    SendOutlined,
  },
  props: {
    openNotification: Function,
    categories: {
      type: Array,
      require: true,
    },
  },
  setup(props) {
    const store = useStore();
    const ctx = getCurrentInstance();
    const formState = reactive({
      title: '',
      limit: 1,
      select: props.categories[0].id,
    });
    const onFinish = async () => {
      try {
        console.log(formState);
        props.openNotification('Категория была изменина');
        const categoryData = {
          id: formState.select,
          title: formState.title,
          limit: formState.limit,
        };
        await store.dispatch('updateCategory', categoryData);
        ctx.emit('updated', categoryData);
      } catch (e) {
        console.log(e);
      }
    };
    const handleChange = (values) => {
      console.log(values);
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
      handleChange,
    };
  },
});
</script>
