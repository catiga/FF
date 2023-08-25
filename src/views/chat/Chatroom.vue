<template>
    <div>
        <!-- 顶部按键 -->
        <section class="text-left">
            <el-button type="info" @click="goBack">
                <img class="w-20" src="../../assets/images/go-back.png" alt="">
            </el-button>
        </section>
    
        <!-- 聊天 -->
        <section class="chat-wrapper flex items-start mt-3">
            <!-- <img class="w-[16rem] lg:w-[18rem] xl:w-[22rem] rounded-2xl" src="/src/assets/images/huxian.webp" /> -->
            <div class="w-[16rem] lg:w-[30rem] rounded-2xl h-full" :style="{'background':`url(${charObj.bodyImg}) no-repeat center / cover`}"></div>
            <div class="w-[16rem] lg:w-[22rem] information">
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
            <div class="chatroom flex-1 h-full p-4 rounded-sm">
                <div class="chat-content">
                    <section 
                        v-for="item,index in chatObj.list" 
                        :key="index" 
                        :class="['chat-item', 'flex', item.isMe ? 'flex-row-reverse items-start' : 'items-end']"
                    >
                        <img v-if="!item.isMe" class="rounded-full flex-shrink-0 w-[4.6rem] block" :src="charObj.avatar" />
                        <p :class="['chat-v', item.isMe ? 'right' : 'left']">{{ item.content }}</p>
                    </section>
                </div>
                <el-input
                    v-model="inputValue"
                    placeholder="输入你的问题叭"
                    class="input-with-select"
                >
                    <template #append>
                        <el-button @click="handleSend" type="primary">发送</el-button>
                    </template>
                </el-input>
            </div>
        </section>
    </div>
</template>

<script setup>
import {
    characterByCode
} from "~/api/index";
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
const inputValue = ref('')

const charObj = ref({})

onMounted(() => {
    characterByCode(route.params.chatid).then(v => {
        if(v.Code==0) {
            charObj.value = v.Data
        } else {
            console.log('error:', v)
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
    router.go(-1)
}

//ws
//   const wsUri = 'ws://localhost:18080/spwapi/ws'
  const wsUri = 'wss://rp.fenus.xyz/rpc/spwapi/ws'
  const ws = new WebSocket(wsUri)

  ws.onopen = () => {
    console.log('WebSocket is connected.')
    setInterval(() => {
      ws.send('ping')
    }, 1000 * 60 * 5)
  }

  ws.onmessage = (event) => {
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
    }
  }

  ws.onerror = (error) => {
    console.error('WebSocket Error:', error)
  }

  ws.onclose = (event) => {
    if (event.wasClean) {
      console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`)
    } else {
      console.error('Connection died')
    }
  }
  const handleSend = () => {
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
      data: inputMsg,
    }
    ws.send(JSON.stringify(d))
  }

</script>

<style lang="scss">
.chat-wrapper {
    height: calc(100vh - var(--ep-menu-item-height) - 82px);

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

        .chat-content {
            flex: 1;
            .chat-item {
                & + .chat-item {
                    margin-top: 12px;
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