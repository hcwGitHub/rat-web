<template>
  <!-- TWC detail UI --->
  <div class="view-twc-detail">
    <div class="top-info">
      Tech Qualification > View Detail
    </div>
    <div class="top-info-2">
      <div class="top-info-2-left">
        <el-tag>{{this.rat_contact_details.approve}}</el-tag>
        <span style="padding-left: 10px">[CONTACT DETAILS ID]</span>
      </div>
      <div class="top-info-2-right">

        <el-button type="primary" @click="dialogVisible3 = true">Delete</el-button>
        <el-dialog
          title="prompt"
          :visible.sync="dialogVisible3"
          width="30%"
        >
          <span>
            delete or not ?
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible3 = false">Cancel</el-button>
            <el-button type="primary" @click="delEntry">Confirm</el-button>
          </span>
        </el-dialog>

        <router-link v-if="this.type==='oc'" :to="{name:'editContactDetails2',query:{id:this.id,type:'oc'}}">
          <el-button type="primary">Update/Upload</el-button>
        </router-link>

        <router-link v-if="this.type==='mobility'" :to="{name:'editContactDetails',query:{id:this.id,type:'mobility',identifier:identifier}}">
          <el-button type="primary">Update/Upload</el-button>
        </router-link>


        <!--        <router-link to="/editHir">-->
        <!--           <el-button type="primary">Edit</el-button>-->
        <!--        </router-link>-->

        <el-button v-if="this.type==='oc'" @click="dialogVisible2 = true" type="primary">Approve</el-button>

        <el-dialog
          title=""
          :visible.sync="dialogVisible2"
          width="30%"
          >
          <span>
            <el-radio v-model="radio" label="pending">Pending</el-radio>
            <el-radio v-model="radio" label="approved">Approved</el-radio>
            <el-radio v-model="radio" label="rejected">Rejected</el-radio>
          </span>
          <!-- pending 或者 rejected 可以填写备注-->
          <div v-if="radio==='rejected'" style="width: 270px; margin: 0 auto">
            <br>
            <div v-if="radio==='rejected'" style="text-align: left;"> Reason Of Rejection </div>
<!--            <div style="text-align: left;padding-left: 60px"> Remarks </div>-->
            <br>
<!--            <span style="display:block;text-align: left">Remarks</span>-->
<!--            <br>-->
            <el-input
              type="textarea"
              :rows="2"
              placeholder="remark"
              v-model="contactDetails_remark">
            </el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">Cancel</el-button>
            <el-button type="primary" @click="updateApprove">Confirm</el-button>
          </span>
        </el-dialog>


      </div>
    </div>
    <!-- reject 信息提示, 如果存在 -->
    <div style="text-align:left;padding-left:16px;font-weight:bold" v-if="this.rat_contact_details.reason_of_rejected != null">
     Reason of Rejection
      <br/>
      <span> {{this.rat_contact_details.reason_of_rejected}}</span>

    </div>
<!--    <div class="top-info-3">-->
<!--      <span>Basic Information</span>-->
<!--      <span style="border: 0">Attachments</span>-->
<!--      <span style="border: 0">Log</span>-->
<!--    </div>-->

    <!-- 主题信息 -->
    <div class="content-main-info">
      <!--  Basic Information -->
      <div class="main-content">
        <el-card shadow="always" v-loading="loading">
          <div class="main-info">
          <span style="font-family: 'Arial', sans-serif;
    font-weight: 700;font-size: 14px">Basic Information</span>
          </div>
          <div class="select-1">
            <div class="main-info">
              <span class="main-info-type">ID</span>
              <span class="con">
                {{this.rat_contact_details.id}}
            </span>
            </div>
            <div class="main-info">
              <span class="main-info-type">Divsion</span>
              {{this.rat_contact_details.divsion}}
<!--              <span class="con">-->
<!--                 <el-select v-model="this.rat_contact_details.divsion" :placeholder="this.rat_contact_details.division">-->
<!--                   <el-option v-for="item in editableTabsB" :label="item.title" :value="item.name"></el-option>-->
<!--                 </el-select>-->
<!--&lt;!&ndash;                {{this.rat_contact_details.divsion}}&ndash;&gt;-->
<!--            </span>-->
            </div>
            <div class="main-info">
              <span class="main-info-type">Project ID</span>
              <span class="con">
               {{this.rat_contact_details.project_no}}
            </span>
            </div>
            <div class="main-info">
              <span class="main-info-type">Project Name.</span>
              <span class="con">
               {{this.rat_contact_details.project_name}}
            </span>
            </div>
            <div class="main-info">
              <span class="main-info-type">Capacity</span>
              <span class="con">
              {{this.rat_contact_details.capacity}}
                <!--                <el-input v-model="input" placeholder=""></el-input>-->
            </span>
            </div>
            <div class="main-info">
              <span class="main-info-type">Name</span>
              <span class="con">
              {{this.rat_contact_details.name}}
                <!--                <el-input v-model="input" placeholder=""></el-input>-->
            </span>
            </div>
            <div class="main-info">
              <span class="main-info-type">Phone No</span>
              <span class="con">
              {{this.rat_contact_details.phone_no}}
                <!--                <el-input v-model="input" placeholder=""></el-input>-->
            </span>
            </div>
            <div class="main-info">
              <span class="main-info-type">Email</span>
              <span class="con">
              {{this.rat_contact_details.email}}
                <!--                <el-input v-model="input" placeholder=""></el-input>-->
            </span>
            </div>

          </div>
        </el-card>
      </div>

      <!-- Attachments -->
      <div class="attachments">
        <el-card shadow="always" v-loading="loading">
          <div class="attachment-info"><span style="font-family: 'Arial', sans-serif;
    font-weight: 700;font-size: 14px">Attachments</span>
          </div>
          <!-- table attachment -->
          <div class="tab-attachment">
            <el-table :data="files"
                      max-height="350"
                      style="width: 100%">
<!--              <el-table-column-->
<!--                prop="file_name"-->
<!--                label="Title"-->
<!--                width="180">-->
<!--              </el-table-column>-->

              <el-table-column
                label="Title"
                width="180">
                <template slot-scope="scope">
                  <el-button @click="(change) => downloadFile(change, scope.row.file_name)"  type="text">{{scope.row.file_name}}</el-button>
                </template>
              </el-table-column>

              <el-table-column
                prop="create_time_str"
                label="Created Date"
                width="180">
              </el-table-column>
              <el-table-column
                prop="creator"
                label="Creator"
                width="180">
              </el-table-column>

              <el-table-column
                label="Action"
                width="180">
                <template slot-scope="scope">
                  <!--                <router-link  to="/viewTwcDetail">-->
                  <!--                  <el-button @click="(value)=>delFile(value,scope.row.id)" type="text" size="small">delete</el-button>-->
                  <el-button @click="dialogVisible = true" type="text" size="small">Delete</el-button>
                  <!--                    <el-button type="text" size="small">编辑</el-button>-->
                  <!--                </router-link>-->


                  <el-dialog
                    title=""
                    :visible.sync="dialogVisible"
                    width="30%"
                  >
                    <span>Confirm to delete the changed file ? </span>
                    <span slot="footer" class="dialog-footer">
                       <el-button @click="dialogVisible = false">Cancel</el-button>
                       <el-button type="primary" @click="(value)=>delFile(value,scope.row.id)">Confirm</el-button>
                  </span>
                  </el-dialog>
                </template>
              </el-table-column>
            </el-table>

          </div>
        </el-card>
      </div>

      <!--Log -->
      <div class="attachments">
        <el-card shadow="always" v-loading="loading">
          <div class="attachment-info"><span style="font-family: 'Arial', sans-serif;
    font-weight: 700;font-size: 14px">Log</span>
          </div>

          <!-- table log -->
          <div class="tab-attachment">
            <el-table :data="logs"
                      max-height="350"
                      style="width: 100%">
              <el-table-column
                prop="create_time_str"
                label="Date"
                width="250">
              </el-table-column>
              <el-table-column
                prop="event"
                label="Event"
                width="250">
              </el-table-column>
              <el-table-column
                prop="creator"
                label="User"
                width="250">
              </el-table-column>
            </el-table>
          </div>
        </el-card>

      </div>

      <!-- 底部信息部分-->
      <div class="twc-info-bottom">
        <el-card shadow="always">

<!--          <el-table :data="this.rat_contact_details"-->
<!--                    max-height="350"-->
<!--                    style="width: 100%">-->
<!--            <el-table-column-->
<!--              prop="create_time_str"-->
<!--              label="Created Date"-->
<!--              width="250">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--              prop="update_time_str"-->
<!--              label="Last Updated Date"-->
<!--              width="250">-->
<!--            </el-table-column>-->

<!--          </el-table>-->


          <div class="main-info">
            <span class="main-info-type">Created Date</span>
            <span class="con">
                {{this.rat_contact_details.create_time_str}}
            </span>
          </div>
          <div class="main-info">
            <span class="main-info-type">Last Updated Date</span>
            <span class="con">
                {{this.rat_contact_details.update_time_str}}
            </span>
          </div>

        </el-card>
      </div>

    </div>
  </div>
</template>

<script>
  import {requestPath, setCookie, getCom, getCookie, mytrim, delCookie} from '@/utils/util'
  import {getSign} from '@/utils/md5'

  export default {
    name: "viewTwcDetail",
    // 初始化页面
    mounted: function () {

      this.id = this.$route.query.id
      this.type = this.$route.query.type;
      // 21/07/2021 修復郵件鏈接
      this.identifier = this.$route.query.identifier;
      console.log("identifier->" + this.identifier)
      console.log("id->" + this.id);
      console.log("type->" + this.type);
      this.rat_contact_details.id = this.id;
      if (this.type === 'oc'){
        let login =  getCookie("isLogin");
        if (login !== 1 && login !== '1'){
          this.$router.push("/");
        }
      }
      let _this = this;
      window.setTimeout(function () {
        _this.findContactDetailsByid();
      }, 300)
    },
    data() {
      return {
        // 21/07/2021 修復郵件鏈接
        identifier:'',
        contactDetails_remark:'',
        input: '',
        id: 1,
        type: 'oc',
        dialogVisible: false, // 删除文件提示框
        dialogVisible2: false, // approve
        dialogVisible3: false, // del entry
        // rat contact details entry information
        rat_contact_details: {
          id: 10,
          type:'',
          approve:'',
          divsion:'',
          project_no:'',
          project_name:'',
          reason_of_rejected:'',
          attachments:'',
          capacity:'',
          name:'',
          phone_no:'',
          email:'',
          create_time_str: '',
          update_time_str: '',
          creator:'' // 创建者
        },
        selectType: "1",
        editableTabsB: [{
          title: 'Building',
          name: '1',
          content: 'Building'
        }, {
          title: 'Building Maintenance',
          name: '2',
          content: 'Building Maintenance'
        },
          {
            title: 'Civil 1',
            name: '3',
            content: 'Civil 1'
          }, {
            title: 'Civil 2',
            name: '4',
            content: 'Civil 2'
          }, {
            title: 'Foundation',
            name: '5',
            content: ''
          }

        ],
        radio: '', // 绑定 rat_contact_details
        files: [], // files
        logs: [],// logs

        loading: true,
      }
    },

    methods: {
      // 下载文件
      downloadFile(value,file_name){
        // 03/08/2021 修復文件名包含特殊符號問題: encodeURIComponent() 函数可把字符串作为 URI 组件进行编码
        let fileName = encodeURIComponent(file_name);
        console.log("file_name->"+fileName);
        let url = requestPath() + "download?attribute=0&fileName="+fileName;
        console.log("url->"+url);
        window.location.href = url; // 通过url 本地下载文件

      },
      // find contact details entry information by id
      findContactDetailsByid() {
        let url = requestPath() + "findContactDetailsEntryDetail";
        console.log("request url->" + url);
        console.log("id->" + this.rat_contact_details.id);
        // request params
        let params = {
          id: this.rat_contact_details.id
        };
        // get
        this.$axios.get(url,
          {
            params: params,
            // headers: {'signature': sign}
          }
        ).then(response => {
          if (response.data.result === "SUCCESS") {
            console.log("findContactDetailsEntryDetail success!! ")
            this.rat_contact_details = response.data.entry;
            this.files = response.data.files;
            this.logs = response.data.logs;
            console.log("rat_contact_details->" + this.rat_contact_details);
            this.loading = false;
            this.radio = this.rat_contact_details.approve;

          } else {
            this.$message.error(response.data.msg);
          }
        }).catch(function (error) { // 请求失败处理
          console.log(error);
        });
      },
      // del entry by id
      delEntry() {
        // 隐藏对话框
        this.dialogVisible3 = false;
        let url = requestPath() + "delEntry";
        console.log("url->" + url);
        let data = {
          id: this.rat_contact_details.id,
          type: "contact_details"
        }
        // 打印一下remark info
        this.$axios.post(url, data, {
            headers: {
              // 'signature': sign
            }
          }
        ).then(response => {
          if (response.data.result === "SUCCESS") {
            console.log("SUCCESS!!")
            this.$message({
              message: 'Successfully modified',
              type: 'success'
            });
            // 跳转回oc/mobility 模块
            console.log('调转页面到->' + this.type)
            if (this.type === 'oc') {
              // rat oc
              this.$router.push({name: 'techdSection'});
            } else {
              // mobility
              this.$router.push({name: 'mobility_techDmenuSub'});
            }

          } else {
            this.$message.error(response.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });

      },

      updateApprove() {
        console.log("upadte entry status");
        this.dialogVisible2 = false; // 关闭信息提示框

        let url = requestPath() + "editContactDetailsEntryApprove";
        console.log("url->" + url);
        let data = {
          id: this.rat_contact_details.id,
          approve: this.radio,
          remark:this.contactDetails_remark,
          creator: '', // creator 未知
          send_email : '',
          identifier: window.localStorage.getItem("identifier")
        }
        /**
         *user_name   -- mobility
         user_email -- mobility
         oc_user_email -- oc userName/email
         * */
        if(this.type==='oc'){
         data.creator = window.localStorage.getItem("oc_user_name");
         data.send_email =  window.localStorage.getItem("oc_user_email");
        }else {
          data.creator = window.localStorage.getItem("user_name");
          data.send_email =  window.localStorage.getItem("user_email");
        }

        // if (this.)
        // 打印一下remark info
        this.$axios.post(url, data, {
            headers: {
              // 'signature': sign
            }
          }
        ).then(response => {
          if (response.data.result === "SUCCESS") {

            console.log("SUCCESS!!")
            this.$message({
              message: 'Successfully modified',
              type: 'success'
            });
            // findContactDetailsByid() flush
            this.findContactDetailsByid();

          } else {
            this.$message.error(response.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });

      },

      // 删除文件
      delFile(value, id) {
        this.dialogVisible = false; // 关闭信息提示框

        let url = requestPath() + "delEntryFile";
        console.log("del contact details file id->" + id);
        console.log("url->" + url);
        let data = {
          id: id
        }
        // 打印一下remark info
        this.$axios.post(url, data, {
            headers: {
              // 'signature': sign
            }
          }
        ).then(response => {
          if (response.data.result === "SUCCESS") {

            console.log("SUCCESS!!")
            this.$message({
              message: 'successfully deleted',
              type: 'success'
            });
            // findTwcByid() flush
            this.findContactDetailsByid();
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });

      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },

    }
  }
</script>

<style scoped>
  .view-twc-detail {
    width: calc(100% - 30px);
    padding-left: 15px;
    padding-right: 15px;
  }

  .top-info {
    text-align: left;
    padding-top: 15px;
    padding-left: 15px;
  }

  .top-info-2 {
    height: 60px;
    /* width: 100%; */
    /*background: antiquewhite;*/
    vertical-align: middle;
    padding-top: 20px;
    padding-left: 15px;
    padding-right: 20px;
  }

  .top-info-2-left {
    float: left;
  }

  .top-info-2-right {
    float: right;
  }

  .el-button--primary {
    background-color: #189cd5;
    border-color: #189cd5;
  }

  .el-tag {
    background-color: #73d3f3;
    font-family: 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    letter-spacing: normal;
    color: #333333;
  }

  .top-info-3 {
    text-align: left;
    padding-left: 15px;
    height: 55px;
  }

  .top-info-3 > span {

    display: inline-block;
    width: 192px;
    height: 54px;
    /*background: inherit;*/
    /*background-color: rgba(255, 255, 255, 1);*/
    /*box-sizing: border-box;*/
    /*border: 0px;*/
    /*border-width: 5px;*/
    /*border-style: solid;*/
    /*border-color: rgba(245, 154, 35, 1);*/
    border-left: 0px;
    border-top: 0px;
    border-right: 0px;
    border-radius: 0px;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: 'Arial Bold', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    margin-right: 25px;
  }

  /* #but1{*/
  /*  border: 0px;*/
  /*}*/
  /*#but2{*/
  /*  border: 0px;*/
  /*}*/
  .content-main-info {
    width: 100%;
    /*background-color: #d7d7d7;*/
    text-align: left;
    padding-top: 20px;
    height: auto;
    padding-bottom: 100px;
  }


  .main-content {
    text-align: left;
    background-color: white;
    padding-bottom: 15px;
  }

  .main-info {
    text-align: left;
    padding-top: 10px;
    /*padding-left: 30px;*/
    font-size: 12px;

  }

  .main-info-type {
    display: inline-block;
    width: 30%;
  }

  .el-select {
    width: 270px;
  }

  .con {
    width: 270px;
  }

  .el-input {
    width: 270px;
  }

  .main-info-bottom {
    padding-bottom: 100px;
    padding-left: 30px;
  }

  .attachments {
    background-color: white;
    padding-bottom: 100px;
    /*padding-left: 30px;*/
    margin-top: 25px;
    padding-bottom: 15px;
  }

  th, td {
    text-align: center;
    padding-right: 35px;
    height: 30px;
  }

  td {
    font-family: 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    letter-spacing: normal;
    /*color: #0000FF;*/
  }

  .attachment-info {
    /*height: 30px;*/
  }

  .twc-info-bottom {
    background-color: white;
    margin-top: 25px;
    padding-bottom: 12px;
  }
</style>
