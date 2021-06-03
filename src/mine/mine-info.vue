<template>
    <view class="contacts-detail-wrapper">
        <u-navbar title="个人信息"></u-navbar>
        <view class="u-m-t-20">
			<u-cell-group :border="false">
				<u-cell-item title="头像" :use-label-slot="true">
                    <u-avatar size="100"></u-avatar>
                </u-cell-item>
				<u-cell-item :arrow="false" title="用户名" :value="user.loginName"></u-cell-item>
				<u-cell-item title="昵称" :value="user.nickName"></u-cell-item>
				<u-cell-item :arrow="false" title="姓名" :value="user.name"></u-cell-item>
				<u-cell-item title="个性签名" :value="user.motto"></u-cell-item>
            </u-cell-group>
        </view>
        <view class="u-m-t-20">
			<u-cell-group :border="false">
				<u-cell-item :arrow="false" title="手机号" :value="user.mobile"></u-cell-item>
				<u-cell-item :arrow="false" title="邮箱" :value="user.email"></u-cell-item>
				<u-cell-item :arrow="false" title="性别" :value="user.sex"></u-cell-item>
				<u-cell-item :arrow="false" title="工作地区" :value="user.area"></u-cell-item>
            </u-cell-group>
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
            user:{}
        }
    },
    computed: {
        ...mapState(['userInfo']),
        userId() {
            return this.userInfo.userId;
        },
    },
    onLoad(){
        if(this.userId){
            this.qrySysUserExtendById();
        }
    },
    methods: {
        qrySysUserExtendById(){
            uni.showLoading();
            this.API_qrySysUserExtendById(this.userId).then(d=>{
                this.user = d;
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
    }
</style>