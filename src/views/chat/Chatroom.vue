<template>
    <div :class="[app.isMobile ? 'room-mobile' : '']" class="relative">
        <!-- 顶部按键 -->
        <section class="text-left">
            <el-button type="info" @click="goBack">
                <img class="w-20" src="../../assets/images/go-back.png" alt="">
            </el-button>
        </section>

        <!-- 移动端 - 人物图 -->
        <div class="mobile-person" v-if="app.isMobile && !showChat" :style="{'background':`url(${charObj.bodyImg}) no-repeat center / cover`}">
            <section class="mb-auto text-right">
                <section class="flex items-center w-full p-2 switch-btn">
                    <img @click="goBack" class="w-20" src="../../assets/images/go-back.png" alt="">
                    <div class="ml-auto" @click="handleHiddenIntro">{{hiddenIntro ? '显示介绍' : '隐藏介绍'}}</div>
                </section>
                <el-button @click="handleSwitchChat" class="mt-4" type="primary">去对话</el-button>
            </section>
            <div v-show="!hiddenIntro">
                <section>
                    <p>神职：仙妖</p>
                    <p>姓名：{{charObj.name}}</p>
                    <p>性别：{{charObj.gender}}</p>
                    <p>年龄：19岁</p>
                    <p>世纪年龄：{{charObj.age}}</p>
                    <p>出生日期：{{charObj.birth}}</p>
                    <p>出生地址：{{charObj.place}}</p>
                    <p>标签：【桃花运】【财运富贵】</p>
                </section>
                <section class="mt-4" v-html="charObj.profile"></section>
            </div>
        </div>
    
        <!-- 聊天 -->
        <section class="chat-wrapper flex items-start pt-3">
            <div v-if="!app.isMobile" class="w-[16rem] lg:w-[24rem] rounded-2xl h-full" :style="{'background':`url(${charObj.bodyImg}) no-repeat center / cover`}"></div>
            <div class="w-[16rem] lg:w-[22rem] information" v-if="!app.isMobile">
                <h2><span class="relative">{{charObj.region}}</span></h2>
                <section>
                    <p>神职：仙妖</p>
                    <p>姓名：{{charObj.name}}</p>
                    <p>性别：{{charObj.gender}}</p>
                    <p>年龄：19岁</p>
                    <p>世纪年龄：{{charObj.age}}</p>
                    <p>出生日期：{{charObj.birth}}</p>
                    <p>出生地址：{{charObj.place}}</p>
                    <p>标签：【桃花运】【财运富贵】</p>
                </section>
                <section class="mt-4" v-html="charObj.profile"></section>
            </div>
            <div v-if="showChat || !app.isMobile" class="chatroom flex-1 h-full rounded-sm">
                <div class="chat-content p-4" ref="chatroomContent">
                    <section 
                        v-for="item,index in chatObj.list" 
                        :key="index" 
                        :class="['chat-item', 'flex', item.isMe ? 'flex-row-reverse items-start' : 'items-end']"
                    >
                        <img v-if="!item.isMe" class="rounded-full flex-shrink-0 w-[4.6rem] block" :src="charObj.avatar" />
                        <p :class="['chat-v', item.isMe ? 'right' : 'left']">{{ item.content }}</p>
                    </section>
                </div>
                <div class="m-4">
                    <el-input
                        v-model="inputValue"
                        placeholder="输入你的问题叭"
                        class="input-with-select"
                    >
                        <template #append>
                            <el-button @click="handleSend" type="primary" :loading="sending" :disabled="sending">发送</el-button>
                        </template>
                    </el-input>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import {
    characterByCode,
    chatHistory
} from "~/api/index";
import {
    SpwsClient
} from "~/api/ws";
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '~/store';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const app = useStore()
const chatroomContent = ref(null)

const router = useRouter()
const route = useRoute()
const inputValue = ref('')
const sending = ref(false)

const charObj = ref({})
let devId = ''

onMounted(async () => {
    characterByCode(route.params.chatid).then(v => {
        if(v.Code==0) {
            charObj.value = v.Data
        } else {
            console.log('error:', v)
        }
    })
    const devprint = localStorage.getItem("__devprint__")
    devId = devprint

    chatHistory(devId, {userid:0, code: route.params.chatid}).then(v => {
        if(v.Code == 0 && v.Data?.length > 0) {
            chatObj.list.splice(0, chatObj.list.length, ...[])
            for(let e of v.Data) {
                chatObj.list.push({
                    id: e.id,
                    timestamp: e.time,
                    content: e.content,
                    isMe : (e.direction == '1' ? true : false),
                })
            }
        }
    })
})

const chatObj = reactive({
    list: [
        {
            id: "0",
            timestamp: 0,
            content: '你好',
            isMe: true,
        },
        {
            id: "1",
            timestamp: 0,
            content: '你好你好你好你好你好你好你好你好你好你好你好',
            isMe: false,
        },
    ]
})

const goBack = () => {
    router.push({
        name: 'home',
     })
}

//ws
//   const wsUri = 'ws://localhost:18080/spwapi/ws'
  const wsUri = 'wss://tao.fenus.xyz/rpc/spwapi/ws'
  var ws = new SpwsClient(wsUri)

  ws.setOnMessageCallback((event) => {
    const message = event.data
    if (message == 'pong') {
        return
    }
    let ret = JSON.parse(message)
    if(ret.Code==0) {
        let reMsg = null
        for(let e of chatObj.list) {
            if(e.id == ret.Data.Id) {
                reMsg = e
            }
        }
        if(!reMsg) {
            reMsg = {
                id: ret.Data.Id,
                timestamp: ret.Data.ReplyTs,
                content: ret.Data.Content,
                isMe: false,
            }
            chatObj.list.push(reMsg)
        } else {
            reMsg.content += ret.Data.Content
        }
        // 滚动条位置
        chatroomContent.value.scrollTo({ 
            top: chatroomContent.value.scrollTop + chatroomContent.value.clientHeight, 
            behavior: 'smooth'
        })
    }
    sending.value = false
  })
  
  const handleSend = () => {
    sending.value = true
    const inputMsg = inputValue.value
    chatObj.list.push({
        id: Date.now(),
        content: inputMsg,
        isMe: true,
    })
    inputValue.value = ''
    const d = {
      type: 'chat_init',
      method: 'chatGPT',
      lan: "zh-CN",
      ascode: charObj.value.code,
      timestamp: Date.now(),
      userid: 0,
      devid: devId,
      data: inputMsg,
    }
    ws.send(JSON.stringify(d))
  }

    // 界面交互处理

    const hiddenIntro = ref(false)
    const handleHiddenIntro = () => {
        hiddenIntro.value = !hiddenIntro.value
    }

    const showChat = ref(false)
    const handleSwitchChat = () => {
        showChat.value = !showChat.value
    }

</script>

<style lang="scss">
.room-mobile {
    
}
.mobile-person {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
    font-size: 12px;
    text-align: left;
    p {
        margin: 5px 0;
        text-indent: 8px;
        text-shadow: 0 0 8px rgba(0,0,0,.8);
    }
    .switch-btn {
        box-sizing: border-box;
    }
}
.chat-wrapper {
    height: calc(100vh - var(--ep-menu-item-height) - 44px);
    box-sizing: border-box;

    .information {
        
        h2 {
            font-size: 20px;
            > span {
                &::after {
                    content: '';
                    position: absolute;
                    width: 3.25rem;
                    height: 2px;
                    background-image: linear-gradient(90deg, #e5e0d8 70%, transparent 70%, transparent 80%, #e5e0d8 80%);
                    top: 50%;
                    left: 3.2rem;
                    transform: translateY(-50%);
                }
                &::before {
                    content: '';
                    position: absolute;
                    width: 3.25rem;
                    height: 2px;
                    background-image: linear-gradient(270deg, #e5e0d8 70%, transparent 70%, transparent 80%, #e5e0d8 80%);
                    top: 50%;
                    left: -4.4rem;
                    transform: translateY(-50%);
                }
            }
        }
        p {
            font-size: 13px;
            margin: 0;
            text-align: left;
            padding: 0 12px;
            line-height: 2;
        }
    }
    .chatroom {
        background: url('../../assets/images/chag-bg.png') no-repeat center / cover;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;

        &.chatroom-mobile {
            opacity: 0;
        }

        .chat-content {
            flex: 1;
            overflow-y: scroll;
            .chat-item {
                & + .chat-item {
                    margin-top: 12px;
                }
                > img {
                    aspect-ratio: 1 / 1;
                }
            }
            .chat-v {
                font-size: 14px;
                max-width: 80%;
                padding: 8px 8px;
                margin: 0 0 0 10px;
                text-align: left;
                &.left {
                    border-radius: 0.6rem 0.6rem 0.6rem 0;
                    background-color: #fff;
                    color: #0d0d0d;
                }
                &.right {
                    border-radius: 0.6rem 0.6rem 0 0.6rem;
                    color: #fff;
                    background-color: #4c4887;
                }
            }
        }
        .ep-button {
            background-color: var(--ep-color-primary);
            padding-left: 16px;
            padding-right: 16px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            color: var(--ep-color-white);
            &:hover {
                background-color: var(--ep-button-hover-bg-color);
            }
        }
    }
}
</style>