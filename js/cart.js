//开始享受写代码的旅程吧~~
var vm = new Vue({
    el:'#app',
    data:{

    },
    filters:{

    },
    mounted:function(){
        this.cartView();
    },
    methods:{
        cartView:function(){
            var that = this;
            this.$http.get('data/cart.json').then(function(res){
                console.log(res);
            })
        }
    }
})