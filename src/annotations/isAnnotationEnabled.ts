import { ValidAnnotationsOption } from './isAnnotationsOptionValid';

export const isAnnotationEnabled = (
    option: string,
    annotationName: ValidAnnotationsOption
): boolean => option === 'all' || option === annotationName;
