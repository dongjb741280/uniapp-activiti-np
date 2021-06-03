<template>
    <view class="login-wrapper">
        <view class="logo-bg">
            <image class="logo" src="~@/static/logo.png"></image>
            <view class="main-title">
                OA 办公自动化平台
            </view>
        </view>
        <view class="login-form">
            <view class="form-item u-border-bottom">
                <text class="icon">&#xe618;</text>
                <input type="text" v-model="loginForm.username" class="form-input" placeholder="请输入用户名" placeholder-style="color:#7ca4c2">
            </view>
            <view class="form-item u-border-bottom u-m-t-46">
                <text class="icon">&#xe782;</text>
                <input type="password" v-model="loginForm.password" class="form-input" placeholder="请输入密码" placeholder-style="color:#7ca4c2" @confirm="login">
            </view>
            <view class="remember-psw">
                <u-checkbox  
                    v-model="rememberPsw" 
                    name="1"
                    shape="circle"
                >记住用户</u-checkbox>
            </view>
            <u-button type="primary" shape="circle" :ripple="true" @click="login" :disabled="disabled" :loading="loading">立即登录</u-button>
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
            rememberPsw:true,
            loginForm: {
				username: '',
				password: '',
            },
            rules:[
                {
					name: 'username',
					checkType: 'notnull',
                    checkRule: '',
                    errorMsg: '用户名不能为空',
                },
                {
					name: 'password',
					checkType: 'notnull',
                    checkRule: '',
                    errorMsg: '密码不能为空',
				},
            ],
            loading:false
        }
    },
	computed: {
		disabled() {
			return !this.loginForm.username || !this.loginForm.password;
		},
	},
    onLoad(){
        let loginForm = uni.getStorageSync('loginForm');
		if (loginForm && loginForm.password) {
			this.loginForm = loginForm;
		}
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        login(){
            console.log(this.rememberPsw);
            let checkRes = this.$formChecker.check(
				this.loginForm,
				this.rules
			);
			if (checkRes) {
                this.loading = true;
                this.API_login(this.loginForm).then(d => {
                    uni.showToast({
                        title:'登录成功',
                        icon:'success'
                    });
                    if (this.rememberPsw) {
                        uni.setStorageSync('loginForm', this.loginForm);
					} else {
                        uni.removeStorageSync('loginForm');
					}
					this.setUserInfo(d);
					let sid = d.sessionId;
					uni.setStorageSync('userInfo', d);
                    uni.setStorageSync('sid', sid);
					setTimeout(() => {
                        this.loading = false;
                        uni.reLaunch({
                            url: '/pages/index'
                        });
                    }, 500);
                });
            } else {
				uni.showToast({
					title: this.$formChecker.error,
					icon: 'none',
				});
			}
        }
    },
}
</script>
<style lang="scss">
    .login-wrapper{
        width: 100%;height: 100vh; 
        background-color:#f5faff;
        display: flex;flex-direction: column;
        .logo-bg{
            width: 100%;
            height: 508rpx;
            background: url('~@/static/login-bg.png') top center no-repeat;
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding-bottom: 90rpx;
            align-items: center;
            .logo{
                width: 230rpx;height: 70rpx;
            }
            .main-title{
                line-height: 208rpx;width: 100%;text-align: center;color: $uni-text-color-link;font-weight: bold;font-size: 50rpx;
            }
        }
        .login-form{
            width: 100%;padding: 170rpx 100rpx;display: flex;
            flex-direction: column;
            .form-item{
                width: 100%;height: 88rpx;display: flex;align-items: center;
                .icon{
                    color: #7da4c2;font-size: 64rpx;
                }
                .form-input{
                    flex: 1;color: $uni-text-color-link;padding-left: 20rpx;
                }
            }
            .remember-psw{
                height: 76rpx;display: flex;align-items: center;justify-content: flex-end;margin-bottom: 120rpx;
            }
        }
    }
</style>