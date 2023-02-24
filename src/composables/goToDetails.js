import { useRouter, useRoute } from 'vue-router';

export function useGoToDetails() {
  const router = useRouter();
  const route = useRoute();

  return (name) => {
    if (route.params.name === name) return;

    router.push({
      name: 'PokemonDetails',
      params: { name }
    });
  }
}