<template>
	<view class="index-wrapper">
		<u-navbar :is-back="false" title="首页">
            <view class="right-icon-wrapper" slot="right">
                <u-icon name="plus" size="36" @tap="showRightMenu"></u-icon>
                <view class="right-menu-list" :class="rightMenuShow?'show':''">
                    <view class="menu-item" @tap="devIng">
                        <text class="icon">&#xe606;</text>
                        扫一扫
                    </view>
                    <view class="menu-item" @tap="devIng">
                        <text class="icon">&#xe6fd;</text>
                        新建群聊
                    </view>
                </view>
            </view>
        </u-navbar>
        <view class="search-bar">
            <u-search placeholder="搜索内容" v-model="keyword" :clearabled="false" :disabled="true" @click="search" @custom="devIng"></u-search>
        </view>
        <u-sticky @fixed="fixed = true" @unfixed="fixed = false">
            <view class="main-tab-wrapper" :class="fixed?'fixed':''">
                <view class="tab-item" @tap="goNotice">
                    <text class="icon">&#xe747;</text>
                    通知
                </view>
                <view class="tab-item" @tap="toDeail('1')">
                    <text class="icon">&#xe61b;</text>
                    待办
                </view>
                <view class="tab-item" @tap="toDeail('2')">
                    <text class="icon">&#xe63c;</text>
                    跟踪
                </view>
            </view>
        </u-sticky>
        <view class="message-list">
            <view class="list-item u-border-bottom" v-for="(item,i) of list" :key="i" @tap="goDetail(item)">
                <image class="item-img" :src="item.icon"></image>
                <view class="item-content">
                    <view class="title-wrapper">
                        <view class="title">
                            {{item.title}}
                        </view>
                        <text class="date-time u-light-color">
                            {{listDate(item.key)}}
                        </text>
                    </view>
                    <view class="sub-title u-tips-color">
                        {{listTitle(item.key)}}
                    </view>
                </view>
            </view>
        </view>
	</view>
</template>

<script>
import {
    mapMutations
} from 'vuex';
	export default {
		data() {
			return {
                keyword:'',
                list:[
                    {
                        title:'政策法规',
                        icon: require('@/static/laws.png'),
                        key:'laws'
                    },
                    {
                        title:'内部刊物',
                        icon: require('@/static/journal.png'),
                        key:'journal'
                    },
                    {
                        title:'宣传教育',
                        icon: require('@/static/gm.png'),
                        key:'gm'
                    },
                    {
                        title:'科技成果宣传',
                        icon: require('@/static/tech-pub.png'),
                        key:'tech'
                    },
                    {
                        title:'资料管理',
                        icon: require('@/static/data.png'),
                        key:'data'
                    },
                    {
                        title:'新闻',
                        icon: require('@/static/news.png'),
                        key:'news'
                    },
                ],
                fixed:false,
                articleList:{},
                params:{
                    laws:{
                        articleCategory: 2,
                        showType: 1,
                    },
                    journal:{
                        articleCategory: 3,
                        showType:1
                    },
                    data:{
                        articleCategory: 4,
                        showType:1
                    },
                    news:{
                        articleCategory: 5,
                        showType:1
                    },
                    gm:{
                        infoType:'10,20,30,40,50',
                    },
                    tech:{
                        infoType:'60',
                    }
                },
                rightMenuShow:false
			}
		},
		onLoad() {
            this.init();
        },
        onPullDownRefresh() {
            this.init();
        },
		methods: {
            ...mapMutations(['setMessageData','devIng']),
            init(){
                uni.showLoading();
                // Promise.all([this.qryOaArticleListByCon(),this.qryGmPublishInfoListByCon()]).then(d=>{
                Promise.all([this.qryOaArticleListByCon()]).then(d=>{
                    this.setMessageData(this.articleList);
                    setTimeout(() => {
                        uni.hideLoading();
                        uni.stopPullDownRefresh();
                    }, 500);
                }).catch(e=>{
                    uni.hideLoading();
                    uni.stopPullDownRefresh();
                });
            },
            qryOaArticleListByCon() {
                let laws = this.API_qryOaArticleListByCon({
                    currPage: 1,
                    pageSize: 10,
                    ...this.params.laws
                }).then(d => {
                    this.$set(this.articleList,'laws',d.page.list);
                }),
                journal = this.API_qryOaArticleListByCon({
                    currPage: 1,
                    pageSize: 10,
                    ...this.params.journal
                }).then(d => {
                    this.$set(this.articleList,'journal',d.page.list);
                }),
                dataFile = this.API_qryOaArticleListByCon({
                    currPage: 1,
                    pageSize: 10,
                    ...this.params.data
                }).then(d => {
                    this.$set(this.articleList,'data',d.page.list);
                }),
                news = this.API_qryOaArticleListByCon({
                    currPage: 1,
                    pageSize: 10,
                    ...this.params.news
                }).then(d => {
                    this.$set(this.articleList,'news',d.page.list);
                });
                return Promise.all([laws,journal,dataFile,news]);
            },
            qryGmPublishInfoListByCon() {
                let gm = this.API_qryGmPublishInfoListByCon({
                    ...this.params.gm,
                    currPage: 1,
                    pageSize: 10
                }).then(d => {
                    this.$set(this.articleList,'gm',d.page.list);
                }),
                tech = this.API_qryGmPublishInfoListByCon({
                    ...this.params.tech,
                    currPage: 1,
                    pageSize: 10
                }).then(d => {
                    this.$set(this.articleList,'tech',d.page.list);
                });
                return Promise.all([gm,tech]);
            },
            listDate(key){
                let date = this.articleList[key]?this.articleList[key][0].updateDate:'';
                if(date){
                    return this.$dayjs().format('MM-DD HH:mm');
                }else{
                    return '';
                }
            },
            listTitle(key){
                let item = this.articleList[key]?this.articleList[key][0]:'';
                if(item){
                    return item.articleTitle || item.infoName;
                }else{
                    return '';
                }
            },
            goDetail({key,title}){
                let fn = 'API_qryOaArticleListByCon';
                if(key == 'gm' || key == 'tech'){
                    fn = 'API_qryGmPublishInfoListByCon';
                };
                uni.navigateTo({
                    url:`/message/list?key=${key}&fn=${fn}&title=${encodeURIComponent(title)}&param=${encodeURIComponent(JSON.stringify(this.params[key]))}`
                });
            },
            toDeail(type) {
                let url = String(type) == '1' ? '/public-affiars/becoming' : '/public-affiars/following';
                uni.navigateTo({url:url});
            },
            goNotice(){
                uni.navigateTo({
                    url:'/notice/list'
                });
            },
            showRightMenu(){
                this.rightMenuShow = !this.rightMenuShow;
            },
            search(){
                uni.navigateTo({
                    url:'/pages/search'
                });
            }
		}
	}
</script>

<style lang="scss">
	.index-wrapper{
        width: 100%;display: flex;flex-direction: column;
        .right-icon-wrapper{
            padding-right: 30rpx;
            position: relative;
            .right-menu-list{
                width: 200rpx;position: absolute;
                display: flex;flex-direction: column;background-color: #fff;
                right:30rpx;
                z-index: 999;
                box-shadow: $bar-shadow;
                @extend .transition-02;
                overflow: hidden;
                transform: scale(0,0);
                transform-origin: 100% 0;
                .menu-item{
                    width: 100%;height: 72rpx;display: flex;align-items: center;padding:0 20rpx;
                    .icon{
                        font-size: 48rpx;
                    }
                }
                &.show{
                    transform: scale(1,1);
                }
            }
        }
        .search-bar{
            padding: 20rpx 30rpx;
        }
        .main-tab-wrapper{
            height: 80rpx;display: flex;background-color: #fff;@extend .transition-35;
            .tab-item{
                width: calc(100% / 3);display: flex;align-items: center;justify-content: center;
                font-size: 32rpx;
                .icon{
                    font-size: 48rpx;margin-right: 20rpx;color: $uni-color-primary;
                }
            }
            &.fixed{
                box-shadow: $bar-shadow;
            }
        }
        .message-list{
            width: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            .list-item{
                display: flex;width: 100%;padding: 20rpx 30rpx;justify-content: space-between;
                .item-img{
                    height: 90rpx;width: 90rpx;border-radius: 50%;
                }
                .item-content{
                    display: flex;width: calc(100% - 110rpx);flex-direction: column;justify-content: space-between;
                    .title-wrapper{
                        display: flex;justify-content: space-between;
                        .title{
                            line-height: 36rpx;width: calc(100% - 160rpx);font-size: 32rpx;@extend .fn-text-overflow;font-weight: bold;
                        }
                        .date-time{
                            font-size: 24rpx;height: 100%;display: flex;align-items: center;
                        }
                    }
                    .sub-title{
                        line-height: 40rpx;font-size: 28rpx;@extend .fn-text-overflow;width: 100%;
                    }
                }
                &::after{
                    width: calc(199.8% - 130rpx);left: 130rpx;
                }
                &:last-child{
                    &::after{
                        border-bottom: none;
                    }
                }
            }
        }
    }
</style>
