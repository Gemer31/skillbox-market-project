<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" type="text" :placeholder="placeholder" v-model="dataValue">
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  name: 'BaseFormText',
  mixins: [formFieldMixin],
};
</script>
