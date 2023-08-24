<template>
  <div>
    <!-- 顶部按钮 -->
    <section class="flex items-center">
      <section class="nav-wrapper flex-1">
        <nav class="nav pb-5" ref="nav">
          <el-button 
            @click="handleCheckNav(index)" 
            type="info" 
            v-for="item,index in navObj.navList" 
            :key="index"
            :class="[checkIndex == index ? 'active' : '']"
          >{{ item }}</el-button>
        </nav>
      </section>
      <i @click="handleScroll" class="flex-inline ml-4 text-xs cursor-pointer" i="ep-arrow-right-bold"></i>
    </section>
  
    <!-- 角色列表 -->
    <section class="roles-wrapper mt-3">
      <section class="role-box pb-5">
        <div @click="gotoChat" class="role-item p-4 rounded-[0.6rem] flex-shrink-0" v-for="item in 12">
          <img class="w-[8.5rem] rounded-[0.6rem]" src="../../assets/images/role.png" />
          <dl>
            <dt>仙妖</dt>
            <dd>上古神兽炒鸡好看，上古神兽炒鸡好看，上古神兽炒鸡好看，上古神兽炒鸡好看</dd>
          </dl>
          <p class="text-xs w-full mt-4 mb-0 flex items-center justify-between">
            <span class="flex-1 truncate max-w-[8rem] text-left italic">@xiangguaa</span>
            <span>40.0m</span>
          </p>
        </div>
      </section>
    </section>
  
    <el-divider />
  
    <!-- 对话展示 -->
    <section class="show-wrapper">
      <section class="show-box pb-5">
        <div class="show-item flex-shrink-0" v-for="item in 8">
          <div class="avatar flex items-center">
            <img class="w-12 rounded-md" src="../../assets/images/avatar.png" />
            <div class="ml-2">
              <h2>Elon Musk</h2>
              <h2 class="italic">Try saying:</h2>
            </div>
          </div>
          <ul>
            <li>
              "If you could go back in time, when and where would you go?"
            </li>
            <li>
              "Why did you buy Twitter?"
            </li>
            <li>
              "What do you think about Jeff Bezo's Blue Origin?"
            </li>
          </ul>
        </div>
      </section>
    </section>
  
    <!-- 分类 -->
    <section class="flex flex-col items-center py-8">
      <section class="type-wapper grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <section class="type-item flex items-center p-1" v-for="item in 9">
          <img class="w-8 block rounded-sm" src="../../assets/images/avatar.png" />
          <p class="ml-2 my-0">Brainstorm ideas</p>
        </section>
      </section>
    </section>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
const navObj = reactive({navList: []})
const nav = ref(null)
const router = useRouter()

onMounted(() => {
  navObj.navList = [
    '特色', '发现', '助手', '名人', '游戏', 'tuxiangshengcheng','特色', '发现', '助手', '名人', '游戏', 'tuxiangshengcheng','特色', '发现', '助手', '名人', '游戏', 'tuxiangshengcheng',
  ]
})

const checkIndex = ref(0)
const handleCheckNav = (index) => {
  checkIndex.value = index
}
const handleScroll = () => {
    nav.value.scrollTo({ left: nav.value.scrollWidth, behavior: 'smooth'})
}

const gotoChat = () => {
  router.push({
    name: 'chat',
    params: {
      chatid: '1'
    }
  })
}

</script>

<style lang="scss" scoped>
.nav-wrapper {
  height: 42px;
  overflow: hidden;
}
.nav {
  text-align: left;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  overflow-x: scroll;
  .ep-button {
    padding: 20px;
    &.active {
      background-color: #0d0d0d;
    }
    &:hover {
      background-color: #363838;
    }
    &:focus {
      background-color: #0d0d0d;
    }
    &:active {
      border-color: #0d0d0d;
    }
    & + .ep-button {
      margin-left: 10px;
    }
  }
}
.roles-wrapper {
  height: 283px;
  overflow: hidden;
  color: #c9c5bf;
  .role-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    overflow-x: scroll;

    .role-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 12rem;
      // box-sizing: border-box;
      background-color: #2b2c2d;
      cursor: pointer;
      &:hover {
        background-color: #363838;
      }
      &.active {
        background-color: #0d0d0d;
      }
      dl,dt,dd {
        margin: 0;
      }
      dt {
        font-size: 14px;
        font-weight: bold;
        margin-top: 10px;
      }
      dd {
        font-size: 12px;
        margin-top: 14px;
        text-align: left;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.6;
      }
      & + .role-item {
        margin-left: 10px;
      }
    }
  }
}

.show-wrapper {
  color: #AEABA5;
  height: 240px;
  overflow: hidden;
  .show-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    overflow-x: scroll;

    .show-item {
      width: 270px;
      font-size: 13px;
      & + .show-item {
        margin-left: 18px;
      }
      .avatar {
        h2 {
          font-size: 13px;
          margin: 0;
          text-align: left;
        }
      }
      ul {
        padding: 0;
        margin: 0;
        text-align: left;
      }
      li {
        background-color: #2b2c2d;
        list-style: none;
        margin: 0;
        padding: 8px;
        border-radius: 5px;
        margin-top: 10px;
        cursor: pointer;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.4;
        min-height: 38px;
        &:hover {
          background-color: #363838;
        }
      }
    }
  }
}

.type-wapper {
  .type-item {
    font-size: 13px;
    background-color: #2b2c2d;
    width: 300px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #363838;
    }
  }
}
</style>
