<template>
    <view class="contacts-index-wrapper">
        <u-navbar :is-back="false" title="">
            <view class="search-bar">
                <u-search placeholder="搜索员工姓名" v-model="name" @search="search" @custom="search" @input="searchInput"></u-search>
            </view>
        </u-navbar>
        <template v-if="searchList.length==0">
            <u-cell-group title="我的部门" :title-style="groupTitleStyle">
                <u-cell-item :title="userInfo.officeName" :title-style="titleStyle" @click="goList">
                    <view class="group-icon icon" slot="icon">&#xe63d;</view>
                </u-cell-item>
            </u-cell-group>
            <u-cell-group title="最近联系人" :title-style="groupTitleStyle" v-if="commonUser">
                <view class="contacts-item u-border-bottom" v-for="item of commonUser" :key="item.id" @tap="goDetail(item)">
                    <view class="avatar-wrapper">
                        <u-avatar mode="circle" size="80"></u-avatar>
                        <view class="name">{{item.name}}</view>
                        <view class="no">{{item.no}}</view>
                    </view>
                    <view class="item-content">
                        <view class="line">
                            {{item.mobile}}
                        </view>
                        <view class="line">
                            {{item.email}}
                        </view>
                        <view class="line">
                            {{item.office.name}}
                        </view>
                        <view class="line">
                            上级:<text class="u-m-l-10">{{item.leaderName}}</text>
                        </view>
                    </view>
                    <view class="handle-wrapper">
                        <u-icon v-if="item.mobile" class="u-m-r-20 u-warning-color" name="phone" size="36" @tap="call(item.mobile)"></u-icon>
                        <!-- <u-icon name="email u-warning-color" size="36" @tap="mail"></u-icon> -->
                    </view>
                </view>
            </u-cell-group>
        </template>
        <template v-else>
            <view class="contacts-item u-border-bottom" v-for="item of searchList" :key="item.id" @tap="goDetail(item)">
                <view class="avatar-wrapper">
                    <u-avatar mode="circle" size="80"></u-avatar>
                    <view class="name">{{item.name}}</view>
                    <view class="no">{{item.no}}</view>
                </view>
                <view class="item-content">
                    <view class="line">
                        {{item.mobile}}
                    </view>
                    <view class="line">
                        {{item.email}}
                    </view>
                    <view class="line">
                        {{item.office.name}}
                    </view>
                    <view class="line">
                        上级:<text class="u-m-l-10">{{item.leaderName}}</text>
                    </view>
                </view>
                <view class="handle-wrapper">
                    <u-icon v-if="item.mobile" class="u-m-r-20 u-warning-color" name="phone" size="36" @tap="call(item.mobile)"></u-icon>
                    <!-- <u-icon name="email u-warning-color" size="36" @tap="mail"></u-icon> -->
                </view>
            </view>
        </template>
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
            name:'',
            groupTitleStyle:{
                backgroundColor:'#f5f5f5'
            },
            titleStyle:{
                fontSize:'36rpx'
            },
            searchList:[],
            currPage:1
        }
    },
    computed: {
        ...mapState(['userInfo','commonUser']),
        userId() {
            return this.userInfo.userId;
        },
    },
    onShow(){
        console.log(this.commonUser);
    },
    methods: {
        ...mapMutations(['call']),
        searchInput(){
            if(!this.name){
                this.searchList = [];
            }
        },
        search(){
            this.qrySysUserExtendListByCon();
        },
        goList(){
            uni.navigateTo({
                url:'/contacts/contacts'
            });
        },
        qrySysUserExtendListByCon(){
            let {
                currPage,
                userId,
                name
            } = this;
            uni.showLoading();
            this.API_qrySysUserExtendListByCon({
                currPage,
                pageSize: 1000,
                name,
                id: userId,
            }).then(d=>{
                console.log(d);
                if(d && d.page.list.length>0){
                    this.searchList = d.page.list;
                }
                setTimeout(() => {
                    uni.hideLoading();
                }, 500);
            }).catch(e=>{
                uni.hideLoading();
            });
        },
        goDetail({id}){
            uni.navigateTo({
                url:`/contacts/detail?id=${id}`
            });
        }
    },
}
</script>
<style lang="scss">
    .contacts-index-wrapper{
        width: 100%;display: flex;flex-direction: column;
        .search-bar{
            padding: 0 20rpx;width: 100%;
        }
        .group-icon{
            width: 60rpx;height: 60rpx;display: flex;align-items: center;justify-content: center;border-radius: 50%;background-color: $uni-color-primary;color: #fff;font-size: 48rpx;margin-right: 20rpx;
        }
    }
</style>