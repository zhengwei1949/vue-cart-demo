var vm = new Vue({
    el:'#app',
    data:{
        productList:[],
        totalMoney:0
    },
    filter:{

    },
    mounted:function(){
        this.cartView();
    },
    methods:{
        cartView:function(){
            // this.title = "Vue Hello"
            var that = this;
            this.$http.get('./data/cart.json').then(function(res){
                console.log(res);
                that.productList = res.data.result.list;
                this.totalMoney = res.data.result.totalHoney;
            })
        }
    }
})