require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get solution1" do
    get home_solution1_url
    assert_response :success
  end

end
