<style lang="less">
.kb-user {
  .n-list {
    .n-list-item {
      margin-top: 10px;
      border: 1px solid var(--border-color);
    }
    .n-list-item:first-child {
      margin-top: 0;
    }
  }
  .value {
    height: 34px;
    line-height: 34px;
  }
  .input {
    display: none;
  }
  .pwd-input {
    display: none;
    .n-input {
      margin-left: 10px;
    }
    .n-input:first-child {
      margin-left: 0;
    }
  }
  .edit {
    .value {
      display: none;
    }
    .input {
      display: block;
    }
    .pwd-input {
      display: flex;
    }
  }
}
</style>

<template>
  <div class="kb-user">
    <n-list hoverable :show-divider="false">
      <n-list-item :class="editNkNm?'edit':''">
        <template #suffix>
          <n-button v-if="editNkNm" @click="onEditNkNm">
            <n-icon class="iconfont icon-check" />&nbsp;Submit
          </n-button>
          <n-button v-else @click="editNkNm = !editNkNm">
            <n-icon class="iconfont icon-pencil" />&nbsp;Edit
          </n-button>
        </template>
        <n-thing title="Nickname">
          <div class="value">{{ userInfo.name }}</div>
          <n-input class="input" v-model:value="nkNm" placeholder="Please enter nickname"/>
        </n-thing>
      </n-list-item>
      <n-list-item :class="editPwd?'edit':''">
        <template #suffix>
          <n-button v-if="editPwd" @click="onEditPwd">
            <n-icon class="iconfont icon-check" />&nbsp;Submit
          </n-button>
          <n-button v-else @click="editPwd = !editPwd">
            <n-icon class="iconfont icon-pencil" />&nbsp;Edit
          </n-button>
        </template>
        <n-thing title="Password">
          <div class="value">******</div>
          <div class="pwd-input input">
            <n-input type="password" v-model:value="oldPwd" placeholder="Enter old password" />
            <n-input type="password" v-model:value="newPwd" placeholder="Enter new password" />
            <n-input type="password" v-model:value="cfmPwd" placeholder="Confirm new password" />
          </div>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>
<script>
  import { defineComponent, ref, getCurrentInstance } from 'vue'
  import { useMessage } from 'naive-ui'
  import useUserStore from '@/store/user'
  import { aes_encrypt } from '@/libs/secret'
  import { isEmpty } from '@/libs/tools'

  export default defineComponent({
    components: {
    },
    setup() {
      const message = useMessage()
      const { proxy, ctx } = getCurrentInstance()
      const userStore = useUserStore()
      const userInfo = ref(userStore.getInfo)

      const editNkNm = ref(false)
      const nkNm = ref(userInfo.value.name)

      const onEditNkNm = () => {
        if (isEmpty(nkNm.value)) {
          message.error('Nickname is required')
          return
        }
        if (nkNm.value === userInfo.value.name) {
          editNkNm.value = false
          return
        }
        proxy.$api.put('/sys/team/nickname', { userId: userInfo.value.id, nkNm: nkNm.value }).then(res => {
          userInfo.value.name = nkNm.value
          userStore.setInfo(userInfo.value)
          editNkNm.value = false
        }).catch(err => {
          console.error(err)
          editNkNm.value = false
        })
      }

      const editPwd = ref(false)
      const oldPwd = ref('')
      const newPwd = ref('')
      const cfmPwd = ref('')

      const onEditPwd = () => {
        if (isEmpty(oldPwd.value) || isEmpty(newPwd.value) || isEmpty(cfmPwd.value)) {
          message.error('Please fill in all password fields')
          return
        }
        if (oldPwd.value === newPwd.value) {
          message.error('New password cannot be the same as old password')
          return
        }
        if (newPwd.value !== cfmPwd.value) {
          message.error('New password and confirm password do not match')
          return
        }

        proxy.$api.put('/sys/team/edit/password', { oldPwd: aes_encrypt(oldPwd.value), newPwd: aes_encrypt(newPwd.value), cfmPwd: aes_encrypt(cfmPwd.value) }).then(res => {
          editPwd.value = false
        }).catch(err => {
          console.error(err)
          editPwd.value = false
        })
      }

      return {
        userInfo,
        nkNm, editNkNm, onEditNkNm,
        editPwd, oldPwd, newPwd, cfmPwd, onEditPwd
      }
    }
  })
</script>
