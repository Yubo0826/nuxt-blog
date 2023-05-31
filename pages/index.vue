<template>
    <div class="title-container">
      <h1 class="blog-title">Hi! I'm David.</h1>
    </div>
    <h3 class="blog-second-title">開發時的隨手札記</h3>
    <div class="searchbox">
      <el-input v-model="searchWord" class="w-50 m-2" placeholder="搜尋" @click="searchBox = true">
        <template #prefix>
          <el-icon class="el-input__icon">
            <!-- <search /> -->
          </el-icon>
        </template>
      </el-input>
    </div>
    <transition>
      <SearchBox :posts="posts" @close="searchBox = false" v-if="searchBox" />
    </transition>
    <div class="category-container flex justify-space-between mb-4">
      <button
        v-for="(item, index) in category"
        :key="item"
        class="filter-category-btn"
        :class="{active: categoryInActive[index]}"
        @click="handleFilterCategoryBtn(index)"
        >{{ item }}</button
      >
    </div>
    
    <!-- main area -->
    <div v-show="!searchBox">
        <el-row :gutter="40">
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <!-- <div v-if="loading" class="load-wrapp">
                <LoadingSpinner />
            </div> -->
            <PostList :posts="filterPostsByCategory" infinity-scroll />
          </el-col>
    
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="hidden-sm-and-down">
            <div class="profile-container">
                <Profile></Profile>
            </div>
          </el-col>
        </el-row>
    </div>

</template>
<script setup>
import { computed } from 'vue'

const searchWord = ref('')
const searchBox = ref(false)

const posts = ref()
const {data: _posts} = await useFetch('/api/articles?populate=*', {
  baseURL: 'https://strapi-blog-cms.de.r.appspot.com'
})
posts.value = _posts.value.data

// function category(name) {
//   this.name = name
//   this.active = false
// }

// const postsCat = ref([new category('Javascript'), new category('Javascript')])

const category = ref(['Javascript', 'Vue.js'])
const categoryInActive = ref([false, false])
const currentCategory = ref('')

function handleFilterCategoryBtn(index) {
  if (categoryInActive.value[index]) {
    categoryInActive.value[index] = !categoryInActive.value[index]
    currentCategory.value = ''
    return
  }
  categoryInActive.value.forEach((el, ins, arr) => {
    arr[ins] = false
  })
  categoryInActive.value[index] = true
  currentCategory.value = category.value[index]
  console.log('Filter Category: ' + currentCategory.value)
}

const filterPostsByCategory = computed(() => {
  console.log('computed posts')
  if (!currentCategory.value) {
    return posts.value
  }
  return posts.value.filter(el => {
    let postCategory = el.attributes.category.data.attributes.name
    if (!postCategory) {
      // return posts.value
      return false
    }
    return postCategory === currentCategory.value
  })
})

console.log(filterPostsByCategory)
</script>
<style scoped>
    .title-container {
        width: 20%;
        margin: 80px auto;
    }

    @keyframes typing {
        from { width: 0 }
    }

    @keyframes caret {
        50% { border-right-color: transparent; }
    }

    .blog-title {
        font: bold 200% Consolas, Monaco, monospace;
    /* 	width: 8.25em; */
        width: 15ch;
        white-space: nowrap;
        overflow: hidden;
        border-right: .05em solid;
        animation: typing 4s steps(15) infinite,
                caret 1s steps(1) infinite;
    }
    .blog-second-title {
        font-size: 1.25rem;
        font-weight: 500;
        color: rgb(112, 112, 112);
        text-align: center;
    }
    .profile-container {
        position: sticky;
        top: 0;
    }
    .searchbox {
        width: 500px;
        margin: 0 auto;
    }
    .category-container {
        width: 300px;
        margin: 15px auto;
        margin-bottom: 50px;
        text-align: center;
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
    .loading-container {
        margin-top: 75px;
        text-align: center;
    }
    .active {
        color: #fff;
        background-color: #409eff;
    }
    .v-enter-active,
    .v-leave-active {
    transition: opacity 0.25s ease;
    }

    .v-enter-from,
    .v-leave-to {
    opacity: 0;
    }

    @media screen and (max-width: 650px){
        .searchbox {
            width: 90%;
        }
    }
    
</style>