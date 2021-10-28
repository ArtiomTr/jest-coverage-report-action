import React from 'react';

export type ResponsiveImageProps = {
    images: ImageSrc[];
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export type ImageSrc = {
    height: number;
    width: number;
    path: string;
};

export const ResponsiveImage = ({ images, ...other }: ResponsiveImageProps) => {
    return (
        <picture>
            {images
                .sort((a, b) => b.width - a.width)
                .slice(0, -1)
                .map((image, key) => (
                    <source
                        key={key}
                        media={`(min-width: ${image.width}px)`}
                        srcSet={image.path}
                    />
                ))}
            <img src={images[images.length - 1]?.path} {...other} />
        </picture>
    );
};
