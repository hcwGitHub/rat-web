<template>
    <div class="addEntry">
      <el-scrollbar style="height: 100%;">
      <!-- 头部信息 -->
      <div class="addEntry-top">
        <div class="info-1">Informative > Upload</div>
        <div class="info—2">Upload</div>
      </div>
      <!-- main add entry div-->
      <div class="main-content">
        <div class="main-info">
          <span>Basic Information</span>
        </div>
        <div class="main-info">
          <span class="main-info-type">Type</span>
          <span class="con">
              <!--
                   暂时使用 placeholder="Select Entry Type"  先, 有需求再改
               -->
              <el-select  v-model="selectType"  placeholder="Select Entry Type">
                <el-option  v-for="item in tabs" :label="item.title" :value="item.name"></el-option>
              </el-select>

<!--             <el-select v-if="user_role==='member'" v-model="selectType" placeholder="HIR with proposed RAT meetings">-->
<!--                <el-option  v-for="item in tabs" :label="item.title" :value="item.name"></el-option>-->
<!--              </el-select>-->

          </span>
        </div>

        <!-- 第一个选项卡,as:Detail Information of TWC -->

        <div class="select-1"  v-if="selectType==='1'">
          <div class="main-info">
            <span class="main-info-type">Project</span>
            <span class="con">
                <span v-model="rat_twc.project_name">{{this.rat_twc.project_name}}</span>
            </span>
          </div>

          <div class="main-info">
            <span class="main-info-type">Name of TWC</span>
            <span class="con">
                <el-input v-model="rat_twc.twc_name" placeholder="TEXT"></el-input>
            </span>
          </div>

          <div class="main-info">
            <span class="main-info-type">Division</span>
            <span class="con">
              <span v-model="rat_twc.division">{{this.rat_twc.division}}</span>
<!--                <el-input v-model="rat_twc.division" placeholder="TEXT"></el-input>-->
            </span>
          </div>

          <div class="main-info">
            <span class="main-info-type">Project ID</span>
            <span class="con">
               <span v-model="rat_twc.project_id">{{this.rat_twc.project_id}}</span>
<!--                <el-input v-model="rat_twc.project_id" placeholder="TEXT"></el-input>-->
            </span>
          </div>

          <div class="main-info">
            <span class="main-info-type">Project PM</span>
            <span class="con">
                <el-input v-model="rat_twc.project_pm" placeholder="TEXT"></el-input>
            </span>
          </div>

          <div class="main-info">
            <span class="main-info-type">Project SO</span>
            <span class="con">
                <el-input v-model="rat_twc.project_so" placeholder="TEXT"></el-input>
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">Academic Qualification (Year Granted)</span>
            <span class="con">
                <el-input v-model="rat_twc.academic" placeholder="TEXT"></el-input>
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
                <el-input v-model="rat_twc.discipline" placeholder="TEXT"></el-input>
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">Profession Qualification</span>
            <span class="con">
                <el-input v-model="rat_twc.profession_qualification" placeholder="TEXT"></el-input>
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">Experience After Graduation</span>
            <span class="con">
                <el-input v-model="rat_twc.experience" placeholder="TEXT"></el-input>
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">E-mail</span>
            <span class="con">
                <el-input v-model="rat_twc.email" placeholder="e-mail"></el-input>
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">Phone No.</span>
            <span class="con">
                <el-input v-model="rat_twc.phone_no" placeholder="number"></el-input>
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">Remark</span>
            <span class="con">
                <el-input v-model="rat_twc.remark" placeholder="TEXT"></el-input>
            </span>
          </div>
        </div>

        <!-- 第2个选项卡,as:Detail Information of hir -->
        <div class="select-1" v-if="selectType==='2' || selectType==='3'">
          <div class="main-info">
            <span class="main-info-type">Divsion</span>
            <span class="con">
              <span v-model="rat_hir.divsion">{{this.rat_hir.divsion}}</span>
<!--                <el-input v-model="rat_hir.divsion" placeholder=""></el-input>-->
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">Project Id.</span>
            <span class="con">
              <span v-model="rat_hir.project_no">{{this.rat_hir.project_no}}</span>
<!--                <el-input v-model="rat_hir.project_no" placeholder=""></el-input>-->
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">Project Name.</span>
            <span class="con">
              <span v-model="rat_hir.project_name">{{this.rat_hir.project_name}}</span>
<!--                <el-input v-model="rat_hir.project_name" placeholder=""></el-input>-->
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">Remarks</span>
            <span class="con">
              <el-input type="textarea" v-model="rat_hir.remark"></el-input>
<!--                <el-input v-model="input" placeholder=""></el-input>-->
            </span>
          </div>

        </div>

        <!-- 第四个选项卡: E-mail List of Management Staff, TWC and Engineers -->
        <div class="select-1" v-if="selectType==='4'">
          <div class="main-info">
            <span class="main-info-type">Divsion</span>
            <span class="con">
              <span v-model="rat_contact_details.divsion">{{this.rat_contact_details.divsion}}</span>
<!--                <el-input v-model="rat_contact_details.divsion" placeholder=""></el-input>-->
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">Project Id.</span>
            <span class="con">
              <span v-model="rat_contact_details.project_no">{{this.rat_contact_details.project_no}}</span>
<!--                <el-input v-model="rat_contact_details.project_no" placeholder=""></el-input>-->
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">Project Name.</span>
            <span class="con">
              <span v-model="rat_contact_details.project_name">{{this.rat_contact_details.project_name}}</span>
<!--                <el-input v-model="rat_contact_details.project_name" placeholder=""></el-input>-->
            </span>
          </div>
          <div class="main-info" style="display: flex;">
            <span class="main-info-type">Capacity<br><i style="color: #AAAAAA">(More than one box can be ticked)</i></span>
            <template>
              <el-checkbox-group v-model="checkList" style="display: inline-block;">
                <el-checkbox label="Management Staff"></el-checkbox><br>
                <el-checkbox label="TWC"></el-checkbox><br>
                <el-checkbox label="Engineer"></el-checkbox><br>
              </el-checkbox-group>
            </template>
          </div>
          <div class="main-info">
            <span class="main-info-type">Name</span>
            <span class="con">
                <el-input v-model="rat_contact_details.name" placeholder="TEXT"></el-input>
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">Phone No</span>
            <span class="con">
                <el-input v-model="rat_contact_details.phone_no" placeholder="number"></el-input>
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">E-mail</span>
            <span class="con">
                <el-input v-model="rat_contact_details.email" placeholder="e-mail"></el-input>
            </span>
          </div>

        </div>

        <div class="main-info-bottom">

          <div class="span-info" style="text-align: left; width:100%; padding-top: 30px;font-size: 12px"><span style="font-family: 'Arial Bold', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;font-size: 14px">Attachments</span></div>
          <!--分割线 -->
          <div class="divider" style="width: 743px;"> <el-divider></el-divider></div>
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
          <div class="button_commit" style="text-align: left;padding-top: 10px;">
            <el-button @click="submitEntry" style="background-color: #1c68a4;color: white" v-loading.fullscreen.lock="fullscreenLoading"><i class="el-icon-check" style="padding-right:5px; "></i>Create</el-button>
            <router-link :to="{name:'mobility_techDmenuSub',query:{identifier:identifier}}">
              <el-button>Cancel</el-button>
            </router-link>

          </div>

        </div>
      </div>
      </el-scrollbar>
    </div>
</template>

<script>
  import {requestPath, setCookie, getCom, getCookie, mytrim, delCookie} from '@/utils/util'
  import {getSign} from '@/utils/md5'
    export default {
        name: "addEntry",
         mounted: function () {
          // 21/07/2021 修復郵件鏈接
          this.identifier = this.$route.query.identifier;
          console.log("identifier->" + this.identifier);

          /**
           * user_name   -- mobility
             user_email -- mobility
             oc_user_email -- userName/email
           * */
          let user = window.localStorage.getItem("user_name");
          let user_email = window.localStorage.getItem("user_email");
          let projectNo = window.localStorage.getItem("projectNo");
          let division = window.localStorage.getItem("division");
          let projectName = window.localStorage.getItem("name");

          console.log("user->" + user);
          console.log("project->"+ projectNo +"," + division+","+ projectName);
          console.log("creator_email->"+ user_email);

          // 初始化rat_twc info
          this.rat_twc.creator = user;
          this.rat_twc.division = division;
          this.rat_twc.project_id = projectNo
          this.rat_twc.project_name = projectName;
          this.rat_twc.creator_email = user_email;

          // 初始化rat_hir info
          this.rat_hir.creator = user;
          this.rat_hir.project_no = projectNo;
          this.rat_hir.divsion = division;
          this.rat_hir.project_name = projectName;
          this.rat_hir.creator_email = user_email ; // 發 Email 通知

          // 初始化rat_contact_details
          this.rat_contact_details.creator = user;
          this.rat_contact_details.divsion = division;
          this.rat_contact_details.project_no = projectNo
          this.rat_contact_details.project_name = projectName;
          this.rat_contact_details.creator_email = user_email;

          // options
           let role = window.localStorage.getItem("role");
           this.user_role = role;  // 保存到 user_role
           if (role==='manger'){
             // 可以创建twc 对象
             this.tabs = this.editableTabsB;
           }else{
             // options 不能有twc 创建按钮
             this.tabs = this.editableTabsB2;
             // this.selectType = 2; // 选择2，hir
           }

       },
        data(){
          return{
            // 21/07/2021 修復郵件鏈接
            identifier:'',

            // 02/09/2021
            checkList: [],

            user_role:'member',
            newData:{},
            fileList: [],  // file list
            fileData:'',
            file:[], // files
            file_name:'', // upload files
            rat_twc:{
              // 21/07/2021 修復郵件鏈接
              identifier:'',

              type:'',
              approve:'',
              project_name:'',
              twc_name:'',
              division:'',
              project_id:'',
              project_pm:'',
              project_so:'',
              academic:'',
              academic_date:'',
              discipline:'',
              profession_qualification:'',
              experience:'',
              email:'',
              creator_email:'', // 對象變更發郵件通知
              phone_no:'',
              remark:'',
              attachments:'',
              creator:'' // 创建者, 未知
            },
            rat_hir:{
              // 21/07/2021 修復郵件鏈接
              identifier:'',

              type:'',
              approve:'',
              divsion:'',
              project_no:'',
              project_name:'',
              attachments:'',
              remark:'',
              creator_email:'', // 對象變更發郵件通知
              creator:'' // 创建者
            },
            rat_contact_details:{
              // 21/07/2021 修復郵件鏈接
              identifier:'',

              type:'',
              approve:'',
              divsion:'',
              project_no:'',
              project_name:'',
              attachments:'',
              capacity:'',
              name:'',
              phone_no:'',
              email:'',
              creator_email:'', // 對象變更發郵件通知
              creator:'' // 创建者
            },
            input:'',
            selectType:"",
            tabs:'',
            // 给manger 客户使用
            editableTabsB: [{
              title: 'Detail Information of TWC',
              name: '1',
              content: 'Detail Information of TWC'
            }, {
              title: 'HIR with proposed RAT meetings',
              name: '2',
              content: 'HIR with proposed RAT meetings'
            },{
              title: 'Temporary Works Submission Schedule',
              name: '3',
              content: 'Temporary Works Submission Schedule'
            },{
              title: 'Contact Details of Management Staff, TWC and Engineers',
              name: '4',
              content: 'Contact Details of Management Staff, TWC and Engineers'
            }
            ],

            // 给 member 用户使用
            editableTabsB2: [ {
              title: 'HIR with proposed RAT meetings',
              name: '2',
              content: 'HIR with proposed RAT meetings'
            },{
              title: 'Temporary Works Submission Schedule',
              name: '3',
              content: 'Temporary Works Submission Schedule'
            },{
              title: 'Contact Details of Management Staff, TWC and Engineers',
              name: '4',
              content: 'Contact Details of Management Staff, TWC and Engineers'
            }
            ],

            // 27/07/2021 新需求: 上傳文件的時候, 增加loading加載, 避免重複上傳
            fullscreenLoading:false,


          }
        },
      methods: {
        httpRequest(param) {
          this.file.push(param.file);
        },
          // upload files and create entry twc/hir
        submitEntry(){

          var upData = new FormData();
          this.$refs.upload.submit();
          if(this.file === undefined || this.file.length <= 0 && this.selectType != '4'){
            this.$message({
              message: 'Please select the file! ',
            });
            return;
          }
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
          this.fullscreenLoading = true;
          if (this.file.length > 0) {
            this.$axios.post(url, upData, {
              headers: {
                // 'signature': sign
                // "Content-Type":'multipart/form-data'
              }
            }
          ).then(response => {
            if (response.data.result === "SUCCESS") {
              console.log("request success!!")
              this.file_name = response.data.file_name;
              console.log("file_name->"+ this.file_name);
              // 这里重新设置file
              this.file = [];

              // 成功之后, 在保存entry 信息
              // upload file and create entry
              if (this.selectType==='1'){
                  //twc
                  console.log('selectTYpe->'+ this.selectType);
                  let url = requestPath() + "addTwcEntry";
                  console.log("url->"+url);
                  this.rat_twc.type = 'Detail Information of Twc',
                  this.rat_twc.attachments = this.file_name;
                  console.log("rat_twc->" + this.rat_twc.remark);
                  // 21/07/2021 修復郵件鏈接
                  this.rat_twc.identifier = this.identifier;

                  this.$axios.post(url, this.rat_twc, {
                      headers: {
                        // 'signature': sign
                      }
                    }
                  ).then(response => {
                    if (response.data.result === "SUCCESS") {
                      this.fullscreenLoading = false;
                      console.log("SUCCESS!!")
                      this.$message({
                        message: 'Created Twc entry successfully',
                        type: 'success'
                      });
                      // 回到 mobility entry list
                      this.$router.push('/mobility_techDmenuSub?identifier=' + this.identifier);

                    } else {
                      this.$message.error(response.data.msg);
                    }
                  }).catch(function (error) {
                    console.log(error);
                  });

              } else if (this.selectType === '2'){
                // hir
                let url = requestPath() + "addHirEntry";
                console.log("url->"+url);
                this.rat_hir.type = 'HIR with proposed RAT meetings', // hir type;
                this.rat_hir.attachments = this.file_name;
                console.log("rat_hir->" + this.rat_hir);
                // 21/07/2021 修復郵件鏈接
                this.rat_hir.identifier = this.identifier;

                this.$axios.post(url, this.rat_hir, {
                    headers: {
                      // 'signature': sign
                    }
                  }
                ).then(response => {
                  if (response.data.result === "SUCCESS") {
                    this.fullscreenLoading = false;
                    console.log("SUCCESS!!")
                    this.$message({
                      message: 'Created Hir entry successfully',
                      type: 'success'
                    });
                    // 回到 mobility entry list
                    this.$router.push('/mobility_techDmenuSub?identifier=' + this.identifier);

                  } else {
                    this.$message.error(response.data.msg);
                  }
                }).catch(function (error) {
                  console.log(error);
                });

              }else if (this.selectType === '3'){
                // hir temp（hir copy ）
                let url = requestPath() + "addHirTempEntry";
                console.log("url->"+url);
                this.rat_hir.type = 'Temporary Works Submission Schedule', // hir type;
                  this.rat_hir.attachments = this.file_name;
                console.log("rat_hir->" + this.rat_hir);
                // 21/07/2021 修復郵件鏈接
                this.rat_hir.identifier = this.identifier;

                this.$axios.post(url, this.rat_hir, {
                    headers: {
                      // 'signature': sign
                    }
                  }
                ).then(response => {
                  if (response.data.result === "SUCCESS") {
                    this.fullscreenLoading = false;
                    console.log("SUCCESS!!")
                    this.$message({
                      message: 'Created Hir entry successfully',
                      type: 'success'
                    });
                    // 回到 mobility entry list
                    this.$router.push('/mobility_techDmenuSub?identifier=' + this.identifier);

                  } else {
                    this.$message.error(response.data.msg);
                  }
                }).catch(function (error) {
                  console.log(error);
                });

              }


            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) {
            console.log(error);
          });
          }
          // setTimeout 防止文件未上传完成, 就执行以下代码(导致attachments空值)
          window.setTimeout(() => {
            if (this.selectType === '4') {
            // contact details
            let url = requestPath() + "addContactDetailsEntry";
            console.log("url->"+url);
            this.rat_contact_details.type = 'Contact Details of Management Staff, TWC and Engineers', // contact details type;
            this.rat_contact_details.attachments = this.file_name;
            // 把当前复选框的数组join成带有,号的字符串
            this.rat_contact_details.capacity = this.checkList.join();
            console.log(this.rat_contact_details.capacity);
            console.log("rat_contact_details->", this.rat_contact_details);
            // 21/07/2021 修復郵件鏈接
            this.rat_contact_details.identifier = this.identifier;

            this.$axios.post(url, this.rat_contact_details, {
                headers: {
                  // 'signature': sign
                }
              }
            ).then(response => {
              if (response.data.result === "SUCCESS") {
                this.fullscreenLoading = false;
                console.log("SUCCESS!!")
                this.$message({
                  message: 'Created Contact Details entry successfully',
                  type: 'success'
                });
                // 回到 mobility entry list
                this.$router.push('/mobility_techDmenuSub?identifier=' + this.identifier);

              } else {
                this.$message.error(response.data.msg);
              }
            }).catch(function (error) {
              console.log(error);
            });
          }
          }, 1000);


        },

      }
    }
</script>

<style scoped>
 .addEntry-top{
   width: 100%;
 }
  .info-1{
    text-align: left;
    font-size: 15px;
    padding-top: 20px;
    padding-left: 30px;
  }
  .info—2{
    text-align: left;
    font-family: 'Arial Bold', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    padding-top: 20px;
    padding-left: 30px;
    padding-bottom: 18px;
  }

  .main-content{
    text-align: left;
  }
  .main-info{
    text-align: left;
    padding-top: 10px;
    padding-left: 30px;
    font-size: 12px;

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
    padding-left: 30px;
  }

  .el-checkbox {
    margin-bottom: 10px;
  }


</style>
