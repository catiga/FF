<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical"
    :collapse="isCollapse"
  >
    <router-link to="/home" class="memu" index="1">
      <img class="w-6 block" src="../../assets/images/icon/icon-home.png" alt="">
      <span>首页</span>
    </router-link>
    <el-tooltip
      effect="dark"
      content="Coming soon"
      placement="right"
    >
      <div class="memu" index="2">
        <img class="w-5 block" src="../../assets/images/icon/icon-trending.png" alt="">
        <span>动态</span>
      </div>
    </el-tooltip>
    <el-tooltip
      effect="dark"
      content="Coming soon"
      placement="right"
    >
      <div class="memu">
        <img class="w-3 block" src="../../assets/images/icon/icon-create.png" alt="">
        <span>创建</span>
      </div>
    </el-tooltip>
    <el-tooltip
      effect="dark"
      content="Coming soon"
      placement="right"
    >
      <div class="memu">
        <img class="w-5 block" src="../../assets/images/icon/icon-chat.png" alt="">
        <span>聊天</span>
      </div>
    </el-tooltip>
    <el-tooltip
      effect="dark"
      content="Coming soon"
      placement="right"
    >
      <div class="memu">
        <img class="w-5 block" src="../../assets/images/icon/icon-community.png" alt="">
        <span>社区</span>
      </div>
    </el-tooltip>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.el-menu-vertical {
  --ep-font-size-base: 12px;
  // --ep-menu-base-level-padding: 10px;
  border-right: none;
  .memu {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #fff;
    text-decoration: none;
    // color: var(--ep-menu-active-color);
    padding: calc(var(--ep-menu-base-level-padding) / 2)  0;
    cursor: pointer;
    > span {
      font-size: 12px;
      margin-top: 4px;
    }
    &:hover {
      background-color: var(--ep-menu-hover-bg-color);
    }
  }
}
</style>
