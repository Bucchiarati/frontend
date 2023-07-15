<template>
  <div>
    <ReservacionesForm>
      <template #navigation>
        <Navigation />
      </template>
    </ReservacionesForm>
  </div>
</template>

<script>
import ReservacionesForm from '../components/ReservacionesForm.vue';
import Navigation from '../components/Navigation.vue';

export default {
  name: 'ReservacionesView',
  components: {
    ReservacionesForm,
    Navigation
  }
};
</script>