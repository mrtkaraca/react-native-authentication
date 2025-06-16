import { 
    startTransition,
    useCallback,
    useRef, 
    useState 
} from "react";
import { 
    object, 
    string, 
    ValidationError
} from "yup";

import { 
    TAuthenticationRegisterUserNameInfoObject, 
    TAuthenticationRegisterUserNameSchema,
    THandleOnChangeText,
    TUserNameHookProps, 
    TUserNameYupUserErrors 
} from "./type";
import { handeYupValidateErrors } from "../../helper";
import { router, useFocusEffect } from "expo-router";
import { useAuthenticationRegisterContextStore } from "@/contexts/authentication/register";


export const useUserNameHook = (props:TUserNameHookProps)=>{

    const userNameMaxLength = 64

    const setUserRegisterObject = useAuthenticationRegisterContextStore((state)=>state.setUserRegisterObject)

    const userNameInfoObject = useRef<TAuthenticationRegisterUserNameInfoObject>({
        userName:null
    });
    
    const [userNameValidationErrors,setUserNameValidationErrors] = useState<TUserNameYupUserErrors>(null)
    const [isTextInputEditable,setIsTextInputEditable] = useState<boolean>(true)

    const userSchema = object().shape<TAuthenticationRegisterUserNameSchema>({
        userName:(
            string()
            .nullable()
            .max(userNameMaxLength,`Your name can be up to ${userNameMaxLength} characters long!`)
        )
    });

    
    const handleOnChangeText:THandleOnChangeText = useCallback((
        userInfo,
        text
    )=>{
        userNameInfoObject.current[userInfo] = text;
        if(userNameValidationErrors !== null){
            setUserNameValidationErrors(null)
        }
    },[userNameValidationErrors])

    const handeYupValidate = useCallback(()=>{
        try{
            userSchema.validateSync(
                userNameInfoObject.current,
                {   
                    abortEarly:false
                }
            )
            return true
        }
        catch(error){
            if(error instanceof ValidationError){
                setUserNameValidationErrors(handeYupValidateErrors(error))
            }
            return false
        }
    },[])

    const handleNext = useCallback(()=>{
    
        setIsTextInputEditable(false)

        const checkYupValidate = handeYupValidate()

        if(checkYupValidate){
            setUserRegisterObject(userNameInfoObject.current)
            router.navigate('/authentication/register/userNickName')
        }
        else{
            setIsTextInputEditable(true)
        }
        
    },[])

    useFocusEffect(
        useCallback(()=>{
            setIsTextInputEditable(true)
        },[])
    )  
      
    return{
        isTextInputEditable,
        userNameValidationErrors,
        handleOnChangeText,
        handleNext
    }
}