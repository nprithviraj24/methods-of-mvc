Given(/^I am a admin$/) do
    # pending # express the regexp above with the code you wish you had
    @user = FactoryBot.create :admin
end


Given(/^there is an ordinary user$/) do
    @ordinary = FactoryBot.create :student
end

Given(/^I am logged in$/) do
    visit '/users/sign_in'    
    fill_in 'Email', with: @user.email #unique name
    fill_in 'Password', with: @user.password #password
    
    click_button 'Log in'    
end

Given(/^I want to add an account owned by the user$/) do
    @account = FactoryBot.build :project
end

When(/^I visit the accounts page$/) do
    visit '/projects'
end

Then(/^I should see a "New Account" link$/) do
    expect(page).to have_link('Show', href: project_path(@account))
end

When(/^I click the link for the project$/) do
    find_link('Show', href: project_path(@project)).click
end

Then(/^I should see the details of my project$/) do
    # save_and_open_page
    expect(page).to have_content("Name: #{@project.name}")
    expect(page).to have_content("Url: #{@project.url}")
    log = Logger.new STDOUT
    log.info @project
end

# Then(/^I should see a form to add a student$/) do
#     expect(page).to have_selector('form#new_student')
# end