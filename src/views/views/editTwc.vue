<template>
  <div class="editTwc">
    <div class="edit-info">
      Tech Qualification > Edit Detail
    </div>
    <div class="edit-info-2">
      Edit Person
    </div>
    <div class="main-content">
      <div class="main-info" style="padding-bottom: 0px">
          <span style="font-family: 'Arial', sans-serif;
    font-weight: 700;font-size: 14px;padding-bottom: 10px">Basic Information</span>
      </div>
      <div class="select-1">
        <div class="main-info">
          <span class="main-info-type">ID</span>
          <span class="con">
                {{this.rat_twc.id}}
            </span>
        </div>
        <div class="main-info">
          <span class="main-info-type">Project</span>
          <span class="con">
            {{this.rat_twc.project_name}}
<!--                <el-input v-model="rat_twc.project_name" placeholder=""></el-input>-->
            </span>
        </div>

        <div class="main-info">
          <span class="main-info-type">Project Id</span>
          <span class="con">
            {{this.rat_twc.project_id}}
            <!--                <el-input v-model="rat_twc.project_name" placeholder=""></el-input>-->
            </span>
        </div>

        <div class="main-info">
          <span class="main-info-type">Division</span>
          <span class="con">
            {{this.rat_twc.division}}
            <!--                <el-input v-model="rat_twc.project_name" placeholder=""></el-input>-->
            </span>
        </div>

        <div class="main-info">
          <span class="main-info-type">Name of TWC</span>
          <span class="con">
                <el-input v-model="rat_twc.twc_name" placeholder="SHOW TITLE"></el-input>
            </span>
        </div>
        <div class="main-info">
          <span class="main-info-type">Project PM</span>
          <span class="con">
                <el-input v-model="rat_twc.project_pm" placeholder=""></el-input>
          </span>
        </div>
        <div class="main-info">
          <span class="main-info-type">Project SO</span>
          <span class="con">
                <el-input v-model="rat_twc.project_so" placeholder=""></el-input>
            </span>
        </div>
        <div class="main-info">
          <span class="main-info-type">Academic Qualification (Year Granted)</span>
          <span class="con">
                <el-input v-model="rat_twc.academic" placeholder=""></el-input>
                 ( <el-date-picker
            v-model="rat_twc.academic_date"
            type="year"
            placeholder="select Year">
                </el-date-picker> )
          </span>
        </div>
        <div class="main-info">
          <span class="main-info-type">Discipline</span>
          <span class="con">
                <el-input v-model="rat_twc.discipline" placeholder=""></el-input>
            </span>
        </div>
        <div class="main-info">
          <span class="main-info-type">Profession Qualification</span>
          <span class="con">
                <el-input v-model="rat_twc.profession_qualification" placeholder=""></el-input>
            </span>
        </div>
        <div class="main-info">
          <span class="main-info-type">Experience After Graduation</span>
          <span class="con">
                <el-input v-model="rat_twc.experience" placeholder=""></el-input>
            </span>
        </div>
        <div class="main-info">
          <span class="main-info-type">e-mail</span>
          <span class="con">
                <el-input v-model="rat_twc.email" placeholder=""></el-input>
            </span>
        </div>
        <div class="main-info">
          <span class="main-info-type">Phone No.</span>
          <span class="con">
                <el-input v-model="rat_twc.phone_no" placeholder=""></el-input>
            </span>
        </div>

        <div class="main-info">
          <span class="main-info-type">Remarks</span>
          <span class="con">
              <el-input type="textarea" v-model="rat_twc.remark"></el-input>
            <!--                <el-input v-model="input" placeholder=""></el-input>-->
           </span>
        </div>

      </div>

    </div>

    <div class="span-info" style="text-align: left; width:100%; padding-top: 20px;font-size: 12px"><span style="padding-left: 15px;font-family: 'Arial', sans-serif;
    font-weight: 700;font-size: 14px;padding-bottom: 10px">Attachments</span></div>
    <!--分割线 -->
    <div class="divider" style="padding-left: 15px;width: 743px;"> <el-divider></el-divider></div>
    <div class="upload">
      <el-upload
        class="upload-demo"
        drag
        action=""
        ref="upload"
        name="File"
        :auto-upload="false"
        :http-request="httpRequest"
        multiple>
      <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drop files here<em>click to add files</em></div>
      </el-upload>
    </div>
    <div class="button_commit" style="text-align: left;padding-left: 15px;padding-top: 10px;">
      <router-link v-if="this.type==='oc'" :to="{name:'techdSection2',query:{id:this.id,type:'oc'}}">
          <el-button @click="submitEntry" style="background-color: #1c68a4;color: white"><i class="el-icon-check" style="padding-right:5px; "></i>Save</el-button>
      </router-link>

      <router-link v-if="this.type==='mobility'" :to="{name:'viewTwcDetail',query:{id:this.id,type:'mobility',identifier:identifier}}">
        <el-button @click="submitEntry" style="background-color: #1c68a4;color: white"><i class="el-icon-check" style="padding-right:5px; "></i>Save</el-button>
      </router-link>

      <!--跳转回去 detail  -->
      <router-link v-if="this.type==='oc'" :to="{name:'techdSection2',query:{id:this.id,type:'oc'}}">
         <el-button @click="">Cancel</el-button>
      </router-link>

      <router-link v-if="this.type==='mobility'" :to="{name:'viewTwcDetail',query:{id:this.id,type:'mobility',identifier:identifier}}">
        <el-button @click="">Cancel</el-button>
      </router-link>

    </div>


  </div>
</template>

<script>
  import {requestPath, setCookie, getCom, getCookie, mytrim, delCookie} from '@/utils/util'
  import {getSign} from '@/utils/md5'
    export default {
        name: "editTwc",
        // 初始化页面
        mounted:function(){
          // 21/07/2021 修復郵件鏈接
          this.identifier = this.$route.query.identifier;
          this.id = this.$route.query.id
          this.type = this.$route.query.type;
          console.log("identifier->"+ this.identifier);
          console.log("id->"+ this.id);
          console.log("type->"+this.type);
          this.rat_twc.id = this.id; // 修改rat_twc id
          this.findTwcByid();
        },
        data(){
          return{
            // 21/07/2021 修復郵件鏈接
            identifier:'',
            id:1,
            type:'oc',
            newData:{},
            fileList: [],  // file list
            fileData:'',
            file:[], // files
            file_name:'', // upload files
            rat_twc:{
              // 21/07/2021 修復郵件鏈接
              identifier:'',
              id:16,
              type:'',
              approve:'',
              project_name:'',
              division:'',
              project_id:'',
              twc_name:'',
              project_pm:'',
              project_so:'',
              academic:'',
              academic_date:'',
              discipline:'',
              profession_qualification:'',
              experience:'',
              send_email:'',
              email:'',
              phone_no:'',
              remark:'',
              attachments:'',
              oc_mobility_type:'',
              creator:'' // 创建者, 未知
            },
          }
        },
      methods:{
        httpRequest(param) {
          this.file.push(param.file);
        },
          // find twc entry information by id
          findTwcByid(){
            let url =  requestPath() + "findTwcEntryDetail";
            console.log("request url->" + url);
            // request params
            let params = {
              id:this.rat_twc.id
            };
            // get
            this.$axios.get(url,
              {
                params: params,
                // headers: {'signature': sign}
              }
            ).then(response => {
              if (response.data.result === "SUCCESS") {
                console.log("findTwcEntryDetail success!! ")
                this.rat_twc = response.data.entry;
                console.log("rat_twc->"+this.rat_twc);

              } else {
                this.$message.error(response.data.msg);
              }
            }).catch(function (error) { // 请求失败处理
              console.log(error);
            });
          },
        // upload files and edit twc entry information
        submitEntry(){
          var upData = new FormData();
          this.$refs.upload.submit();
          // if(this.file == undefined || this.file.length <= 0){
          //   this.$message({
          //     message: 'Please select the file! ',
          //   });
          //   return;
          // }
          // 编辑可以不再上传文件, 有文件才上传 .
          if(this.file !== undefined && this.file.length > 0){
            this.file.forEach(function (file) {
              upData.append('myfiles', file, file.name);
              // upData.append('file', this.file);
            })
            this.newData.attribute = 0; // entry files set attribute = 0;
            upData.append("attribute", JSON.stringify(this.newData.attribute));
            let url = requestPath() + "uploadFiles";
            console.log("url->" + url);
            console.log("upData->"+upData)
            let _this = this;
            this.$axios.post(url, upData, {
                headers: {
                  // 'signature': sign
                  // "Content-Type":'multipart/form-data'
                }
              }
            ).then(response => {
              if (response.data.result === "SUCCESS") {
                console.log("upload file request success!!")
                this.file_name = response.data.file_name;
                console.log("file_name->"+ this.file_name);
                // 这里重新设置file
                this.file = [];
                this.editEntry();
              }else {
                this.$message.error(response.data.msg);
              }
            }).catch(function (error) {
              console.log(error);
            });

          }else {
            this.editEntry();
          }

        },

        // edit entry
        editEntry(){
          // 接着编辑twc
          let url = requestPath() + "EditTwcEntry";
          console.log("edit url->" + url);
          this.rat_twc.attachments = this.file_name;
          console.log("edit twc file_name->"+this.file_name);

          /**
           *user_name   -- mobility
           user_email -- mobility
           oc_user_email -- oc userName/email
           * */

          if (this.type === 'oc'){
            // 執行者
            this.rat_twc.creator = window.localStorage.getItem("oc_user_name");
            // send email
            this.rat_twc.send_email = window.localStorage.getItem("oc_user_email");
          }else {
            // 執行者
            this.rat_twc.creator = window.localStorage.getItem("user_name");
            // send email
            this.rat_twc.send_email = window.localStorage.getItem("user_email");
          }

          // // 執行者
          // this.rat_twc.creator = window.localStorage.getItem("user_name");
          //
          // // send email
          // this.rat_twc.send_email = window.localStorage.getItem("creator_email");

          // 打印一下remark info
          // console.log("rat_twc->" + this.rat_twc.remark);

          this.rat_twc.oc_mobility_type = this.type;
          // 21/07/2021 修復郵件鏈接
          this.rat_twc.identifier = this.identifier;

          this.$axios.post(url, this.rat_twc, {
              headers: {
                // 'signature': sign
              }
            }
          ).then(response => {
            if (response.data.result === "SUCCESS") {

              console.log("SUCCESS!!")
              this.$message({
                message: 'Successful operation',
                type: 'success'
              });
            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) {
            console.log(error);
          });

        },

      },

    }
</script>

<style scoped>
  .editTwc{
    height: 100%;
  }
.edit-info{
  text-align: left;
  padding-top: 12px;
  padding-left: 12px;
  padding-bottom: 10px;
}
  .edit-info-2{
    text-align: left;
    padding-top: 12px;
    padding-left: 12px;
    font-family: 'Arial', sans-serif;
    font-weight: 700;
    font-size: 20px
  }
  .main-content{
    text-align: left;
    background-color: white;
    padding-bottom: 15px;
  }
  .main-info{
    text-align: left;
    padding-top: 12px;
    /*padding-left: 30px;*/
    /*font-size: 12px;*/
    padding-left: 15px;
    font-size: 13px;
    padding-bottom: 10px;

  }
  .main-info-type{
    display: inline-block;
    width:30%;
  }
  .el-select{
    width: 270px;
  }
  .con{
    width:270px;
  }
  .el-input{
    width:270px;
  }
  .main-info-bottom{
    padding-bottom: 100px;
    padding-left: 15px;
  }
  .upload{width: 100%}
  .upload-demo{text-align:left;padding-left: 15px;}

</style>
