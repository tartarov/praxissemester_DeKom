function formattingResponse(token, body) {
    const response = { token: token, body: body };
    return response;
  }
  
  module.exports = {formattingResponse}