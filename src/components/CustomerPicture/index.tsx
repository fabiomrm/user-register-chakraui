import { Image, Avatar } from '@chakra-ui/react';
import { Customer } from '../../types/Customer';

type Props = {
    pictureBase64?: string;
    customer?: Customer | null;
    selectProfilePicture?: () => void;
};

export const CustomerPicture = ({pictureBase64, customer, selectProfilePicture }: Props) => {
    return(
        <>
            {
               (pictureBase64 && pictureBase64.length > 0) || customer?.pictureUrl ? 
                (
                    <Image src={(pictureBase64 && pictureBase64.length > 0) ? pictureBase64 : customer?.pictureUrl}
                        boxSize={20}
                        objectFit="cover"
                        style={{cursor: "pointer"}}
                        onClick={selectProfilePicture}
                    />
                ) :
                (
                    <Avatar 
                        bg="green" 
                        style={{cursor: "pointer"}} 
                        onClick={selectProfilePicture}
                    />
                )
            }
        </>
    );
}