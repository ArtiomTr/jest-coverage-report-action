import { FailReason } from './Report.js';
import { i18n } from '../utils/i18n.js';

export class ActionError<T> extends Error {
    public constructor(reason: FailReason, details?: T) {
        super(
            i18n(
                `errors.${reason}`,
                (details as unknown) as Record<string, unknown>
            )
        );
    }

    public toString(): string {
        return this.message;
    }
}
