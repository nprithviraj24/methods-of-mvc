class CreateRelations < ActiveRecord::Migration[5.2]
  def change
    create_table :relations do |t|
      t.string :relationsid
      t.references :student, foreign_key: true
      t.references :project, foreign_key: true

      t.timestamps
    end
  end
end
