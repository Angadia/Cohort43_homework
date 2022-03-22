# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# First destroy all records from table comments due to FK constraint.
Comment.destroy_all
# Then destroy all records from table posts.
Post.destroy_all

# Reset the primary key sequence to 1.
ActiveRecord::Base.connection.reset_pk_sequence!(:posts)
ActiveRecord::Base.connection.reset_pk_sequence!(:comments)

# Bulk insert of 50 fake posts.
Post.insert_all(
  50.times.map do
    {
      title: Faker::Hacker.say_something_smart,
      body: Faker::ChuckNorris.fact,
      created_at: Faker::Time.backward(days: 365),
      updated_at: DateTime.now
    }
  end
)

# Show how many fake posts are in the table posts.
puts Cowsay.say("Generated #{Post.count} posts using Faker.", :frogs)
puts Cowsay.say("Comments cleared out - #{Comment.count} comments.", :tux)
