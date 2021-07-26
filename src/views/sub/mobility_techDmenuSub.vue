<template>
  <div class="section">
    <!-- 头部信息 -->
    <div class="section-top">
      <!--      <div class="section-top-info">-->
      <!--          Home  /  TechD Section-->
      <!--      </div>-->
      <div class="section-top-info2">

        <div class="section-top-info2-tag">Informative (Project Team View)</div>
<!--        <div class="section-top-tag">-->
<!--          <el-input style="width: 265px;" v-model="input" placeholder="Search Box here"></el-input>-->
<!--        </div>-->
      </div>
    </div>
    <!-- and entity button -->
    <div  class="entry-button">
      <router-link :to="{name:'addEntry',query:{identifier:identifier}}">
        <el-button v-if = "this.select_lable==='Project Specific Information'">Upload</el-button>
      </router-link>
    </div>


    <!-- 主体部分 -->
    <div class="section-main">
      <el-tabs class="el-tabs-p" type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="General Information" name="first">
          <!--内部选项卡-->

          <el-tabs  v-model="activeName2" @tab-click="findFilesByType">
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
                  label=""
                  width="150">
                  <template slot-scope="scope">
<!--                    <el-button @click="" type="text" size="small">View</el-button>-->
                    <el-button @click="(change) => downloadFile(change, scope.row.file_name)" type="text" size="small">Download</el-button>
                    <!--隐藏mobility file 的 del 按钮-->
<!--                    <el-button type="text" size="small" @click="del(scope.row.id)">delete</el-button>-->
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

        <el-tab-pane label="Project Specific Information" name="second">
          <!--内部选项卡-->
          <!-- 通过条件过滤-->
          <div class="searchByDivision" style="text-align: left;padding-bottom: 8px">
            <span class="con">
                   <el-select  @change="searchPage(1)" v-model="division" placeholder="division">
                     <el-option  v-for="item in divisions" :label="item.content" :value="item.title"></el-option>
                   </el-select>
              <!-- {{this.rat_twc.division}} -->
            </span>

            <span class="con">
                   <el-select  @change="searchPage(1)" v-model="approve" placeholder="division">
                     <el-option  v-for="item in approves" :label="item.content" :value="item.title"></el-option>
                   </el-select>
              <!--{{this.rat_twc.division}}-->
            </span>

          </div>

          <el-tabs  v-model="activeName3" @tab-click="search">
            <el-tab-pane :key="item.name" v-for="(item, index) in tabs" :label="item.title" :name="item.name">
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
                  label="Phone No."
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
                          <router-link :to="{name:'viewTwcDetail',query:{id:scope.row.id,type:'mobility',identifier:identifier}}" >
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
<!--                           <router-link :to="{name:'editTwc2',query:{id:scope.row.id,type:'oc'}}">-->
<!--                               <el-button type="text" size="small">update</el-button>-->
<!--                          </router-link>-->
                       <router-link :to="{name:'editTwc',query:{id:scope.row.id,type:'mobility',identifier:identifier}}">
                           <el-button type="text" size="small">Update</el-button>
                       </router-link>
                    </span>
                  </template>

                </el-table-column>

              </el-table>

              <el-table v-if="item.name==='2' || item.name==='3'"
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

                    <router-link :to="{name:'viewHirDetail',query:{id:scope.row.id,type:'mobility',type_name:type_name,identifier:identifier}}" >
                      <el-button @click="" type="text" size="small">View</el-button>
                      <!--                    <el-button type="text" size="small">编辑</el-button>-->
                    </router-link>

                    <!-- delete -->
                    <span slot="footer" class="dialog-footer">
                     <el-button type="text" size="small" @click="delHirEntry(scope.row.id)">Delete</el-button>
                    </span>
                    <!-- update -->
                    <span slot="footer" class="dialog-footer">
                      <router-link :to="{name:'editHir',query:{id:scope.row.id,type:'mobility',type_name:type_name,identifier:identifier}}">
                            <el-button type="text" size="small">Update</el-button>
                       </router-link>
<!--                      <router-link :to="{name:'editHir2',query:{id:scope.row.id,type:'oc'}}">-->
<!--                        <el-button type="text" size="small">update</el-button>-->
<!--                      </router-link>-->
                    </span>
                    <span slot="footer" class="dialog-footer">
                      <!-- mobility 模块隐藏 approve 功能 -->
<!--                    <el-button @click="dialogVisible3 = true,hir_id = scope.row.id" type="text" size="small">Approve</el-button>-->

                       <el-dialog
                         title="prompt"
                         :visible.sync="dialogVisible3"
                         width="30%"
                         :modal-append-to-body='false'
                       >
                          <span>
                            <el-radio v-model="radio2" label="pending">pending</el-radio>
                            <el-radio v-model="radio2" label="approved">approved</el-radio>
                            <el-radio v-model="radio2" label="rejected">rejected</el-radio>
                          </span>
<!--                         <div v-if="this.radio2==='pending' || this.radio2==='rejected'">-->
<!--                            <el-input-->
<!--                              type="textarea"-->
<!--                              :rows="2"-->
<!--                              placeholder="remark"-->
<!--                              v-model="hir_remark">-->
<!--                            </el-input>-->
<!--                         </div>-->
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
  import {getCookie, requestPath} from '@/utils/util'

  export default {
      name: "techDmenuSub",
      mounted: function () {
        // console.log("log out");
        // // mobility 和 oc 是獨立的, 所以到了mobility , oc 應該退出登錄
        // // 删除cookie 信息, 這樣子就相當於退出登錄.
        // delCookie("isLogin");

        let _this = this;
         // 防止頁面跳轉之後, 不會調用window.addEventListener(), 造成tabs 沒有數據
        let role = window.localStorage.getItem("role");
        if (role === 'member'){
          // member ， 無法使用twc
          this.tabs = this.editableTabsB2;
        }else if (role === 'manger'){
          this.tabs = this.editableTabsB;
        }
        // end, 防止一下. 這裏必須使用.

        window.addEventListener('message', function(event){
          console.log(event.data)
          // if (event.data!==null && event.data!==''){
          //   _this.init(event);
          // }
          _this.init(event);
        });

        // 21/07/2021 修復郵件鏈接
        this.identifier = this.$route.query.identifier;
        console.log("identifier->" + this.identifier);

        /**
         * 23/07/2021 防止跳轉頁面, 沒有調用addEventListener(), 造成默認選項卡沒有數據
         * */
        let type = [{label:this.editableTabs[0].title}]
        this.findFilesByType(type[0])
        // let searchType = [{name: '1'}]
        this.search(this.editableTabsB[0]);

      },
      // 22/01/2021 新需求: twc_list, hir_list值發生改變時, 把approve裡的字段轉化成大寫開頭
      watch:{
        // 22/07/2021 新需求: Status字段, 大寫開頭
        twc_list:function () {
          this.$nextTick(function () {
            for (let i = 0; i < this.twc_list.length; i++) {
              this.twc_list[i].approve = this.firstToUpper(this.twc_list[i].approve);
            }
          })
        },
        hir_list:function () {
          this.$nextTick(function () {
            for (let i = 0; i < this.hir_list.length; i++) {
              this.hir_list[i].approve = this.firstToUpper(this.hir_list[i].approve);
            }
          })
        }
      },
      data() {
        return {
          // 21/07/2021 修復郵件鏈接
          identifier:'',
          user_role:'member', // 默认是 member 角色
          dialogVisible: false, // 删除file
          dialogVisible2: false, // approve
          dialogVisible3: false, // del entry
          hir_id:'',
          twc_id:'',
          // visibleLine:'',
          select_lable:'General Information', // 选项卡选择的模块
          activeName: 'first',
          // 22/07/2021 新需求: 默認選擇第一個選項 ; 之前:second
          activeName2: '1',
          activeName3: '1',
          type_label:'', // file 使用
          project_name:'',
          checked:true,
          checked_false:false,
          attachments: [], // attachments 附件信息
          type_name:'', // twc/entry 使用
          // 分页信息
          page:1,
          page_size:50,
          count:0,
          pageTotal:0,
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

          tabs:'',   // tabs 选项卡数据

          // editableTabsB 给 manger 客户使用
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

          // editableTabsB2 给 member 客户使用
          editableTabsB2: [ {
            title: 'HIR with proposed RAT meetings',
            name: '2',
            content: 'HIR with proposed RAT meetings'
          },{
            title: 'Temporary Works Submission Schedule',
            name: '3',
            content: 'Temporary Works Submission Schedule'
          }
          ],

          twc_list:[], // twc 数据
          hir_list:[],// hir list
          radio:'',
          radio2:'',


        };
      },
      methods: {
        // 22/07/2021 新需求: Status字段, 大寫開頭
        firstToUpper(str) {
          return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
        },

        init(event) {
          console.log("init()");
          // console.log("user_name ->" + event.data.user.name);
          // // // 保存用户信息
          window.localStorage.setItem("user_name", "oc_testing"); // testing 環境
          // window.localStorage.setItem("user_name", event.data.user.name); // pro or uat 環境
          // 查询 project information projects
          let url =  "https://dev.hkdwss.com/api/v3" + "/projects/" +  "kaifaceshi";  // testing
          // let url =  "https://dev.hkdwss.com/api/v3" + "/projects/" + event.data.project.identifier;  // testing
          // let url =  "https://mobility.chunwo.com/api/v3" + "/projects/" + event.data.project.identifier;  // live

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
            console.log("response.data->" + response.data.projectNo + ","+ response.data.division +","+response.data.name);
            // 保存project 数据.
            window.localStorage.setItem("projectNo", response.data.projectNo);
            window.localStorage.setItem("division",response.data.division);
            window.localStorage.setItem("name",response.data.name);

            /*
            * 22/07/2021 新需求: 默認選擇第一個選項
            * 23/07/2021 修復已知bug: 必須等init()完, 才加載以下代碼, 否則projectNo將會默認執行上一個保留的projectNo
            * */
            // let searchType = [{name: '1'}]
            this.search(this.editableTabsB[0]);

          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });

          // mobility 获取用户信息模块
          /**
           * roles": [
           -{
              "id": 16,
              "name": "RAT Coordinator",
              "position": 15,
              "assignable": false,
              "builtin": 0
            },
           -{
              "id": 17,
              "name": "RAT Member",
              "position": 16,
              "assignable": false,
              "builtin": 0
            }
           ],
           * */
          let url2 =  "https://dev.hkdwss.com/api/v3" + "/users/" +  "2";  // testing, 测试可以先写死 1/2/3 这样子...
          // let url2 =  "https://dev.hkdwss.com/api/v3" + "/users/" + event.data.user.id ;  // uat, 从event.data.user 对象中拿到id
          // let url2 =  "https://mobility.chunwo.com/api/v3" + "/users/" + event.data.user.id ;  // live

          console.log(" api/v3/user/{user_id} url->" + url2) ;

          this.$axios.get(url2,
            {
              // 帶 cookies 請求
              withCredentials: true,
            }
          ).then(response => {

            console.log("request success!!")
            console.log("response.data->" + response.data);
            console.log("response.data.email->" + response.data.email);
            //  user 数据.
            window.localStorage.setItem("mobility_user_info", response.data);
            window.localStorage.setItem("user_email", response.data.email);

            // 取出 roles[] , 判断 mobility 用户属于 Manger(RAT Coordinator) , 还是 member(RAT Member) 用户
            let roles = response.data.roles;
            console.log("roles(roles.length)-->" + roles + "("+ roles.length +")");
            let role = 'member'; // 普通用户
              for (var obj in roles) {
                let role_name =  roles[obj]['name'];
                if (role_name === 'RAT Coordinator' ){
                    role = 'manger' ; // 管理员用户
                }
              }
            //
            // //本地保存,
            console.log("role->" + role) ;
            // this.user_role = role;
            // console.log("user->" + user_role) ;
            window.localStorage.setItem("role",role);
            if (role === 'manger'){
              // 管理员可以查阅twc 和 操作twc 内容.
              this.tabs = this.editableTabsB ;
            }else if (role === 'member'){
              // 一般用户无法查阅twc 内容
              this.tabs = this.editableTabsB2 ;
            }

          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });


        },

        handleClick(tab, event) {
          console.log(tab, event);
          this.select_lable = tab.label;
        },
        // search twc/hir
        search(type){
          console.log("type->"+type.name)
          this.type_name = type.name; // 保存一下
          this.page = 1;
          this.pageTotal = 0;
          if (type.name==='1'){
            // search twc list
            let twc_url =  requestPath() + "searchTwc";
            console.log("request url->" + twc_url);
            // request params
            let params = {
              project_name:this.project_name,
              project_id:'',
              page:this.page,
              page_size:this.page_size
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
                console.log("twc_list->"+this.twc_list);
                console.log("pageTotal->" + this.pageTotal);
              } else {
                this.$message.error(response.data.msg);
              }
            }).catch(function (error) { // 请求失败处理
              console.log(error);
            });

          }else if (type.name === '2'){
            console.log("search hir")
            // search hir list
            let hir_url =  requestPath() + "searchHir";
            console.log("request url->" + hir_url);
            // request params
            let params = {
              // project_name:this.project_name,
              project_no:window.localStorage.getItem("projectNo"),
              page:this.page,
              page_size:this.page_size
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
                console.log("hir_list->"+this.hir_list);

              } else {
                this.$message.error(response.data.msg);
              }
            }).catch(function (error) { // 请求失败处理
              console.log(error);
            });
          }else if (type.name === '3'){
            // hir copy , hir temp
            console.log("search hir temp")
            // search hir list
            let hir_url =  requestPath() + "searchHirTemp";
            console.log("request url->" + hir_url);
            // request params
            let params = {
              // project_name:this.project_name,
              project_no:window.localStorage.getItem("projectNo"),
              page:this.page,
              page_size:this.page_size
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
                console.log("hir_list->"+this.hir_list);

              } else {
                this.$message.error(response.data.msg);
              }
            }).catch(function (error) { // 请求失败处理
              console.log(error);
            });
          }

        },

        // 分页查询
        searchPage(curPage){
          console.log("searchPage");
          console.log("type->"+ this.type_name);
          this.page = curPage; // 设置当前页
          if (this.type_name==='1'){
            // search twc list
            let twc_url =  requestPath() + "searchTwc";
            console.log("request url->" + twc_url);
            // request params

            let params = {
              project_name:this.project_name,
              project_id:'',
              division:this.division,
              approve:this.approve,
              page:this.page,
              page_size:this.page_size
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
                console.log("twc_list->"+this.twc_list);

              } else {
                this.$message.error(response.data.msg);
              }
            }).catch(function (error) { // 请求失败处理
              console.log(error);
            });
           // this.type_name === '2' || this.type_name === '3'  // 效果一样
          }else if (this.type_name === '2'){
            console.log("search hir")
            // search hir list
            let hir_url =  requestPath() + "searchHir";
            console.log("request url->" + hir_url);
            // request params
            // by project_no,division,page,page_size
            let params = {
              // project_name:this.project_name,
              project_no:window.localStorage.getItem("projectNo"),
              division:this.division,
              approve:this.approve,
              page:this.page,
              page_size:this.page_size
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
                console.log("hir_list->"+this.hir_list);

              } else {
                this.$message.error(response.data.msg);
              }
            }).catch(function (error) { // 请求失败处理
              console.log(error);
            });
          }else if (this.type_name === '3'){
            console.log("search hir temp")
            // search hir list
            let hir_url =  requestPath() + "searchHirTemp";
            console.log("request url->" + hir_url);
            // request params
            // by project_no,division,page,page_size
            let params = {
              // project_name:this.project_name,
              project_no:window.localStorage.getItem("projectNo"),
              division:this.division,
              approve:this.approve,
              page:this.page,
              page_size:this.page_size
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
                console.log("hir_list->"+this.hir_list);

              } else {
                this.$message.error(response.data.msg);
              }
            }).catch(function (error) { // 请求失败处理
              console.log(error);
            });
          }

        },

        // del文件
        del(id) {

          this.$confirm('This operation will permanently delete the file. Do you want to continue?', 'prompt', {
            confirmButtonText: 'determine',
            cancelButtonText: 'cancel',
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
                // this.findFilesByType(this._type);
                this.handleCurrentChange(1);
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

        findFilesByType(type){
          let _type = type.label;
          this.type_label = _type;
          console.log("file type->" + _type );
          let url = requestPath() + "findFilesByType";
          console.log("request url->" + url);
          this.page =1;
          this.pageTotal = 0;
          // request params
          let params = {
            type:_type,
            display:1,  // display 1/0 都查询.
            page:this.page,
            page_size:this.page_size
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
              console.log("attachments->"+this.attachments);
              console.log("pageTotal->"+this.pageTotal)
            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });

        },
        //分页请求file
        handleCurrentChange(currentPage){
          this.page = currentPage;
          let _type = this.type_label;
          console.log('handleCurrentChange request');
          console.log("page"+this.page+" _type"+ _type);

          // this.findFilesByType(this.type_label);
          let url = requestPath() + "findFilesByType";
          console.log("request url->" + url);
          // this.page =1;
          // request params
          let params = {
            type:_type,
            display:1,  // display 1/0 都查询.
            page:this.page,
            page_size:this.page_size
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
              console.log("attachments->"+this.attachments);
              console.log("pageTotal->"+this.pageTotal)
            } else {
              this.$message.error(response.data.msg);
            }
          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });

        },
        // 修改display 状态
        updateDisplayStatus(change,_id){
          console.log("change->"+change);
          console.log("id->"+ _id);
          let ds;
          if (change){
            ds = 1;
          }else{
            ds = 0;
          }
          let url = requestPath() + "updateDisplayStatus";
          console.log("url->"+url);
          let data={
            id: _id,
            display:ds,
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
        // 在线预览附件
        viewFile(value,file_name){
          //1、 word、ppt、excel
          // 2、pdf 文件
          let fileName = file_name;
          console.log("file_name->"+fileName);
          let url = requestPath() + "download?attribute=1&fileName="+fileName;
          if (!/.(pdf|PDF)$/.test(fileName)){
            // ppt,excel etc
            window.open( 'https://view.officeapps.live.com/op/view.aspx?src='+ url,"_blank");
            return false;
          }else {
            // pdf

          }

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
        // hir
        updateHirApprove() {
          console.log("upadte entry status");
          console.log("_id->"+this.hir_id +" this.radio2->"+this.radio2);
          this.dialogVisible3 = false; // 关闭信息提示框

          let url = requestPath() + "editHirEntryApprove";
          console.log("url->" + url);
          let data = {
            id: this.hir_id,
            approve: this.radio2,
            creator: window.localStorage.getItem("user_name"), // creator 未知
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
            creator: window.localStorage.getItem("user_name"), // creator 未知
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
        // 下载文件
        downloadFile(value,file_name){
          let fileName = file_name;
          console.log("file_name->"+fileName);
          let url = requestPath() + "download?attribute=1&fileName="+fileName;
          console.log("url->"+url);
          window.location.href = url; // 通过url 本地下载文件

        },


      },

    }
</script>

<style scoped>
  .section-top{
    /*height: 48px;*/
    padding-top: 30px;
    /*border-bottom-style: groove;*/
  }
.section{
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
  /*height: 200px;*/
  /*padding-top: 10px;*/
}
.section-top-tag{
  margin-right: 0px;
}
.section-top-info2-tag{
  float: left;
  padding-left: 45px;

}
.section-top-tag{
  float: right;
  padding-right: 20px;
}
  .entry-button{
    text-align: right;
    padding-right: 20px;
    width: calc(100% - 20px);
    height: 45px;
    /*position: relative;*/
    /*top: 48px;*/
    /*left: 100px;*/
    /*right: -264px;*/
    /*z-index: 200;*/
  }
.el-tag{
  width: 150px;
  height: 32px;
  background: inherit;
  background-color: #71b605;
  text-align: center;
  color: #333333;
  font-family: 'Arial', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
}
  .el-button{
    background: inherit;
    background-color: #71b605;
    color: #ffffff;
  }
  .section-main{
    width: 100%;
  }
  .el-tabs-p{
    padding-left: 42px;
    padding-top:20px;
  }


</style>
