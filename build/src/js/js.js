// user's platform detection
var isApple = isApple();
if (isApple){
	document.body.classList.add(isApple);
}

function isApple() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    var isMac = navigator.platform.match(/(Mac|MacIntel)/i);
    var isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i);
    var isIOS2 = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

    return isMac ? "mac" : isIOS || isIOS2 ? "ios" : "";
}
// user's platform detection --/