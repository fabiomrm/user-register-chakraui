import { Box, InputLeftElement, InputGroup, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

type Props = {
    onTextChange: (text: string) => void
}

export const Searchbar = ({ onTextChange }: Props) => {
    return (
        <Box
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
            borderRadius="md"
            p="1rem"
        >
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={ <SearchIcon color="green"/> } />
                <Input type="text" placeholder="Buscar" onChange={(e) => onTextChange(e.target.value)} />
            </InputGroup>
        </Box>
    )
}