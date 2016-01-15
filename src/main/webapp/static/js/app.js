Vue.use(VueRouter);
//Vue.config.debug = true;

Vue.http.options.emulateJSON = true;

var Home = Vue.extend({
    template:'#tableTemplate',
    data:function(){
        this.$http.get("/movie.json").then(function(response){
            this.$set('movies',response.data);
        }).catch(function(){
            alert("获取服务器端数据错误");
        });
        return {
            movies:[]
        };
    }
});

var ViewMovie = Vue.extend({
    template:"#movieTemplate",
    data:function(){
        this.$http.get("/movie/"+this.$route.params.movieId+".json").then(function(response){
            this.$set('movie',response.data);
        }).catch(function(){
            alert("获取服务器数据错误");
        });
        return {
            movie:{}
        };
    },
    methods:{
        remove:function(movie){
            if(confirm("确定要删除该影片吗")) {
                this.$http.delete("/movie/"+movie.id).then(function(response){
                    if(response.data == "success") {
                        router.replace({path:'/'});
                    }
                }).catch(function(ex){
                    alert("删除数据错误:" + ex);
                });
            }
        },
        edit:function(movie){
            router.go({name:'editMovie',params:{"movieId":movie.id}});
        }
    }
});

var NewMovie = Vue.extend({
    template:"#newTemplate",
    data:function(){
        return {
            movie:{}
        };
    },
    methods:{
        save:function(){
            this.$http.post("/movie/new",this.movie).then(function(response){
                if(response.data) {
                    router.replace({name:'movieView',params:{movieId:response.data.id}});
                }
            }).catch(function(ex){
                alert("数据保存错误" + ex);
            });
        }
    }
});
var EditMovie = Vue.extend({
    template:"#editTemplate",
    data:function(){
        this.$http.get("/movie/"+this.$route.params.movieId+".json").then(function(response){
            this.$set("movie",response.data);
        }).catch(function(ex){
            alert("获取数据异常：" + ex);
        });
        return {
            movie:{}
        };
    },
    methods:{
        save:function(){
            this.$http.post("/movie/edit",this.movie).then(function(response){
                if(response.data == "success") {
                    router.replace({name:'movieView',params:{movieId:this.movie.id}});
                }
            }).catch(function(ex){
                alert("保存数据异常：" + ex);
            });
        }
    }
});



var App = Vue.extend({});
var router = new VueRouter();
router.map({
    '/':{
        component:Home
    },
    '/movie/:movieId':{
        name:'movieView',
        component:ViewMovie
    },
    '/new':{
        component:NewMovie
    },
    '/edit/:movieId':{
        name:"editMovie",
        component:EditMovie
    }
});
router.start(App, '#app');
