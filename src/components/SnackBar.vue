<template>
  <Transition name="slide-fade">
    <div v-if="snackVisible" class="snack-bar">
      <DataProcessedSuccessfullyItem v-if="type === 'success'" :width="20" :height="20"/>
      <DataLoadingError v-else-if="type === 'error'" :svg-color="'red'" :no-message="true" :svg-height="20" :svg-width="20"/>
      {{ message }}
    </div>
  </Transition>
</template>

<script>
import DataProcessedSuccessfullyItem from '@/components/DataProcessedSuccessfullyItem.vue';
import DataLoadingError from '@/components/DataLoadingError.vue';
import eventBus from '@/eventBus';

export default {
  name: 'SnackBar',
  components: {
    DataProcessedSuccessfullyItem,
    DataLoadingError,
  },
  data() {
    return {
      snackVisible: false,
      type: 'error',
      message: null,
      timer: null,
    };
  },
  created() {
    eventBus.$on('showSnack', (params) => {
      if (this.snackVisible) {
        this.snackVisible = false;
        clearTimeout(this.timer);
        setTimeout(() => {
          this.showSnackBar(params);
        }, 150);
      } else {
        this.showSnackBar(params);
      }
    });
  },
  methods: {
    showSnackBar(params) {
      this.snackVisible = true;
      this.message = params.message;
      this.type = params.type;

      this.timer = setTimeout(() => {
        this.snackVisible = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.snack-bar {
  background-color: #3c403d;
  border-radius: 5px;
  padding: 10px;
  min-width: 120px;
  max-width: 400px;
  position: fixed;
  top: 18px;
  color: white;
  right: 10px;
  z-index: 1;
  display: flex;
}

.data-processed-successfully, .data-loading-error {
  margin: 0 10px 0 0;
}

.slide-fade-enter-active {
  transition: all 0.15s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
