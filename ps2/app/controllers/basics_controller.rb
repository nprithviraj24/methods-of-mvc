class BasicsController < ApplicationController
  # before_filter :handle_cookies
  helper_method :cookies
  # $kill_ids = []
  def quotations
    if params[:quotation]
      temp = params.require(:quotation).permit(:author_name, :category, :new_category, :quote)
      if temp[:category].blank?
        temp[:category] = temp[:new_category]
        temp.delete :new_category
      else
        temp.delete :new_category
      end
      logger.debug temp
      @quotation = Quotation.new temp	
      

      if @quotation.save
        flash[:notice] = 'Quotation was successfully created.'
        @quotation = Quotation.new

      end
    else
      @quotation = Quotation.new
    end

    if !cookies[:key].nil?
      id_array = cookies[:key].split(%r{,\s*}).map(&:to_i)
    else
      id_array = nil
    end 
    if params[:sort_by] == "date"      
      @quotations = Quotation.where.not(id: id_array).order(:created_at)
    else   
      @quotations = Quotation.where.not(id: id_array).order(:category)
    end
     @categories = Quotation.select(:category).distinct
  end

  def search
    logger = Logger.new STDOUT
    quote = params[:quote]
    # @quotation1 = Quotation.where("quote LIKE ?", "%#{quote}%")
    # @quotations = @quotation1
    if params[:quote]
      @quotations = Quotation.where('lower(quote) LIKE ?', "%#{params[:quote].downcase}%")
                    .or(Quotation.where('lower(author_name) LIKE ?', "%#{params[:quote].downcase}%"))
      
    else
      @quotations = Quotation.all
    end
    
    logger.info "The quote to be searched: "
    logger.info quote
    logger.info "The query values: "
    logger.info @quotations
    # logger.info "The actual cookies : "
    # logger.info cookies[:key]
    @categories = Quotation.select(:category).distinct
    @quotation = Quotation.new
    render 'quotations'
  end

  def kill
    # JSON["id"].push(params[:id]) 
    incoming_id = params[:id] 
    # $kill_ids = cookies[:key].split("&")
    # k = cookies[:key].split("[")
    # $kill_ids.push(incoming_id)
    # id = []
    # cookies[:key] = { :value => JSON.generate(id)}
    cookies[:key] = '' if cookies[:key].nil?
    cookies[:key] = cookies[:key] + "#{incoming_id},"
    # $kill_ids = cookies[:key].split("%22")
    # if params[:search]
    #   @quotation = Quotation.where('store LIKE ?', "%#{params[:store]}%")
    # else
    #   @coupon = Coupon.all
    # end
    # dont = []
    kill_ids = cookies[:key].split(%r{,\s*})
    id_array = kill_ids.map(&:to_i)
    # dont.push(Quotation.where_not())

    # logger = Logger.new STDOUT
    # logger.info "The ids:"
    # logger.info id_array
    # logger.info "The ID : "
    # logger.info incoming_id
    # logger.info "The actual cookies : "
    # logger.info cookies[:key]
    
    @quotations = Quotation.where.not(id: id_array)
    @quotation = Quotation.new
    @categories = Quotation.select(:category).distinct
    render 'quotations'
    # $kill_ids.clear
  end  
  # def self.where_not(opts)
  #   params = []        
  #   sql = opts.map{|k, v| params << v; "#{quoted_table_name}.#{quote_column_name k} != ?"}.join(' AND ')
  #   where(sql, *params)
  # end

  def erase
    cookies.delete :key
    
    @quotations = Quotation.all 
    @quotation = Quotation.new
    @categories = Quotation.select(:category).distinct
    render 'quotations'
  end

end
