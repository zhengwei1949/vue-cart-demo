var vm = new Vue({
    el:'#app',
    data:{
        productList:[],
        all:false,
        confirmDelete:false,
        deleteIndex:-1
    },
    created:function(){
        // console.log(111);
        var that = this;
        this.$http.get('../data/cart.json').then(function(res){
            // console.log(res);
            if(res.status === 200 && res.data.status === 0){
                // console.log(1)\
                that.productList = res.data.result.list;
            }
        })
    },
    methods:{
        editCount:function(item,flag){
            // console.log(item,flag);
            if(flag === 1){
                item.count++;
            }else{
                if(item.count===0)return;
                item.count--;
            }
        },
        confirmDeleteItem:function(index){
            this.deleteIndex = index;
            this.confirmDelete = true;
        },
        toggleCheck:function(item){
            if(!item.check){
                Vue.set(item,'check',true);
            }else{
                item.check = !item.check;
            }
        },
        toggleCheckAll:function(){
            this.all = !this.all;
            var that = this;
            this.productList = this.productList.map(function(item){
                if (!item.check) {
                    Vue.set(item, 'check', true);
                } else {
                    item.check = that.all;
                }
                return item;
            })
        },
        cancelConfirm:function(){
            this.confirmDelete = false;
        },
        deleteItem:function(){
            this.productList.splice(this.deleteIndex, 1);
            this.confirmDelete = false;
        }
    },
    computed:{
        totalMoney:function(){
            var sum = 0;
            for(var i=0;i<this.productList.length;i++){
                if(this.productList[i].check === true){
                    sum += this.productList[i].price * this.productList[i].count;
                }
            }
            return sum;
        },
        checkAll:function(){
            var temp = this.productList.filter(function(item){
                return item.check === true;
            }).length === this.productList.length;
            this.all = temp;
            return temp;
        }
    },
    filters:{
        filterMoney:function(v){
            return '￥'+v;
        }
    }
});

Vue.filter('moneyFormat',function(v,end){
    console.log(v)
    return v.toFixed(2) + end;
});