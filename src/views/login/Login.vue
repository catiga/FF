<template>
  <div class="login-container">

    <div class="login-inner">
      <img class="absolute right-4 top-4 w-[7rem] sm:w-[8.5rem] ml-auto block" src="/logo.jpg" alt="">

      <div class="section pb-5 pt-5 pt-sm-2 text-center">
        <h6 class="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
        <input class="checkbox" v-model="checked" type="checkbox" id="reg-log" name="reg-log" />
        <label for="reg-log"></label>
        <div class="card-3d-wrap mx-auto">
          <div class="card-3d-wrapper">
            <div class="card-front">
              <div class="center-wrap">
                <div class="section text-center">
                  <h4 class="mb-4 pb-3">Log In</h4>
                  <el-form
                    ref="loginFormRef"
                    :model="loginForm"
                    status-icon
                    :rules="rules"
                    label-width="0px"
                    class="login-form w-full sm:w-80 mx-auto"
                  >
                    <el-form-item prop="name" key="name">
                      <el-input v-model="loginForm.name" type="password" autocomplete="off" placeholder="Name" />
                    </el-form-item>
                    <el-form-item prop="pass" key="password">
                      <el-input
                        v-model="loginForm.pass"
                        type="password"
                        autocomplete="off"
                        placeholder="Password"
                      />
                    </el-form-item>
                    <el-form-item class="mt-16">
                      <el-button class="mx-auto" type="primary" @click="submitForm(loginFormRef)">Login</el-button>
                    </el-form-item>
                    <!-- <p class="text-sm flex justify-end select-none" @click="type = 'register'"><span class="cursor-pointer flex items-center"><i>register</i><el-icon><ArrowRight /></el-icon></span></p> -->
                  </el-form>
                </div>
              </div>
            </div>
            <div class="card-back">
              <div class="center-wrap">
                <div class="section text-center">
                  <h4 class="mb-4 pb-3">Sign Up</h4>
                  <el-form
                    ref="registerFormRef"
                    :model="registerForm"
                    status-icon
                    :rules="rules"
                    label-width="0px"
                    class="login-form w-full sm:w-80 mx-auto"
                  >
                    <el-form-item prop="name" key="name">
                      <el-input v-model="registerForm.name" type="password" autocomplete="off" placeholder="Name" />
                    </el-form-item>
                    <el-form-item prop="pass" key="password">
                      <el-input
                        v-model="registerForm.pass"
                        type="password"
                        autocomplete="off"
                        placeholder="Password"
                      />
                    </el-form-item>
                    <el-form-item class="mt-16">
                      <el-button class="mx-auto" type="primary" @click="submitForm(registerFormRef)">Register</el-button>
                    </el-form-item>
                    <!-- <p class="text-sm flex justify-end select-none" @click="type = 'login'"><span class="cursor-pointer flex items-center"><i>login</i><el-icon><ArrowRight /></el-icon></span></p> -->
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus'

const loginFormRef = ref<FormInstance>()
const registerFormRef = ref<FormInstance>()
const checked = ref(false)

const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the name'))
  } else {
    callback()
  }
}
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

const loginForm = reactive({
  name: '',
  pass: '',
})
const registerForm = reactive({
  name: '',
  pass: '',
})

const rules = reactive<FormRules<typeof loginForm>>({
  name: [{ validator: validateName, trigger: 'submit' }],
  pass: [{ validator: validatePass, trigger: 'submit' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

watch(() => checked.value, (val) => {
  console.log('val-->', val)
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .login-inner {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    .ep-button {
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
    }
  }

  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.7;
  }

  h4 {
    font-weight: 600;
  }

  h6 span {
    padding: 0 20px;
    text-transform: uppercase;
    font-weight: 700;
  }

  [type="checkbox"]:checked,
  [type="checkbox"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }

  .checkbox:checked+label,
  .checkbox:not(:checked)+label {
    position: relative;
    display: block;
    text-align: center;
    width: 60px;
    height: 16px;
    border-radius: 8px;
    padding: 0;
    margin: 10px auto;
    cursor: pointer;
    background-color: #ffeba7;
  }

  .checkbox:checked+label:before,
  .checkbox:not(:checked)+label:before {
    position: absolute;
    display: block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: #ffeba7;
    background-color: #2599AA;
    font-family: 'unicons';
    content: '↜';
    z-index: 20;
    top: -10px;
    left: -10px;
    line-height: 36px;
    text-align: center;
    font-size: 24px;
    transition: all 0.5s ease;
  }

  .checkbox:checked+label:before {
    transform: translateX(44px) rotate(-270deg);
  }


  .card-3d-wrap {
    position: relative;
    width: 440px;
    max-width: 100%;
    height: 400px;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    perspective: 800px;
    margin-top: 60px;
  }

  .card-3d-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transition: all 600ms ease-out;
  }

  .card-front,
  .card-back {
    width: 100%;
    height: 100%;
    background-color: #2a2b38;
    background-image: url('../../assets/images/pat.svg');
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: 300%;
    position: absolute;
    border-radius: 6px;
    left: 0;
    top: 0;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .card-back {
    transform: rotateY(180deg);
  }

  .checkbox:checked~.card-3d-wrap .card-3d-wrapper {
    transform: rotateY(180deg);
  }

  .center-wrap {
    position: absolute;
    width: 100%;
    // padding: 0 35px;
    top: 50%;
    left: 0;
    transform: translate3d(0, -50%, 35px) perspective(100px);
    z-index: 20;
    display: block;
  }


  .form-group {
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
  }

  .form-style {
    padding: 13px 20px;
    padding-left: 55px;
    height: 48px;
    width: 100%;
    font-weight: 500;
    border-radius: 4px;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.5px;
    outline: none;
    color: #c4c3ca;
    background-color: #1f2029;
    border: none;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
    box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  }

  .form-style:focus,
  .form-style:active {
    border: none;
    outline: none;
    box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
  }

  .input-icon {
    position: absolute;
    top: 0;
    left: 18px;
    height: 48px;
    font-size: 24px;
    line-height: 48px;
    text-align: left;
    color: #ffeba7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:-ms-input-placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input::-moz-placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:-moz-placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input::-webkit-input-placeholder {
    color: #c4c3ca;
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:focus:-ms-input-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:focus::-moz-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:focus:-moz-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:focus::-webkit-input-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .btn {
    border-radius: 4px;
    height: 44px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
    padding: 0 30px;
    letter-spacing: 1px;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    justify-content: center;
    -ms-flex-pack: center;
    text-align: center;
    border: none;
    background-color: #ffeba7;
    color: #102770;
    box-shadow: 0 8px 24px 0 rgba(255, 235, 167, .2);
  }

  .btn:active,
  .btn:focus {
    background-color: #102770;
    color: #ffeba7;
    box-shadow: 0 8px 24px 0 rgba(16, 39, 112, .2);
  }

  .btn:hover {
    background-color: #102770;
    color: #ffeba7;
    box-shadow: 0 8px 24px 0 rgba(16, 39, 112, .2);
  }




  .logo {
    position: absolute;
    top: 30px;
    right: 30px;
    display: block;
    z-index: 100;
    transition: all 250ms linear;
  }

  .logo img {
    height: 26px;
    width: auto;
    display: block;
  }
}</style>