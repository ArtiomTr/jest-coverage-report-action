export const isAnnotationEnabled = (
    option: string,
    annotationName: string
): boolean => option === 'all' || option === annotationName;
