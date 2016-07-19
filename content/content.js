function replace() {
  const KeyEmoji = "emoji";
  chrome.runtime.sendMessage({method: "localStorage", key: KeyEmoji}, function(response) {
    var emoji = JSON.parse(response.data);
    if( emoji ) {
        $('p').each(function() {
            var text = $(this).html();
            $(this).html(
                text.replace(/:([a-z0-9A-Z_-]+):/g, function(match) {
                  var isEmoji = emoji.hasOwnProperty(match);
                  if( isEmoji ) {
                    var _id = Math.random().toString(36).slice(-8);

                    // クロスドメイン対応のため、XMLHttpRequest経由で画像取得
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', emoji[match], true);
                    xhr.responseType = 'blob';
                    xhr.onload = function(e) {
                      var src = window.URL.createObjectURL(this.response);
                      $("#" + _id)[0].src = src;
                    };
                    xhr.send();

                    var img = "<img id=\"" + _id + "\" width=\"32\" height=\"32\" />"
                    console.log("img = " + img);
                    return img;
                  }
                  return match;
                })
            );
        });
     }
  });
}

// FIXME: 通信毎に呼び出しが行われるので、レンダリング速度低下する可能性がありそう
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // 通信完了時の書き換え
  replace();
});
