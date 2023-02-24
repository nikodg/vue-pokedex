import { createRouter, createWebHistory } from 'vue-router'
import PokemonList from '../views/PokemonList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PokemonList',
      component: PokemonList
    },
    {
      path: '/:name',
      name: 'PokemonDetails',
      // route level code-splitting
      // this generates a separate chunk (PokemonDetails.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PokemonDetails.vue')
    }
  ]
})

export default router
