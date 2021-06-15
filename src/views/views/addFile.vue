<template>
    <div class="addFile">
      <!-- 头部信息 -->
      <div class="section-top">
        <div class="section-top-info">
          Informative > Upload File
        </div>
        <div class="section-top-info2">
          <div class="section-top-info2-tag">Upload File</div>
        </div>
      </div>

      <!-- add file 主题内容-->
      <div class="addFile-info" :model="fileObj">
        <table border="1" cellpadding="0" cellspacing="0"  style="border-collapse:collapse;">
          <tr>
            <td class="td1"><span>File Type</span></td>
            <td class="td2">
              <el-select  v-model="fileObj.type" placeholder='Templates for "List of Consolidated Action Items" (HP Checklist)'>
                <el-option v-for="item in editableTabs" :label="item.title" :value="item.title"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="td1"><span>Created Date</span></td>
            <td class="td2">
              {{fileObj.create_time}}
            </td>
          </tr>
          <tr>
            <td class="td1"><span>Creator</span></td>
            <td class="td2">
              {{fileObj.creator}}
            </td>
          </tr>
          <tr>
            <td class="td1"><span>Display</span></td>
            <td class="td2">
              <el-checkbox v-model="checked"></el-checkbox>
            </td>
          </tr>
        </table>

      </div>

      <div class="span-info" style="text-align: left; width:100%; padding-top: 20px;font-size: 12px"><span style="padding-left: 45px">FILES</span></div>
      <!--分割线 -->
      <div class="divider" style="padding-left: 50px;width: 743px;"> <el-divider></el-divider></div>
      <div class="upload" ref="form" :model="newData">
          <!--一次只能上传一个文件，limit 1 , handleExceed（） 超过limit 之后的提示-->
          <el-upload
            class="upload-demo"
            drag
            action=""
            ref="upload"
            name="File"
            :auto-upload="false"
            :http-request="httpRequest"
            multiple
            :limit="1"
            :on-exceed="handleExceed">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop files here<em>click to add files</em></div>
          </el-upload>

      </div>
      <div class="button_commit" style="text-align: left;padding-left: 45px;padding-top: 10px;">
<!--        <form enctype="multipart/form-data" :action="submitUpload" method="POST">-->
          <el-button @click="submitUpload" style="background-color: #1c68a4;color: white"><i class="el-icon-check" style="padding-right:5px; "></i>Upload</el-button>
          <router-link to="/techdSection">
          <el-button>Cancel</el-button>
        </router-link>
<!--        </form>-->
      </div>
    </div>
</template>

<script>
  import {requestPath, setCookie, getCom, getCookie, mytrim, delCookie} from '@/utils/util'
  import {getSign} from '@/utils/md5'
    export default {
        name: "addFile",
      // 初始化加载用户信息
      mounted: function () {
        // 只有oc 才能 add file , mobility 可以 add entry
        // 判断是否登录
        // 先判断有没OC login , 没有login , 直接跳转到 login UI
        let login =  getCookie("isLogin");
        if (login !== 1 && login !== '1'){
          this.$router.push("/"); // login UI
        }
        // add file 是 OC 功能
        /**
         *user_name   -- mobility
         user_email -- mobility
         oc_user_email -- userName/email
         * */
        let user_name = window.localStorage.getItem("oc_user_email");
        this.fileObj.creator = user_name;
      },
        data(){
          return{
            newData:{},
            file:[],
            fileObj:{
              type:'Templates for "List of Consolidated Action Items" (HP Checklist)',
              file_name:this.file_name,
              creator:'', // 创建者, 这里未知
              create_time:this.getDateNow(),
              display:1
            },
            checked: false,
            selectType:'',
            file_name:"",// 保存文件之后返回数据
            fileList: [],  // file list
            fileData:'',
            editableTabs: [{
              title: 'Templates for "List of Consolidated Action Items" (HP Checklist)',
              name: '1',
              content: 'Tab 1 content'
            }, {
              title: 'MAQ Checklist',
              name: '2',
              content: 'Tab 2 content'
            }
              , {
                title: 'RAT Mechanism',
                name: '3',
                content: 'Tab 3 content'
              }
              , {
                title: 'Temporary Works (Control System and Co-ordinator)',
                name: '4',
                content: 'Tab 4 content'
              }
              , {
                title: 'Technical Notes',
                name: '5',
                content: 'Tab 5 content'
              }

            ],
          }
        },
        methods:{
          // upload 只能上传一个文件
          handleExceed(files, fileList) {
            this.$message.warning('Currently limited to select 1 file');
          },
          httpRequest(param) {
            this.file.push(param.file);
          },
          submitUpload(){
            var upData = new FormData();
            this.$refs.upload.submit();
            if(this.file === undefined || this.file.length <= 0){
              this.$message({
                message: 'Please select the file! ',
              });
              return;
            }
            this.file.forEach(function (file) {
              upData.append('myfiles', file, file.name);
              // upData.append('file', this.file);
            })
            this.newData.attribute = 1;
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
                      console.log("request success!!")
                      // 这里重新设置file
                      this.file = [];

                      this.file_name = response.data.file_name;
                      console.log("file_name->"+this.file_name);
                      console.log("checked->"+ this.checked);
                      if (this.checked){
                        // display
                        this.fileObj.display = 1;
                      }else{
                        this.fileObj.display = 0;
                      }
                      this.fileObj.file_name = this.file_name;
                      // 設置創建用戶信息
                      this.fileObj.creator = window.localStorage.getItem("user_name");
                      // 接着保存文件相关信息
                      let url2 = requestPath() + "addFile";
                      console.log("url2->"+url2)
                      this.$axios.post(url2, this.fileObj, {
                          headers: {
                            // 'signature': sign
                          }
                        }
                      ).then(response => {
                        if (response.data.result === "SUCCESS") {
                          console.log("add file api success!")
                          // this.getBannerListMethod();
                          this.$message({
                            message: 'Add File Success',
                            type: 'success'
                          });
                          // 清空全部数据(设置回默认数据),防止重复提交之后出现问题
                          this.file_name="";
                          this.file = [];
                          this.fileObj.type='Templates for "List of Consolidated Action Items" (HP Checklist)';
                          this.fileObj.display = 1;
                          this.checked = false;
                           // 获取oc entry and file list
                          this.$router.push('/techdSection');
                        } else {
                          this.$message.error(response.data.msg);
                        }
                      }).catch(function (error) {
                        console.log(error);
                      });
                      // this.getBannerListMethod();
                      // this.$message({
                      //   message: '新增Banner成功',
                      //   type: 'success'
                      // });
                    } else {
                      this.$message.error(response.data.msg);
                    }
                  }).catch(function (error) {
                    console.log(error);
              });

          },
          getDateNow(){
            const nowDate = new Date();
            const date = {
              year: nowDate.getFullYear(),
              month: nowDate.getMonth() + 1,
              date: nowDate.getDate(),
            }
            const newmonth = date.month>10?date.month:'0'+date.month
            const day = date.date>10?date.date:'0'+date.date
            let systemDate = date.year + '-' + newmonth + '-' + day
            return systemDate;
          }

        },

    }
</script>

<style scoped>
  .section-top{
    height: 140px;
    /*border-bottom-style: groove;*/
  }
  .addFile{
    width: 100%;
    height: 100%;
  }
  .section-top-info{
    text-align: left;
    padding: 20px;
    font-size: 18px;
    padding-top: 40px;
    padding-left: 45px;
  }
  .section-top-info2{
    /*padding-left: 45px;*/
    /*padding-top: 16px;*/
    font-family: 'Arial Bold', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    text-align: left;
    width: 100%;
    /*padding-top: 16px;*/
    /*height: 200px;*/
    /*padding-top: 10px;*/
  }
  .section-top-info2-tag{
    float: left;
    padding-left: 45px;
  }
  tr,td{
    text-align:center;
  }
  .addFile-info
  {
    padding-left: 43px;
    padding-top: 10px;
  }
  .td1{
   width:100px;
    height: 40px;
  }
  .td2{
    width: 222px;
    height: 40px;
  }
  .el-select {
    width: 438px;
  }
  .upload{width: 100%}
  .upload-demo{text-align:left;padding-left: 45px;}


</style>
