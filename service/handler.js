export const handleResponse = (response) => {
  if(response.status == 200 ||response.status == 201 ||response.status == 202){
      if(response.data){
          return {type: true, data:response.data, headers: response.headers, body: response.body}
      }else {
          return {type: false, message:"Some thing Went Wrong", status: response.status }
      }

  }else {
      throw "error"
  }}