<template>
  <div class="homepage">

    
      <router-view />
  
    <bottom></bottom>    
  </div>
</template>

<script>
import bottom from './bottom'
export default {
  name: 'homepage',
  data () {
    return {
     
    }
  },
  components:{bottom}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .homepage {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .bottom {
    position: fixed;
    bottom: 0;
  }
  .top {
    width: 100%;
    height:6.4rem;
   
    position: fixed;
    top: 0;
  }
  .contents {
    width: 100%;
    height: calc(100% - 11rem);
    background-color: #f6f6f6;
    margin-top: 6.4rem;
  }
</style>
