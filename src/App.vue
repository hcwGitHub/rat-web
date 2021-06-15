<template>
  <div id="app">
    <!-- vue logo, 注释掉-->
    <!--    <img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  /* app 全局配置 */
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
    /* 全局修改app 样式*/
    height: 100%;

  }
  html,body{
    height: 100%;
  }
  body{
    font-size: 15px;
    margin: 0;
    color: #000000;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
  }
</style>
