<template>
  <div class="profile">
    <el-form :model="formValue" ref="formValue" :label-position="labelPosition" label-width="110px"
             class="demo-ruleForm">
      <h3 style="text-align: left">Profile</h3>
      <el-form-item
        label="First name"
        prop="firstName"
        :rules="[
          { required: true, message: 'First name can not be empty'},
        ]"
      >
        <el-input type="text" v-model="formValue.firstName" clearable autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="Last name"
        prop="lastName"
        :rules="[
          { required: true, message: 'Last name can not be empty'},
        ]"
      >
        <el-input type="text" v-model="formValue.lastName" @keydown.enter.native="submitForm('formValue')" clearable autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="Email"
        prop="email"
        :rules="[
          { required: true, message: 'Email can not be empty'},
        ]"
      >
        <el-input type="text" :disabled="true" v-model="formValue.email" autocomplete="off"></el-input>
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
  import {requestPath} from "../../utils/util";

  export default {
    name: "profile",

    mounted() {
      let url = requestPath() + "findOcUser";
      console.log("request url->" + url);
      let id = window.localStorage.getItem("id");
      let params = {
        id: id
      }
      this.$axios.get(url, {params: params})
        .then(res => {
          this.formValue.firstName = res.data.ocUser.firstName;
          this.formValue.lastName = res.data.ocUser.lastName;
          this.formValue.email = res.data.ocUser.account;
          console.log("firstName->" +this.formValue.firstName);
          console.log("lastName->" +this.formValue.lastName);
          console.log("email->" +this.formValue.email);
        })

    },
    data() {
      return {
        labelPosition: 'left',
        formValue: {
          firstName: '',
          lastName: '',
          email: ''
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = requestPath() + "updateOcUser";
            console.log("request url->" + url);
            // 獲取當前登錄User的id
            let id = window.localStorage.getItem("id");
            let params = {
              id: id,
              firstName: this.formValue.firstName,
              lastName: this.formValue.lastName
            }
            this.$axios.post(url, params)
              .then(res => {
                if (res.data.result === "SUCCESS") {
                  this.$message.success("Update information success");
                  window.localStorage.setItem("oc_user_name", res.data.name);
                  console.log("oc_user_name->" + res.data.name);
                }
              })
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
  .profile {
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
