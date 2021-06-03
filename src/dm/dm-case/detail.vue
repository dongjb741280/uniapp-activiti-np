<template>
    <view class="supervise-detail-wrapper">
        <u-navbar :title="title"></u-navbar>
        <u-cell-group title="基本信息" :title-style="groupTitleStyle">
            <u-cell-item title="文号" :arrow="false" :value="infoData.docNo"></u-cell-item>
            <u-cell-item title="标题" :arrow="false" :value="infoData.title"></u-cell-item>
            <u-cell-item title="缓急" :arrow="false" :value="infoData.degree"></u-cell-item>
            <u-cell-item title="密级" :arrow="false" :value="infoData.secretLevel"></u-cell-item>
            <!-- <u-cell-item title="规章制度" :arrow="false" :value="infoData.secretLevel"></u-cell-item> -->
            <!-- <u-cell-item title="重要决策事项" :arrow="false" :value="infoData.secretLevel"></u-cell-item> -->
        </u-cell-group>
        <u-cell-group title="事项详情" :title-style="groupTitleStyle">
            <u-cell-item title="主办部门" :arrow="false" :value="infoData.mainDepart ? infoData.mainDepart.name : ''"></u-cell-item>
            <u-cell-item title="发文单位" :arrow="false" :value="infoData.sendDepart ? infoData.sendDepart.name : ''"></u-cell-item>
            <u-cell-item title="会签部门" :arrow="false" :value="infoData.countersignDepartNames" v-if="infoData.countersignDepartNames"></u-cell-item>
            <u-cell-item title="领导签发" :arrow="false" :value="infoData.leaderAudit ? infoData.leaderAudit.name : ''"></u-cell-item>
            <u-cell-item title="领导签发时间" :arrow="false" :value="infoData.leaderAuditDate" v-if="infoData.leaderAuditDate"></u-cell-item>
            <u-cell-item title="会签意见" :arrow="false" :value="infoData.countersignRemarks" v-if="infoData.countersignRemarks"></u-cell-item>
            <u-cell-item title="主送" :arrow="false" :value="infoData.sendMainNames"></u-cell-item>
            <u-cell-item title="抄送人员" :arrow="false" :value="infoData.copyUserNames"></u-cell-item>
            <u-cell-item title="留言" :arrow="false" :value="infoData.message"></u-cell-item>
            <u-cell-item title="保存期限" :arrow="false" :value="infoData.saveTime"></u-cell-item>
            <u-cell-item title="拟稿人电话" :arrow="false" :value="infoData.createUserMobile"></u-cell-item>
        </u-cell-group>
        <!-- <u-cell-group title="办理意见" :title-style="groupTitleStyle">
            <u-cell-item title="办理意见" :arrow="false" :value="infoData.checkContent"></u-cell-item>
        </u-cell-group> -->
    </view>
</template>
<script>
export default {
    data() {
        return {
            id:'',
            infoData:{},
            title:'',
            groupTitleStyle:{
                fontWeight:'bold'
            }
        }
    },
    onLoad({id}){
        if(id){
            this.id = id;
            this.qryInfoById();
        }
    },
    methods: {
        qryInfoById(){
            uni.showLoading();
            this.API_qryDmOfficialDocById(this.id).then(d=>{
                console.log(d);
                this.title = d.title;
                this.infoData = d;
                setTimeout(() => {
                    uni.hideLoading();
                }, 500);
            });
        }
    },
}
</script>
<style lang="scss">
   .supervise-detail-wrapper{
       width: 100%;
       display: flex;
       flex-direction: column;
       min-height: calc(100vh - #{$--nav-bar-height} - #{$--status-bar-height});
       background-color: $uni-bg-color-grey;
   }
</style>
