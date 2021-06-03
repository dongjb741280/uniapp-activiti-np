<template>
    <view class="contacts-detail-wrapper">
        <u-navbar title="个人名片"></u-navbar>
        <view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-t-40 u-p-b-40 u-m-t-20">
			<view class="u-m-r-30">
				<u-avatar size="100"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">
                    {{user.name}}
                    <text class="u-font-14 u-light-color u-m-l-20">{{user.office | mapValue('name')}}</text>
                </view>
                <view class="u-flex u-col-center">
                    <view class="u-font-16 u-tips-color">个性签名</view>
                </view>
			</view>
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view> -->
			<view class="u-m-l-10 u-p-10">
				<u-button :ripple="true" size="mini" type="primary">聊天</u-button>
			</view>
		</view>
        <view class="u-m-t-20">
			<u-cell-group :border="false">
				<u-cell-item :arrow="false" title="工号" :value="user.no"></u-cell-item>
				<u-cell-item :arrow="false" title="登录账号" :value="user.loginName"></u-cell-item>
				<u-cell-item :arrow="false" title="电话" :value="user.mobile"></u-cell-item>
				<u-cell-item :arrow="false" title="邮箱" :value="user.email"></u-cell-item>
				<u-cell-item :arrow="false" title="部门" :value="user.office | mapValue('name')"></u-cell-item>
				<u-cell-item :arrow="false" :border-bottom="false" title="上级经理" :value="user.leaderName"></u-cell-item>
			</u-cell-group>
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
            user:{},
            id:''
        }
    },
    onLoad({id}){
        if(id){
            this.id = id;
            this.qrySysUserExtendById();
        }
    },
    methods: {
        ...mapMutations(['pushCommonUser']),
        qrySysUserExtendById(){
            uni.showLoading();
            this.API_qrySysUserExtendById(this.id).then(d=>{
                this.user = d;
                this.pushCommonUser(d);
                setTimeout(() => {
                    uni.hideLoading();
                }, 500);
            }).catch(e=>{
                uni.hideLoading();
            });
        }
    },
}
</script>
<style lang="scss">
    .contacts-detail-wrapper{
        width: 100%;display: flex;flex-direction: column;
        background-color: $uni-bg-color-grey;
        min-height: $page-height;
        .user-box{
            background-color: #fff;
        }
    }
</style>