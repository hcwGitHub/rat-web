import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//重复请求相同路由时的报错，不再提示
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const constantRouter = [

  // home
  {
    path: '/',
    name: 'ocLogin',
    component: () => import('@/views/views/ocLogin')
  },

  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/views/home')
  },

  //oc login
  {
    path: '/ocLogin',
    name: 'ocLogin',
    component: () => import('@/views/views/ocLogin')
  },
  // add file
  {
    path: '/addFile',
    name: 'addFile',
    component: () => import('@/views/views/addFile')
  },
  // view Hir detail
  {
    path: '/viewHirDetail',
    name: 'viewHirDetail',
    component: () => import('@/views/views/viewHirDetail')
  },
  // view Twc detail
  {
    path: '/viewTwcDetail',
    name: 'viewTwcDetail',
    component: () => import('@/views/views/viewTwcDetail')
  },
  // view Twc detail
  {
    path: '/viewContactDetail',
    name: 'viewContactDetail',
    component: () => import('@/views/views/viewContactDetail')
  },
  // edit Hir
  {
    path: '/editHir',
    name: 'editHir',
    component: () => import('@/views/views/editHir')
  },
  // edit Twc
  {
    path: '/editTwc',
    name: 'editTwc',
    component: () => import('@/views/views/editTwc')
  },
  // edit Contact Details
  {
    path: '/editContactDetails',
    name: 'editContactDetails',
    component: () => import('@/views/views/editContactDetails')
  },
  // add entry
  {
    path: '/addEntry',
    name: 'addEntry',
    component: () => import('@/views/views/addEntry')
  },
  // user Informative File table List
  {
    path: '/user_techDmenuSub',
    name: 'user_techDmenuSub',
    component: () => import('@/views/sub/user_techDmenuSub'),
  },

  {
    path: '/mobility_techDmenuSub',
    name: 'mobility_techDmenuSub',
    component: () => import('@/views/sub/mobility_techDmenuSub'),
  },

  // admin Informative File table List
  {
    path: '/techdSection',
    name: 'techdSection',
    component: () => import('@/views/views/techdSection'),
    redirect: '/techdSection/techDmenuSub',
    children: [
      {
        path: 'techDmenuSub',
        name: 'techDmenuSub',
        component: () => import('@/views/sub/techDmenuSub')
      },
      {
        path: 'addFile',
        name: 'addFile',
        component: () => import('@/views/views/addFile')
      },
      {
        path: 'viewTwcDetail',
        name: 'viewTwcDetail',
        component: () => import('@/views/views/viewTwcDetail')
      },
      {
        path: 'changePassword',
        name: 'changePassword',
        component: () => import('@/views/views/changePassword')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/views/profile')
      },{
        path: 'oc_addEntry',
        name: 'oc_addEntry',
        component: () => import('@/views/views/oc_addEntry')
      },/*{
        path: 'testPage',
        name: 'testPage',
        component: () => import('@/views/views/testPage')
      }*/
    ]
  },

  // view twc detail
  {
    path: '/techdSection2',
    name: 'techdSection2',
    component: () => import('@/views/views/techdSection'),
    redirect: '/techdSection2/viewTwcDetail',
    children: [
       // 查看view detail
      {
        path: 'viewTwcDetail',
        name: 'viewTwcDetail',
        component: () => import('@/views/views/viewTwcDetail')
      },
    ]
  },

  {
    path: '/techdSection3',
    name: 'techdSection3',
    component: () => import('@/views/views/techdSection'),
    redirect: '/techdSection3/viewHirDetail',
    children: [
      // 查看view detail
      {
        path: 'viewHirDetail',
        name: 'viewHirDetail',
        component: () => import('@/views/views/viewHirDetail')
      },
    ]
  },

  {
    path: '/techdSection4',
    name: 'techdSection4',
    component: () => import('@/views/views/techdSection'),
    redirect: '/techdSection4/viewContactDetail',
    children: [
      // 查看view detail
      {
        path: 'viewContactDetail',
        name: 'viewContactDetail',
        component: () => import('@/views/views/viewContactDetail')
      },
    ]
  },

  // edit twc
  {
    path: '/editTwc2',
    name: 'editTwc2',
    component: () => import('@/views/views/techdSection'),
    redirect: '/editTwc2/editTwc',
    children: [
      // 查看view detail
      {
        path: 'editTwc',
        name: 'editTwc',
        component: () => import('@/views/views/editTwc')
      },
    ]
  },

  {
    path: '/editHir2',
    name: 'editHir2',
    component: () => import('@/views/views/techdSection'),
    redirect: '/editHir2/editHir',
    children: [
      // 查看view detail
      {
        path: 'editHir',
        name: 'editHir',
        component: () => import('@/views/views/editHir')
      },
    ]
  },

  {
    path: '/editContactDetails2',
    name: 'editContactDetails2',
    component: () => import('@/views/views/techdSection'),
    redirect: '/editContactDetails2/editContactDetails',
    children: [
      // 查看view detail
      {
        path: 'editContactDetails',
        name: 'editContactDetails',
        component: () => import('@/views/views/editContactDetails')
      },
    ]
  },

  // changePassword
  {
    path: '/changePassword',
    name: 'changePassword',
    component: () => import('@/views/views/changePassword')
  },
  /**
   * 26/07/2021 新需求: 增加profile頁面, 顯示個人資料
   */
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/views/profile')
  },
  /**
   * 29/07/2021 新需求: oc的Project specific information選項, 也要有upload功能
   */
  {
    path: '/oc_addEntry',
    name: 'oc_addEntry',
    component: () => import('@/views/views/oc_addEntry')
  },

  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/404'),
  },
  {
    // 此处需特别注意置于最底部
    path: '*',
    redirect: '/404'
  }

]

export default new Router({
  routes: constantRouter
})
