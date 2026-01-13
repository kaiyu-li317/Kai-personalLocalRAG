<style lang="less">
.kb-login {
  height: 100%;
  background: #09090b;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .n-card {
    width: 420px;
    border-radius: 16px;
    background: #18181b;
    border: 1px solid #27272a;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 1;
    
    .n-card-header {
      padding: 40px 40px 24px 40px;
      border-bottom: none;
      
      .n-card-header__main {
        line-height: 1;
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 24px;
        color: #fafafa;
        letter-spacing: -0.025em;
        
        img {
          height: 44px;
          margin-right: 12px;
        }
        
        .kb-logo {
          width: 52px;
          height: 52px;
          overflow: hidden;
          margin-right: 12px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          
          &-svg {
            transform: scale(0.18);
            margin-left: -104px;
            margin-top: -104px;
            filter: brightness(1.2);
          }
        }
      }
    }
    
    .n-card__content {
      padding: 0 40px 40px 40px;
    }
  }
  
  &-more {
    padding-top: 24px;
    text-align: center;
    
    span {
      color: #71717a;
      cursor: pointer;
      font-size: 14px;
      transition: color 0.2s ease;
      
      &:hover {
        color: #818cf8;
      }
    }
  }
}

// Override input styles
.kb-login {
  :deep(.n-input) {
    background: #27272a;
    border: 1px solid #3f3f46;
    border-radius: 10px;
    
    &:hover {
      border-color: #52525b;
    }
    
    &:focus-within {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    .n-input__input-el {
      color: #fafafa;
      
      &::placeholder {
        color: #71717a;
      }
    }
  }
  
  :deep(.n-button--primary-type) {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    border: none;
    border-radius: 10px;
    font-weight: 500;
    height: 44px;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  :deep(.n-form-item-label) {
    color: #a1a1aa;
    font-size: 13px;
    font-weight: 500;
  }
}
</style>

<template>
  <div class="kb-login">
    <n-card hoverable>
      <template #header>
        <!-- <img src="/logo.png" alt="KAI"> -->
        <span class="kb-logo"><logo /></span>
        <span>KAI</span>
        <span v-if="regist"> Register</span>
      </template>
      <regist-form v-if="regist" @on-regist-success="regist=false" />
      <login-form v-else />
      <p class="kb-login-more">
        <span @click="onRegist">
          <template v-if="regist">Already have an account? Login</template>
          <template v-else>Register</template>
        </span>
      </p>
    </n-card>
  </div>
</template>
<script>
  import { defineComponent, ref, getCurrentInstance } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMessage } from 'naive-ui'
  import useUserStore from '@/store/user'
  import { THEME_TYPE_KEY, DEFAULT_THEME_TYPE } from '@/libs/enum'
  import { localRead } from '@/libs/tools'
  import Logo from '@/components/Logo.vue'
  import LoginForm from './login/LoginForm.vue'
  import RegistForm from './login/RegistForm.vue'


  export default defineComponent({
    components: {
      Logo, LoginForm, RegistForm
    },
    setup() {
      const { proxy, ctx } = getCurrentInstance()
      const message = useMessage()
      const router = useRouter()
      const userStore = useUserStore()
      const themeType = ref(localRead(THEME_TYPE_KEY) || DEFAULT_THEME_TYPE) // light, dark
      const regist = ref(false)
      // Register account
      const onRegist = () => {
        regist.value = !regist.value
      }
      return {
        themeType,
        regist, onRegist
      }
    }
  })
</script>
