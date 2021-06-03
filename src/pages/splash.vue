<template>
    <view class="splash-wrapper">
        <view class="logo-wrapper">
            <image class="logo" src="~@/static/ball.png"></image>
            <view class="cn">办公自动化</view>
            <view class="en">Office Automation</view>
        </view>
    </view>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .splash-wrapper{
        width: 100%;height: 100vh;
        background: linear-gradient(180deg,rgba(#bfe0fa,0.56),rgba(#309bef,0.56));
        display: flex;align-items: center;
        .logo-wrapper{
            display: flex;flex-direction: column;width: 100%;padding: 0 84rpx;align-items: center;
            .logo{
                width: 580rpx;height: 407rpx;
                animation: slideInLeft; /* referring directly to the animation's @keyframe declaration */
                animation-duration: 0.5s;
            }
            .cn{
                line-height: 80rpx; font-size: 46rpx;color: #fff;text-align: center;margin-top: 120rpx;
                animation: fadeInRightBig; /* referring directly to the animation's @keyframe declaration */
                animation-duration: 0.8s;
                animation-timing-function: ease-out;
            }
            .en{
                line-height: 64rpx; font-size: 28rpx;color: #fff;text-align: center;
                animation: fadeInRightBig; /* referring directly to the animation's @keyframe declaration */
                animation-duration: 0.8s;
                animation-delay: 0.2s;
                animation-timing-function: ease-out;
            }
        }
    }
</style>