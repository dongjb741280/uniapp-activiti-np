<template>
    <view class="wrapper" :loading="loading">
        <u-navbar
            title="已定会议室"
            :background="$store.state.backgroundTempalte.common"
        >
            <view slot="right">
                <view class="reserve" @click="reserveHandler">预定</view>
            </view>
        </u-navbar>
        <view class="item" v-for="(item, index) in roomList" :key="index">
            <view class="item-left">
                <span class="item-title-top">{{ item.roomName }}</span>
                <span class="item-title-con">会议主题:{{ item.topic }}</span>
                <span class="item-title-bom"
                    >{{ item.beginTime }} {{ item.endTime }}</span
                >
            </view>
            <view class="item-right">
                <u-button class="btn" type="success">预定成功</u-button>
            </view>
        </view>
        <view class="load">
            <u-loadmore :status="status" v-show="show" />
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            roomList: [],
            loading: false,
            status: 'loadmore',
            page: 1,
            size: 10,
            total: '',
            show: false,
            num: 0
        };
    },
    created() {
        this.getDataList();
        uni.$on('mettingListUpdate', () => {
            this.refresh();
        });
    },
    methods: {
        getDataList() {
            let params = Object.assign({
                currPage: this.page,
                pageSize: this.size
            });
            this.API_getUmMeetingRoomApplyListByCon(params).then(d => {
                this.show = true;
                setTimeout(() => {
                    this.roomList = this.roomList.concat(d.page.list);
                    if (this.roomList.length >= d.page.count)
                        this.status = 'nomore';
                    else this.status = 'loading';
                }, this.num);
            });
        },
        reserveHandler() {
            uni.navigateTo({
                url: '/meeting/meeting-scheduled'
            });
        },
        refresh() {
            setTimeout(() => {
                let params = Object.assign({
                    currPage: 1,
                    pageSize: this.size
                });
                this.API_getUmMeetingRoomApplyListByCon(params).then(d => {
                    this.show = true;
                    this.roomList = d.page.list;
                });
                uni.stopPullDownRefresh();
            }, 1000);
        }
    },
    onReachBottom() {
        if (this.status == 'nomore') {
            return;
        }
        this.page++;
        this.num = 1000;
        this.getDataList();
    },
    onPullDownRefresh() {
        this.refresh();
    }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/meeting-list';
</style>
