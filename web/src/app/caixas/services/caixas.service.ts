import { Injectable, EventEmitter } from '@angular/core';
import { AppHttpService } from '../../app-http.service';

@Injectable()
export class CaixasService extends AppHttpService {
    eventEmitter: EventEmitter<any> = new EventEmitter;

    builder(resource: string = '') {
        return super.builder(resource);
    }
}
