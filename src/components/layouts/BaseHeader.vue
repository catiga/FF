
<template>
  <section class="header-container flex items-center gap-x-3" style="height: var(--ep-menu-item-height)">
    <!-- 移动端菜单 -->
    <section class="sm:hidden">
      <el-icon @click="toggleDrawer" :size="24"><Operation /></el-icon>
      <section class="mobile-menu" :class="[drawer?'show':'']" @click.capture="drawer = false">
        <section class="inner">
          <router-link to="/home" class="memu" index="1"><span class="ml-4">首页</span></router-link>
          <p>Comeing soon</p>
          <p>Comeing soon</p>
          <p>Comeing soon</p>
          <p>Comeing soon</p>
        </section>
      </section>
    </section>
    <img class="w-[10rem] sm:w-[12.5rem] border" src="/logo.jpg" alt="vite" @click="goHome">
    <div class="flex-grow" />

    
    <div class="items-center gap-x-3 hidden sm:flex">
      <img class="w-7 block" src="../../assets/images/icon/icon-search.png" alt="">
      <img class="w-7 block" src="../../assets/images/icon/icon-book.png" alt="">
      <img class="w-6 block" src="../../assets/images/icon/icon-question.png" alt="">
      <!--
      <el-dropdown cursor-pointer>
        <span class="el-dropdown-link">
          中文
          <i inline-flex class="down-arraw" i="ep-caret-bottom"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>中文</el-dropdown-item>
            <el-dropdown-item>英文</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      -->
    </div>
    <div>
      <el-button type="info" @click="handleLogin">登录</el-button>
      <!-- <el-button type="primary" @click="handleRegister">注册</el-button> -->
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import {
  Operation,
  Right,
} from "@element-plus/icons-vue";
import { useRouter, useRoute } from 'vue-router';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import { watch } from 'vue';
import { useBasicLayout } from '~/composables';
import { useStore } from '~/store';

const { isMobile } = useBasicLayout()
const app = useStore()
const router = useRouter()

watch(() => app.isMobile, (curval) => {
  app.setIsMobile(curval)
})

onMounted(async () => {
  const devprint = localStorage.getItem("__devprint__")
  if(!devprint) {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const devId = result.visitorId
    localStorage.setItem("__devprint__", devId)
  }
})

const goHome = () => {
  router.push({
      name: 'home',
    })
}

const handleLogin = () => {
  router.push({
    path : "/login"
  })
}

const drawer = ref(false)
const toggleDrawer = () => {
  drawer.value = true
}
</script>

<style lang="scss" scoped>
.header-container {
  padding-left: var(--ep-menu-level-padding);
  padding-right: var(--ep-menu-level-padding);
  border-bottom: 1px solid var(--ep-border-color);
  color: #e5e0d8;
  .ep-button {
    padding-left: 12px;
    padding-right: 12px;
  }
  .ep-button--info {
    background-color: #606465;
  }
  .el-dropdown-link {
    outline: none;
  }
  i {
    cursor: pointer;
    &.down-arraw {
      vertical-align: bottom;
    }
  }

}

.mobile-menu {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  transform: translateX(-100%);
  transition: all .3s;
  opacity: 0;
  &.show {
    transform: translateX(0);
    background-color: rgba(0,0,0,0.2);
    opacity: 1;
  }
  .inner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 40%;
    background-color: rgba(0,0,0,0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    font-style: italic;
    padding-top: 3rem;
    a,p {
      font-size: 1.1rem;
      text-decoration: none;
      color: white;
      line-height: 2;
      display: block;
      width: 100%;
    }
    p {
      color: rgba(255,255,255,0.3);
    }

  }
}
</style>
