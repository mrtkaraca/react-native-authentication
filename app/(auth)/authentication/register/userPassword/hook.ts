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

import { router, useFocusEffect } from "expo-router";

import { useAuthenticationRegisterContextStore } from "@/contexts/authentication/register";

import { handeYupValidateErrors } from "../../helper";

import { 
    TAuthenticationRegisterUserPasswordInfoObject,
    TAuthenticationRegisterUserPasswordSchema,
    THandleOnChangeText,
    TUserPasswordHookProps,
    TUserPasswordYupUserErrors
} from "./type";



export const useUserPasswordHook = (props:TUserPasswordHookProps)=>{

    const minPasswordLength = 6

    const setUserRegisterObject = useAuthenticationRegisterContextStore((state)=>state.setUserRegisterObject)

    const [isTextInputEditable,setIsTextInputEditable] = useState<boolean>(true)

    const userPasswordInfoObject = useRef<TAuthenticationRegisterUserPasswordInfoObject>({
        userPassword:null
    });
    
    const [userPasswordValidationErrors,setUserPasswordValidationErrors] = useState<TUserPasswordYupUserErrors>(null)

    const userSchema = object().shape<TAuthenticationRegisterUserPasswordSchema>({
        userPassword:(
            string()
            .min(minPasswordLength , `Your password must be at least ${minPasswordLength} characters long.`)
        )
    });

    
    const handleOnChangeText:THandleOnChangeText = useCallback((
        userInfo,
        text
    )=>{
        userPasswordInfoObject.current[userInfo] = text;
        if(userPasswordValidationErrors !== null){
            setUserPasswordValidationErrors(null)
        }
    },[userPasswordValidationErrors])

    const handeYupValidate = useCallback(()=>{
        try{
            userSchema.validateSync(
                userPasswordInfoObject.current,
                {   
                    abortEarly:false
                }
            )
            return true
        }
        catch(error){
            if(error instanceof ValidationError){
                setUserPasswordValidationErrors(handeYupValidateErrors(error))
            }
            return false
        }
    },[])

    const handleNext = useCallback(()=>{
    
        setIsTextInputEditable(false)

        const checkYupValidate = handeYupValidate()

        if(checkYupValidate){
            setUserRegisterObject(userPasswordInfoObject.current)
            router.navigate('/authentication/register/userEmail')
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
        minPasswordLength,
        userPasswordValidationErrors,
        handleOnChangeText,
        handleNext
    }
}