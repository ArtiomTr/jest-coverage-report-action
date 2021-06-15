import CircleBadge from '@primer/components/lib/CircleBadge';
import { MarkGithubIcon } from '@primer/octicons-react';
import React from 'react';

export type BotLogoProps = {
    size?: number;
};

export const BotLogo = ({ size = 32 }: BotLogoProps) => (
    <CircleBadge size={size} backgroundColor="auto.black">
        <CircleBadge.Icon
            color="auto.white"
            size={size}
            icon={MarkGithubIcon}
        />
    </CircleBadge>
);
