<template>
  <!--rat home 主面板-->
  <div class="home">
    <div class="header-banner">
      <div>
        <el-popover
          placement="bottom"
          width="400"
          trigger="click">
          <div class="content">
            <span style="font-size: 16px;">Switch to</span>
            <div style="padding-top:12px">
              <a href="https://mobility.chunwo.com">
                <el-button style="width: 62px">M</el-button>
              </a>
              <span style="display: inline-block;margin-left: 10px;">Mobility</span>
            </div>
            <!-- <div style="padding-top:12px">
              <el-button>OC</el-button>
              <span style="display: inline-block;margin-left: 10px;">CW OC</span>
            </div>
            <div style="padding-top:12px">
              <el-button>DC</el-button>
              <span style="display: inline-block;margin-left: 10px;">CW DC </span>
            </div> -->


          </div>
          <el-button style="border: 0" slot="reference"><i style="font-size:32px;color: #ababab;width:43px; "
                                                           class="el-icon-s-grid"></i></el-button>
        </el-popover>

        <!--      <i style="font-size:32px;color: #ababab;width:43px; " class="el-icon-s-grid"></i>-->
        <span class="header-info">CW OC</span>
      </div>
      <span>
       <img style="height: 25px" src="../../../static/img/logo.png"/>
      </span>

      <span style="display: flex; align-items: center;">
        <!-- <el-input
          placeholder=""
          suffix-icon="el-icon-search"
          v-model="search">
        </el-input>

         <el-popover
           placement="bottom"
           width="400"
           trigger="click">
        <div class="content">
          <span style="font-size: 16px;">Notifications</span>
          <div class="today">
            <span>TODAY</span>
            <div class="today-content">

            </div>
          </div>
          <div class="today">
            <span>OLDER</span>

          </div>
        </div>
        <el-button style="border: 0" slot="reference"><i
          style=" font-size:20px;display: inline-block; width: 45px;text-align: center"
          class="el-icon-bell"></i></el-button>
      </el-popover> -->

        <!--        <i style=" font-size:20px;display: inline-block; width: 45px;text-align: center" class="el-icon-bell"></i>-->

<!--        <el-tag-->
<!--          style="border-radius: 50%;background-color: #cc6776"-->
<!--          type="danger"-->
<!--          effect="dark">-->
<!--          PC-->
<!--        </el-tag>-->

       <el-popover
         placement="bottom"
         width="200"
         trigger="click">
          <el-button style="display:none;"></el-button>
         <!-- 26/07/2021 新需求: 增加profile頁面 -->
          <router-link to="/techdSection/profile">
            <el-button plain>Profile</el-button>
          </router-link>
          <router-link to="/techdSection/changePassword">
            <el-button plain style="margin-top: 10px;">Change Password</el-button>
          </router-link>
          <el-button plain @click="loginOut"style="margin-top: 10px;">Log Out</el-button>
<!--       <el-button size="small" style="background-color: #cc6776" slot="reference" circle>PC</el-button>-->
         <el-avatar size="medium" slot="reference" style="cursor: pointer; background-color: #cc6776; user-select: none; font-size: 12px;">{{oc_user_name === 'N' ? 'PC' : oc_user_name}}</el-avatar>
       </el-popover>

      </span>

    </div>
    <!-- menu -->

    <div class="menu">
      <router-link to="/techdSection">
        <el-row>
          <el-button @click="dialogVisible=true">TDS</el-button>
        </el-row>
      </router-link>
        <span class="text-span">TechD Section</span>

<!--        <div v-if="dialogVisible===true" style="background:url(../../../static/img/logo.png) no-repeat; width:100%;-->
<!--    height:40%;-->
<!--    background-size:100% 100%;">-->

<!--      <el-dialog-->
<!--            title="OC Login"-->
<!--            :visible.sync="dialogVisible"-->
<!--            style="background: url(../../../static/img/login.jpg) no-repeat;"-->
<!--            width="30%">-->
<!--            &lt;!&ndash;内容 &ndash;&gt;-->
<!--            <div style="padding-bottom: 10px">-->
<!--              <span style="display: inline-block;width: 70px;">email :</span> <el-input v-model="account" placeholder=""></el-input>-->
<!--            </div>-->
<!--            <div>-->
<!--              <span style="display: inline-block;width: 75px;">password : </span><el-input v-model="pwd" placeholder="" show-password></el-input>-->
<!--            </div>-->
<!--            &lt;!&ndash;内容结束&ndash;&gt;-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="dialogVisible = false">cancel</el-button>-->
<!--                <el-button type="primary" @click="login">login</el-button>-->
<!--            </span>-->
<!--          </el-dialog>-->
<!--        </div>-->

<!--      </router-link>-->
    </div>

    <!-- main  -->

  </div>
</template>

<script>
  import {requestPath, setCookie, getCom, getCookie, mytrim, delCookie, textAvatar} from '@/utils/util'
  import {getSign} from '@/utils/md5'

  export default {
    name: "home",
    //  加载初始化数据
    mounted: function () {
      // 先判断有没OC login , 没有login , 直接跳转到 login UI
      let login =  getCookie("isLogin");
      if (login !== 1 && login !== '1'){
        this.$router.push("/");
      }
      let _this = this;
      // oclogin 獲取了project 項目信息, 這裏不需要了
      // window.addEventListener('message', function (event) {
      //   console.log(event.data);
      //   // if (event.data!==null && event.data!==''){
      //   //   _this.init(event);
      //   // }
      //   _this.init(event);
      // });
    },

    created() {
      // 26/07/2021 新需求: 增加profile頁面, oc用戶可查看和修改個人資料
      let oc_user_name = window.localStorage.getItem("oc_user_name");
      this.oc_user_name = textAvatar();
      console.log("oc_user_name->" + oc_user_name)
      if (oc_user_name === '' || oc_user_name === "null" || oc_user_name === undefined || oc_user_name === null || oc_user_name === " ") {
        this.$alert('Please complete your profile.', 'Reminder', {
          confirmButtonText: 'Confirm',
        });
        this.$router.push("/techdSection/profile");
      }
    },
    data() {
      return {
        // oc account and pwd
        account:'',
        pwd:'',
        search: '',
        dialogVisible:false,
        flag:0,
        oc_user_name: ''
      }
    },
    methods: {
      // login out
      loginOut(){
        console.log("log out");
        // 删除cookie 信息
        delCookie("isLogin");
        // 26/07/2021 退出是, 刪除瀏覽器存儲的oc_user_name
        window.localStorage.removeItem("oc_user_name");
        // 跳转到login UI
        this.$router.push("/");
      },
      // oc login
      login(){
        // 隐藏对话框

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
             window.localStorage.setItem("user_name",params.account);
             // 提示
            this.$message.success("login success");
            // 重定向 oc
            this.$router.push('/techdSection');

          } else {
            this.$message.error(response.data.msg);
          }
        }).catch(function (error) { // 请求失败处理
          console.log(error);
        });

      },
      // init(event) {
      //   console.log("init()");
      //   // console.log("user_name ->" + event.data.user.name);
      //   // // // 保存用户信息 , 這裏不需要再獲取mobility user 信息, 不需要，只需要拿到project 項目信息即可.
      //   // window.localStorage.setItem("user_name", "oc_testing");
      //   // window.localStorage.setItem("user_name", event.data.user.name);
      //
      //   // 查询 project information projects
      //   let url = "https://dev.hkdwss.com/api/v3" + "/projects/" + "kaifaceshi";  // testing
      //   // let url =  "https://dev.hkdwss.com/api/v3" + "/projects/" + event.data.project.identifier;  // testing
      //   console.log("_open_project_session", getCookie("_open_project_session"));
      //   console.log("url-> " + url);
      //   // withCredentials: true, 携带 cookies
      //   this.$axios.get(url,
      //     {
      //       // 帶 cookies 請求
      //       withCredentials: true,
      //     }
      //   ).then(response => {
      //     console.log("success!!")
      //     console.log("response.data->" + response.data.projectNo + "," + response.data.division + "," + response.data.name);
      //     // 保存project 数据.
      //     window.localStorage.setItem("projectNo", response.data.projectNo);
      //     window.localStorage.setItem("division", response.data.division);
      //     window.localStorage.setItem("name", response.data.name);
      //   }).catch(function (error) { // 请求失败处理
      //     console.log(error);
      //   });
      //
      //
      // },

    }

  }
</script>

<style scoped>
  .home {
    height: 100%;
  }

  .header-banner {
    padding-right: 25px;
    padding-bottom: 5px;
    border-bottom-style: groove;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-input {
    width: auto;
  }

  .menu {
    height: 100%;
    width: 17%;
    background: inherit;
    background-color: rgba(250, 251, 252, 1);
    padding-top: 12px;
    padding-left: 12px;
    text-align: left;
  }

  .el-row {
    display: inline-block;
  }

  .text-span {
    padding-left: 10px;
    color: #303133;
  }


</style>
