<script setup>
import { toggleDark } from "~/composables";
</script>

<template>
  <section class="header-container flex items-center gap-x-3" style="height: var(--ep-menu-item-height)">
    <img class="w-4 border" src="/vite.svg" alt="vite">
    <div class="flex-grow" />
    <i inline-flex i="ep-search"></i>
    <i inline-flex i="ep-question-filled"></i>
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
    <div>
      <el-button type="info">登录</el-button>
      <el-button type="primary">注册</el-button>
    </div>
  </section>
</template>

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
</style>
