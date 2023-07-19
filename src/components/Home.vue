<template>
    <slot name="navigation"></slot>
    
    <v-container fluid>
      <v-container class="home">
          <h1 class="title">¡Bienvenido a nuestro Restaurante!</h1>
          <p class="subtitle">Disfruta de nuestra deliciosa comida y realiza tus reservaciones</p>
          
          <v-btn class="reserve-btn" color="primary" to="/reservation">Reservar ahora</v-btn>
      </v-container>
    </v-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px 0;
}

.title {
  font-size: 36px;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 30px;
}

.reserve-btn {
  font-size: 20px;
}

</style>
