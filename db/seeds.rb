10.times do
  todo = Todo.create(
    title:       Faker::Lorem.sentence(word_count: 3),
    description: Faker::Lorem.paragraph(sentence_count: 3),
    done:        rand(0..1)
  )
  puts todo.title
end
