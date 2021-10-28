/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
    const SvgComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;

    export default SvgComponent;
}

type ResponsiveImageSource = {
    srcSet: string;
    images: Array<{ width: number; height: number; path: string }>;
    src: string;
    toString: () => string;
};

declare module '*.jpeg' {
    const value: ResponsiveImageSource;

    export = value;
}

declare module '*.jpg' {
    const value: ResponsiveImageSource;
    export = value;
}
