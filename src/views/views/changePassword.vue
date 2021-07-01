<template>
  <div class="changePassword">
    <h3>Change Password</h3>
    <form class="form">
      <div class="form_input">
        <span>Current password<i class="red">*</i></span>
        <el-input v-model="currentPwd" show-password></el-input>
      </div>
      <div class="form_input">
        <span>New password<i class="red">*</i></span>
        <el-input v-model="newPwd" show-password></el-input>
      </div>
      <div class="form_input">
        <span>confirmation<i class="red">*</i></span>
        <el-input v-model="confirmPwd" show-password></el-input>
      </div>
      <div>
        <el-button icon="el-icon-check" type="primary" @click="changePassword">save</el-button>
        <router-link to="/home">
          <el-button plain>cancel</el-button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
  import {requestPath,delCookie} from '@/utils/util'
  export default {
    name: "changePassword",

    data() {
      return {
        currentPwd: '',
        newPwd: '',
        confirmPwd: '',
      }
    },
    methods: {
      changePassword() {
        let url = requestPath() + "updatePwd";
        console.log("request url->" + url);
        let id = window.localStorage.getItem("id");
        let params = {
          id : id,
          currentPwd: this.currentPwd,
          pwd: this.confirmPwd
        }
        if (this.newPwd !== this.confirmPwd) {
          this.$message.error("Incorrect password twice")
          return
        }
        this.$axios.post(url,params)
        .then(response => {
          if (response.data.result === "SUCCESS") {
            this.$message.success("Password changed success")
            // 删除cookie 信息
            delCookie("isLogin");
            // 跳转到login UI
            this.$router.push("/");
          } else {
            this.$message.error("The current password is error")
          }
        }).catch(function (error) { // 请求失败处理
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .changePassword {
    text-align: left;
    padding: 30px;
  }

  .form {
    width: 400px;
  }

  .form .form_input {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-button--primary {
    background-color: #1c68a4;
  }

  .red {
    color: red;
  }

  .el-input {
    width: 200px !important;
  }
</style>
