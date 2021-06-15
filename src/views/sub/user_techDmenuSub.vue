<template>
  <div class="section">
    <!-- 头部信息 -->
    <div class="section-top">
<!--      <div class="section-top-info">-->
<!--          Home  /  TechD Section-->
<!--      </div>-->
      <div class="section-top-info2">

          <div class="section-top-info2-tag">Informative</div>
          <div class="section-top-tag">
            <el-input style="width: 265px;" v-model="input" placeholder="Search Box here"></el-input>
          </div>
      </div>
    </div>
    <!-- and entity button -->
    <div class="entry-button">
      <router-link to="/addEntry">
        <el-button>+Entry</el-button>
      </router-link>
    </div>

    <!-- 主体部分 -->
    <div class="section-main">
      <el-tabs class="el-tabs-p" type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Informative A" name="first">
          <!--内部选项卡-->

          <el-tabs  v-model="activeName2" @tab-click="handleClick">
            <el-tab-pane  :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
              <!-- 内部表格 tab -->
              <el-table
                :data="tableData"
                border="true"
                style="width: 100%">
                <el-table-column
                  prop="No"
                  label="No."
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="FileName"
                  label="File Name"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="CreatedDate"
                  label="Created Date">
                </el-table-column>
                <el-table-column
                  prop="Creator"
                  label="Creator">
                </el-table-column>
                <el-table-column
                  label=""
                  width="150">
                  <template slot-scope="scope">
                    <el-button @click="" type="text" size="small">View</el-button>
                    <el-button @click="" type="text" size="small">Download</el-button>
                  </template>
                </el-table-column>

              </el-table>
            </el-tab-pane>

          </el-tabs>

          <!--内部选项卡结束-->
        </el-tab-pane>

        <el-tab-pane label="Tech B" name="second">
          <!--内部选项卡-->

          <el-tabs  v-model="activeName3" @tab-click="handleClick">
            <el-tab-pane  :key="item.name" v-for="(item, index) in editableTabsB" :label="item.title" :name="item.name">
              <!-- 内部表格 tab -->
              <el-table v-if="item.name==='1'"
                :data="tableDataB"
                border="true"
                style="width: 100%">
                <el-table-column
                  prop="No"
                  label="No."
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="ID"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="Status"
                  label="Status"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="Project"
                  label="Project"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="NameofTWC"
                  label="Name of TWC"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="ProjectPM"
                  label="Project PM"
                  width="150">
                </el-table-column>

                <el-table-column
                  prop="ProjectSO"
                  label="Project SO"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="QualificationGranted"
                  label="Academic Qualification(Year Granted)" width="150">
                </el-table-column>
                <el-table-column
                  prop="Discipline"
                  label="Discipline"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="ProfessionQualification"
                  label="Profession Qualification"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="ExperienceAfterGraduation"
                  label="Experience After Graduation"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="email"
                  label="e-mail"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="PhoneNo"
                  label="Phone No."
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="Remarks"
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
                  width="150">
                  <template slot-scope="scope">
                    <router-link to="/viewHirDetail">
                      <el-button @click="" type="text" size="small">view</el-button>
                      <!--                    <el-button type="text" size="small">编辑</el-button>-->
                    </router-link>
                  </template>

                </el-table-column>
<!--                <el-table-column-->
<!--                  label="Action"-->
<!--                  fixed="right"-->
<!--                  width="150">-->
<!--                  <template slot-scope="scope">-->
<!--                    <router-link to="/viewTwcDetail">-->
<!--                      <el-button @click="" type="text" size="small">view</el-button>-->
<!--                      &lt;!&ndash;                    <el-button type="text" size="small">编辑</el-button>&ndash;&gt;-->
<!--                    </router-link>-->
<!--                  </template>-->

<!--                </el-table-column>-->


              </el-table>


              <!-- 内部表格 tab2 -->
              <el-table v-if="item.name==='2'"
                        :data="tableDataC"
                        border="true"
                        style="width: 100%">
                <el-table-column
                  prop="No"
                  label="No."
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="ID"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="Division"
                  label="Division"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="ProjectNo"
                  label="Project No."
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="ProjectName"
                  label="Project Name"
                  width="180">
                </el-table-column>
<!--                <el-table-column-->
<!--                  prop="PM"-->
<!--                  label="PM"-->
<!--                  width="150">-->
<!--                </el-table-column>-->

<!--                <el-table-column-->
<!--                  prop="SA"-->
<!--                  label="SA"-->
<!--                  width="150">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                  prop="Date of issue"-->
<!--                  label="Date of issue" width="150">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                  prop="Version"-->
<!--                  label="Version"-->
<!--                  width="150">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                  prop="Review Date"-->
<!--                  label="Review Date"-->
<!--                  width="150">-->
<!--                </el-table-column>-->
                <el-table-column
                  prop="Remarks"
                  label="Remarks"
                  width="180">
                </el-table-column>

<!--                <el-table-column-->
<!--                  prop="Action"-->
<!--                  label="Action"-->
<!--                  width="150">-->
<!--                </el-table-column>-->

                <el-table-column
                  label="Action"
                  width="180">
                  <template slot-scope="scope">
                    <router-link to="/viewHirDetail">
                      <el-button @click="" type="text" size="small">view</el-button>
                      <!--                    <el-button type="text" size="small">编辑</el-button>-->
                    </router-link>
                  </template>

                </el-table-column>
              </el-table>
            </el-tab-pane>

          </el-tabs>

          <!--内部选项卡结束-->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
      name: "techDmenuSub",

      data() {
        return {
          activeName: 'first',
          activeName2: 'second',
          activeName3: 'thrid',

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
          }
          ],
          tableData: [{
            No: '1',
            FileName: 'Document A.pdf',
            CreatedDate: '2021-01-27',
            Creator:'Chiu Shun Him',
            Dsiplay:'',
          }],
          tableDataB: [{
            No: '1',
            id:'TWC-001',
            Status: 'Pending',
            Project: '743 MTR11209',
            NameofTWC:'Chiu Shun Him',
            ProjectPM:'Alan Lam',
            ProjectSO:"Alan Lam",
            QualificationGranted:"BEng (Civil), MSc(GeoTech), 2005/2009",
            Discipline:"Civil/ Struct",
            ProfessionQualification:"MICE",
            ExperienceAfterGraduation:"13 Years",
            email:"chiu.shunhim@chunwo.com",
            PhoneNo:"60133167",
            Remarks:"",
            Action:"view"
          }],
          tableDataC:[{
            No:"1",
            id:"HIR-001",
            Division:"743 MTR11209",
            ProjectNo:"Tonkin Street",
            ProjectName:"Alan Lam",
            // sa:"Alan Lam",
            // EngineerBSE:"Alan Lam",
            // SO:"Alan Lam",
            // DateOfIssue:"Alan Lam",
            // Version:"",
            // ReviewDate:"",
            // Remarks:""
          }],

        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      }
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
  /*position: absolute;*/
}
/*.section-top-info{*/
/*  text-align: left;*/
/*  padding: 20px;*/
/*  font-size: 18px;*/
/*  padding-top: 40px;*/
/*  padding-left: 45px;*/
/*}*/
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
.el-tag{
  width: 180px;
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
  .el-button{
    background: inherit;
    background-color: #71b605;
    color: #ffffff;
    /*margin-right: 20px;*/
  }
  .section-main{
    width: 100%;
  }
  .el-tabs-p{
    padding-left: 42px;
    padding-top:20px;
  }
  .entry-button{
    text-align: right;
    /*padding-right: 20px;*/
    /*position: relative;*/
    /*top: 48px;*/
    /*left: 100px;*/
    /*right: -264px;*/
    z-index: 200;
  }
  .el-tabs-p{
    padding-left: 42px;
    padding-top:20px;
  }

</style>
