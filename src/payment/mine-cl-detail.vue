<template>
	<view class="gray-bg">
		<u-navbar title="差旅报销单" :background="$store.state.backgroundTempalte['common']"></u-navbar>
        <view class="collapse">
            <view class="collapse-item">
                <view class="body">
                    <view class="collapse-cell collapse-cell-line">
                        <text>起始时间</text>
						<text>{{item.startTime.split(' ')[0] + ' 至 ' + item.endTime.split(' ')[0]}}</text>
                    </view>
                     <view class="collapse-cell collapse-cell-line">
                        <text>起始点</text>
						<text>{{item.startCity + '-' + item.endCity}}</text>
                    </view>
                     <view class="collapse-cell collapse-cell-line">
                        <text>币种</text>
						<text>{{'CNY'}}</text>
                    </view>
                    <view class="collapse-cell collapse-cell-line">
                        <text>当前汇率</text>
						<text>{{item.currencyKind}}</text>
                    </view>
                     <view class="collapse-cell collapse-cell-line">
                        <text>住宿费</text>
						<text>{{item.stayFee}}</text>
                    </view>
                     <view class="collapse-cell collapse-cell-line">
                        <text>出租车/巴士/停车费等</text>
						<text>{{item.taxiFee}}</text>
                    </view>
                     <view class="collapse-cell collapse-cell-line">
                        <text>机场往返交通费</text>
						<text>{{item.airportFee}}</text>
                    </view>
                     <view class="collapse-cell collapse-cell-line">
                        <text>差旅费-发票差旅补助</text>
						<text>{{item.hasTickitFee}}</text>
                    </view>
                    <view class="collapse-cell collapse-cell-line">
                        <text>差旅费-无票差旅补助</text>
						<text>{{item.noTickitFee}}</text>
                    </view>
                </view>
            </view>
        </view>
		<view class="total-fee">
			<view>结算合计</view>
			<view>{{totalFee(this.item)}}(CNY)</view>
		</view>
	</view>
</template>
<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			item: {}
		}
    },
    computed: {
        ...mapState(['userInfo']),
        totalFee() {
            return function(item) {
                let { paycash, trainFee, stayFee, taxiFee, emailFee, airportFee, hasTickitFee, noTickitFee} = item;
                return Number(paycash) + Number(trainFee) + Number(stayFee) + Number(taxiFee) + Number(emailFee) + Number(airportFee) + Number(hasTickitFee) + Number(noTickitFee);
            }
        }
    },
	methods: {

	},
	onLoad(option) {
		if(option.item) {
            this.item = JSON.parse(decodeURIComponent(option.item))
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../styles/payment.scss';
</style>
