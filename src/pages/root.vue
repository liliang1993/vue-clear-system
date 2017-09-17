<template>
    <div class="layui-layout layui-layout-admin" style='position:realtive'>
        <!-- <ym-loading :typeOne="showLoading"></ym-loading> -->
        <ym-header :menuType="2" :menuModel="siteMenus"></ym-header>
        <div class="layui-body layui-tab-content" style="bottom:0" :style="readyShowContent?'top:0;left:0;':'left:0'">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import YmHeader from '../components/YmHeader'
import YmLoading from '../components/YmLoading'
import YmLayer from '../components/YmLayer'
import siteMenus from '../config/siteMenus'
import config from '../config'
export default {
    components:{
        YmHeader,
        YmLoading,
        YmLayer
    },
    data (){
      return {
          siteMenus:[],
          showLoading:false,
          // showMsg:false,
          showMsgId:null,
      }
    },
    methods:{
        showMsg(){
            let self=this;
            if(this.showMsgId==null && screen.availWidth>1000){
            this.showMsgId= layer.open({
                        type:2,
                        shade:0,
                        skin:'layui-layer-molv',
                        anim: 4,
                        offset:'rb',
                        area: ['400px', '500px'],
                        title:'我是谁？',
                        content:'http://www.mxmsg.com/msg.html',
                        cancel:function(l){
                            self.showMsgId=null;
                            console.log(self.showMsgId)
                        }
                    })
            }
        }
    },
    created(){
      this.siteMenus=siteMenus;
    }
}
</script>
