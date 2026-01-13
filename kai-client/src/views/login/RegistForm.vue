<style lang="less">
.kb-regist-form {
  position: relative;
  height: 100%;
  .n-button {
    width: 100%;
  }
  .n-form {
    input:-webkit-autofill,
    input:-internal-autofill-previewed,
    input:-internal-autofill-selected {
      -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
      -webkit-text-fill-color: var(--n-text-color);
      background-color: transparent !important;
      transition: background-color 50000s ease-in-out 0s;
    }
    input:first-line{
      font-size: var(--n-font-size);
      color: var(--n-text-color);
    }
  }
}
</style>

<template>
  <div class="kb-regist-form">
    <n-form ref="formRef" :model="formData" :rules="formRules" label-placement="left" :show-label="false" @keydown.enter.native="onSubmit">
      <n-form-item path="nickname">
        <n-input v-model:value="formData.nickname" placeholder="Nickname" size="large" @keydown.enter.prevent>
          <template #prefix>
            <n-icon class="iconfont icon-account" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="username">
        <n-input v-model:value="formData.username" placeholder="Username/Email/Phone" size="large" @keydown.enter.prevent>
          <template #prefix>
            <n-icon class="iconfont icon-account" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="password">
        <n-input v-model:value="formData.password" placeholder="Password" type="password" size="large" @keydown.enter.prevent>
          <template #prefix>
            <n-icon class="iconfont icon-lock" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="cfimpswd">
        <n-input v-model:value="formData.cfimpswd" placeholder="Confirm password" type="password" size="large" @keydown.enter.prevent>
          <template #prefix>
            <n-icon class="iconfont icon-lockoutline" />
          </template>
        </n-input>
      </n-form-item>
    </n-form>
    <n-button type="primary" :loading="registing" :disabled="!Boolean(formData.username) || !Boolean(formData.password)" @click="onSubmit">
      <n-icon class="iconfont icon-accountplus" />&nbsp;Register
    </n-button>
  </div>
</template>
<script>
  import { defineComponent, ref, getCurrentInstance } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMessage } from 'naive-ui'
  import { aes_encrypt } from '@/libs/secret'
  import useUserStore from '@/store/user'

  export default defineComponent({
    components: {
    },
    setup(props, context) {
      const { proxy, ctx } = getCurrentInstance()
      const message = useMessage()
      const router = useRouter()
      const userStore = useUserStore()

      const registing = ref(false)
      const formRef = ref(null)
      const formData = ref({
        nickname: '',
        username: '',
        password: '', // Login password
        cfimpswd: '' // Confirm password
      })
      const formRules = ref({
        username: [
          { required: true, message: 'Please enter username/email/phone', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' }
        ],
        cfimpswd: [
          { required: true, message: 'Please confirm password', trigger: 'blur' },
          {
            required: false,
            validator(rule, value) {
              if (!value) {
                return true
              }
              if (value !== formData.value.password) {
                return new Error('Passwords do not match');
              }
              return true
            },
            trigger: 'blur'
          }
        ]
      })
      const doRregist = () => {
        registing.value = true
        proxy.$api.post('/sys/auth/regist', {
          nickname: formData.value.nickname,
          username: formData.value.username,
          password: aes_encrypt(formData.value.password),
          cfimpswd: aes_encrypt(formData.value.cfimpswd)
        }).then(res => {
          message.success('Registration successful')
          if (res.success) {
            context.emit('on-regist-success')
          }
          registing.value = false
        }).catch(err => {
          message.error(err.msg)
          registing.value = false
        })
      }
      const onSubmit = (e) => {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            doRregist()
          } else {
            console.log(errors)
          }
        })
      }
      return {
        registing,
        formRef,
        formData, formRules,
        onSubmit
      }
    }
  })
</script>
