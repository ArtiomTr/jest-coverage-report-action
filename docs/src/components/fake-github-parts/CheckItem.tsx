import { GridItem } from '@chakra-ui/react';
import StyledOcticon from '@primer/components/lib/StyledOcticon';
import { XIcon } from '@primer/octicons-react';
import React, { PropsWithChildren } from 'react';

import { BotLogo } from '../BotLogo';

export type CheckItemProps = PropsWithChildren<{
    last?: boolean;
}>;

export const CheckItem = ({ children, last }: CheckItemProps) => (
    <React.Fragment>
        <GridItem
            justifyContent="center"
            display="flex"
            alignItems="center"
            borderColor="gray.200"
            borderTopWidth="thin"
            borderBottomWidth={last ? 'thin' : 'none'}
            pl="3"
        >
            <StyledOcticon size="small" color="icon.danger" icon={XIcon} />
        </GridItem>
        <GridItem
            display="flex"
            flexDir="row"
            alignItems="center"
            borderColor="gray.200"
            borderTopWidth="thin"
            borderBottomWidth={last ? 'thin' : 'none'}
            paddingY="1"
        >
            <BotLogo size={24} />
            {children}
        </GridItem>
    </React.Fragment>
);
