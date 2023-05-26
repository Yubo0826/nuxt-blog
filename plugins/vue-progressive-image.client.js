import "vue-progressive-image/dist/style.css"; // <--- very important!
import VueProgressiveImage from 'vue-progressive-image'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueProgressiveImage)
})