class Post < ApplicationRecord
  # Title is required and unique
  validates :title, presence: true, uniqueness: true

  # Body needs to be present and 50 or more characters.
  validates :body, presence: true, length: { minimum: 50 }
end
