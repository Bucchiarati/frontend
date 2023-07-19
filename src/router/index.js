import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ReservacionesView from '../views/ReservacionesView.vue'
import HomeAdminView from '../views/HomeAdminView.vue'
import LogoutView from '../views/LogoutView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: HomeAdminView,
    meta: { requiresAuth: true } // Agrega meta para indicar que la ruta requiere autenticación
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: ReservacionesView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Verificar si la ruta requiere autenticación
  if (requiresAuth) {
    const token = localStorage.getItem('token');

    // Verificar si el token existe y es válido
    if (token) {
      // Continuar a la siguiente ruta
      next();
    } else {
      // Redirigir al inicio de sesión
      next('/login');
    }
  } else {
    // Ruta pública, continuar sin verificar autenticación
    next();
  }
});

export default router

