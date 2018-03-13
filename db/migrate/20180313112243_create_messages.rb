class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.references :group, foreign_key: true, index: true
      t.references :user, foreign_key: true, index: true
      t.string :body
      t.string :image
      t.timestamps
    end
  end
end
