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
    <section class="role-box grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 xl3grid-cols-9 gap-3 mt-4">
      <div 
        @click="gotoChat(item)" 
        class="role-item p-4 rounded-[0.6rem]" 
        v-for="(item,index) in characters" :key="index"
        :class="[app.isMobile ? 'mobile' : '']"
      >
        <div class="avatar-box">
          <div class="role-avatar rounded-[0.6rem]" :style="{'background': 'url('+ item.avatar +') no-repeat center/100%'}"></div>
          <dl>
            <dt>{{item.name}}</dt>
            <dd>{{item.info}}</dd>
          </dl>
        </div>
        <p class="text-xs w-full mt-4 mb-0 flex items-center justify-between">
          <span class="flex-1 truncate max-w-[8rem] text-left italic">@{{item.place}}</span>
          <span class="flex items-center"><img class="w-4" src="../../assets/images/icon/icon-ad.png" alt=""> {{item.age}}</span>
        </p>
      </div>
    </section>
  
    <el-divider />
  
    <!-- 对话展示 -->
    <section class="show-wrapper">
      <section class="show-box pb-5">
        <div class="show-item flex-shrink-0" v-for="(item, index) in sampleDatas" :key="index">
          <div class="avatar flex items-center">
            <img class="w-12 rounded-md" :src="item.char.avatar" />
            <div class="ml-2">
              <h2>{{ item.char.name }}</h2>
              <h2 class="italic">Try saying:</h2>
            </div>
          </div>
          <ul>
            <li v-for="(chat, it) in item.samplechats" :key="it" @click="handleChatSam(item.char, chat)">
              <p>"{{chat.q}}"</p>
            </li>
          </ul>
        </div>
      </section>
    </section>
  
    <!-- 分类 -->
    <section class="flex flex-col items-center py-8">
      <section class="type-wapper grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <section class="type-item flex items-center p-1" v-for="item in 9">
          <img class="w-8 block rounded-sm" src="../../assets/images/example/02.png" />
          <p class="ml-2 my-0">Brainstorm ideas</p>
        </section>
      </section>
    </section>
  </div>
</template>

<script setup>
import {
    characterList,
    chatSamples
} from "~/api/index";
import { reactive, onMounted, ref, } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from '~/store';
import AssistantImg from '~/assets/images/assistant.jpg';
const app = useStore()

const navObj = reactive({navList: []})
const nav = ref(null)
const router = useRouter()
const characters = ref([
  {
    id: 0,
    name: "专属占卜师",
    info: "快来定制你的专属占卜师吧",
    avatar: AssistantImg,
    place: "",
    age: "",
  }
])

const sampleDatas = ref([])

onMounted(() => {
  navObj.navList = ['姻缘', '事业', '身世', '未来', '神秘', '幻想','灵感', '玄幻', '通灵', '占卜']

  characterList("cece").then(v => {
    if(v.Code == 0) {
      characters.value.splice(1, v.Data?.length, ...v.Data)
    }
  })

  let samTs = setTimeout(() => {
    if(characters.value?.length > 0) {
      clearTimeout(samTs)
      chatSamples().then(v => {
        if(v.Code == 0 && v.Data?.length > 0) {
          for(let e of characters.value) {
            let sampleData = {
              char: e,
              samplechats: [],
            }
            for(let d of v.Data) {
              if(sampleData.char.id == d.charid) {
                sampleData.samplechats.push({q: d.Q, a: d.A, id:d.id})
              }
            }
            if(sampleData.samplechats.length > 0) {
              sampleDatas.value.push(sampleData)
            }
          }

        }
      })
    }
  }, 500);
  
})

const checkIndex = ref(0)
const handleCheckNav = (index) => {
  checkIndex.value = index
}
const handleScroll = () => {
    nav.value.scrollTo({ left: nav.value.scrollWidth, behavior: 'smooth'})
}

const gotoChat = (e) => {
  if(e.id==0) {
    return
  }
  console.log(e)
  router.push({
    name: 'chat',
    params: {
      chatid: e.code
    }
  })
}

const handleChatSam = (character, chat) => {
  console.log(character, chat, "有没有", chat.id)
  router.push({
    name:'chat',
    params: {
      chatid: character.code,
      sampleid: chat.id,
    },
  })
}
</script>

<style lang="scss" scoped>

@media (min-width: 1780px) { 
  .xl3grid-cols-9 {
    grid-template-columns: repeat(9, minmax(0,1fr));
  }
}
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
}
.role-box {
  // display: flex;
  // flex-wrap: wrap;
  // box-sizing: border-box;
  // // overflow-x: scroll;
  // justify-content: space-between;

  .role-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: #2b2c2d;
    cursor: pointer;
    &:hover {
      background-color: #363838;
    }
    &.active {
      background-color: #0d0d0d;
    }
    .role-avatar {
      width: 8.5rem;
      aspect-ratio: 1 / 1;
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
      height: 40px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 1.6;
    }

    &.mobile {
      .avatar-box {
        flex-direction: row;
        display: flex;
        width: 100%;
        text-align: left;
        .role-avatar {
          flex: 1;
          aspect-ratio: 1 / 1.13;
        }

        dl {
          flex: 0 0 52%;
          margin-left: 1rem;
        }
      }
    }
  }

}

.show-wrapper {
  color: #AEABA5;
  .show-box {
    display: flex;
    align-items: start;
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
        &:hover {
          background-color: #363838;
        }
        p {
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 1.4;
          height: 38px;
          margin: 0;
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
