<template>
  <div class="section">

    <!-- 头部信息 -->
    <div class="section-top">
      <div class="section-top-info">
        Home / TechD Section
      </div>
      <div class="section-top-info2">

        <div class="section-top-info2-tag">Informative (TechD view)</div>
        <div v-if="this.select_lable==='Shared Information'" class="section-top-tag">
          <!--            <el-tag>Upload file</el-tag>-->
          <router-link to="/techdSection/addFile">
            <el-button>Upload</el-button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 主体部分 -->
    <div class="section-main">
      <el-tabs class="el-tabs-p" type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Shared Information" name="first">
          <!--内部选项卡-->

          <el-tabs v-model="activeName2" @tab-click="findFilesByType">
            <el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
              <!-- 内部表格 tab -->
              <el-table
                :data="attachments"
                :border="true"
                max-height="500"
                style="width: 100%">

                <el-table-column
                  type="index"
                  label="NO."
                  width="50">
                </el-table-column>

                <el-table-column
                  prop="id"
                  label="ID."
                  width="150">
                </el-table-column>

                <!--                <el-table-column-->
                <!--                  prop="file_name"-->
                <!--                  label="File Name"-->
                <!--                  width="150">-->
                <!--                  <template slot-scope="scope">-->
                <!--                    &lt;!&ndash; `checked` 为 true 或 false &ndash;&gt;-->
                <!--                    <a href="#" @click="(change) => downloadFile(change, scope.row.file_name)" type="text" size="small">scope.raw.file_name</a>-->
                <!--                    &lt;!&ndash;                      <el-checkbox v-model="checked"></el-checkbox>&ndash;&gt;-->
                <!--                  </template>-->
                <!--                </el-table-column>-->

                <el-table-column
                  prop="file_name"
                  label="File Name"
                  width="150"
                >
                </el-table-column>

                <el-table-column
                  prop="create_time_str"
                  label="CreatedDate">
                </el-table-column>
                <el-table-column
                  prop="creator"
                  label="Creator">
                </el-table-column>
                <!--                <el-table-column-->
                <!--                  prop="Dsiplay"-->
                <!--                  label="Dsiplay"-->
                <!--                  width="150">-->
                <!--                </el-table-column>-->

                <el-table-column
                  label="Display"
                  width="150">
                  <!-- 自定义表头  slot="header" slot-scope="scope" -->
                  <template slot="header" slot-scope="scope">
                    Display <el-checkbox @change="(change) => updateALLDisplayStatus(change)"
                                 >
                    </el-checkbox>
                  </template>
                  <!-- 自定义表内容 -->
                  <template slot-scope="scope">
                    <!-- `checked` 为 true 或 false -->
                    <el-checkbox @change="(change) => updateDisplayStatus(change, scope.row.id)"
                                 v-model="scope.row.flag"></el-checkbox>
                    <!--                      <el-checkbox v-model="checked"></el-checkbox>-->
                  </template>
                </el-table-column>

                <el-table-column
                  label="Action"
                  width="150">
                  <template slot-scope="scope">
                    <el-button @click="(change) => downloadFile(change, scope.row.file_name)" type="text" size="small">
                      Download
                    </el-button>
                    <!--                    <el-button @click="(change) => del(change, scope.row.id)" type="text" size="small">delete</el-button>-->
<!--                    <el-button @click="dialogVisible = true" type="text" size="small">delete</el-button>-->
<!--                    <el-button @click="(value)=>del(value,scope.row.id)" type="text" size="small">delete</el-button>-->
                    <el-button type="text" size="small" @click="del(scope.row.id)">Delete</el-button>
                  </template>
                </el-table-column>

              </el-table>

              <!-- 分页 -->
              <el-pagination

                style="float: right;margin-top: 30px"
                background
                :current-page="page"
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-count="pageTotal">
              </el-pagination>

            </el-tab-pane>

          </el-tabs>

          <!--内部选项卡结束-->
        </el-tab-pane>

        <el-tab-pane label="Detail Information of TWC / HIR with Proposed RAT Meetings" name="second">
          <!--内部选项卡-->
          <!-- 通过条件过滤查詢-->
          <div class="searchByDivision" style="text-align: left;padding-bottom: 8px">
            <!-- 通过 division 条件过滤-->
            <span class="con">
                   <el-select  @change="searchPage(1)" v-model="division" placeholder="division">
                     <el-option  v-for="item in divisions" :label="item.content" :value="item.title"></el-option>
                   </el-select>
              <!--{{this.rat_twc.division}}-->
            </span>

            <span class="con">
                   <el-select  @change="searchPage(1)" v-model="approve" placeholder="division">
                     <el-option  v-for="item in approves" :label="item.content" :value="item.title"></el-option>
                   </el-select>
              <!--{{this.rat_twc.division}}-->
            </span>


          </div>

          <el-tabs v-model="activeName3" @tab-click="search">
            <el-tab-pane :key="item.name" v-for="(item, index) in editableTabsB" :label="item.title" :name="item.name">

              <!-- 内部表格 tab -->
              <el-table v-if="item.name==='1'"
                        :data="twc_list"
                        :border="true"
                        style="width: 100%">
                <el-table-column
                  type="index"
                  label="NO."
                  width="50">
                </el-table-column>

                <el-table-column
                  prop="id"
                  label="ID."
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="approve"
                  label="Status"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="reason_of_rejected"
                  label="Reason of Rejection"
                  width="160">
                </el-table-column>

                <el-table-column
                  prop="project_id"
                  label="Project ID"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="division"
                  label="Division"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="project_name"
                  label="Project"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="twc_name"
                  label="Name of TWC"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="project_pm"
                  label="Project PM"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="project_so"
                  label="Project SO"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="academicAndDate"
                  label="Academic Qualification(Year Granted)"
                  width="280">
                </el-table-column>
                <el-table-column
                  prop="discipline"
                  label="Discipline"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="profession_qualification"
                  label="Profession Qualification" width="200">
                </el-table-column>

                <el-table-column
                  prop="experience"
                  label="Experience After Graduation"
                  width="250">
                </el-table-column>

                <el-table-column
                  prop="email"
                  label="e-mail"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="phone_no"
                  label="Phone ID"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="remark"
                  label="Remarks"
                  width="150">
                </el-table-column>

                <!--                <el-table-column-->
                <!--                  prop="Action"-->
                <!--                  label="Action"-->
                <!--                  width="150">-->
                <!--                </el-table-column>-->

                <el-table-column
                  label="Action"
                  fixed="right"
                  width="200">
                  <template slot-scope="scope">
                      <span slot="footer" class="dialog-footer">
                          <router-link :to="{name:'techdSection2',query:{id:scope.row.id,type:'oc'}}">
                               <el-button type="text" size="small">View</el-button>
                          </router-link>
                        <!--                    <el-button type="text" size="small">编辑</el-button>-->
                      </span>

                    <!--delete-->
                    <span slot="footer" class="dialog-footer">
                         <el-button type="text" size="small" @click="delTwcEntry(scope.row.id)">Delete</el-button>
                    </span>

                      <!-- update  -->
                      <span slot="footer" class="dialog-footer">
                           <router-link :to="{name:'editTwc2',query:{id:scope.row.id,type:'oc'}}">
                               <el-button type="text" size="small">Update</el-button>
                          </router-link>
                      <!--                    <el-button type="text" size="small">编辑</el-button>-->
                      </span>

                    <!-- approve  -->
                    <span slot="footer" class="dialog-footer">

                       <el-button @click="dialogVisible2 = true, twc_id = scope.row.id" type="text" size="small">Approve</el-button>

                       <el-dialog
                          title=""
                          :visible.sync="dialogVisible2"
                          width="30%"
                          :modal-append-to-body='false'
                          >
                          <span>
                            <el-radio v-model="radio" label="pending">Pending</el-radio>
                            <el-radio v-model="radio" label="approved">Approved</el-radio>
                            <el-radio v-model="radio" label="rejected">Rejected</el-radio>
                          </span>
                         <!--
                            pending 或者 rejected 可以填写备注
                          -->
                         <div v-if="radio==='pending' || radio==='rejected'">
                            <br>
                            <div v-if="radio==='pending'" style="text-align: left;"> Remarks </div>
                            <div v-if="radio==='rejected'" style="text-align: left;"> Reason Of Rejection </div>
                            <br>
                            <el-input
                              type="textarea"
                              :rows="2"
                              placeholder="remark"
                              v-model="twc_remark">
                            </el-input>
                         </div>
                          <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible2 = false">Cancel</el-button>
                            <el-button type="primary" @click="updateApprove">Confirm</el-button>
                          </span>
                        </el-dialog>

                    </span>

                  </template>

                </el-table-column>

              </el-table>

              <el-table v-if="item.name==='2' || item.name ==='3'"
                        :data="hir_list"
                        :border="true"
                        style="width: 100%">
                <el-table-column
                  type="index"
                  label="NO."
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="ID."
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="approve"
                  label="Status"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="reason_of_rejected"
                  label="Reason of Rejection"
                  width="160">
                </el-table-column>

                <el-table-column
                  prop="project_no"
                  label="Project ID"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="divsion"
                  label="Division"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="project_name"
                  label="Project Name"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="remark"
                  label="Remarks"
                  width="150">
                </el-table-column>

                <el-table-column
                  label="Action"
                  width="200">
                  <template slot-scope="scope">
                    <span slot="footer" class="dialog-footer">
                    <router-link :to="{name:'techdSection3',query:{id:scope.row.id,type:'oc',type_name:type_name}}">
                      <el-button @click="" type="text" size="small">View</el-button>
                      <!--                    <el-button type="text" size="small">编辑</el-button>-->
                    </router-link>
                    </span>
                    <!-- delete -->
                    <span slot="footer" class="dialog-footer">
                     <el-button type="text" size="small" @click="delHirEntry(scope.row.id)">Delete</el-button>
                    </span>
                    <!-- update -->
                    <span slot="footer" class="dialog-footer">
                    <router-link :to="{name:'editHir2',query:{id:scope.row.id,type:'oc',type_name:type_name}}">
                      <el-button type="text" size="small">Update</el-button>
                    </router-link>
                    </span>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible3 = true,hir_id = scope.row.id" type="text" size="small">Approve</el-button>

                       <el-dialog
                         title=""
                         :visible.sync="dialogVisible3"
                         width="30%"
                         :modal-append-to-body='false'
                       >
                          <span>
                            <el-radio v-model="radio2" label="pending">Pending</el-radio>
                            <el-radio v-model="radio2" label="approved">Approved</el-radio>
                            <el-radio v-model="radio2" label="rejected">Rejected</el-radio>
                          </span>
                         <div v-if="radio2==='pending' || radio2==='rejected'">
                           <br>
                           <div v-if="radio2==='pending'" style="text-align: left;"> Remarks </div>
                            <div v-if="radio2==='rejected'" style="text-align: left;"> Reason Of Rejection </div>
<!--                            <div style="text-align: left;"> Remarks </div>-->
                            <br>
                            <el-input
                              type="textarea"
                              :rows="2"
                              placeholder="remark"
                              v-model="hir_remark">
                            </el-input>
                         </div>
                          <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible3 = false">Cancel</el-button>
                            <el-button type="primary" @click="updateHirApprove">Confirm</el-button>
                          </span>
                        </el-dialog>
                    </span>

                  </template>
                </el-table-column>

                <!--                <el-table-column-->
                <!--                  prop="Action"-->
                <!--                  label="Action"-->
                <!--                  width="150">-->
                <!--                </el-table-column>-->

              </el-table>
              <!-- 分页 -->

              <el-pagination

                style="float: right;margin-top: 30px"
                background
                :current-page="page"
                layout="prev, pager, next"
                @current-change="searchPage"
                :page-count="pageTotal">
              </el-pagination>
            </el-tab-pane>
          </el-tabs>

          <!--内部选项卡结束-->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {requestPath, setCookie, getCom, getCookie, mytrim, delCookie} from '@/utils/util'
  import {getSign} from '@/utils/md5'

  export default {
    name: "techDmenuSub",
    // 初始化页面,获取project/ user 参数信息
    mounted: function () {
      // 先判断有没OC login , 没有login , 直接跳转到 login UI
      let login =  getCookie("isLogin");
      if (login !== 1 && login !== '1'){
        this.$router.push("/");
      }
    },
    data() {
      return {
        hir_remark:'', // hir approve 按钮备注.
        twc_remark:'',// twc remark
        dialogVisible: false, // 删除file
        dialogVisible2: false, // approve
        dialogVisible3: false, // del entry
        hir_id:'',
        twc_id:'',
        select_lable: 'Shared Information', // 选项卡选择的模块
        project_info: '', // project information
        user: '', // 用户信息
        activeName: 'first',
        activeName2: 'second',
        activeName3: 'thrid',
        type_label: '', // file 使用
        project_name: '',
        checked: true,
        checked_false: false,
        attachments: [], // attachments 附件信息
        type_name: '', // twc/entry 使用
        // 分页信息
        page: 1,
        page_size: 50,
        count: 0,
        pageTotal: 0,
        division:'', // search by  division
        approve:'', //search by approve
        divisions: [
          {
            title: '',
            name: '0',
            content: 'All Divisions'
          },{
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
            content: 'Foundation'
          }

        ],
        approves: [
          {
            title: '',
            name: '0',
            content: 'All Status'
          },{
            title: 'pending',
            name: '1',
            content: 'Pending'
          }, {
            title: 'approved',
            name: '2',
            content: 'Approved'
          },
          {
            title: 'rejected',
            name: '3',
            content: 'Rejected'
          }
        ],

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
        }
        ],

        twc_list: [], // twc 数据
        hir_list: [],// hir list
        radio: '', // 绑定rat_twc
        radio2:'',


      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        console.log("select-lable: " + tab.label);
        this.select_lable = tab.label;
      },

      // 跳转页面，携带参数id , type
      // getDescribe(value,row){
      //   // let id = _id;
      //   // let type = 'oc';
      //   // this.$router.push({
      //   //   path: `/viewTwcDetail/${id}/${type}`,
      //   // });
      //   this.$router.push({
      //     name: '/viewTwcDetail',
      //     query: {
      //       id: row.id,
      //       type:type
      //     }
      //   });
      //
      // },
      // search twc/hir
      search(type) {
        console.log("type->" + type.name)
        this.type_name = type.name; // 保存一下
        this.page = 1;
        this.pageTotal = 0;
        if (type.name === '1') {
          // search twc list
          let twc_url = requestPath() + "searchTwc";
          console.log("request url->" + twc_url);
          // request params
          let params = {
            project_name: this.project_name,
            project_id:'',
            page: this.page,
            page_size: this.page_size
          };
          params.project_id = window.localStorage.getItem("projectNo");
          console.log( " projectNo-> "+ window.localStorage.getItem("projectNo"));
          // get
          this.$axios.get(twc_url,
            {
              params: params,
              // headers: {'signature': sign}
            }
          ).then(response => {
            if (response.data.result === "SUCCESS") {

              this.twc_list = response.data.twc_list;
              this.pageTotal = response.data.pageTotal;
              console.log("twc_list->" + this.twc_list);
              console.log("pageTotal->" + this.pageTotal);
            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });

        } else if (type.name === '2') {
          console.log("search hir")
          // search hir list
          let hir_url = requestPath() + "searchHir";
          console.log("request url->" + hir_url);
          // request params
          let params = {
            // project_name:this.project_name,
            project_no:window.localStorage.getItem("projectNo"),
            page: this.page,
            page_size: this.page_size
          };
          // get
          this.$axios.get(hir_url,
            {
              params: params,
              // headers: {'signature': sign}
            }
          ).then(response => {
            if (response.data.result === "SUCCESS") {
              console.log("request hir api success")
              this.hir_list = response.data.hir_list;
              this.pageTotal = response.data.pageTotal;
              console.log("hir_list->" + this.hir_list);

            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });
        }else if(type.name === '3'){
          console.log("search hir temp")
          // search hir list
          let hir_url = requestPath() + "searchHirTemp";
          console.log("request url->" + hir_url);
          // request params
          let params = {
            // project_name:this.project_name,
            project_no:window.localStorage.getItem("projectNo"),
            page: this.page,
            page_size: this.page_size
          };
          // get
          this.$axios.get(hir_url,
            {
              params: params,
              // headers: {'signature': sign}
            }
          ).then(response => {
            if (response.data.result === "SUCCESS") {
              console.log("request hir api success")
              this.hir_list = response.data.hir_list;
              this.pageTotal = response.data.pageTotal;
              console.log("hir_list->" + this.hir_list);

            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });
        }

      },

      // 下载文件
      downloadFile(value, file_name) {
        let fileName = file_name;
        console.log("file_name->" + fileName);
        let url = requestPath() + "download?attribute=1&fileName=" + fileName;
        console.log("url->" + url);
        window.location.href = url; // 通过url 本地下载文件

      },

      // del文件
      del(id) {

        this.$confirm('This operation will permanently delete the file. Do you want to continue?', '', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // 執行刪除
          // this.dialogVisible = false;
          console.log("del file id->" + id);
          let url = requestPath() + "del";
          console.log("url->" + url);
          // window.location.href = url; // 通过url 本地下载文件
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
              // flush
              // console.log("_Type"+ this._type);
              // this.findFilesByType(this._type); this.page -- 当前页
              this.handleCurrentChange(this.page);

            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) {
            console.log(error);
          });

        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });

      },

      // 分页查询
      searchPage(curPage) {
        console.log("searchPage");
        console.log("type->" + this.type_name);
        this.page = curPage; // 设置当前页
        if (this.type_name === '1') {
          // search twc list
          let twc_url = requestPath() + "searchTwc";
          console.log("request url->" + twc_url);
          console.log("division-> " + this.division);
          console.log("approve->"+this.approve) ;
          // request params
          // by division
          let params = {
            project_name: this.project_name,
            project_id:'',
            division:this.division,
            approve: this.approve,
            page: this.page,
            page_size: this.page_size
          };
          params.project_id = window.localStorage.getItem("projectNo");
          console.log( " projectNo-> "+ window.localStorage.getItem("projectNo"));
          // get
          this.$axios.get(twc_url,
            {
              params: params,
              // headers: {'signature': sign}
            }
          ).then(response => {
            if (response.data.result === "SUCCESS") {

              this.twc_list = response.data.twc_list;
              console.log("twc_list->" + this.twc_list);

            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });

        } else if (this.type_name === '2') {
          console.log("search hir")
          // search hir list
          let hir_url = requestPath() + "searchHir";
          console.log("request url->" + hir_url);
          // request params
          // by division,division
          let params = {
            // project_name:this.project_name,
            project_no:window.localStorage.getItem("projectNo"),
            division:this.division,
            approve: this.approve,
            page: this.page,
            page_size: this.page_size
          };
          // get
          this.$axios.get(hir_url,
            {
              params: params,
              // headers: {'signature': sign}
            }
          ).then(response => {
            if (response.data.result === "SUCCESS") {
              console.log("request hir api success")
              this.hir_list = response.data.hir_list;
              this.pageTotal = response.data.pageTotal;
              console.log("hir_list->" + this.hir_list);

            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });
        }else if (this.type_name === '3') {
          console.log("search hir temp")
          // search hir list
          let hir_url = requestPath() + "searchHirTemp";
          console.log("request url->" + hir_url);
          // request params
          // by division,division
          let params = {
            // project_name:this.project_name,
            project_no:window.localStorage.getItem("projectNo"),
            division:this.division,
            approve: this.approve,
            page: this.page,
            page_size: this.page_size
          };
          // get
          this.$axios.get(hir_url,
            {
              params: params,
              // headers: {'signature': sign}
            }
          ).then(response => {
            if (response.data.result === "SUCCESS") {
              console.log("request hir api success")
              this.hir_list = response.data.hir_list;
              this.pageTotal = response.data.pageTotal;
              console.log("hir_list->" + this.hir_list);

            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });
        }

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },

      // hir
      updateHirApprove() {
        console.log("upadte entry status");
        console.log("_id->"+this.hir_id +" this.radio2->"+this.radio2);
        this.dialogVisible3 = false; // 关闭信息提示框
        // 判断是操作hir, 还是hir copy(hir temp)
        let url = requestPath() + "editHirEntryApprove";
        if (this.type_name==='3'){
          url = requestPath() + "editHirTempEntryApprove";
        }
        console.log("url->" + url);
        /**
         * user_name   -- mobility
         user_email -- mobility
         oc_user_email -- userName/email
         * */
        let data = {
          id: this.hir_id,
          approve: this.radio2,
          remark: this.hir_remark, // remark
          creator: window.localStorage.getItem("oc_user_email"), // creator
          send_email : window.localStorage.getItem("oc_user_email")
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
            // findHirByid() flush
            this.searchPage(this.page);

          } else {
            this.$message.error(response.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });

      },

      //twc approve
      updateApprove() {
        console.log("upadte entry status");
        console.log("this.twc_id->"+this.twc_id);
        this.dialogVisible2 = false; // 关闭信息提示框

        let url = requestPath() + "editTwcEntryApprove";
        console.log("url->" + url);
        let data = {
          id: this.twc_id,
          approve: this.radio,
          remark: this.twc_remark, // twc approve 修改 remark
          creator: window.localStorage.getItem("oc_user_email"),
          send_email : window.localStorage.getItem("oc_user_email")
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
            // flush
            this.searchPage(this.page);
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });

      },

      // del entry by id (twc)
      delTwcEntry(_id) {
        this.$confirm('This operation will permanently delete the file, do you want to continue?', '', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          console.log("twc_id ->" + _id);
          let url = requestPath() + "delEntry";
          console.log("url->" + url);
          let data = {
            id: _id,
            type: "twc"
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
              // 刷新数据, this.page 当前页面
              this.searchPage(this.page);

            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) {
            console.log(error);
          });

        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      },

      findFilesByType(type) {
        let _type = type.label;
        this.type_label = _type;
        console.log("file type->" + _type);
        let url = requestPath() + "findFilesByType";
        console.log("request url->" + url);
        this.page = 1;
        this.pageTotal = 0;
        // request params
        let params = {
          type: _type,
          display: "",  // display 1/0 都查询.
          page: this.page,
          page_size: this.page_size
        };
        // get
        this.$axios.get(url,
          {
            params: params,
            // headers: {'signature': sign}
          }
        ).then(response => {
          if (response.data.result === "SUCCESS") {
            console.log("request success")
            this.attachments = response.data.attachments
            this.pageTotal = response.data.pageTotal;
            // this.page=response.data.page;
            console.log("attachments->" + this.attachments);
            console.log("pageTotal->" + this.pageTotal)
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch(function (error) { // 请求失败处理
          console.log(error);
        });

      },
      //分页请求file
      handleCurrentChange(currentPage) {
        this.page = currentPage;
        let _type = this.type_label;
        console.log('handleCurrentChange request');
        console.log("page" + this.page + " _type" + _type);

        // this.findFilesByType(this.type_label);
        let url = requestPath() + "findFilesByType";
        console.log("request url->" + url);
        // this.page =1;
        // request params
        let params = {
          type: _type,
          display: "",  // display 1/0 都查询.
          page: this.page,
          page_size: this.page_size
        };
        // get
        this.$axios.get(url,
          {
            params: params,
            // headers: {'signature': sign}
          }
        ).then(response => {
          if (response.data.result === "SUCCESS") {
            console.log("request success")
            this.attachments = response.data.attachments
            this.pageTotal = response.data.pageTotal;
            // this.page=response.data.page;
            console.log("attachments->" + this.attachments);
            console.log("pageTotal->" + this.pageTotal)
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch(function (error) { // 请求失败处理
          console.log(error);
        });

      },
      // del entry by id hir
      delHirEntry(_id) {
        console.log("id->" + _id);
        this.$confirm('This operation will permanently delete the file. Do you want to continue?', '', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {

          let url = requestPath() + "delEntry";
          console.log("url->" + url);
          let data = {
            id: _id,
            type: ""
          }
          // 判断hir 还是 hir temp
          if (this.type_name==='2'){
            data.type = 'hir';
          }else if (this.type_name==='3'){
            data.type = 'hir_temp';
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
              // flush
              this.searchPage(this.page);
            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) {
            console.log(error);
          });

        }).catch(() => {
          //取消
        });

      },

      // 批量修改 display 状态, 按照 file type 区别开
      updateALLDisplayStatus(change){
        // $confirm 提示框
        this.$confirm('Whether to modify the status of the display in batches ？', '', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          // 确认修改
          let display ;
          if (change) {
            display = 1;
          } else {
            display = 0;
          }
          let url = requestPath() + "updateAllFileDisplayStatus";
          console.log("url->" + url);
          let data = {
            display: display,
            type:this.type_label
          }

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
              // 刷新file 数据, 使用this.page 更好, 用户体验更加
              this.handleCurrentChange(this.page);

            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) {
            console.log(error);
          });

        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      },

      // 修改display 状态
      updateDisplayStatus(change, _id) {
        console.log("change->" + change);
        console.log("id->" + _id);
        let ds;
        if (change) {
          ds = 1;
        } else {
          ds = 0;
        }
        let url = requestPath() + "updateDisplayStatus";
        console.log("url->" + url);
        let data = {
          id: _id,
          display: ds,
        }
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
          } else {
            this.$message.error(response.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });

      },
    }
  }
</script>

<style scoped>
  .section-top {
    height: 140px;
    border-bottom-style: groove;
  }

  .section {
    width: 100%;
    height: 100%;
  }

  .section-top-info {
    text-align: left;
    padding: 20px;
    font-size: 18px;
    padding-top: 40px;
    padding-left: 45px;
  }

  .section-top-info2 {
    /*padding-left: 45px;*/
    /*padding-top: 16px;*/
    font-family: 'Arial Bold', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    text-align: left;
    width: 100%;
    /*height: 200px;*/
    /*padding-top: 10px;*/
  }

  .section-top-tag {
    margin-right: 0px;
  }

  .section-top-info2-tag {
    float: left;
    padding-left: 45px;

  }

  .section-top-tag {
    float: right;
    padding-right: 20px;
  }
  /*.v-modal{*/
  /*  z-index: 2005 !important;*/
  /*  }*/
  .el-tag {
    width: 150px;
    height: 32px;
    background: inherit;
    background-color: rgba(255, 223, 37, 1);
    text-align: center;
    color: #333333;
    font-family: 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
  }

  .el-button {
    background: inherit;
    background-color: #F59A23;
    color: #ffffff;
  }

  .section-main {
    width: 100%;
  }

  .el-tabs-p {
    padding-left: 42px;
    padding-top: 20px;
  }


</style>
