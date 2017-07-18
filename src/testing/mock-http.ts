import { MockHttpResponse } from './mock-http-response';

export class MockHttp {
  get() {
    return MockHttpResponse.createResponse([]);
  }

  post() {
    return MockHttpResponse.createResponse([]);

  }

  put() {
    return MockHttpResponse.createResponse([]);

  }

  delete() {
    return MockHttpResponse.createResponse([]);
  }

  patch() {
    return MockHttpResponse.createResponse([]);
  }

  head() {
    return MockHttpResponse.createResponse([]);
  }

  request() {
    return MockHttpResponse.createResponse([]);
  }
}
