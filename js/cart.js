//开始享受写代码的旅程吧~~
var vm = new Vue({
    el:'#app',
    data:{
        totalMoney:0,
        productList:[]
    },
    filters:{
        formatMoney:function(v){
            return '￥'+v.toFixed(2);
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            vm.cartView();
        })
    },
    methods:{
        cartView:function(){
            var that = this;
            this.$http.get('data/cart.json').then(function(res){
                // console.log(res);
                that.totalMoney = res.data.result.totalMoney;
                that.productList = res.data.result.list;
            })
        },
        changeMoney:function(item,status){
            if(status === 1){
                item.count++;
            }else{
                item.count--;
            }
        },
        selectProduct:function(item){
            if(!item.checked){
                Vue.set(item, 'checked', true);
            }else{
                Vue.set(item, 'checked', false);
            }
        }
    }
})

Vue.filter('money',function(v,status){
    return '￥'+v.toFixed(2) + status;
})