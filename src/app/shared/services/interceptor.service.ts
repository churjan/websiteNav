import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

// Authentication Interceptor
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken =
      '2d584edeae43e29c1abe9a1da0789d41785f3d45ea0094b74a7121d59c9fa3ba796a8622c68c9f96faf22c80a814a25b3f68c0c7ce369cdf8ea77fe16c1ffcd7e67768e226886820e37e5f88405f48c62c715dd8ad3b2a2aeab584199ad7c3b90e0110fccc585557334df61d1aec45010275e7b4a4a81cfdb0f810add052b2e7';
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next.handle(authRequest);
  }
}

// Error Handling Interceptor
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: NzMessageService) {}

  private errorMessages: { [key: number]: string } = {
    400: '请求参数错误，请检查输入内容',
    401: '用户未授权，请先登录',
    403: '您无权访问此资源',
    404: '请求的资源未找到，请检查请求路径',
    405: '请求方法不允许，请使用正确的请求方法',
    408: '请求超时，请稍后再试',
    410: '请求的资源已被删除',
    413: '请求数据过大，请调整后再试',
    415: '不支持的媒体类型，请确认请求数据格式',
    422: '请求数据无法处理，请检查数据内容',
    429: '请求过于频繁，请稍后再试',
    500: '服务器内部错误，请稍后再试',
    501: '请求的功能未实现，请稍后再试',
    502: '错误网关，请稍后再试',
    503: '服务不可用，请稍后再试',
    504: '网关超时，请稍后再试',
  };

  private extractErrorMessage(error: HttpErrorResponse): string {
    let errorMessage = '未知错误，请稍后再试';
    const statusCode = error.status;
    if (this.errorMessages[statusCode]) {
      errorMessage = this.errorMessages[statusCode];
    }
    // 尝试从error.error中提取更详细的错误信息（如果有的话）
    if (error.error && typeof error.error === 'string') {
      errorMessage = error.error;
    }
    return errorMessage;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.extractErrorMessage(error);
        this.messageService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
