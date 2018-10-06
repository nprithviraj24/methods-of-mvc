json.extract! student, :id, :name, :url, :created_at, :updated_at
json.url student_url(student, format: :json)
