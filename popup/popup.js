var Page = function() {
};

const KeyEmoji = "emoji";
const KeyToken = "token";

Page.prototype.load = function() {
  var context = this;
  var tabId   = 0;
  chrome.tabs.query({"active": true}, function(tab) {
    tabId = tab[0].id;
  });

  var token = localStorage.getItem(KeyToken);
  console.log("url = " + url);
  if( token ) {
    $('input[name="token"]').val(url);
  }
};

Page.prototype.getEmoji = function() {
  var token = $('input[name="token"]').val()
  var url = "https://slack.com/api/emoji.list?token=" + token;
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
      localStorage.setItem(KeyToken, token);

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
