<template>
    <view class="supervise-detail-wrapper">
        <u-navbar :title="title"></u-navbar>
        <u-cell-group title="基本信息" :title-style="groupTitleStyle">
            <u-cell-item title="督办事项" :arrow="false" :value="infoData.superviseTitle"></u-cell-item>
            <u-cell-item title="督办分类" :arrow="false" :value="infoData.superviseTypeMap | mapValue"></u-cell-item>
            <u-cell-item title="是否联合督办" :arrow="false" :value="infoData.superviseLevelMap | mapValue"></u-cell-item>
            <u-cell-item title="督办内容" :arrow="false" :value="infoData.superviseContent"></u-cell-item>
        </u-cell-group>
        <u-cell-group title="事项详情" :title-style="groupTitleStyle">
            <u-cell-item title="分管领导" :arrow="false" :value="infoData.mainLeader | mapValue('name')"></u-cell-item>
            <u-cell-item title="计划与目标" :arrow="false" :value="infoData.planTarget"></u-cell-item>
            <u-cell-item title="主办单位" :arrow="false" :value="infoData.mainDepartId | mapValue('name')"></u-cell-item>
            <u-cell-item title="协办单位" :arrow="false" :value="infoData.helpDepartId | mapValue('name')"></u-cell-item>
            <u-cell-item title="限办时间" :arrow="false" :value="infoData.helpDate"></u-cell-item>
            <u-cell-item title="状态" :arrow="false" :value="infoData.statusMap | mapValue"></u-cell-item>
            <u-cell-item title="主办内容" :arrow="false" :value="infoData.mainContent"></u-cell-item>
            <u-cell-item title="协办提交内容" :arrow="false" :value="infoData.helpContent"></u-cell-item>
            <u-cell-item title="检查内容" :arrow="false" :value="infoData.checkContent"></u-cell-item>
            <u-cell-item title="备注" :arrow="false" :value="infoData.remarks"></u-cell-item>
        </u-cell-group>
        <u-cell-group title="办理意见" :title-style="groupTitleStyle">
            <u-cell-item title="办理意见" :arrow="false" :value="infoData.checkContent"></u-cell-item>
        </u-cell-group>
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
            this.API_qryOmSuperviseById(this.id).then(d=>{
                console.log(d);
                this.title = d.superviseTitle;
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