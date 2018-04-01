$(function() {

  var search_list = $("#user-search-result");
  var user_list = $("#chat-group-users");

  function appendUser(user) {
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
    </div>
    `
    search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `
    <div id='user-search-result'>${ user }</div>
    `
    search_list.append(html);
  }

    $('.chat-group-form__field--right#search').on('click', 'a', function() {
      var add_user_id = $(this).attr('data-user-id')
      var add_user_name = $(this).attr('data-user-name')
      var add_html = `
      <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
        <input name='group[user_ids][]' type='hidden' value=${add_user_id}>
        <p class='chat-group-user__name'>${add_user_name}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>
      `
      user_list.append(add_html);
      $(this).parent().remove();
    });

    $('.chat-group-form__field--right#result').on('click', 'a', function(){
      $(this).parent().remove();
    });


  $('#user-search-field').on('keyup', function() {
    //e.preventDefault()
    var input = $("#user-search-field").val();
    if (input) {
      $.ajax({
          type: 'GET',
          url: '/users/',
          data: {
            keyword: input
          },
          dataType: 'json'
        })
        .done(function(users) {
          $("#user-search-result").empty();
          if (users.length !== 0) {
            users.forEach(function(user) {
              appendUser(user);
            });
          } else {
            appendNoUser("一致するユーザは居ません");
          }
        })
        .fail(function() {
          alert('ユーザ検索に失敗しました');
        })
      }else {
      $("#user-search-result").empty();
    }
  });
});
