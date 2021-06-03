<template>
    <web-view v-if="src" :src="src"></web-view>
</template>
<script>
export default {
    data() {
        return {
            src:''
        }
    },
    onLoad({src}){
        console.log(src);
        if(src){
            this.src = src;
        }
    }
}
</script>
<style lang="scss">
    
</style>