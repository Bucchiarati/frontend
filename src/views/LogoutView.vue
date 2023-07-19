<template>
    <div>
      <h2>Logout</h2>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>

  export default {
    name: 'LogoutView',
    methods: {
      logout() {
        // Elimina el token del LocalStorage
        localStorage.removeItem('token');
        
        // Redirige a la página de inicio
        this.$router.push('/home');
      }
    }
  }
  </script>
  