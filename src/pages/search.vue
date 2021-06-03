<template>
    <view class="search-wrapper">
        <u-navbar :is-back="false" title="">
            <view class="search-bar">
                <u-search :focus="true" placeholder="搜索内容" action-text="取消" v-model="keyword" @search="search" @custom="cancel"></u-search>
            </view>
        </u-navbar>
        <view class="search-history-wrapepr">
            <view class="title">
                搜索历史
                <view class="clear u-tips-color">
                    <text class="icon u-m-r-10">&#xe78a;</text>
                    清除
                </view>
            </view>
            <view class="item-list-wrapper">
                <view class="history-item">
                    搜索1
                </view>
                <view class="history-item">
                    搜索1
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            keyword:''
        }
    },
    methods: {
        cancel(){
            uni.navigateBack();
        },
        search(){

        }
    },
}
</script>
<style lang="scss">
    .search-wrapper{
        width: 100%;display: flex;flex-direction: column;
        .search-bar{
            padding: 0 30rpx;width: 100%;
        }
        .search-history-wrapepr{
            width: 100%;
            display: flex;flex-direction: column;
            .title{
                height: 80rpx;display: flex;align-items: center;justify-content: space-between;
                font-size: 28rpx;padding: 0 30rpx;
                .clear{
                    height: 100%;display: flex;align-items: center;
                }
                .icon{
                    font-size: 36rpx;
                }
            }
            .item-list-wrapper{
                width: 100%;display: flex;
                padding-left: 30rpx;flex-wrap: wrap;
                .history-item{
                    padding: 0 20rpx;line-height: 52rpx;font-size: 24rpx;border-radius: 30rpx;background-color: #eee;margin-right: 30rpx;
                }
            }
        }
    }
</style>