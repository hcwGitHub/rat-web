<template>
  <div class="profile">
    <h3>Profile</h3>
    <form class="form">
      <div class="form_input">
        <span>First name<i class="red">*</i></span>
        <el-input v-model="firstName"></el-input>
      </div>
      <div class="form_input">
        <span>Last name<i class="red">*</i></span>
        <el-input v-model="lastName"></el-input>
      </div>
      <div class="form_input">
        <span>Email<i class="red">*</i></span>
        <el-input v-model="email" :disabled="true"></el-input>
      </div>
      <div>
        <el-button icon="el-icon-check" type="primary" @click="profile">Save</el-button>
<!--        <el-button plain @click="$router.go(-1)">cancel</el-button>-->
        <router-link to="/home">
          <el-button plain>Cancel</el-button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
  import {requestPath} from '@/utils/util'

  export default {
    name: "profile",

    mounted() {
      let url = requestPath() + "findOcUser";
      console.log("request url->" + url);
      let id = window.localStorage.getItem("id");
      let params = {
        id: id
      }
      this.$axios.get(url, {
        params:params
      })
      .then(res => {
        this.firstName = res.data.ocUser.firstName;
        this.lastName = res.data.ocUser.lastName;
        this.email = res.data.ocUser.account;
        console.log("firstName->" +this.firstName);
        console.log("lastName->" +this.lastName);
        console.log("email->" +this.email);
      })
      .catch(err => {

      })
    },

    data() {
      return {
        firstName: '',
        lastName: '',
        email: ''
      }
    },
    methods: {
      profile() {
        let url = requestPath() + "updateOcUser";
        console.log("request url->" + url);
        // 获取当前登录user的id值
        let id = window.localStorage.getItem("id");
        let params = {
          id: id,
          firstName: this.firstName,
          lastName: this.lastName,
        }
        this.$axios.post(url, params)
          .then(response => {
            if (response.data.result === "SUCCESS") {
              this.$message.success("Update information success");
              window.localStorage.setItem("oc_user_name", response.data.name)
              console.log("oc_user_name->" + response.data.name);
            }
          })
          .catch(function (error) { // 请求失败处理
            this.$message.error(error);
          });
      },
    }
  }
</script>

<style scoped>
  .profile {
    text-align: left;
    padding: 30px;
  }

  .form {
    width: 350px;
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
