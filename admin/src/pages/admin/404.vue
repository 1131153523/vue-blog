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
        -webkit-animation: fade 1s infinite ease-out  alternate;
           -moz-animation: fade 1s infinite ease-out  alternate;
             -o-animation: fade 1s infinite ease-out  alternate;
                animation: fade 1s infinite ease-out  alternate;
    }
    @-webkit-keyframes fade {
        from {
            opacity: 0.5;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
            -webkit-transform: translateY(0px);
                    transform: translateY(0px);
        }
        to {
            opacity: 1;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
            -webkit-transform: translateY(20px);
                    transform: translateY(20px);

        }
    }
    @-moz-keyframes fade {
        from {
            opacity: 0.5;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
            -moz-transform: translateY(0px);
                 transform: translateY(0px);
        }
        to {
            opacity: 1;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
            -moz-transform: translateY(20px);
                 transform: translateY(20px);

        }
    }
    @-o-keyframes fade {
        from {
            opacity: 0.5;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
            -o-transform: translateY(0px);
               transform: translateY(0px);
        }
        to {
            opacity: 1;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
            -o-transform: translateY(20px);
               transform: translateY(20px);

        }
    }
    @keyframes fade {
        from {
            opacity: 0.5;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
            -webkit-transform: translateY(0px);
               -moz-transform: translateY(0px);
                 -o-transform: translateY(0px);
                    transform: translateY(0px);
        }
        to {
            opacity: 1;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
            -webkit-transform: translateY(20px);
               -moz-transform: translateY(20px);
                 -o-transform: translateY(20px);
                    transform: translateY(20px);

        }
    }
</style>
