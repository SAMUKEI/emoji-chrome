var Page = function() {
};

const KeyEmoji = "emoji";
const KeyUrl = "url";

Page.prototype.load = function() {
  var context = this;
  var tabId   = 0;
  chrome.tabs.query({"active": true}, function(tab) {
    tabId = tab[0].id;
  });

  var url = localStorage.getItem(KeyUrl);
  console.log("url = " + url);
  if( url ) {
    $('input[name="emoji_url"]').val(url);
  }
};

Page.prototype.getEmoji = function() {
  var url = $('input[name="emoji_url"]').val();
  if( url ) {
    $.getJSON(url, function() {
      // do nothing
    })
    .done(function(json) {
      var result = {};
      $.each(json[KeyEmoji], function(key, val) {
        result[":" + key +  ":"] = val;
      });

      localStorage.clear();
      localStorage.setItem(KeyEmoji, JSON.stringify(result));
      localStorage.setItem(KeyUrl, url);

      $("#error").text('emoji.listの取得成功');
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      $("#error").text('emoji.listの取得に失敗しました');
    });
  }
};

$(document).ready(function() {
  var page = new Page();
  $("#setup").click(function() {
    console.log("click setup");
    page.getEmoji();
  });
  page.load();
});
