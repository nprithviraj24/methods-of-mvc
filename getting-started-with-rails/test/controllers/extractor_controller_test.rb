require 'test_helper'

class ExtractorControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get extractor_index_url
    assert_response :success
  end

end
