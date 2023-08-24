<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical"
    :collapse="isCollapse"
  >
    <div class="memu" index="1">
      <el-icon><icon-menu /></el-icon>
      <span>首页</span>
    </div>
    <div class="memu" index="2">
      <el-icon><icon-menu /></el-icon>
      <span>动态</span>
    </div>
    <div class="memu">
      <el-icon><icon-menu /></el-icon>
      <span>创建</span>
    </div>
    <div class="memu">
      <el-icon><icon-menu /></el-icon>
      <span>聊天</span>
    </div>
    <div class="memu">
      <el-icon><icon-menu /></el-icon>
      <span>社区</span>
    </div>

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
    // color: var(--ep-menu-active-color);
    padding: calc(var(--ep-menu-base-level-padding) / 2)  0;
    cursor: pointer;
    > span {
      font-size: var(--ep-font-size-base);
      margin-top: 4px;
    }
    &:hover {
      background-color: var(--ep-menu-hover-bg-color);
    }
  }
}
</style>
