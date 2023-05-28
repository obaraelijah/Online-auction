class ApiFeatures{
  // HERE API CONSTRUCTOR -> EX -> PRODUCTNAME = queryStr , Find-> query
  constructor(query , queryStr){
      this.query = query;
      this.queryStr = queryStr;
  }
  search(){
      const keyword = this.queryStr.keyword 
      ? {
          itemName:{

              // here to find name can also use inside find() -> But find name with pattern -> using mongodb operator regex
              // Ex: watch and watchex
              // "i" is for case insensetive             
              $regex: this.queryStr.keyword,
              $options: "i" ,
          },
      } 
      : {};

      this.query = this.query.find({ ...keyword }); 
      return this;
  }
  // Filter Functionality
filter() {
    const queryCopy = {...this.queryStr};
const removeFields = ["keyword" , "page" , "limit"];

removeFields.forEach((key) => delete queryCopy[key]);
let queryStr = JSON.stringify(queryCopy);
queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , (key) => `$${key}`);
this.query = this.query.find(JSON.parse(queryStr));
return this;

}
pagination(resultPerPage){
  const currentPage = Number(this.queryStr.page) || 1;  
  const skip = resultPerPage * (currentPage - 1);
  // Assign to  Query
  this.query = this.query.limit(resultPerPage).skip(skip); 
  return this;
}

};

export default ApiFeatures;