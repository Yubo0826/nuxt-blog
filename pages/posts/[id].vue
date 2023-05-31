<template>
  <div v-if="loading" class="skeleton-container">
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-cover-img" ></div>
    <div class="skeleton skeleton-text" style="width: 80%;"></div>
    <div class="skeleton skeleton-text" style="width: 30%;"></div>
    <div class="skeleton skeleton-text" style="width: 65%;"></div>
    <div class="skeleton skeleton-text" style="width: 50%;"></div>
  </div>

  <div v-else class="post-container">
    <div class="top-content">        
      <h1>{{ post.title }}</h1>
      <PostInfo :post="post" />
      <ProgressiveImage
        lazy-placeholder
        :placeholder-src="post.image.data[0].attributes.formats.thumbnail.url"
        :src="post.image.data[0].attributes.url"
      />
    </div>
    <!-- <p class="CoverImageAuthor">Author by <a :href="post.image.data[0].attributes.caption">{{ post.image.data[0].attributes.alternativeText }}</a></p> -->
    <div class="article-container">
      <!-- <Markdown :source="post.content" /> -->
      <v-md-preview :text="post.content"></v-md-preview>
    </div>
    <vue-utterances repo="Yubo0826/nuxt-blog" theme="github-light" issue-term="pathname" />
  </div>
</template>
<script setup>
import VueUtterances from "vue-utterances"

// document.documentElement.scrollTop = 0

const route = useRoute()
console.log(route)
const id = route.params.id
console.log(id)
// const post = ref()
// const loading = ref(true)
const {data: _post} = await useFetch(`/api/articles/${id}?populate=*`, {
  baseURL: 'https://strapi-blog-cms.de.r.appspot.com'
})
const post = ref()
post.value = _post.value.data.attributes
console.log(post.value)
// this.$runLoading = true
// document.documentElement.scrollTop = 0
// this.loading = true
// const post_id = this.$route.params.id
// axios.get(this.$strapiURL + `/api/articles/${post_id}?populate=*`)
//     .then((res) => {
//         this.loading = false
//         console.log(res.data)
//         this.post = res.data.data.attributes
//         window.document.title = this.post.title
//     })
</script>
<style scoped>
  h1 {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 600;
  }
  .post-container {
    max-width: 1000px;
    margin: 70px auto;
  }
  .top-content {
      padding: 0 2.5rem;
  }
  .article-container {
  margin-bottom: 50px;
  }
  .vuepress-markdown-body {
    font-size: 20px;
  }
  .vuepress-markdown-body h3 {
    font-size: 1.55rem;
  }
  .CoverImageAuthor {
    font-size: 14px;
  }
  .v-progressive-image {
    max-width: 600px!important;
    border-radius: 10px;
  }
  .loading-wrap {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(255, 255, 255);
    opacity: 90%;
    z-index: 1000;
  }
  .loader {
    position: absolute;
    width:50px;
    position:fixed;
    top:50%;
    left:50%; 
    animation: spin 1s linear infinite;
  }
  .vuepress-markdown-body {
    font-size: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media screen and (max-width: 1000px){
    .post-container {
      width: 100%;
    }
  }

  
  /* skeleton loading */
  .skeleton-container {
    height: 100vh;
    width: 80%;
    margin: 6rem auto;
  }

  .skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
  }

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 80%);
    }
    100% {
      background-color: hsl(200, 20%, 95%);
    }
  }

  .skeleton-text {
    width: 100%;
    height: 1.1rem;
    margin-bottom: 1.5rem;
    border-radius: 0.25rem;
  }

  .skeleton-cover-img {
    width: 100%;
    height: 25rem;
    margin-bottom: 3rem;
    border-radius: 0.25rem;
  }
  .skeleton-title {
    width: 80%;
    height: 3rem;
    margin-bottom: 3rem;
    border-radius: 0.25rem;
  }

</style>