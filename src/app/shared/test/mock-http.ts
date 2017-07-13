import { MockHttpResponse } from '../test/mock-http-response';

export class MockHttp {
  get() {
    return MockHttpResponse.createResponse([]);
  }
}
