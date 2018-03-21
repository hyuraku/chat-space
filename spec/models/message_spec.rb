require 'rails_helper'
describe Message do
  describe '#create' do
    it 'is valid will all item' do
      message = build(:message)
      expect(message).to be_valid
    end

    it 'is valid without body' do
      message = build(:message, body: '',image: 'sun.png')
      expect(message).to be_vaild
    end

    it 'is valid without image' do
      message=build(:message,image: '')
      expect(message).to be_valid
    end

    it 'is invalid without group_id' do
      message=build(:message,group_id: '')
      message.valid?
      expect(message.errors[:group]).to include('を入力してください')
    end

    it 'is invalid without user_id' do
      message=build(:message,user_id: '')
      message.valid?
      expect(message.errors[:user]).to include('を入力してください')
    end
  end
end
