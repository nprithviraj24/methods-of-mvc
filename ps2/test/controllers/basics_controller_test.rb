require 'test_helper'

class BasicsControllerTest < ActionDispatch::IntegrationTest
  test "should get quotations" do
    get basics_quotations_url
    assert_response :success
  end

end
