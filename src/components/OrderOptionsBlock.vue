<template>
  <div class="order-options-block">
    <Transition name="fade" mode="out-in">
      <DataLoader v-if="!items" width="50" height="50"/>
      <div v-else>
        <h3 class="cart__title">{{ title }}</h3>
        <ul class="cart__options options">
          <li v-for="item in items" :key="title + '-' + item.id" class="options__item">
            <label class="options__label">
              <input class="options__radio sr-only"
                     type="radio"
                     :name="title"
                     :value="item.id"
                     @input="$emit('update:modelValue', $event.target.value)"
                     :checked="modelValue === item.id"
              >
              <span class="options__value">{{ item.title }} <b v-if="item.highlightedValue">{{ item.highlightedValue }}</b></span>
            </label>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script>
import DataLoader from '@/components/DataLoader.vue';

export default {
  name: 'OrderOptionsBlock',
  components: {
    DataLoader,
  },
  props: [
    'title', 'items', 'modelValue',
  ],
};
</script>

<style scoped>
.order-options-block {
  display: flex;
  flex-direction: column;
}
</style>
