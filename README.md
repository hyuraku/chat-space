# DB設計

## users table

Column | Type   | Options
:----- | :----- | :-----------------------------------
name   | string | index:true, null: false, unique:true
email  | string | null: false

## Association

- has_many :groups ,though: group_users
- has_many :messages
- has_many :group_users

--------------------------------------------------------------------------------

## group_users table

Column   | Type    | Options
:------- | :------ | :-----------------------------------------
user_id  | integer | index:true, null: false, foreign_key: true
group_id | integer | null: false, foreign_key: true

## Association

- belongs_to :group
- belongs_to :user

--------------------------------------------------------------------------------

## groups table

Column  | Type    | Options
:------ | :------ | :-----------------------------------
name    | string  |null: false, unique:true

## Association

- has_many :users through: group_users
- has_many :messages
- has_many :group_users

--------------------------------------------------------------------------------

## messages table

Column   | Type    | Options
:------- | :------ | :-----------------------------
body     | string  |
image    | string  |
group_id | integer | null: false, foreign_key: true
user_id  | integer | null: false, foreign_key: true

## Association

- belongs_to :group
- belongs_to :user

--------------------------------------------------------------------------------
