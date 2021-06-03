<template>
    <view class="block-list-wrapper supervise-wrapper">
        <u-navbar title="">
            <u-search placeholder="搜索督查督办标题" v-model="keyword" @search="search" @custom="search"></u-search>
        </u-navbar>
        <u-tabs :list="tabs" :is-scroll="false" :current="current" @change="tabChange"></u-tabs>
        <u-empty
            class="u-m-t-80"
            v-if="listData && listData.length==0"
        ></u-empty>
        <view class="list-wrapper">
            <view class="list-item u-border-bottom" v-for="item of listData" :key="item.id" @tap="goDetail(item)">
                <view class="list-content">
                    <view class="title">
                        {{item.superviseTitle}}
                    </view>
                    <view class="sub-title u-content-color">
                        {{item.superviseContent}}
                    </view>
                    <view class="date-time-wrapper u-light-color">
                        <div class="date-time">
                            <text class="u-tips-color">
                                {{item.superviseTypeMap.value}}
                            </text>
                            <text class="u-m-l-20">
                                {{$dayjs(item.sendDate).format('MM-DD HH:mm')}}
                            </text>
                        </div>
                        <text class="state u-primary-color">
                            {{item.statusMap.value}}
                        </text>
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
            tabs:[
                {
                    name: '待　　办',
                    value: '1'
                },
                {
                    name: '我的主办',
                    value: '3'
                },
                {
                    name: '我的协办',
                    value: '4'
                },
                {
                    name: '我的发起',
                    value: '5'
                }
            ],
            currPage:1,
            superviseTitle:'',
            current:0,
            listData: undefined,
            total: 0,
            loading: false,
            keyword:''
        }
    },
    computed: {
        ...mapState(['pageSize']),
        taskType(){
            return this.tabs[this.current].value;
        },
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
                pageSize,   
                superviseTitle,
                taskType
            } = this;
            uni.showLoading({
				title: '加载中'
            });
            this.API_qryOmSuperviseMyTask({
                currPage,
                pageSize,   
                superviseTitle,
                taskType
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
        tabChange(e){
            this.listData = undefined;
            this.current = e;
            this.currPage = 1;
            this.qryListData();
        },
        search(){
            this.superviseTitle = this.keyword;
            this.listData = undefined;
            this.currPage = 1;
            this.qryListData();
        },
        goDetail({id}){
            console.log(id);
            uni.navigateTo({
                url:`/supervise/detail?id=${id}`
            })
        }
    },
}
</script>
<style lang="scss">
@import '@/styles/block-list';
</style>