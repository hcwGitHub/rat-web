<template>
  <!--oc login
   created by andy 2021-04-19
  -->
  <div class="ocLogin">

    <div class="login">
      <!-- 头部公司logo -->
      <img height="25px"  src="../../../static/img/4_RGB_png.png"/>

      <!-- 提示信息 -->
      <div class="cw_operation">
        <span style="font-size: 17px; text-align: left">CW Operation Center</span>
      </div>

      <div class="login-info" style="padding-right: 10px;padding-top: 20px;">
        <el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="Username:" prop="pass">
            <el-input style="border: none" v-model="account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password:" prop="checkPass">
            <el-input type="password" v-model="pwd" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="commit">
<!--        <el-button @click="dialogVisible = false">cancel</el-button>&ndash;&gt;-->
        <el-button type="primary" @click="login">login</el-button>
      </div>

    </div>

  </div>
</template>

<script>
  import {requestPath, setCookie, getCom, getCookie, mytrim, delCookie} from '@/utils/util'
  import {getSign} from '@/utils/md5'
    export default {
        name: "ocLogin",
      mounted: function () {
          // 判断是否登入
         let login =  getCookie("isLogin");
         if (login === 1 || login === '1'){
           // 登录之后直接跳转
           this.$router.push("/home");
         }
         // 加載project 信息, 不管有沒登陸
        let _this = this;
        window.addEventListener('message', function (event) {
          console.log(event.data);
          // if (event.data!==null && event.data!==''){
          //   _this.init(event);
          // }
          _this.init(event);
        });

      },
      data() {
        return {
          account:'',
          pwd:'',
        }
      },
      methods:{
        login(){
          let url = requestPath() + "ocLogin";
          console.log("request url->" + url);
          let params = {
            account:this.account,
            pwd:this.pwd
          };
          this.$axios.get(url,
            {
              params: params,
              // headers: {'signature': sign}
            }
          ).then(response => {
            if (response.data.result === "SUCCESS") {
              this.dialogVisible = false;
              // 成功
              // window.localStorage.setItem("user_name",params.account);
              setCookie("isLogin","1"); // 设置cookies
              // 保存用戶信息, 是個email , 統一 mobility , 就寫成 creator_email
              // window.localStorage.setItem("creator_email",params.account);
              // oc 用戶名( 也是email ) ; 保存起來;
              window.localStorage.setItem("oc_user_email",params.account);

              // 提示
              this.$message.success("login success");
              // 重定向 oc UI
              this.$router.push('/home');

            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });

          // 登陸之後加載project 數據

        },

        init(event) {

          console.log("init()");
          // 查询 project information projects
          let url = "https://dev.hkdwss.com/api/v3" + "/projects/" + "kaifaceshi";  // testing
          // let url =  "https://dev.hkdwss.com/api/v3" + "/projects/" + event.data.project.identifier;  // testing. uat
          // let url =  "https://mobility.chunwo.com/api/v3" + "/projects/" + event.data.project.identifier;  // live

          console.log("_open_project_session", getCookie("_open_project_session"));
          console.log("url-> " + url);
          // withCredentials: true, 携带 cookies
          this.$axios.get(url,
            {
              // 帶 cookies 請求
              withCredentials: true,
            }
          ).then(response => {
            console.log("success!!")
            console.log("response.data->" + response.data.projectNo + "," + response.data.division + "," + response.data.name);
            // 保存project 数据.
            window.localStorage.setItem("projectNo", response.data.projectNo);
            window.localStorage.setItem("division", response.data.division);
            window.localStorage.setItem("name", response.data.name);
          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });


        },


      }
    }
</script>

<style scoped>
  /*.el-input__inner{*/
  /*  border: 0;*/
  /*}*/
  .login{
    width: 330px;
    height: 480px;
    background-color: white;
    margin-left: 40%;
    padding-top: 22px;
    border-radius: 5px;
  }
.ocLogin{
  width: 100%;
  height: 100%;
  background: url("../../../static/img/login.jpg") no-repeat;
  background-size:100% 100%;
  padding-top: 10%;
}
  .cw_operation{
    font-weight: bold;
    text-align: left;
    padding: 25px;
  }

</style>
