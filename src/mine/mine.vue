<template>
    <view class="mine-wrapper">
        <u-navbar :is-back="false" title="我的"></u-navbar>
        <view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-t-40 u-p-b-40 u-m-t-20" @tap="goDetail">
			<view class="u-m-r-30">
				<u-avatar size="100"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userInfo.username}}</view>
                <view class="u-flex u-col-center">
                    <view class="u-font-16 u-tips-color">{{userInfo.realname}}</view>
                    <view class="u-font-14 u-light-color u-m-l-20">{{userInfo.officeName}}</view>
                </view>
			</view>
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view> -->
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>

		<!-- <view class="u-m-t-20">
			<u-cell-group :border="false">
				<u-cell-item :border-bottom="false" icon="rmb-circle" title="支付"></u-cell-item>
			</u-cell-group>
		</view> -->

		<view class="u-m-t-20">
			<u-cell-group :border="false">
				<u-cell-item icon="star" title="我的收藏" @tap="devIng"></u-cell-item>
				<u-cell-item icon="photo" title="我的相册" @tap="devIng"></u-cell-item>
				<u-cell-item icon="coupon" title="我的卡券" @tap="devIng"></u-cell-item>
				<u-cell-item icon="download" title="我的文件" @tap="devIng"></u-cell-item>
				<u-cell-item icon="file-text" title="我的工单" @tap="devIng"></u-cell-item>
				<u-cell-item :border-bottom="false" icon="heart" title="我的关注" @tap="devIng"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group :border="false">
				<u-cell-item :border-bottom="false" icon="setting" title="设置" @tap="devIng"></u-cell-item>
			</u-cell-group>
		</view>

            <view class="u-m-l-10 u-p-10 u-m-t-20 u-flex u-row-center">
				<u-button  type="primary" size="medium" @click="logout">退出登录</u-button>
			</view>
    </view>
</template>
<script>
import {
    mapState,
    mapMutations
} from 'vuex';
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['userInfo']),
    },
    onLoad(){
    },
    methods: {
        ...mapMutations(['clearCommonUser','devIng','removeUserInfo']),
        goDetail(){
            uni.navigateTo({
                url:'/mine/mine-info'
            });
        },
        logout() {
            uni.showLoading({
				title: '请求中'
            });
            this.API_logout().then(d=> {
                uni.hideLoading();
                uni.removeStorageSync('loginForm');
                this.removeUserInfo();
                uni.clearStorageSync('userInfo');
                uni.clearStorageSync('sid');
                setTimeout(() => {
                    uni.reLaunch({
                        url: '/pages/login'
                    });
                }, 500);
            }).catch(e=> {
                uni.hideLoading();
            })
        }
    },
}
</script>
<style lang="scss">
    .mine-wrapper{
        width: 100%;display: flex;flex-direction: column;
        background-color: $uni-bg-color-grey;
        min-height: $page-height;
        .user-box{
            background-color: #fff;
        }
    }
</style>
