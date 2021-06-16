import Image from 'next/image';
import React from 'react';

import { InfoScreen, InfoScreenProps } from './InfoScreen';

export type InfoImageScreenProps = Omit<InfoScreenProps, 'children'> & {
    src: string;
};

export const InfoImageScreen = ({
    src,
    ...infoScreenProps
}: InfoImageScreenProps) => (
    <InfoScreen {...infoScreenProps}>
        <Image
            src={src}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
        />
    </InfoScreen>
);
