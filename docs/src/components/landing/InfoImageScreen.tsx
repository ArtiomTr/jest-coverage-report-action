// import Image from 'next/image';
import React from 'react';

import { InfoScreen, InfoScreenProps } from './InfoScreen';
import { ImageSrc, ResponsiveImage } from '../ResponsiveImage';

export type InfoImageScreenProps = Omit<InfoScreenProps, 'children'> & {
    images: ImageSrc[];
    alt: string;
};

export const InfoImageScreen = ({
    images,
    alt,
    ...infoScreenProps
}: InfoImageScreenProps) => (
    <InfoScreen {...infoScreenProps}>
        <ResponsiveImage alt={alt} width="100%" height="100%" images={images} />
    </InfoScreen>
);
