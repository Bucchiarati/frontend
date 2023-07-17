// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDataTable } from 'vuetify/lib/labs/components.mjs'
//import v-data-table from 'vuetify/lib/components/VDataTable'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    components: {
      VDataTable
    },
  }
)
