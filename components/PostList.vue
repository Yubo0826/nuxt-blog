<template>
  <div ref="scrollComponent">
    <el-row :gutter="20">
      <el-col 
        :xs="24" :sm="12" :md="12" :lg="8" :xl="8"
        v-for="post in displayPosts"
        :key="post.id"
        >
        <div class="post-item">
          <el-card :body-style="{ padding: '0px' }" >
            <ProgressiveImage
              lazy-placeholder
              :placeholder-src="post.attributes.image.data[0].attributes.formats.thumbnail.url"
              :src="post.attributes.image.data[0].attributes.url"
              @click="$router.push(`/posts/${post.id}`)"
            />
            <div class="botton-area">
              <img :src="getIconUrl(post.attributes.category.data.attributes.name)" class="cate-icon">
              <div class="title-container">
                <h2 class="title" @click="$router.push(`/posts/${post.id}`)">
                  <!-- NuxtLink 怎麼加入變數 -->
                  {{ post.attributes.title }}
                </h2>
              </div>
              
              <!-- <div class="description-container">
                <p style="line-height:1.7rem">{{ post.attributes.description }}</p>
              </div> -->

              <div class="date-container">
                <p>
                  <PostInfo :post="post.attributes" />
                  <!-- {{ post.attributes.published_dated }} -->
                </p>
              </div>

              <!-- <div class="tags-container">
                <el-button type="warning" size="small" plain
                    v-for="tag in post.attributes.tags.data"
                    :key="tag.id"
                    @click="$router.push(`/tag/${tag.attributes.name}`)"
                >
                    #{{ tag.attributes.name }}
                </el-button>
              </div> -->


            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <div v-if="loading">
      <img src="../assets/Eclipse-1s-45px.svg" alt="">
    </div>
  </div>
</template>
<script setup>
import { toRaw } from 'vue'

console.log('post list 組件');

const props = defineProps({
  posts: Array,
  infinityScroll: {
    type: Boolean,
    default: false
  }
})

console.log(toRaw(props.posts))

function handlePost(txt) {
  const len = 40      // 文章預覽字數
  if(txt != null && txt != '') {
    return txt.replace(/[#`*]/g, '').substring(0, len) + '...'
  }
  return ''
}

// watch文件
// https://cn.vuejs.org/api/reactivity-core.html#watch
watch(() => props.posts, (newValue, oldValue) => {
  const rawAllPosts = toRaw(newValue)
  if(rawAllPosts !== []) {
    loadMorePosts()
  }
})

onMounted(() => {
  if (props.infinityScroll) {
    loadMorePosts()
    window.addEventListener("scroll", handleScroll)
  } else {
    displayPosts.value = toRaw(props.posts)
  }
})

onUnmounted(() => {
  if (props.infinityScroll) {
    window.removeEventListener("scroll", handleScroll)
  }
})


const scrollComponent = ref(null)

function handleScroll(e) {
  // console.log('handleScroll')
  // let elem = scrollComponent.value
  // element.getBoundingClientRect().bottom < window.innerHeight
  let scrollBottom = window.scrollHeight - window.scrollTop - window.clientHeight
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    loadMorePosts()
  }
}

const displayPosts = ref()
const loading = ref(false)
const size = ref(0)

function loadMorePosts() {
  const postsLen = props.posts.length
  // busy false 執行loadMore；busy true 不執行
  loading.value = true 

  if (postsLen <= 6) {
    displayPosts.value = toRaw(props.posts)
    loading.value = false
  } else {
    size.value += 6
    if (size.value <= postsLen) {
      displayPosts.value = toRaw(props.posts).slice(0, size.value)
      loading.value = false
    } else {
      displayPosts.value = toRaw(props.posts)
      loading.value = false
    }
  }
}

function getIconUrl(cate) {
  switch (cate) {
    case 'Javascript':
      return 'icons/js.svg'
    case 'node.js':
      return 'icons/nodejs.svg'
    case 'Vue.js':
      return 'icons/vuejs.svg'
    case 'Html':
      return 'icons/html.svg'
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap');
</style>
<style scoped>
  h2 {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 600;
  }
  .title:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .filter-category-btn {
    padding: 8px;
    margin: 5px;
    color: #409eff;
    background-color: #f5f7fa;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
  }
  .botton-area {
    position: relative;
    padding: 0 15px 15px 15px;
  }
  .active {
      color: #fff;
      background-color: #409eff;
  }
  .post-item {
    margin-bottom: 19px;
  }
  .title-container {
    height: 85px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .description-container {
    height: 75px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-family: 'Lora', 'Times New Roman', serif
  }
  .date-container {
    color: rgb(26, 26, 26);
    font-size: 1rem;
  }
  .tags-container {
    margin: 5px 0;
  }
  .v-progressive-image {
    cursor: pointer;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.25s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .cate-icon {
    position: absolute;
    right: 0;
    right: 5%;
    top: -30px;
    width: 20%;
    height: 20%;
    z-index: 10;
  }
  
</style>