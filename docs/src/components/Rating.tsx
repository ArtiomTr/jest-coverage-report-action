import { Flex, IconButton } from '@chakra-ui/react';
import { ThumbsdownIcon, ThumbsupIcon } from '@primer/octicons-react';
import React, { useCallback, useState } from 'react';

export const Rating = () => {
    const [isPageUseful, setIsPageUseful] = useState<boolean>();

    const like = useCallback(() => setIsPageUseful(true), []);
    const dislike = useCallback(() => setIsPageUseful(false), []);

    return (
        <Flex alignItems="center" justifyContent="center">
            {isPageUseful === undefined ? (
                <React.Fragment>
                    Is this page useful?
                    <IconButton
                        aria-label="Yes, page is useful"
                        marginLeft="2"
                        onClick={like}
                        icon={<ThumbsupIcon />}
                    />
                    <IconButton
                        aria-label="No, page is useless"
                        marginLeft="2"
                        onClick={dislike}
                        icon={<ThumbsdownIcon />}
                    />
                </React.Fragment>
            ) : (
                <React.Fragment>Thanks for letting us know!</React.Fragment>
            )}
        </Flex>
    );
};
