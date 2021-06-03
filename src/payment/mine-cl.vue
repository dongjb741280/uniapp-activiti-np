<template>
	<view class="gray-bg">
		<u-navbar title="差旅报销单" :background="$store.state.backgroundTempalte['common']"></u-navbar>
		<view class="collapse">
			<view class="collapse-item">
				<view class="head" @click="showCollapse('1')">
					<view>基本信息</view>
					<u-icon :style="{transform: 'rotateZ(' + (collapse1 ? '90' : '0') + 'deg)'}" name="arrow-right" size="28"></u-icon>
				</view>
				<view class="body" :style="{height: collapse1 ? 'auto' : 0}">
					<view class="collapse-cell">
						<text>申请人</text>
						<text>{{userInfo.username}}</text>
					</view>
					<view class="collapse-cell">
						<text>项目编号</text>
						<text>{{userInfo.projNo}}</text>
					</view>
				</view>
			</view>
			<view class="collapse-item">
				<view class="head">
					<view>费用明细</view>
				</view>
				<view class="body">
					<u-table>
                        <u-tr>
                            <u-th>序号</u-th>
                            <u-th width="35%">行程</u-th>
                            <u-th>报销金额</u-th>
                            <u-th>币种</u-th>
                        </u-tr>
                        <u-tr v-for="(item,index) in paymentList.clmDetailListCopy" :key="index">
                            <u-td>{{index + 1}}</u-td>
                            <u-td width="35%">{{item.startCity + '-' + item.endCity}}</u-td>
                            <u-td>{{totalFee(item)}}</u-td>
                            <u-td>
                                <view class="u-flex u-row-center" @click="toDetail(item)">
                                    CNY<u-icon name="arrow-right" size="28"></u-icon>
                                </view>
                            </u-td>
                        </u-tr>
                    </u-table>
				</view>
			</view>
		</view>
		<view class="total-fee">
			<view>本次报销总额</view>
			<view>{{calTotalFee}}(CNY)</view>
		</view>
	</view>
</template>
<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			id: '',
            collapse1: true,
            paymentInfo:{},
            paymentList: {},
		}
    },
    computed: {
        ...mapState(['userInfo']),
        calTotalFee() {
            let total = 0;
            if(this.paymentList.clmDetailListCopy && this.paymentList.clmDetailListCopy.length) {
                this.paymentList.clmDetailListCopy.forEach(ele => {
                    total+=this.totalFee(ele)
                })
            }
            return total
        },
        totalFee() {
            return function(item) {
                let { paycash, trainFee, stayFee, taxiFee, emailFee, airportFee, hasTickitFee, noTickitFee} = item;
                return Number(paycash) + Number(trainFee) + Number(stayFee) + Number(taxiFee) + Number(emailFee) + Number(airportFee) + Number(hasTickitFee) + Number(noTickitFee);
            }
        }
    },
	methods: {
		showCollapse(sign) {
			if(sign == '1') {
				this.collapse1 = !this.collapse1;
			}else{
				this.collapse2 = !this.collapse2;
			}
        },
        toDetail(item) {
            uni.navigateTo({
                url: '/payment/mine-cl-detail?item=' + encodeURIComponent(JSON.stringify(item))
            })
        },
        getDetail() {
            this.API_qryMyFmById(this.id).then(d=> {
                let map ={};
                // 先进行分组
                let a = d.fmExpsClaimList.reduce((total, cur, curIdx)=>{
                    if(!map[cur.colNo]) {
                        total.push({
                            colNo: cur.colNo,
                            data: [cur]
                        })
                        map[cur.colNo] = cur;
                    }else {
                        total.map(val => {
                            if(val.colNo == cur.colNo) {
                                val.data.push(cur);
                            }
                        })
                    }
                    return total;
                }, [])
                a.map(element => {
                    let tval = element.data;
                    tval.forEach(ele => {
                        element.sheetId= ele.sheetId;
                        element[ele.rowEnName] = ele.rowValue;
                    });
                    return element
                });
                d.clmDetailListCopy = a;
                this.paymentList = d;
                console.log(this.paymentList);
            })
        }
	},
	onLoad(option) {
		console.log(this.$store.state.backgroundTempalte.common);
		if(option.id) {
			this.id = option.id
			// 获取详情信息
			this.getDetail()
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../styles/payment.scss';
</style>
