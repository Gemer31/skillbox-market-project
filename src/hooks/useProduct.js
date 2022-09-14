import axios from 'axios';
import API_BASE_URL from '@/config';
import { ref, reactive, computed } from 'vue';

export default function () {
  const productData = ref(null);
  const fetchStatus = reactive({
    isLoading: false,
    isFailed: false,
  });

  const category = computed(() => (productData.value.category));

  const fetchProduct = (productId) => {
    if (+productId) {
      fetchStatus.isLoading = true;
      fetchStatus.isFailed = false;
      axios.get(`${API_BASE_URL}/api/products/${+productId}`)
        .then((response) => {
          productData.value = response.data;
        })
        .catch(() => {
          fetchStatus.isFailed = true;
        })
        .then(() => {
          fetchStatus.isLoading = false;
        });
    }
  };

  return {
    product: productData,
    category,
    fetchStatus,
    fetchProduct,
  };
}
