import { TErrorApiResponseObject } from "@/api/type";

import { TTextButtonProps } from "@/components/TextButton/type";

export type TErrorModalContextProps = {
    errorModalProps: {
        isErrorModalVisible: boolean;
        errorModalData?: TErrorApiResponseObject;
         textButtonProps:TTextButtonProps
    } | null;
    setErrorModalProps: React.Dispatch<React.SetStateAction<TErrorModalContextProps['errorModalProps']>>
}

export type TErrorModalProviderProps = {
    children : React.ReactNode
}