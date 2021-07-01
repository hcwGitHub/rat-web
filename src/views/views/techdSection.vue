<template>
  <!-- TechD Section UI-->
  <div class="techDMenu">
    <div class="header-banner">
      <el-popover
        placement="bottom"
        width="400"
        trigger="click">
        <div class="content">
          <span style="font-size: 16px;">Switch to</span>
          <div style="padding-top:12px">
            <el-button style="width: 62px">M</el-button> <span style="display: inline-block;margin-left: 10px;">Mobility</span>
          </div>
          <div style="padding-top:12px">
            <el-button>OC</el-button> <span style="display: inline-block;margin-left: 10px;">CW OC</span>
          </div>
         <div style="padding-top:12px">
           <el-button>DC</el-button> <span style="display: inline-block;margin-left: 10px;">CW DC </span>
         </div>


        </div>
        <el-button style="border: 0" slot="reference"><i style="font-size:32px;color: #ababab;width:43px; " class="el-icon-s-grid"></i></el-button>
      </el-popover>

<!--      <i style="font-size:32px;color: #ababab;width:43px; " class="el-icon-s-grid"></i>-->
      <span class="header-info">CW Portal</span>
      <span style="display: inline-block; text-align:center; display: inline-block;width:45%;margin-left: 13%;">
       <img style="height: 25px;" src="../../../static/img/logo.png"/>
      </span>

      <span style="display: inline-block;width: auto; text-align: right; float: right;padding-right: 50px;">
        <el-input
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
        <el-button style="border: 0" slot="reference"><i style=" font-size:20px;display: inline-block; width: 45px;text-align: center" class="el-icon-bell"></i></el-button>
      </el-popover>

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
          <router-link to="/techdSection/changePassword">
            <el-button plain>Change Password</el-button>
          </router-link>
          <el-button plain @click="loginOut" style="margin-top: 10px;">Log Out</el-button>
       <el-button size="small" style="background-color: #cc6776" slot="reference" circle>PC</el-button>
       </el-popover>

      </span>

    </div>


    <!-- menu相关 -->
    <div class="menu-all">
      <router-link to="/home">
        <div class="menu-top-info">
        <span>
          <el-button><span> <- </span></el-button>
        </span>
          <span class="text-span">Back to Home</span>
        </div>
      </router-link>
      <!-- menu -->
      <el-menu
        default-active="1-2-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <!--            <i class="el-icon-location"></i>-->
            <span>TechD Section</span>
          </template>
          <el-submenu index="1-2">
            <template slot="title">RAT</template>
            <router-link to="/techdSection/techDmenuSub">
              <el-menu-item index="1-2-1">Informative</el-menu-item>
            </router-link>
            <el-menu-item index="1-2-2">Submission</el-menu-item>
          </el-submenu>

        </el-submenu>

      </el-menu>
    </div>

    <!-- 主题内容, 选项卡sub UI-->
    <div class="my-body">
      <!-- 滚动条 -->
      <el-scrollbar style="height: 100%;">
        <!-- 内容 -->
        <router-view/>
      </el-scrollbar>
    </div>

  </div>
</template>

<script>
  import {requestPath,setCookie, getCom, getCookie, mytrim, delCookie} from '@/utils/util'
  import {getSign} from '@/utils/md5'
  export default {
    name: "techdSection",
    // mounted: function () {
    //   let _this = this;
    //   window.addEventListener('message', function(event){
    //     console.log(event.data)
    //     // if (event.data!==null && event.data!==''){
    //     //   _this.init(event);
    //     // }
    //     _this.init(event);
    //   });
    // },
    data() {
      return {
        search: '',
        filterText: '',
      };
    },
    methods: {
      // login out
      loginOut(){
        console.log("log out");
        // 删除cookie 信息
        delCookie("isLogin");
        // 跳转到login UI
        this.$router.push("/");
      },
      init(event) {
        console.log("init()");
        // console.log("user_name ->" + event.data.user.name);
        // // // 保存用户信息
        // window.localStorage.setItem("user_name", "oc_testing");
        window.localStorage.setItem("user_name", event.data.user.name);
        // 查询 project information projects
        let url =  "http://dev.hkdwss.com/api/v3" + "/projects/" + event.data.project.identifier;  // testing
        // let url =  "https://dev.hkdwss.com/api/v3" + "/projects/" + "kaifaceshi";  // testing
        console.log("_open_project_session",getCookie("_open_project_session"));
        console.log("url-> " + url);
        // withCredentials: true, 携带 cookies
        this.$axios.get(url,
          {
            // 帶 cookies 請求
            withCredentials: true,
          }
        ).then(response => {
          console.log("success!!")
          console.log("response.data->" + response.data.projectNo);
          // 保存project 数据.
          window.localStorage.setItem("project", response.data)
        }).catch(function (error) { // 请求失败处理
          console.log(error);
        });

      },

      //menu---------
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //menu end---------

    }


  }
</script>

<style scoped>
  .header-banner {
    width: calc(100% - 5px);
    text-align: left;
    /*padding-left: 15px;*/
    /*padding-top: 79px;*/
    padding-bottom: 5px;
    /*padding-left: 110px;*/
    border-bottom-style: groove;
  }

  .el-input {
    width: auto;
  }

  /*.header-banner>div{*/
  /*  display: inline-block;*/
  /*}*/
  .menu-all {
    float: left;
    width: 13%;
    height: 100%;
    background: inherit;
    background-color: rgba(250, 251, 252, 1);
  }

  /*.el-menu{*/
  /*  background: inherit;*/
  /*  background-color: rgba(250, 251, 252, 1);*/
  /*}*/
  .menu-top-info {
    text-align: left;
    /*padding:12px;*/
    /*height: 80px;*/
    /*padding:30px;*/
    padding-top: 30px;
    padding-left: 15px;
    padding-bottom: 30px;
    /*vertical-align: center;*/
    border-bottom-style: groove;
  }

  .techDMenu {
    height: 100%;
  }

  .my-body {
    float: left;
    width: 87%;
    height: 100%;
  }

  .text-span {
    margin-left: 13px;
    color: #303133;
  }

  /*li.el-menu-item{*/
  /*  text-decoration: none;*/
  /*}*/

  /*.el-row .text-span{*/
  /*  display: block;*/
  /*  float: left;*/
  /*}*/
  .el-submenu .el-menu-item {
    min-width: 0px
  }
</style>
