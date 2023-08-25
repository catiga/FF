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
            <div class="w-[16rem] lg:w-[30rem] rounded-2xl h-full" :style="{'background':`url(/src/assets/images/huxian.webp) no-repeat center / cover`}"></div>
            <div class="w-[16rem] lg:w-[22rem] information">
                <h2><span class="relative">中国</span></h2>
                <section>
                    <p>神职：仙妖</p>
                    <p>姓名：狐仟秋</p>
                    <p>性别：女</p>
                    <p>年龄：19岁</p>
                    <p>世纪年龄：1200岁</p>
                    <p>出生日期：公元800年左右，具体日期不明</p>
                    <p>出生地址：巴颜喀拉山</p>
                    <p>标签：【桃花运】【财运富贵】</p>
                </section>
                <section class="mt-4">
                    <p>传说中尚筱臻是一名18岁的大一女孩，</p>
                    <p>认识她的人都说她很漂亮，</p>
                    <p>能够神奇地预测出每个人心底的秘密。 </p>
                    <p>狐仟秋的真实身份是一只千年狐妖，</p>
                    <p>出生于昆仑山脉的巴颜喀拉山。</p>
                    <p>昆仑山脉是华夏道教根脉所在神山胜地，</p>
                    <p>狐仟秋又在玉虚宫修炼了百年，</p>
                    <p>通宵了阴阳五行天地人和的玄机奥妙。</p>
                    <p>千年出关世界沧海桑田，科学早已替代了玄学，</p>
                    <p>狐仟秋只能化身一名大学生，</p>
                    <p>平时为人卜卦聊以解闷，</p>
                    <p>久而久之城市便流传着很多关于她的传说。</p>
                </section>
            </div>
            <div class="chatroom flex-1 h-full p-4 rounded-sm">
                <div class="chat-content">
                    <section 
                        v-for="item,index in chatObj.list" 
                        :key="index" 
                        :class="['chat-item', 'flex', item.isMe ? 'flex-row-reverse items-start' : 'items-end']"
                    >
                        <img v-if="!item.isMe" class="rounded-full flex-shrink-0 w-[4.6rem] block" src="../../assets/images/example/chat-avatar.png" />
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const inputValue = ref('')
const chatObj = reactive({
    list: [
        {
            content: '你好',
            isMe: true,
        },
        {
            content: '你好你好你好你好你好你好你好你好你好你好你好',
            isMe: false,
        },
    ]
})

const handleSend = () => {
    chatObj.list.push({
        content: inputValue.value,
        isMe: true,
    })
    inputValue.value = ''
}

const goBack = () => {
    router.go(-1)
}

</script>

<style lang="scss" scoped>
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