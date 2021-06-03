<template>
    <view class="block-list-wrapper supervise-wrapper">
        <u-navbar title="">
            <u-search placeholder="搜索公文标题" v-model="keyword" @search="search" @custom="search"></u-search>
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
                        {{item.title}}
                    </view>
                    <view class="sub-title u-content-color">
                        {{item.docNo}}
                    </view>
                    <view class="date-time-wrapper u-light-color">
                        <div class="date-time">
                            <text class="u-tips-color">
                                缓急:{{item.secretLevelMap ? item.secretLevelMap.value : ''}}
                            </text>
                            <text class="u-m-l-20">
                                {{$dayjs(item.createDate).format('MM-DD HH:mm')}}
                            </text>
                        </div>
                        <text class="state u-primary-color">
                            {{item.statusMap ? item.statusMap.value : ''}}
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
                    name: '收 文',
                    value: ''
                },
                {
                    name: '发 文',
                    value: '3'
                }
            ],
            currPage:1,
            title:'',
            current:0,
            listData: undefined,
            total: 0,
            loading: false,
            keyword:''
        }
    },
    computed: {
        ...mapState(['pageSize']),
        operType(){
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
                title,
                operType
            } = this;
            uni.showLoading({
				title: '加载中'
            });
            this.API_qryDmOfficialDocListByCon({
                currPage,
                pageSize,
                title,
                operType
            }).then(d=>{
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
            this.title = this.keyword;
            this.listData = undefined;
            this.currPage = 1;
            this.qryListData();
        },
        goDetail({id}){
            console.log(id);
            uni.navigateTo({
                url:`/dm/dm-case/detail?id=${id}`
            })
        }
    },
}
</script>
<style lang="scss">
@import '@/styles/block-list';
</style>
