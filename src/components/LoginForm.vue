<template>
  <slot name="navigation"></slot>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title class="headline">Iniciar sesión</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="email" label="Correo electrónico" required></v-text-field>
              <v-text-field v-model="password" label="Contraseña" type="password" required></v-text-field>
              <v-btn color="primary" type="submit">Iniciar sesión</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        axios.post('/api/login', { email: this.email, password: this.password })
          .then(response => {
            const token = response.data.token;
            // Almacenar el token en el almacenamiento local o en una cookie, según tus necesidades.
            console.log('Token:', token);
            // Redireccionar al usuario a otra página o realizar otras acciones según tus necesidades.
          })
          .catch(error => {
            console.error('Error al iniciar sesión:', error.response.data.message);
          });
      }
    }
  };
  </script>

<style scoped>
.fill-height {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>