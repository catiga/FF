<template>
  <div class="login-container">
    <div class="login-inner">
      <h1 class="text-2xl pb-4">通灵之战</h1>
      <!-- login -->
      <div v-if="type == 'login'">
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
          <el-form-item>
            <el-button class="mx-auto" type="primary" @click="submitForm(loginFormRef)">Login</el-button>
          </el-form-item>
          <p class="text-sm flex justify-end select-none" @click="type = 'register'"><span class="cursor-pointer flex items-center"><i>register</i><el-icon><ArrowRight /></el-icon></span></p>
        </el-form>
      </div>
      <!-- register -->
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        status-icon
        :rules="rules"
        label-width="0px"
        class="login-form w-full sm:w-80 mx-auto"
        v-else
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
        <el-form-item>
          <el-button class="mx-auto" type="primary" @click="submitForm(registerFormRef)">Register</el-button>
        </el-form-item>
        <p class="text-sm flex justify-end select-none" @click="type = 'login'"><span class="cursor-pointer flex items-center"><i>login</i><el-icon><ArrowRight /></el-icon></span></p>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus'

const loginFormRef = ref<FormInstance>()
const registerFormRef = ref<FormInstance>()
const type = ref('login')

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
  }
}
</style>
