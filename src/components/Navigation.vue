<template>
<v-toolbar density="comfortable" title="Restaurant">
  <v-btn text to="/home">Home</v-btn>
  <v-btn text to="/about">About</v-btn>
  <v-spacer></v-spacer>
  <v-btn text to="/login">Login</v-btn>
  <v-btn text to="/reservation">Reservas</v-btn>
</v-toolbar>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>
