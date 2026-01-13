<style lang="less">
.kb-login-form {
  position: relative;
  height: 100%;
  
  .n-button {
    width: 100%;
  }
  
  .n-form {
    input:-webkit-autofill,
    input:-internal-autofill-previewed,
    input:-internal-autofill-selected {
      -webkit-box-shadow: 0 0 0px 1000px #27272a inset !important;
      -webkit-text-fill-color: #fafafa;
      background-color: #27272a !important;
      transition: background-color 50000s ease-in-out 0s;
    }
    
    input:first-line {
      font-size: var(--n-font-size);
      color: #fafafa;
    }
    
    .n-form-item {
      margin-bottom: 20px;
    }
    
    .n-form-item.captcha {
      .n-form-item-blank {
        position: relative;
        p {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #3f3f46;
          border-radius: 10px;
          cursor: pointer;
          color: #71717a;
          background: #27272a;
          transition: all 0.2s ease;
          
          &:hover {
            background: #3f3f46;
            border-color: #52525b;
          }
        }
      }
    }
  }
  
  .kb-login-vcode {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -170px;
    margin-left: -199px;
    display: none;
    
    .range-box {
      background-color: #27272a;
      box-shadow: 0 0 8px rgba(99, 102, 241, 0.1) inset;
      border-radius: 8px;
      
      .range-slider {
        background-color: rgba(99, 102, 241, 0.2);
      }
      
      .range-btn {
        background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
        box-shadow: none !important;
      }
    }
  }
  
  .kb-login-vcode.vcode-show {
    display: block;
  }
  
  // 输入框图标样式
  :deep(.n-input__prefix) {
    color: #71717a;
    margin-right: 8px;
  }
  
  :deep(.n-input) {
    --n-height: 48px;
    font-size: 15px;
  }
}
</style>

<template>
  <div class="kb-login-form">
    <n-form ref="formRef" :model="formData" :rules="formRules" label-placement="left" :show-label="false" @keydown.enter.native="onSubmit">
      <n-form-item path="username">
        <n-input v-model:value="formData.username" placeholder="登录账号" size="large" @keydown.enter.prevent>
          <template #prefix>
            <n-icon class="iconfont icon-account" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="password">
        <n-input v-model:value="formData.password" placeholder="登录密码" type="password" size="large" @keydown.enter.prevent>
          <template #prefix>
            <n-icon class="iconfont icon-lock" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="captcha" class="captcha">
        <n-radio-group size="large">
          <n-radio-button v-model:value="formData.captcha" value="success" style="visibility: hidden;"/>
        </n-radio-group>
        <p @click="vcodeShow = !vcodeShow">
          <span v-if="Boolean(formData.captcha)" style="color: var(--success-color)">验证成功</span>
          <span v-else>请点击完成拼图验证</span>
        </p>
      </n-form-item>
    </n-form>
    <n-button type="primary" :loading="logining" :disabled="!Boolean(formData.username) || !Boolean(formData.password)" @click="onSubmit">
      <n-icon class="iconfont icon-login" />&nbsp;登录
    </n-button>
    <div :class="[`kb-login-vcode`, `${vcodeShow ? 'vcode-show' : ''}`]" v-on-click-outside="onVcodeClick">
      <Vcode ref="vcodeRef" :show="true" type="inside" :canvasWidth="399" @success="onVcodeSuccess" @reset="onVcodeReset" @fail="onVcodeReset" sliderText="请拖动完成拼图验证" />
    </div>
  </div>
</template>
<script>
  import { defineComponent, ref, getCurrentInstance } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMessage } from 'naive-ui'
  import Vcode from 'vue3-puzzle-vcode'
  import { aes_encrypt } from '@/libs/secret'
  import useUserStore from '@/store/user'
  import { vOnClickOutside } from '@vueuse/components'

  export default defineComponent({
    components: {
      Vcode
    },
    directives: {
      onClickOutside: vOnClickOutside
    },
    setup() {
      const { proxy, ctx } = getCurrentInstance()
      const message = useMessage()
      const router = useRouter()
      const userStore = useUserStore()

      const logining = ref(false)
      const formRef = ref(null)
      const vcodeRef = ref(null)
      const formData = ref({
        username: '',
        password: '',
        captcha: ''
      })
      const formRules = ref({
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请滑动滑块验证', trigger: 'change' }
        ]
      })
      const vcodeShow = ref(false)
      const onVcodeClick = (e) => {
        // if (e.target.nodeName === 'CANVAS' || e.target.nodeName === 'IMG') {
        //   return
        // }
        vcodeShow.value = false
      }
      const onVcodeReset = () => {
        formData.value.captcha = ''
      }
      const onVcodeSuccess = () => {
        formData.value.captcha = 'success'
        vcodeShow.value = false
      }
      const doLogin = () => {
        logining.value = true
        proxy.$api.post('/sys/auth/login', { username: formData.value.username, password: aes_encrypt(formData.value.password) }).then(res => {
          if (res.success) {
            message.success('登录成功')
            const { id, name, token } = res.data
            userStore.setToken(token)
            userStore.setInfo({
              id, name
            })
            router.push({
              path: '/'
            })
          }
          logining.value = false
        }).catch(err => {
          message.error(err.msg)
          logining.value = false
          vcodeRef.value?.reset(true)
        })
      }
      const onSubmit = (e) => {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            doLogin()
          } else {
            console.log(errors)
          }
        })
      }
      return {
        logining,
        formRef, vcodeRef,
        formData, formRules,
        vcodeShow,
        onVcodeClick, onSubmit, onVcodeReset, onVcodeSuccess
      }
    }
  })
</script>
