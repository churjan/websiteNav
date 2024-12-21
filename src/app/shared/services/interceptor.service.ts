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
      '100199ce602cf7a04c9482bd070b01387ebb9e3d1ecd2d66a3bb9e28174af9a3a5dc457f057572dd058b0ddc5495ad25a7b7e249a4f0102d6d9cfea79e9588460587b58dfcac07585728be5f7aeb768c8e3a2654cb8fbcd205ef98e092570cf82c601efd18fb2a89c4794f7ac5d79b86805592453623a0654ba1abf495bbf4e7';
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
