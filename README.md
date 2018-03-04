# DB設計

## users table

Column | Type   | Options
:----- | :----- | :----------------------------------
name   | string | index:true, null: false, unique:true
email  | text   | null: false

## Association

- has_many :groups ,though: group_users
- has_many :messages
- has_many :group_users
- has_many :comments

--------------------------------------------------------------------------------

## group_users table

Column   | Type    | Options
:------- | :------ | :-----------------------------
user_id  | integer | index:true, null: false, foreign_key: true
group_id | integer | null: false, foreign_key: true

## Association

- belongs_to :group
- belongs_to :user

--------------------------------------------------------------------------------

## groups table
Column   | Type    | Options
:------- | :------ | :-----------------------------
name | string | index:true, null: false, unique:true
user_id  | integer | foreign_key: true
## Association
- has_many :users through: group_users
- has_many :messages
- has_many :group_users

--------------------------------------------------------------------------------

## messages table

Column   | Type    | Options
:------- | :------ | :-----------------------------
body     | text    | null: false
image    | string
group_id | integer | null: false, foreign_key: true
user_id  | integer | null: false, foreign_key: true

## Association

- belongs_to :group
- belongs_to :user

- has_many :comments

--------------------------------------------------------------------------------

## comments table

Column     | Type    | Options
:--------- | :------ | :-----------------------------
body       | text    | null: false
message_id | integer | null: false, foreign_key: true
group_id   | integer | null: false, foreign_key: true
user_id    | integer | null: false, foreign_key: true

## Association

- belongs_to :user
- belongs_to :group
- belongs_to :comment
