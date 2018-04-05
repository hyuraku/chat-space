$(function() {
  function buildHTML(message) {
    var html = `<div class="chatMain__body__oneMess" data-message-id=${message.id}>
                ${message.user_name}
                <div class="chatMain__body__oneMess__time">
                ${message.created_at}
                </div>
                </div>
                <p class="chatMain__body__detail">
                ${message.text}
                </p>`;
    if (message.image.url) {
      html = html + `<img class="chatMain__body__image" src=${message.image.url} alt="" >`;
    }

    return html;
  }

  $('.chatMain__footer--send').removeAttr('data-disable-with');

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var html = buildHTML(data);
        $('.chatMain__body').append(html);
        $('.chatMain__footer__body').val('');
        $('.chatMain__footer__body--hidden').val('');
      })
      .fail(function() {
        alert('error');
      });
    $('.chatMain__body').animate({
      scrollTop: $('.chatMain__body')[0].scrollHeight
    }, 'fast');
  });

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var present_mess = $('.chatMain__body__oneMess')[$('.chatMain__body__oneMess').length -1]
      var last_message_id = $(present_mess).attr("data-message-id");
      // var present_mess = $('.chatMain__body__oneMess')
      // var last_message_id = present_mess[present_mess.length - 1].getAttribute("data-message-id");
      $.ajax({
          url: location.href.json,
          type:'GET',
          data: {
            keyword : last_message_id
          },
          dataType:'json'
        })
        .done(function(json) {
          var insertHTML = '';
          json.messages.forEach(function(message) {
            if (message.id > last_message_id) {
              insertHTML += buildHTML(message);
              $('.chatMain__body').animate({
                scrollTop: $('.chatMain__body')[0].scrollHeight
              }, 'fast');
            }
          });
          $('.chatMain__body').append(insertHTML);
        })
        .fail(function(json) {
          alert("自動更新に失敗しました");
        });
    } else {
      clearInterval(interval);
    }
  }, 5000);
});
