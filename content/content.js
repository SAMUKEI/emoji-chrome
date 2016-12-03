function loadEmoji() {
  return new Promise((resolve, reject) => {
    const KeyEmoji = "emoji";
    chrome.runtime.sendMessage({method: "localStorage", key: KeyEmoji}, function(response) {
      var emoji = JSON.parse(response.data);
      if( emoji ) { 
        resolve(emoji);
      } else {
        reject();
      }
    });
  });
}

function replaceElement(emoji, element) {
  $(element).each(function() {
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

function suggest(emoji) {
  var emojisList = $.map(emoji, function(value, name) {
    return {'url':value, 'name':name.replace(/:/g, "")};
  });
  $('textarea').atwho({
    at: ':',
    displayTpl: "<li><img src='${url}' height='32' width='32'/> ${name} </li>",
    insertTpl: ":${name}:",
    data: emojisList
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Github/Gitlabのみ対象
  var siteName = $('meta[property="og:site_name"]').attr("content")
  if( siteName === undefined || !siteName.match(/GitLab|GitHub/i)) { return; }

  // 絵文字対象
  var path = location.pathname;
  if( path === undefined || !path.match(/issues|pull|compare|merge_requests/)) { return; }

  loadEmoji().then(function (emoji){
    // サジェスト
    suggest(emoji);
    // 絵文字の書き換え
    var isGitHub = siteName.match(/GitHub/i) !== null;
    if( isGitHub ) {
      replaceElement(emoji, '.markdown-body');
    } else {
      replaceElement(emoji, '.wiki, .note-text');
    }
  }).catch(function () { });
});
