<template>
  <!--   <table class="ym-table table-hover">
        <slot name="thead"></slot>
        <slot name="tbody"></slot>
    </table> -->
    <table :id="tableId" class="ym-table table-hover"></table>
</template>
<script>
    export default {
        props:{
          config:{
              type:Object,
              default (){
                  return {};
              }
          }
        },
        watch:{
            'config':{
                handler( val,oldVal){
                     console.log('123',val);
                      this.ccols = val.cols;
                      this.data = val.data;
                         // console.log
                       layui.table.render({
                             elem: '#'+this.tableId,
                             height: this.cheight,
                             cols: this.ccols,
                             // url:self.url,
                             // method:self.method,
                             // where:self.where,
                             // request:self. request,
                             // response:self.response,
                             data:this.data
                        });
                },
              deep:true
            }
        },
        data(){
            return {
                tableId:'tableId'+Date.now()+Math.floor(Math.random () * 1000),
                cheight:this.config.height||'auto',
                ccols:this.config.cols||[[{}]],
                url: this.config.url||'',
                method: this.config.method || 'get',
                where:this.config.where ||{},
                request:this.config.request||{},
                response:this.config.response||{},
                data: this.config.data ||[]
            }
        },
        mounted(){
            let self=this
            console.log
               layui.table.render({
                     elem: '#'+self.tableId,
                     height: self.cheight,
                     cols: self.ccols,
                     // url:self.url,
                     // method:self.method,
                     // where:self.where,
                     // request:self. request,
                     // response:self.response,
                     data:self.data
                });
        }
    }
</script>
<style>
    .ym-table {
        width: 100%;
        margin: 10px 0;
    }

    .ym-table thead {
        background-color: #f2f2f2;
    }

    .ym-table th,
    .ym-table td {
        text-align: left;
        padding: 10px 15px;
        min-height: 20px;
        line-height: 20px;
        border: 1px solid #ddd;
        font-size: 14px;
        font-weight: 400;
    }

    .ym-table th {
        border: 1px solid #e7e7e7;
        background-color: #F5F5F6;
        font-size: 15px;
        line-height: 20px;
        font-weight: bold;
        color: #676a6c
    }

    .ym-table tbody tr:nth-child(2n) {
        background-color: #f7f7f7;
    }

    .ym-table tbody tr:hover {
        background-color: #f7f7f7;
    }
</style>
