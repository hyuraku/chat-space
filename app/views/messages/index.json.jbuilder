json.messages @messages.each do |message|
  json.user_name message.user.name
  json.created_at message.created_at
  json.text  message.body
  json.image message.image
  json.id    message.id
end
