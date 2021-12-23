export type SingleThreshold = {
    branches?: number;
    functions?: number;
    lines?: number;
    statements?: number;
};

export type JestThreshold = Record<string, SingleThreshold> & {
    global?: SingleThreshold;
};
