<template>
  <div>
    <h5>標籤為「{{ tagName }}」的文章</h5>
    <div>
        <PostList :posts="posts" />
        <!-- <div v-if="loading" class="loading-container">
            <img src="/src/assets/loading.png" class="loader" />
        </div> -->
    </div>
  </div>
</template>
<script setup>
import { toRaw } from 'vue'

const route = useRoute()
const tagName = ref()
tagName.value = route.params.name

const {data: _posts} = await useFetch('/api/articles?populate=*', {
  baseURL: 'https://strapi-blog-cms.de.r.appspot.com'
})
const posts = ref()
posts.value = _posts.value.data.filter(post => {
  return post.attributes.tags.data.some(tag => tag.attributes.name === tagName.value)
})
</script>
<style scoped>
  h5 {
    font: bold 200% Consolas, Monaco, monospace;
  }

</style>