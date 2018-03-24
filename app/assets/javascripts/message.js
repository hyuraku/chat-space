$(function() {
  function buildHTML(message) {
    var html = `<div class="chatMain__body__oneMess">
                ${message.user_name}

                <div class="chatMain__body__oneMess__time">
                ${message.created_at}
                </div>
                </div>
                <p class="chatMain__body__detail">
                ${message.text}
                </p>`
    if (message.image.url) {
      html = html + `<img class="chatMain__body__image" src=${message.image.url} alt="" >`
    }

    return html;
  }

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
      })
      .fail(function() {
        alert('error');
      })
    $('.chatMain__body').animate({
      scrollTop: $('.chatMain__body')[0].scrollHeight
    }, 'fast');
  })
});
