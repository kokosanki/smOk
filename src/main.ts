import './assets/main.scss'

import { Quasar, Notify } from 'quasar'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import iconSet from 'quasar/icon-set/fontawesome-v6'

import 'quasar/src/css/index.sass'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    dark: true
  },
  iconSet
})

app.use(createPinia())

app.mount('#app')
