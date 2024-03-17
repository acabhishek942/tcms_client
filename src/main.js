import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import 'primevue/resources/themes/saga-blue/theme.css'; // Choose your preferred theme
import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';
  

const app = createApp(App)
app.use(PrimeVue)
app.component('DataTable', DataTable)
app.component('PrimeColumn', Column)
app.component('PrimeButton', Button)
app.component('PrimeDialog', Dialog)
app.component('InputText', InputText)
app.component('PrimeDropdown', Dropdown)
app.use(store)
app.mount('#app')
