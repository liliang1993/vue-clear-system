<template>
    <div style="width:100%;height:100%;" class="layui-tab-brief">
        <ul class="layui-tab-title site-demo-title" style="margin-bottom:10px;">
            <li class="layui-this">Bridge Records</li>
        </ul>

            <div class="layui-form-item">
              <div class="layui-inline" >
                <div class="layui-input-inline" style="width: 120px;">
                   <ym-select v-model="model.SelectValue" :options="selectOptions"></ym-select>
                </div>
              </div>
              <div class="layui-inline">
                <label class="layui-form-label">Time Range</label>
                <div class="layui-input-inline" style="width: 100px;">
                  <ym-date v-model="model.InputDate"></ym-date>
                </div>
                <div class="layui-form-mid">-</div>
                 <div class="layui-input-inline" style="width: 100px;">
                  <ym-date v-model="model.InputDate"></ym-date>
                </div>
              </div>
              <div class="layui-inline">
                <label class="layui-form-label">Logins</label>
                <div class="layui-input-inline" style="width: 120px;">
                  <ymSelect v-model="model.LoginSelectValue" :options="loginSelectOptions"></ymSelect>
                </div>
              </div>
              <a class="layui-btn layui-btn-small" @click="openEditLayer">
                <i class="layui-icon"></i> Search
            </a>
            </div>
        <fieldset class="layui-elem-field">
            <legend>{{pageTitle}}列表</legend>
            <div class="layui-field-box">
                <ym-table :config='config'>
                </ym-table>
                <ym-pager :page-index="pageIndex" totalPage="3" groups="10" @pageHandler="loadData"></ym-pager>
            </div>
        </fieldset>
    </div>
</template>
<script>
    import YmPager from '../components/YmPager'
    import YmTable from '../components/YmTable'
    import YmSelect from '../components/YmSelect'
    import YmDate from '../components/YmDate'
    import config from '../config'
    import commonApi from '../api/commonApi'
    export default {
        components:{
            YmTable,
            YmPager,
            YmSelect,
            YmDate
        },
        data(){
            return {
                model:{
                    SelectValue:1,
                    LoginSelectValue:undefined
                },
                loginSelectOptions:[],
                selectOptions:[
                    {
                        Text:'Today',
                        Value:1
                    },
                    {
                        Text:'Yesterday',
                        Value:2
                    },{
                        Text:'Previous Week',
                        Value:3
                    },{
                        Text:'This Month',
                        Value:4
                    }
                ],
                config:{}
            }
        },
        created(){
            this.pageIndex=1;
            this.loadLogins();
        },
        watch:{
            '$route':'loadData'
        },
        methods:{
            loadLogins(){
                console.log(commonApi);
                commonApi.getLogins().then((res)=>{

                }).catch((err)=>{

                });
                // this.$axios.get.call(this,'/logins',(data)=>{
                //     console.log(data);
                // }).
            },
            loadData(page){
                this.artType=this.$route.params.type
                this.pageTitle=this.$route.query.title||'列表页'
                this.pageIndex=page>0?page:1;
                console.log(`加载${this.$route.fullPath}第${this.pageIndex}页数据`)
            },
            getIndex(index,pageIndex,pageSize){
                return (pageIndex-1)*pageSize+(index+1)
            },
            openEditLayer(){
                layer.open({
                    type:2,
                    shade:0,
                    maxmin:true,
                    area:['600px','550px'],
                    title:'添加'+this.pageTitle,
                    content:'#/admin/article/'+this.artType+'/edit/add?title=文章&readyShowContent=true'
                })
            }
        }
    }
</script>
