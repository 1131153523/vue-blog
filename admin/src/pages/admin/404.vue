<template>
    <div>
        404&nbsp;&nbsp;&nbsp;&nbsp;页面找不到啦
    </div>
</template>
<script>
    export default {}
</script>
<style scoped>
    div {
        text-align: center;
        padding-top: 15%;
        font-size: 100px;
        color: #00B7FF;
        animation: fade 1s infinite ease-out  alternate;
    }
    @keyframes fade {
        from {
            opacity: 0.5;
            transform: translateY(0px);
        }
        to {
            opacity: 1;
            transform: translateY(20px);

        }
    }
</style>
