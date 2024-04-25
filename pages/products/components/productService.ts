import { useFetch } from '@vueuse/core';
import { base_url } from '~/api';
import { ref, watch } from 'vue';

export const useProductService = (searchField: any) => {
  let items = ref<{ id: string, name: string, code: string, quantity: number, price: number }[]>([]);
  const fetchProducts = async () => {
    const token = localStorage.getItem('token') || '';
    const { data } = await useFetch(`${base_url}/product?pattern`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).json();
    if (data) {
      items.value = data.value;
    }
  };

  return {
    items,
    fetchProducts,
  };
};