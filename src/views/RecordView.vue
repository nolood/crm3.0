<template>
  <a-card
    title="Новая запись"
  >
    <AppLoader
      v-if="loading"
    />
    <a-form
      v-else
      :model="formState"
      name="basic"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item>
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
        name="radioValue"
        :rules="[{ required: true, message: 'Это поле обязательно к заполнению' }]"
      >
        <a-radio-group
          name="radioGroup"
          v-model:value="formState.radioValue"
        >
          <a-radio value="income">Доход</a-radio>
          <a-radio value="expense">Расход</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        name="amount"
        :rules="[{ required: true, message: 'Это поле обязательно к заполнению' }]"
      >
        <a-input-number
          placeholder="Сумма"
          v-model:value="formState.amount"
          style="width: 100%"
          min="1"
        />
      </a-form-item>
      <a-form-item
        name="desc"
        :rules="[{ required: true, message: 'Это поле обязательно к заполнению' }]"
      >
        <a-input
          placeholder="Описание"
          v-model:value="formState.desc"
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
import { SendOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { defineComponent, reactive } from 'vue';
import AppLoader from '@/components/app/AppLoader.vue';

export default defineComponent({
  name: 'RecordView',
  components: { AppLoader, SendOutlined },
  props: {
    openNotification: Function,
  },
  data: () => ({
    categories: [],
    loading: true,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  setup(props) {
    const store = useStore();
    const formState = reactive({
      amount: 1,
      desc: '',
      select: this?.categories[0].id,
      radioValue: 'income',
    });
    const canCreateRecord = () => {
      if (formState.radioValue === 'income' && formState.select) {
        return true;
      }
      if (formState.select) {
        const bill = store.getters.info.balance;
        return bill >= formState.amount;
      }
      return false;
    };
    const onFinish = async () => {
      try {
        if (canCreateRecord()) {
          await store.dispatch('createRecord', {
            categoryId: formState.select,
            amount: formState.amount,
            desc: formState.desc,
            type: formState.radioValue,
            date: new Date().toJSON(),
          });
          const balance = formState.radioValue === 'income'
            ? store.getters.info.balance + formState.amount
            : store.getters.info.balance - formState.amount;
          await store.dispatch('updateInfo', { balance });
          props.openNotification('Запись успешно создана');
        } else {
          props.openNotification('Не все поля заполнены или недостаточно средств');
        }
      } catch (e) {
        console.log(e);
      }
    };
    const handleChange = (values) => {
      console.log(values);
      console.log(store.dispatch('getUid'));
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
