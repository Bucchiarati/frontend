<template>
  <div>
    <LoginForm>
      <template #navigation>
        <Navigation />
      </template>
    </LoginForm>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import Navigation from '../components/Navigation.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
    Navigation
  }
};
</script>
