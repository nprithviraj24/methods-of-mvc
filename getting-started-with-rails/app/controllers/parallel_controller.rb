class ParallelController < ApplicationController
    def parallelrate
        require 'openssl'
        require 'open-uri'
        doc = Nokogiri::HTML(open('https://news.google.com/', :ssl_verify_mode => OpenSSL::SSL::VERIFY_NONE))
        # rate = []
        # entries = doc.xpath('c-wiz')
        # rate.push(entries.css('a')["href"])
        # @formattedrate = rate[6..8]
        # @formattedrate = doc.css('c-wiz')[1].text

        # page = Nokogiri::HTML(open(PAGE_URL))
        cwiz = doc.css("c-wiz")
        articles = cwiz.css("article")
        main = articles.css("span")
        links = articles.css("a")
        img = articles.css("img")
        # puts links.length   # => 6
        # puts links[0].text   # => Click here
        # @formattedrate =  links[0]["href"] # => http://www.google.com
        @formattedrate = img[1]["src"]
        @item = links
        @image = img

        # @formattedrate = rate
        render template: 'parallel/home'
      end
end
