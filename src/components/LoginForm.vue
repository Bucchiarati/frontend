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
  axios.post('http://localhost:3000/api/login', {
    email: this.email,
    password: this.password
  })
  .then(response => {
    // Aquí puedes realizar acciones adicionales, como guardar el token en el almacenamiento local
    console.log('Inicio de sesión exitoso');
    // Redirigir al usuario a otra página
    this.$router.push('/admin');
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
