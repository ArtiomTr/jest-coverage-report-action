import { FailReason } from './Report';
import { i18n } from '../utils/i18n';

export class ActionError<T> extends Error {
    public readonly failReason: FailReason;

    public constructor(reason: FailReason, details?: T) {
        super(
            i18n(
                `errors.${reason}`,
                (details as unknown) as Record<string, unknown>
            )
        );
        this.failReason = reason;
    }

    public toString(): string {
        return this.message;
    }
}
