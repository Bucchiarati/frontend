<template>
<v-toolbar density="comfortable" title="Restaurant">
  <v-spacer></v-spacer>
  <v-btn text @click="logout">Logout</v-btn>
</v-toolbar>
</template>

<script>
export default {
  name: 'Navigation',
  methods: {
    logout() {

      localStorage.removeItem('token');
      
      // Redirige a la página de inicio
      this.$router.push('/home');
    }
  }
}
</script>
