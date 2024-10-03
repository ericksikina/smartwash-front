import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('token');

  // Verifica se o token existe antes de clonar a requisição
  if (authToken) {
    // Clone the request and add the authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `${authToken}`,
      },
    });

    // Pass the cloned request with the updated header to the next handler
    return next(authReq);
  }

  // Se o token for nulo, apenas passa a requisição original adiante
  return next(req);
};
