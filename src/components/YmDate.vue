  <template>
    <input type="text" class="layui-input" :id="dateId" @click="changeDate(dateId)" v-model="currentValue">
</template>
<script>
    export default {
        props:['value','default','type','range','dateFormat'],
        data(){
            return {
                dateId:'laydate_'+Date.now(),
                currentValue: this.value
            }
        },
        methods:{
            changeDate(dateId){
                let self=this;
                layui.laydate.render({
                    elem:document.getElementById(dateId),
                    type: self.type||'date',
                    range: self.range||false,
                    vale: self.default|| new Date(),
                    format: self.dateFormat||'yyyy-MM-dd',
                    choose: function(dates){ //选择好日期的回调
                        self.currentValue=dates;
                    }
                })
            }
        },
        watch: {
            value(val) {
                // console.log('value：'+val)
                this.currentValue = val;
            },
            currentValue(val) {
                // console.log('currentValue：'+val)
                this.$emit('input', val);
            }
        }
    }
</script>
