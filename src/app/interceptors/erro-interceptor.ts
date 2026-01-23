import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { LogService } from '../services/log-service';
import { inject } from '@angular/core';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  const log = inject(LogService);

  return next(req).pipe(
    catchError((error) => {      
      log.log(
        JSON.stringify({
          url: req.url,
          method: req.method,
          status: error.status,
          body: error.error,
        }), ''
      );

      return throwError(() => error);
    }),
  );
};
