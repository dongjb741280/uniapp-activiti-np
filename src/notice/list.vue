<template>
    <view class="block-list-wrapper">
        <u-navbar title="通知"></u-navbar>
        <u-empty
            class="u-m-t-80"
            v-if="listData && listData.length==0"
        ></u-empty>
        <view class="list-wrapper">
            <view class="list-item u-border-bottom" v-for="item of listData" :key="item.id" @tap="goDetail(item)">
                <view class="list-content">
                    <view class="title">
                        {{item.articleTitle}}
                    </view>
                    <view class="sub-title u-content-color" v-html="item.articleContent"></view>
                    <view class="date-time-wrapper u-light-color">
                        <div class="date-time">
                            <text class="u-tips-color">
                                {{item.articleTypeMap.value}}
                            </text>
                            <text class="u-m-l-20">
                                {{$dayjs(item.updateDate).format('MM-DD HH:mm')}}
                            </text>
                        </div>
                    </view>
                </view>
            </view>
        </view>
		<u-loadmore
			:status="status"
			v-if="listData && listData.length>0"
		/>
    </view>
</template>
<script>
import {
    mapState
} from 'vuex';
export default {
    data() {
        return {
            currPage:1,
            current:0,
            listData: undefined,
            total: 0,
            loading: false,
        }
    },
    computed: {
        ...mapState(['pageSize']),
        status() {
			if (this.listData.length < this.total) {
				if (this.loading) {
					return 'loading';
				} else {
					return 'loadmore';
				}
			} else {
				return 'nomore';
			}
		},
    },
    onLoad(){
        this.qryListData();
    },
    onPullDownRefresh() {
		this.currPage = 1;
		this.qryListData();
	},
	onReachBottom(e) {
		if (this.listData.length < this.total) {
			this.loading = true;
			this.qryListData();
		}
	},
    methods: {
        qryListData(){
            let {
                currPage,
                pageSize
            } = this;
            uni.showLoading({
				title: '加载中'
            });
            this.API_qryOaArticleListByCon({
                currPage,
                pageSize,   
                articleCategory: 6,
				showType: 1,
            }).then(d=>{
                console.log(d);
                if(d.page && d.page.list && d.page.list.length>0){
                    if(this.currPage == 1){
                        this.listData = d.page.list;
                        this.total = d.page.count;
                    }else{
                        this.listData = this.listData.concat(d.page.list);
                    }
                    this.currPage++;
                }else{
                    this.listData = [];
                };
                this.loading = false;
                setTimeout(() => {
                    uni.hideLoading();
                    uni.stopPullDownRefresh();
                }, 500);
            }).catch(e => {
                uni.hideLoading();
                uni.stopPullDownRefresh();
            });
        },
        goDetail({ id }) {
            uni.navigateTo({
                url: `/message/detail?id=${id}`
            });
        },
    },
}
</script>
<style lang="scss">
@import '@/styles/block-list';
</style>