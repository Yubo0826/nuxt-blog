<template>
  <div class="info-container">
    <a href="https://www.cakeresume.com/yubo0826" class="author" target="_blank">David Chou</a>
    <!-- <span>．{{ readingTime(post.content) }} min read ． {{ post.publishedAt.split('T')[0] }}</span> -->
    <span>．{{ readingTime(post.content) }} min read ． {{ post.published_dated }}</span>
  </div>
  <div class="tags-container">
    <el-button type="warning" size="small" plain
      v-for="tag in post.tags.data"
      :key="tag.id"
      @click="$router.push(`/tag/${tag.attributes.name}`)"
    >
      #{{ tag.attributes.name }}
    </el-button>
  </div>
</template>
<script setup>
const props = defineProps({
  post: Array
})

function readingTime(txt) {
  const wpm = 30     // 粗估一分鐘讀幾個字
  const filterPost = txt.replace(/[#`*]/g, '')
  const words = filterPost.trim().split(/\s+/).length
  return Math.ceil(words / wpm)
}
</script>
<style scoped>
    .info-container {
        margin-bottom: 10px;
        color: #808080;
        font-size: 18px;
        font-style: italic;
        margin: 0 0 10px;
    }
    .author {
        color: rgb(76, 194, 65);
    }
    .tags-container {
        margin-bottom: 20px;
    }
</style>