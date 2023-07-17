<template>
    <div>
        <HomeAdmin>
        <template #navigationAdmin>
            <NavigationAdmin />
        </template>
        </HomeAdmin>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import HomeAdmin from '../components/HomeAdmin.vue';
import NavigationAdmin from '../components/NavigationAdmin.vue';

export default defineComponent({
    name: 'HomeAdminView',

    components: {
        HomeAdmin,
        NavigationAdmin
    },
});

</script>