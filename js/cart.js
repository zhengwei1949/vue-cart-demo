//开始享受写代码的旅程吧~~
var vm = new Vue({
    el:'#app',
    data:{
        productList:[],
        checkAll:false
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
                that.productList = res.data.result.list;
            })
        },
        changeMoney:function(item,status){
            if(status === 1){
                item.count++;
            }else{
                if(item.count === 0)return;
                item.count--;
            }
        },
        selectProduct:function(item){
            if(!item.checked){
                console.log(1);
                Vue.set(item, 'checked', true);
            }else{
                console.log(item.checked)
                item.checked = !item.checked;
            }
            if(this.productList.filter(function(item){return item.checked}).length < this.productList.length){
                this.checkAll = false;
            }else{
                this.checkAll = true;
            }
        },
        checkAllFn:function(flag){
            this.checkAll = !this.checkAll;
            var that = this;
            this.productList = this.productList.map(function(item){
                if(!item.checked){
                    Vue.set(item,'checked',true);
                }else{
                    item.checked = that.checkAll;
                }
                return item;
            })
        }
    },
    computed:{
        totalMoney:function(){
            var sum = 0;
            for(var i=0;i<this.productList.length;i++){
                sum += this.productList[i].count * this.productList[i].price;
            }
            return sum;
        }
    }
})

Vue.filter('money',function(v,status){
    return '￥'+v.toFixed(2) + status;
})