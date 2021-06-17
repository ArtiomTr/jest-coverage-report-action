// import Image from 'next/image';
import React from 'react';

import { InfoScreen, InfoScreenProps } from './InfoScreen';

export type InfoImageScreenProps = Omit<InfoScreenProps, 'children'> & {
    src: string;
    alt: string;
};

export const InfoImageScreen = ({
    src,
    alt,
    ...infoScreenProps
}: InfoImageScreenProps) => (
    <InfoScreen {...infoScreenProps}>
        <img src={src} width="100%" height="100%" alt={alt} />
    </InfoScreen>
);
