import { Catch, ExceptionFilter, ArgumentsHost, HttpException, Inject } from '@nestjs/common';
import { LoggerService } from '../../core/logger/logger.service';

@Catch()
export class DispatchError implements ExceptionFilter {
    constructor(@Inject(LoggerService) private readonly logger: LoggerService) {}

    public catch(exception: Error, host: ArgumentsHost) {
        if (exception instanceof HttpException) {
            this.handleHttpExeption(exception, host);
        } else {
            this.handleOtherExeption(exception, host);
        }
    }

    private handleHttpExeption(exception: HttpException, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const error = {
            statusCode: status,
            message: exception.message.message,
            error: exception.message.error,
            timestamp: new Date().toISOString(),
            path: request.url,
        };

        this.logger.error(`Code: ${error.statusCode}; Path: ${error.path}; Error: ${error.error}; Message: ${error.message}; Timestamp: ${error.timestamp}`); //tslint:disable

        response
            .status(status)
            .json(error);
    }

    private handleOtherExeption(exception: Error, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const error = {
            statusCode: 500,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: exception.name,
            stack: exception.stack,
        }

        this.logger.error(`Code: ${error.statusCode}; Path: ${error.path}; Error: ${error.error}; Message: ${error.message}; Timestamp: ${error.timestamp}; Stack: ${error.stack}`)

        response
            .status(error.statusCode)
            .json(error);
    }
}
