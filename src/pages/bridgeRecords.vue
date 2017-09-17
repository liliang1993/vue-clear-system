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
                  <ym-date v-model="model.startDate"></ym-date>
                </div>
                <div class="layui-form-mid">-</div>
                 <div class="layui-input-inline" style="width: 100px;">
                  <ym-date v-model="model.endDate"></ym-date>
                </div>
              </div>
              <div class="layui-inline">
                <label class="layui-form-label">Logins</label>
                <div class="layui-input-inline" style="width: 120px;">
                  <ym-select v-model="model.LoginSelectValue" :options="loginSelectOptions"></ym-select>
                </div>
              </div>
              <a class="layui-btn layui-btn-small" @click="serchBridgeRecords">
                <i class="layui-icon"></i> Search
            </a>
            </div>
        <fieldset class="layui-elem-field">
            <legend>{{pageTitle}}列表</legend>
            <div class="layui-field-box">
                <ym-table  :config='config'>
                </ym-table>
                 <!-- <table id="table" class="ym-table table-hover"></table> -->
                <ym-pager :page-index="pageIndex" totalPage="totalPage" groups="15"></ym-pager>
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
                    LoginSelectValue:0,
                    startDate:'',
                    endDate:''
                },
                pageIndex:1,
                totalPage:0,
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
            this.model.startDate =  this.set_format_time(new Date());
            this.model.endDate = this.set_format_time(new Date(new Date().getTime()+24*60*60*1000));
            this.loadLogins();
        },
        watch:{
            '$route':'loadData'
        },
        methods:{

          loadLogins(){
              console.log(commonApi);
              commonApi.getLogins().then((res)=>{
                  console.log('res',res);
                  var login_dict = JSON.parse(res.message);
                  this.$set(this.model,'LoginSelectValue',login_dict[0]);
                  for(var item of login_dict){
                    this.loginSelectOptions.push({
                      Text:item,
                      Value:item
                    })
                  }
                  this.loadTable();
                   console.log('login', this.model.LoginSelectValue,this.loginSelectOptions);
              }).catch((err)=>{
                  console.log('err',err);
              });
              // this.$axios.get.call(this,'/logins',(data)=>{
              //     console.log(data);
              // })
          },
          set_format_time(date){
                var year = date.getFullYear();
                var month =date.getMonth() + 1;
                if(month< 10){
                  month = "0"+month;
                }
                var day = date.getDate();
                if(day< 10){
                  day = "0"+day;
                }
                return year+"-"+month+"-"+day;
            },
            get_ajax_date(date){
                var reg = new RegExp("-","g");
                var res= date.replace(reg,'');
                console.log('res1',res);
                return res;
            },
            loadTable(){
              console.log('date',this.model.startDate,this.get_ajax_date(this.model.startDate));

                var params = {
                  login:this.model.LoginSelectValue,
                  from: this.get_ajax_date(this.model.startDate),
                  to: this.get_ajax_date(this.model.endDate),
                  cur_page:this.pageIndex
                };
                commonApi.getBridgeRecords(params).then((res)=>{

                    var data = JSON.parse(res.message);
                    console.log('data',data,data.rows);
                    this.totalPage = data.total;
                    this.renderTable(data.rows);
                })
            },
            renderTable(data){
                      var elem = '#bridgeRecordTable';
                      var data = data;
                      console.log('data1',data);
                      var cols=[[
                        {field: 'order_id', title: 'Order ID', width: 150},
                        {field: 'trade_id', title: 'Trade ID', width: 150},
                        {field: 'lp_order', title: 'LP Order', width: 150},
                        {field: 'symbol', title: 'Sysmbol', width: 150},
                        {field: 'side', title: 'Side', width: 150},
                        {field: 'exec_size', title: 'exec Size', width: 150},
                        {field: 'exec_price', title: 'Exec Size', width: 150},
                        {field: 'lp_price', title: 'LP Price', width: 150},
                        {field: 'lp_size', title: 'LP Size', width: 150},
                        {field: 'lp', title: 'LP', width: 150},
                        {field: 'time', title: 'Time', width: 100},
                      ]];
                this.$set(this.config,'elem',elem)
                this.$set(this.config,'cols',cols);
                this.$set(this.config,'data',data);
                console.log('config',this.config);
            },
            // loadData(page){
            //     this.artType=this.$route.params.type
            //     this.pageTitle=this.$route.query.title||'列表页'
            //     this.pageIndex=page>0?page:1;
            //     console.log(`加载${this.$route.fullPath}第${this.pageIndex}页数据`)
            // },
            getIndex(index,pageIndex,pageSize){
                return (pageIndex-1)*pageSize+(index+1)
            },
            serchBridgeRecords(){
                  this.loadTable();
            }
            // openEditLayer(){
            //     layer.open({
            //         type:2,
            //         shade:0,
            //         maxmin:true,
            //         area:['600px','550px'],
            //         title:'添加'+this.pageTitle,
            //         content:'#/admin/article/'+this.artType+'/edit/add?title=文章&readyShowContent=true'
            //     })
            // }
        }
    }
</script>
