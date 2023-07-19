<template>
  <div>
    <Home>
      <template #navigation>
        <Navigation />
      </template>
    </Home>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Home from '../components/Home.vue';
import Navigation from '../components/Navigation.vue';


export default defineComponent({
  
  name: 'HomeView',

  components: {
    Home,
    Navigation
  },
});
</script>
