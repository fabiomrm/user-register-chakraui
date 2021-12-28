import { Text, Button, ThemeTypings } from '@chakra-ui/react';
import { Token } from '@chakra-ui/styled-system/dist/declarations/src/utils';
import * as CSS from 'csstype';
import React from 'react';
import { Link as RouterDOMLink, useNavigate } from 'react-router-dom';

type Props = {
    to: string;
    children?: React.ReactNode
    color?: Token<CSS.Property.Color, "colors">;
    colorScheme?: ThemeTypings["colorSchemes"];
    variant?: ThemeTypings["components"]["Button"]["variants"];
};

export const RouterLink = ({to, color, children, variant, colorScheme}: Props) => {

    const navigate = useNavigate();

    return (
        <>
           {
           variant ?
           <Button
                type="button" 
                variant={variant} 
                colorScheme={colorScheme ? colorScheme : "green"}
                onClick={() => navigate(to)}
            >
                Voltar
           </Button>
            :
            <RouterDOMLink to={to}>
                <Text as="span" color={color ? color : "green"} ml={2}>
                    {children}
                </Text>
            </RouterDOMLink>
           }      
        </>
    );
};