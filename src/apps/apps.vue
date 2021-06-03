<template>
    <view class="apps-wrapper">
        <u-navbar :is-back="false" title="应用"></u-navbar>
        <u-swiper :list="list" height="374" mode="dot"></u-swiper>
        <view class="common-apps-block block">
            <view class="block-title u-border-bottom"> 常用服务 </view>
            <view class="apps-list">
                <view
                    class="apps-item vertical u-border-right"
                    v-for="(item, i) of commonList"
                    :key="i"
                    :class="{
                        'u-border-bottom': i == 1 || i == 2,
                        'u-border-right': i != 2 && i != 4
                    }"
                    @tap="itemTap(item)"
                >
                    <view
                        class="icon"
                        v-html="item.icon"
                        :style="{ color: item.color }"
                    ></view>
                    <view class="name">{{ item.name }}</view>
                </view>
            </view>
        </view>
        <view class="other-apps-block block">
            <view class="block-title u-border-bottom"> 其他服务 </view>
            <view class="apps-list">
                <view
                    class="apps-item vertical u-border-right u-border-bottom"
                    v-for="(item, i) of otherList"
                    :key="i"
                    @tap="itemTap(item)"
                >
                    <view
                        class="icon"
                        v-html="item.icon"
                        :style="{ color: item.color }"
                    ></view>
                    <view class="name">{{ item.name }}</view>
                </view>
                <view class="apps-item vertical u-border-right u-border-bottom">
                    <view class="icon">&#xe610;</view>
                    <view class="name">全部</view>
                </view>
            </view>
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
            list: [
                {
                    image: require('@/static/banner.jpg')
                },
                {
                    image: require('@/static/banner2.jpg')
                },
                {
                    image: require('@/static/banner3.jpg')
                },
                {
                    image: require('@/static/banner4.jpg')
                }
            ],
            tmpMenuList: [
                {
                    name: '报销',
                    icon: '&#xe636;',
                    color: '#1e9fff',
                    path: '/payment/mine'
                },
                {
                    name: '待办事项',
                    icon: '&#xe625;',
                    color: '#1e9fff'
                },
                {
                    name: '会议室预定',
                    icon: '&#xe66a;',
                    color: '#f0ad4e',
                    path: '/meeting/meeting-list'
                },
                {
                    name: '机票预订',
                    icon: '&#xe640;',
                    color: '#ff6d00'
                },
                {
                    name: '公务箱',
                    icon: '&#xe690;',
                    color: '#ff6363',
                    path: '/dm/dm-case/list'
                },
                {
                    name: '考勤管理',
                    icon: '&#xe63f;',
                    color: '#1e9fff',
                    path: '/attendance-record/attendance-record'
                },
                {
                    name: '会议室预定',
                    icon: '&#xe66a;',
                    color: '#f0ad4e',
                    path: '/meeting/meeting-list'
                },
                {
                    name: '公务箱',
                    icon: '&#xe690;',
                    color: '#ff6363',
                    path: '/dm/dm-case/list'
                },
                {
                    name: '公文查询',
                    icon: '&#xe68b;',
                    color: '#027bb3',
                    path: '/dm/dm-query/list'
                },
                {
                    name: '督察督办',
                    icon: '&#xe6c8;',
                    color: '#9059ea',
                    path:'/supervise/list'
                }
            ]
        };
    },
    computed: {
        commonList() {
            return this.tmpMenuList.slice(0, 5);
        },
        otherList() {
            return this.tmpMenuList.slice(5);
        }
    },
    methods: {
        ...mapMutations(['devIng']),
        itemTap({ path }) {
            if (path) {
                uni.navigateTo({
                    url: path
                });
            }else{
                this.devIng();
            }
        }
    }
};
</script>
<style lang="scss">
.apps-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: $uni-bg-color-grey;
    min-height: $page-height;
    .block {
        width: 100%;
        margin-top: 20rpx;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        .block-title {
            width: 100%;
            height: 64rpx;
            display: flex;
            align-items: center;
            padding: 0 30rpx;
            font-size: 32rpx;
            font-weight: bold;
        }
        .apps-list {
            width: 100%;
            height: 288rpx;
            .apps-item {
                display: flex;
                justify-content: center;
                align-items: center;
                width: calc((100% - 244rpx) / 2);
                height: calc(100% / 2);
                float: left;
                &.horizontal {
                    .icon {
                        font-size: 60rpx;
                    }
                    .name {
                        line-height: 56rpx;
                        font-size: 28rpx;
                        text-align: center;
                        display: inline;
                        margin-left: 8rpx;
                    }
                }
                &.vertical {
                    flex-direction: column;
                    text-align: center;
                    .icon {
                        font-size: 48rpx;
                    }
                    .name {
                        line-height: 56rpx;
                        font-size: 28rpx;
                        text-align: center;
                        display: inline;
                    }
                }

                &:first-child {
                    width: 244rpx;
                    height: 100%;
                    .icon {
                        font-size: 92rpx;
                    }
                    .name {
                        width: 100%;
                        line-height: 56rpx;
                        font-size: 28rpx;
                        text-align: center;
                    }
                }
            }
        }
        &.other-apps-block {
            .apps-item {
                width: calc(100% / 5);
                &:first-child {
                    width: calc(100% / 5);
                    height: calc(100% / 2);
                    .icon {
                        font-size: 48rpx;
                    }
                    .name {
                        width: 100%;
                        line-height: 56rpx;
                        font-size: 28rpx;
                        text-align: center;
                    }
                }
                &:nth-child(5n) {
                    &::after {
                        border-right-width:0;
                    }
                }
            }
        }
    }
}
</style>
