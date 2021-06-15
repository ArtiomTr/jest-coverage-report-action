/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
    const SvgComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;

    export default SvgComponent;
}
