Feature: Student
In order to keep track of which students are working on which projects, as a teacher, I want to associate students with projects.
    
Scenario: Add student to a project

    A teacher should be able to add students to a project.

    Given I am a admin
    And there is an ordinary user
    And I am logged in
    And I want to add an account owned by the user
    
    When I visit the accounts page
    Then I should see a "New Account" link

    When I click the "New Account" link
    Then I should see a form to add a student
    