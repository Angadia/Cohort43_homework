# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

PASSWORD = '123'

# First destroy all records from table comments due to FK constraint.
Comment.destroy_all
# Then destroy all records from table posts.
Post.destroy_all
User.destroy_all

# Reset the primary key sequence to 1.
ActiveRecord::Base.connection.reset_pk_sequence!(:posts)
ActiveRecord::Base.connection.reset_pk_sequence!(:comments)
ActiveRecord::Base.connection.reset_pk_sequence!(:users)

5.times do |n|
  User.create(
    name: Faker::Name.first_name,
    email: "user#{n + 1}@user.io",
    password: PASSWORD
  )
end

users = User.all

puts Cowsay.say("Created #{users.count} users", :tux)
puts Cowsay.say("Users email are #{(users.map(&:email)).join(', ')}", :kitty)

# Bulk insert of 50 fake posts.
Post.insert_all(
  50.times.map do
    {
      title: Faker::Hacker.say_something_smart,
      body: Faker::ChuckNorris.fact,
      created_at: Faker::Time.backward(days: 365),
      updated_at: DateTime.now,
      user_id: users.sample.id
    }
  end
)

# Show how many fake posts are in the table posts.
puts Cowsay.say("Generated #{Post.count} posts using Faker.", :frogs)
puts Cowsay.say("Comments cleared out - #{Comment.count} comments.", :tux)
