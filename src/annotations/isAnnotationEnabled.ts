import { AnnotationType } from '../typings/Options.js';

export const isAnnotationEnabled = (
    option: string,
    annotationName: AnnotationType
): boolean => option === 'all' || option === annotationName;
