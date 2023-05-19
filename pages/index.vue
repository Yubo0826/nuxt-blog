<template>
    <div class="title-container">
        <h1 class="blog-title">Hi! I'm David.</h1>
    </div>
    <h3 class="blog-second-title">隨手紀錄開發所得到的相關知識.</h3>
    <div class="searchbox">
        <el-input v-model="searchWord" class="w-50 m-2" placeholder="Type something" @click="searchBox = true">
            <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
            </template>
        </el-input>
    </div>
    <transition>
        <SearchBox :allPosts="posts" @close="closeSearchBox" v-show="searchBox" />
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
            <div v-if="loading" class="load-wrapp">
                <LoadingSpinner />
            </div>
            <PostList :allPosts="filterPostsByCategory" />
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

</script>