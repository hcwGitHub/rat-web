<template>
  <div id="notFound">
    <top-bar-login/>

    <div class="not-found-img">
      <img src="../../static/img/404.png" height="394" width="761"/>
    </div>

  </div>
</template>

<script>
    export default {
        name: "notFound"
    }
</script>

<style scoped>
  #notFound{
    height: 100%;
    background-color: #ffffff;
  }
  .not-found-img{
    text-align: center;
  }

</style>