// 播放控制
// 設置影片播放範圍的px數 (滑畫面多少高結束)
var videoStart = 0;
var videoEnd = 3000, //此數值可變動，盡量>2000
    $end = videoEnd + "px";

// 設置影片播放位置
var videoPosition = 0;

// 獲取影片及其父層
var topkv = document.querySelector('.topkv');
var video = document.querySelector('.scrollVideo');

// 設置影片父層css屬性
topkv.style.setProperty('--scroll-height', $end);

// 取得影片位置
var h = topkv.offsetTop;
videoStart = videoStart + h;
videoEnd = videoEnd + h;

// 初始化影片影片播放
video.autoplay = false;
video.load();
video.pause();
video.currentTime = 0;

function floorDecimal(t) {
    return Math.floor(100 * Number(t).toFixed(3)) / 100
}

// 監視器滾動動作
var videoPlaying = false;
var scrollTimeout,videoTimeout;
window.addEventListener('scroll', function () {
    // 獲取滾動狀態
    var scrollPos = window.pageYOffset;    

    // 如果在影片播放範圍內，則計算影片的播放位置
    if (scrollPos >= videoStart && scrollPos <= videoEnd && !videoPlaying) {
        // console.log('scrollPos:'+scrollPos);
        // console.log('videoEnd:'+videoEnd);
        var s = scrollPos - videoStart,
            e = videoEnd - videoStart;
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function () {
                videoPosition = floorDecimal(s / e * video.duration);
                console.log(videoPosition);
                video.currentTime = videoPosition;
                video.play();
                videoPlaying = true;
                scrollTimeout = null;
            }, 20);
        }        
    }
});
video.addEventListener("play", (() => {
    if (!videoTimeout) {
        videoTimeout = setTimeout(function(){
            // video.play().then((() => {
            //     video.pause();
            // })).catch((() => {
            //     video.pause();
            // }))
            video.pause();
            videoPlaying = false;
            videoTimeout = null;
        },240);
    }
}))