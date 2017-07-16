import { MockHttpResponse } from './mock-http-response';

export class MockHttp {
  get() {
    return MockHttpResponse.createResponse([]);
  }
}
