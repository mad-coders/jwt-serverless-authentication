import { BadRequestException } from '@nestjs/common';
import * as _ from 'lodash';

export function NotNullValidator(fields, message?) {
    _.forEach(fields, (value, key) => {
        if (!value || _.isEmpty(value)) {
            if (message) {
                console.log(message);
                throw new BadRequestException(message);
            } else {
                console.log(`${key} not provided`);
                throw new BadRequestException(`${key} not provided`);
            }
        }
    });
}
