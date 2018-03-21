FactoryGirl.define do
  factory :message do
    group
    user
    body Faker::Lorem.sentence
    image File.open("#{Rails.root}/spec/public/personPic.png")
  end
end
