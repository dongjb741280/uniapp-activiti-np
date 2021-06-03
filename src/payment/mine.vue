<template>
	<view class="gray-bg">
		<u-navbar title="我的报销" :background="$store.state.backgroundTempalte.common"></u-navbar>
		<view class="tab-header">
			<u-tabs ref="tabs" :item-width="750/3" :bar-width="750/3" @change="change" name="name" :list="list" :current="tabIndex"></u-tabs>
			<view class="time u-flex">
				<view class="time-item u-flex">
					<u-picker v-model="timeshow.start" :default-time="queryForm.beginTime" mode="time" @confirm="timeConfirm('start', $event)"></u-picker>
					<view @click="showTime('start')">
						<text>{{queryForm.beginTime}}</text>
						<u-icon class="u-margin-left-10" name="calendar" color="#2979ff" size="32"></u-icon>
					</view>
				</view>
				<view style="padding: 0 20rpx">至</view>
				<view class="time-item u-flex">
					<u-picker v-model="timeshow.end" mode="time" @confirm="timeConfirm('end', $event)"></u-picker>
					<view @click="showTime('end')">
						<text>{{queryForm.endTime}}</text>
						<u-icon class="u-margin-left-10" name="calendar" color="#2979ff" size="32"></u-icon>
					</view>
				</view>
				<u-button class="u-margin-left-16" type="primary" size="mini" @click="query">查询</u-button>
			</view>
		</view>
		<view class="payment-list">
			<view class="payment-item" v-for="(item, index) in paymentList" :key="index">
				<u-card :border="false" :index="item.id" :body-style="{padding: '8rpx'}" @head-click="headClick(item.type, item.id)">
					<view class="u-flex" slot="head">
						<view class="u-flex-1">{{item.typeMap.value || '差旅报销'}}</view>
						<u-icon name="arrow-right" size="28"></u-icon>
					</view>
					<view class="u-p-10" slot="body">
						<view class="u-flex u-border-bottom u-row-between u-p-t-0 u-p-b-20">
							<view class="u-body-item-title u-line-2">项目编号</view>
							<view>{{item.projNo || '部门报销'}}</view>
						</view>
						<view class="u-flex u-row-between u-p-t-20">
							<view class="u-body-item-title u-line-2">金额</view>
							<view>{{item.totalFee + ' 元'}}</view>
						</view>
					</view>
					<view class="u-flex" slot="foot">
						<view class="u-flex-1">审批状态</view>
						<view>{{item.stateMap.value || '已提交'}}</view>
					</view>
				</u-card>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			timeFormat: 'yyyy-mm-dd',
			paymentList: [],
			timeshow: {
				start: false,
				end: false
			},
			queryForm: {
				beginTime: '',
                endTime: '',
                state: '',
			},
			tabIndex: 0,
			list: [{
				name: '在路上'
			},{
				name: '胜利'
			},{
				name: '死亡'
			}],
			page: {
				currPage: 1,
				pageSize: 10,
			},
			status: 'loadmore',
		}
	},
	computed: {

	},
	onPullDownRefresh() {
		this.page = {
			currPage: 1,
			pageSize: 10
		};
        this.status = 'loadmore';
        this.getDataList();
		setTimeout(()=> {
            uni.stopPullDownRefresh();
        }, 1000)
	},
	onReachBottom() {
		if(this.status == 'nomore') {
            return false
        }else {
            this.page.currPage ++;
            this.status = 'loading';
            this.getDataList();
        }
	},
	methods: {
		showTime(dir) {
			this.timeshow[dir] = true;
		},
		headClick(type, idx) {
			if(type == '1') {
                uni.navigateTo({
                    url: '/payment/mine-lx?id=' + idx
                });
            }else if(type == '2') {
                uni.navigateTo({
                    url: '/payment/mine-cl?id=' + idx
                });
            }
		},
		timeConfirm(dir, e) {
			let time = this.$u.timeFormat(e.timestamp, this.timeFormat);
			if(dir == 'start') {
				this.queryForm['beginTime'] = time;
			} else {
				this.queryForm['endTime'] = time;
			}
        },
        getDataList() {
            let params = Object.assign({}, this.page, this.queryForm);
            this.API_qryMyFmList(params).then(d => {
                if(d.page.count < this.page.pageSize) {
                    this.status = 'nomore';
                }else {
                    if(d.page.list < this.page.pageSize) {
                        this.status = 'nomore';
                    }else{
                        this.status = 'loadmore';
                    }
                }
                if(d.pageNo == 1) {
                    this.paymentList = d.page.list;
                }else{
                    this.paymentList = this.paymentList.concat(d.page.list);
                }
            })
        },
        query() {
            this.paymentList = '';
            this.page = {
                currPage: 1,
                currSize: 10
            };
            this.getDataList();
        },
		change(e) {
            this.paymentList = [];
            this.tabIndex = e;
            if(this.tabIndex == 0) {
                this.queryForm.state = '2';
            }else if (this.tabIndex == 1) {
                this.queryForm.state = '5';
            } else if(this.tabIndex == 2) {
                this.queryForm.state = '3';
            }
            this.getDataList();
		}
	},
	onLoad() {
		this.queryForm.beginTime = this.$dayjs().subtract(30, 'day').format('YYYY-MM-DD');
        this.queryForm.endTime = this.$dayjs().format('YYYY-MM-DD');
        this.getDataList();
	}
}
</script>

<style lang="scss" scoped>
@import '../styles/payment.scss';
</style>
