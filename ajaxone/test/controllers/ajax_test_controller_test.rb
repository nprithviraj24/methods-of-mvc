require 'test_helper'

class AjaxTestControllerTest < ActionDispatch::IntegrationTest
  test "should get myaction" do
    get ajax_test_myaction_url
    assert_response :success
  end

  test "should get myresponse" do
    get ajax_test_myresponse_url
    assert_response :success
  end

end
