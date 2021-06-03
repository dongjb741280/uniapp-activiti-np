<template>
    <view class="message-list-wrapper">
        <u-navbar :title="title"></u-navbar>
        <u-empty
            class="u-m-t-80"
            v-if="listData && listData.length==0"
        ></u-empty>
        <view class="list-wrapper">
            <view
                class="list-item u-border-bottom"
                v-for="(item, index) in listData"
                :key="index"
                :class="{ 'large-img': item.coverImgUrl }"
                @tap="goDetail(item)"
            >
                <view class="list-content">
                    <view class="title">
                        {{ item.articleTitle || item.infoName }}
                    </view>
                    <view class="sub-title u-content-color" v-html="item.articleContent || item.infoContent"></view>
                    <view class="date-time u-light-color">
                        <text class="u-tips-color u-m-r-20">
                            {{item.articleTypeMap?item.articleTypeMap.value:item.infoTypeMap.value}}
                        </text>
                        {{ $dayjs(item.updateDate).format('MM-DD HH:mm') }}
                    </view>
                </view>
                <view class="img-wrapper" v-if="item.coverImgUrl">
                    <image
                        class="item-img"
                        :src="item.coverImgUrl | imgUrl"
                        mode="aspectFill"
                    ></image>
                </view>
            </view>
            <!-- <view class="list-item u-border-bottom single-img">
                <view class="list-content">
                    <view class="title">
                        [No.0001期]Python编程常用的十大语法和代码汇总，学会它事半功倍
                    </view>
                    <view class="date-time u-light-color">
                        12-04 17:24
                    </view>
                </view>
                <view class="img-wrapper">
                    <image class="item-img" src="~@/static/timg.jpg" mode="aspectFill"></image>
                </view>
            </view>
            <view class="list-item u-border-bottom">
                <view class="list-content">
                    <view class="title">
                        [No.0001期]Python编程常用的十大语法和代码汇总，学会它事半功倍[No.0001期]Python编程常用的十大语法和代码汇总，学会它事半功倍[No.0001期]Python编程常用的十大语法和代码汇总，学会它事半功倍
                    </view>
                    <view class="date-time u-light-color">
                        12-04 17:24
                    </view>
                </view>
            </view>
            <view class="list-item u-border-bottom multiple-img">
                <view class="list-content">
                    <view class="title">
                        [No.0001期]Python编程常用的十大语法和代码汇总，学会它事半功倍
                    </view>
                    <view class="date-time u-light-color">
                        12-04 17:24
                    </view>
                </view>
                <view class="img-wrapper">
                    <image class="item-img" src="~@/static/timg.jpg" mode="aspectFill"></image>
                    <image class="item-img" src="~@/static/timg.jpg" mode="aspectFill"></image>
                    <image class="item-img" src="~@/static/timg.jpg" mode="aspectFill"></image>
                </view>
            </view>
            <view class="list-item u-border-bottom large-img">
                <view class="list-content">
                    <view class="title">
                        [No.0001期]Python编程常用的十大语法和代码汇总，学会它事半功倍
                    </view>
                    <view class="date-time u-light-color">
                        12-04 17:24
                    </view>
                </view>
                <view class="img-wrapper">
                    <image class="item-img" src="~@/static/timg.jpg" mode="aspectFill"></image>
                </view>
            </view> -->
        </view>
        <u-loadmore :status="state" v-if="listData && listData.length > 0" />
    </view>
</template>
<script>
import { mapState,mapMutations  } from 'vuex';
export default {
    data() {
        return {
            total: 0,
            loading: false,
            key: '',
            fn: '',
            title: '',
            currPage: 1,
            param: undefined,
        };
    },
    computed: {
        ...mapState(['messageData', 'pageSize']),
        state() {
            if (this.listData.length < this.total) {
                if (this.loading) {
                    return 'loading';
                } else {
                    return 'loadmore';
                }
            } else {
                return 'nomore';
            }
        },
        listData(){
            return this.messageData[this.key]?this.messageData[this.key]:[];
        }
    },
    onLoad({ key, fn, title, param }) {
        this.key = key;
        this.fn = fn;
        this.title = decodeURIComponent(title);
        this.param = param ? JSON.parse(decodeURIComponent(param)) : undefined;
        if (key) {
            let list = this.messageData[key];
            if (list && list.length > 0) {
                this.currPage = 2;
            } else {
                this.getListData();
            }
        }
    },
    onPullDownRefresh() {
        this.currPage = 1;
        this.getListData();
    },
    onReachBottom(){
        this.getListData();
    },
    methods: {
        ...mapMutations(['setMessageData']),
        goDetail({ id,infoId }) {
            let api = '';
            if(this.key == 'gm' || this.key == 'tech'){
                api = 'API_qryGmPublishInfoById';
            }
            uni.navigateTo({
                url: `/message/detail?id=${id || infoId}&api=${api}`
            });
        },
        getListData() {
            let { pageSize, currPage, param, fn, key } = this;
            this[fn]
                .call(this, {
                    pageSize,
                    currPage,
                    ...param
                })
                .then(d => {
                    if (d && d.page.list && d.page.list.length>0) {
                        let tmp = {},
                        arr = [];
                        if(this.currPage == 1){
                            arr = d.page.list;
                        }else{
                            arr = this.messageData[key].concat(d.page.list);
                        }
                        this.$set(tmp, key, arr);
                        this.setMessageData(tmp);
                        setTimeout(() => {
                            this.$forceUpdate();
                        }, 100);
                        this.currPage++;
                    }
                });
        }
    }
};
</script>
<style lang="scss">
.message-list-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    .list-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 30rpx;
    }
    .list-item {
        width: 100%;
        display: flex;
        padding: 24rpx 0;
        flex-wrap: wrap;
        .list-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            max-width: 100%;
            .title {
                width: 100%;
                line-height: 48rpx;
                font-size: 32rpx;
                font-weight: bold;
                @include text-overflow(1);
            }
            .sub-title {
                width: 100%;
                line-height: 40rpx;
                font-size: 28rpx;
                @include text-overflow(2);
            }
            .date-time {
                width: 100%;
                line-height: 24rpx;
                font-size: 20rpx;
                margin-top: 20rpx;
            }
        }
        .img-wrapper {
            display: flex;
        }
        &:last-child {
            &::after {
                display: none;
            }
        }
        &.single-img {
            .img-wrapper {
                width: 230rpx;
                height: 178rpx;
                border-radius: 6rpx;
                overflow: hidden;
                margin-left: 50rpx;
                .item-img {
                    width: 100%;
                    height: 100%;
                }
            }
            .list-content {
                .date-time {
                    margin-top: 0;
                }
            }
        }
        &.multiple-img {
            position: relative;
            padding-bottom: 60rpx;
            .img-wrapper {
                width: 100%;
                height: 178rpx;
                border-radius: 6rpx;
                overflow: hidden;
                margin-top: 10rpx;
                .item-img {
                    width: calc((100% - 8rpx) / 3);
                    height: 100%;
                    margin-right: 4rpx;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
            .list-content {
                .date-time {
                    margin-top: 0;
                    position: absolute;
                    line-height: 50rpx;
                    bottom: 10rpx;
                }
            }
        }
        &.large-img {
            position: relative;
            padding-bottom: 60rpx;
            .img-wrapper {
                width: 100%;
                height: 390rpx;
                border-radius: 6rpx;
                overflow: hidden;
                margin-top: 10rpx;
                .item-img {
                    width: 100%;
                    height: 100%;
                }
            }
            .list-content {
                .date-time {
                    margin-top: 0;
                    position: absolute;
                    line-height: 50rpx;
                    bottom: 10rpx;
                }
            }
        }
    }
}
</style>
