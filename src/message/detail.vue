<template>
    <view class="text-info-wrapper">
        <u-navbar :title="title"></u-navbar>
        <u-parse class="text-content" :html="articleInfo.articleContent || articleInfo.infoContent"></u-parse>
    </view>
</template>
<script>
export default {
    data() {
        return {
            id:'',
            articleInfo:{},
            queryFn:'API_qryOaArticleById',
            title:''
        }
    },
    onLoad({api,id}){
        if(api){
            this.queryFn = api;
        }
        if(id){
            this.id = id;
            this.qryOaArticleById();
        }
    },
    methods: {
        qryOaArticleById(){
            this[this.queryFn].call(this,this.id).then(d=>{
                console.log(d);
                this.articleInfo = d;
                this.title = d.articleTitle || d.infoName;
                if(d.fileIds && d.fileIds.length>0){
                    this.getFileInfo(d.fileIds);
                }
            });
        },
        getFileInfo(id){
            this.API_getFileInfo(id).then(d=>{
                this.$set(this.articleInfo,'fileName',d.origFileName);
            })
        },
    }
}
</script>
<style lang="scss">
    .text-info-wrapper{
        width: 100%;
        display: flex;
        flex-direction: column;
        .text-content{
            width: 100%;padding: 30rpx;
        }
    }
</style>