<template>
  <div class="changePassword">
    <el-form :model="formValue" ref="formValue" :label-position="labelPosition" label-width="150px"
             class="demo-ruleForm">
      <h3 style="text-align: left">Change Password</h3>
      <el-form-item
        label="Current password"
        prop="currentPwd"
        :rules="[
          { required: true, message: 'Current password can not be empty'},
        ]"
      >
        <el-input type="password" show-password v-model="formValue.currentPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="New password"
        prop="newPwd"
        :rules="[
          { required: true, message: 'New password can not be empty'},
        ]"
      >
        <el-input type="password" show-password v-model="formValue.newPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="Confirmation"
        prop="confirmPwd"
        :rules="[
          { required: true, message: 'Confirmation can not be empty'},
        ]"
      >
        <el-input type="password" show-password v-model="formValue.confirmPwd" @keydown.enter.native="submitForm('formValue')"
                  autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button icon="el-icon-check" type="primary" @click="submitForm('formValue')">Save</el-button>
        <router-link to="/home">
          <el-button plain>Cancel</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {requestPath, delCookie} from "@/utils/util";

  export default {
    name: "changePassword",

    mounted() {

    },
    data() {
      return {
        labelPosition: 'left',
        formValue: {
          currentPwd: '',
          newPwd: '',
          confirmPwd: ''
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = requestPath() + "updatePwd";
            console.log("request url->" + url);
            // 获取当前登录user的id值
            let id = window.localStorage.getItem("id");
            let params = {
              id: id,
              currentPwd: this.formValue.currentPwd,
              pwd: this.formValue.confirmPwd
            }
            // 两次密码不正确
            if (this.formValue.newPwd !== this.formValue.confirmPwd) {
              this.$message.error("Incorrect password twice")
              return
            }
            this.$axios.post(url, params)
              .then(response => {
                if (response.data.result === "SUCCESS") {
                  this.$message.success("Password changed success")
                  // 删除cookie 信息
                  delCookie("isLogin");
                  // 跳转到login UI
                  this.$router.push("/");
                } else if (response.data.result === "0") {
                  this.$message.error("The current password is error")
                } else {
                  this.$message.error(response.data.msg)
                }
              })
              .catch(function (error) { // 请求失败处理
                // this.$message.error(error);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>
  .changePassword {
    width: 350px;
    padding: 30px;
  }

  /deep/ .el-form-item:last-child .el-form-item__content {
    text-align: left !important;
    margin-left: 0 !important;
  }

  .el-button {
    margin-right: 13px;
  }

  .el-button--primary {
    background-color: #1c68a4;
  }
</style>
