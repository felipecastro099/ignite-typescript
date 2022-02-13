import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

dayjs.extend(utc);

class DayJsDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        const endDateUtc = this.convertToUtc(end_date);
        const startDateUtc = this.convertToUtc(start_date);
        return dayjs(endDateUtc).diff(startDateUtc, 'hours');
    }

    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }
}

export { DayJsDateProvider };
