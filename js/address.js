//开始享受写代码的旅程吧~~
var vm = new Vue({
    el:'.container',
    mounted:function(){
        var that = this;
        this.$nextTick(function(){
            that.getAddressList();
        })
    },
    data:{
        addressList:[],
        more:false,
        currentIndex:0
    },
    computed:{
        filterAddress:function(){
            if(this.more === false){//默认显示3条
                return this.addressList.slice(0, 3);
            }else{
                return this.addressList;
            }
        }
    },
    filter:{

    },
    methods:{
        getAddressList:function(){
            this.$http.get('data/address.json').then(function(res){
                var that = this;
                if(res.status === 200 && res.data.status == '0'){
                    that.addressList = res.data.result;
                    // console.log(that.addressList);
                }
            })
        },
        loadMore:function(){
            this.more = !this.more;
        },
        selectAddress:function(index){
            this.currentIndex = index;
        }
    }
})