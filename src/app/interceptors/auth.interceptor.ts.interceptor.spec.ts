import { TestBed } from '@angular/core/testing';

import { Auth.Interceptor.TsInterceptor } from './auth.interceptor.ts.interceptor';

describe('Auth.Interceptor.TsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Auth.Interceptor.TsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: Auth.Interceptor.TsInterceptor = TestBed.inject(Auth.Interceptor.TsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
