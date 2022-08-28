<template>
  <label class="form__label">
    <slot/>
    <span class="form__value">{{ title }}</span>
    <span v-if="error" class="form__error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  name: 'BaseFormField',
  props: ['title', 'error'],
};
</script>

<style scoped>

</style>
