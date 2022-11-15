export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
}

export interface httpResponse {
  statusCode: number;
  body: any;
}
