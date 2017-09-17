  <template>
    <input type="text" class="layui-input" :id="dateId"  v-model="currentValue">
</template>
<script>
    export default {
        props:['value',,'type','range','dateFormat'],
        data(){
            return {
                dateId:'laydate_'+Date.now(),
                currentValue: this.value
            }
        },
        mounted(){
              let self=this;
             layui.laydate.render({
                      elem:document.getElementById(self.dateId),
                      type: self.type||'date',
                      range: self.range||false,
                      valve: self.currentValue|| new Date(),
                      format: self.dateFormat||'yyyy-MM-dd',
                      change: function(value, date, endDate){ //选择好日期的回调
                          self.currentValue=value;
                          console.log('current',self.currentValue);
                        }
                    })
        },
        watch: {
            value(val) {
                // console.log('value：'+val)
                this.currentValue = val;
            },
            currentValue(val) {
                console.log('currentValue：'+val)
                this.$emit('input', val);
            }
        }
    }
</script>
