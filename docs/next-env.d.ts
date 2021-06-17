/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
    const SvgComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;

    export default SvgComponent;
}

declare module '*.jpeg' {
    const value: string;
    export = value;
}

declare module '*.jpg' {
    const value: string;
    export = value;
}
