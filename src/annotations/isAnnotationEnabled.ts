import { AnnotationType } from '../typings/Options';

export const isAnnotationEnabled = (
    option: string,
    annotationName: AnnotationType
): boolean => option === 'all' || option === annotationName;
