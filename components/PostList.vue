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
            <div style="padding: 15px;">
              <div class="title-container">
                <h2 class="title" @click="$router.push(`/posts/${post.id}`)">{{ post.attributes.title }}</h2>
              </div>
              <!-- <Markdown :source="post.attributes.content"/> -->
              <!-- <p style="line-height:1.7rem">{{ handlePost(post.attributes.content) }}</p>description -->
              <div class="description-container">
                <p style="line-height:1.7rem">{{ post.attributes.description }}</p>
              </div>
              <div class="tags-container">
                <el-button type="warning" size="small" plain
                    v-for="tag in post.attributes.tags.data"
                    :key="tag.id"
                    @click="$router.push(`/tag/${tag.attributes.name}`)"
                >
                    #{{ tag.attributes.name }}
                </el-button>
              </div>
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
  posts: Array
})

const posts = ref()


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
  // console.log('watch.')
  // const rawAllPosts = toRaw(newValue)
  // console.log(rawAllPosts)
  // if(rawAllPosts !== []) {
  //   loadMorePosts()
  // }const posts = ref()
  posts = toRaw(newValue)
})

onMounted(() => {
  loadMorePosts()
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})


const scrollComponent = ref(null)

function handleScroll(e) {
  console.log('handleScroll')
  let element = scrollComponent.value
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    loadMorePosts()
  }
}

const displayPosts = ref([])
const busy = ref(false)
const loading = ref(false)
const postSize = ref(0)

function loadMorePosts() {
  console.log('loadMore.')
  console.log('posts 長度 ' + posts)
  const postsLen = posts.length
  
  // busy false 執行loadMore；busy true 不執行
  busy.value = true
  loading.value = true 

  if (postsLen <= 6) {
    displayPosts.value = props.posts
    busy.value = true
    loading.value = false
  } else {
    postSize.value += 6
    if (postSize.value <= postsLen) {
      displayPosts.value = props.posts.slice(0, postSize.value)
      busy.value = false
      loading.value = false
    } else {
      displayPosts.value = props.posts
      busy.value = true
      loading.value = false
    }
  }
}
</script>
<style scoped>
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
  .active {
      color: #fff;
      background-color: #409eff;
  }
  .post-item {
      margin-bottom: 19px;
  }
  .title-container {
      height: 80px;
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
  
</style>