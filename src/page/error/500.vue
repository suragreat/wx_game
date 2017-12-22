<template>
  <div >
    <div>
      <span >500</span>
      <img :src="img_500" alt="500">
      <br/>
      <router-link :to="{name:'Index'}"><div>抱歉，发生点小意外<br/>回首页看看</div></router-link>
    </div>
  </div>
</template>

<script>
  import img_500 from '@/assets/image/error-500.png'

  export default {
    data() {
      return {
        img_500
      }
    }
  }
</script>

<style scoped>
div {
  display: block;
  text-align: center;
  color: #32cd32;
  font: 1em "Microsoft YaHei", sans-serif;
  text-shadow: 0 8px 9px #c4b59d, 0px -2px 1px #fff;
}

span {
  display: block;
  text-align: center;
  color: #F5F5F5;
  font: 92px "Arial Rounded MT Bold", "Helvetica Rounded", "Microsoft YaHei", sans-serif;
  text-shadow: 0 8px 9px #c4b59d, 0px -2px 1px #fff;
  border-radius: 20px;
  font-weight: bold;
  letter-spacing: -4px;
  padding: 0px 10px;
}
</style>
