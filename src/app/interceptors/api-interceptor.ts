// api.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: {
      'X-API-Key': '123456-MOCK-KEY'
    }
  });

  return next(cloned);
};
