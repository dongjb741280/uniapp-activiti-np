<template>
	<view class="gray-bg">
		<u-navbar title="待办" :background="$store.state.backgroundTempalte.common"></u-navbar>
        <u-tabs :list="tabs" :is-scroll="false" :current="current" @change="tabChange"></u-tabs>
        <u-empty
            class="u-m-t-80"
            style="height: 400rpx"
            v-if="listData && listData.length==0"
        ></u-empty>
        <view class="thing-list">
            <affiars-item type="1" :curtype="current" :item="item" v-for="(item, index) in listData" :key="index"></affiars-item>
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
import AffiarsItem from './components/affiars-item.vue'
export default {
    components: {
        AffiarsItem
    },
	data() {
		return {
            listData: [],
            tabs:[{
                name: '待处理',
                value: 0
            },{
                name: '已处理',
                value: 1
            }],
            total: 0,
            current: 0,
            currPage: 1,
            loading: false
		}
	},
	computed: {
        ...mapState(['pageSize','userInfo']),
        userId() {
            return this.userInfo.userId;
        },
        status() {
            if(this.total > this.listData.length) {
                if(this.loading) {
                    return 'loading'
                }else{
                    return 'loadmore'
                }
            }else {
                return 'nomore';
            }
        }
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
        getParams() {
            let params = {};
            params.data = {
                currPage: this.currPage,
                pageSize: this.pageSize,
                userId: this.userId
            };
            params.url = this.current == 0 ? '/oa-server/a/oa/acrossServices/qryNeedDealListByCon' : '/oa-server/a/oa/acrossServices/qryFinishDealListByCon';
            return params
        },
        qryListData() {
            let params = this.getParams();
            uni.showLoading({
				title: '加载中'
            });
            this.API_getListInfo(params.url,params.data).then(d=>{
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
        tabChange(e) {
            this.listData = undefined;
            this.current = e;
            this.currPage = 1;
            this.qryListData();
        }
    },
    created() {
        uni.$on('updateList', (e) => {
            console.log(e);
            this.qryListData();
        })
        this.qryListData();
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/public-affiars.scss';
</style>
