$(function() {

  var search_list = $("#user-search-result");

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

  $('#user-search-field').on('keyup', function() {
    //e.preventDefault()
    var input = $("#user-search-field").val();
    input = input.replace(/\s+/g,"");
    console.log(input);
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
