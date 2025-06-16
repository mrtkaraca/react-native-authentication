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
    TAuthenticationRegisterUserEmailInfoObject,
    TAuthenticationRegisterUserEmailSchema,
    THandleOnChangeText,
    TUserEmailHookProps,
    TUserEmailYupUserErrors
} from "./type";
import { checkUser } from "@/api/register";
import { useErrorModal } from "@/contexts/errorModal";
import { useApiErrorHandler } from "@/api/hook";



export const useUserEmailHook = (props:TUserEmailHookProps)=>{


    const setUserRegisterObject = useAuthenticationRegisterContextStore((state)=>state.setUserRegisterObject)

    const {
        setErrorModalProps
    } = useErrorModal()

    const {
        errorResponseHandler
    } = useApiErrorHandler()

    const [isTextInputEditable,setIsTextInputEditable] = useState<boolean>(true)

    const userEmailInfoObject = useRef<TAuthenticationRegisterUserEmailInfoObject>({
        userEmail:null
    });
    
    const [userEmailValidationErrors,setUserEmailValidationErrors] = useState<TUserEmailYupUserErrors>(null)

    const userSchema = object().shape<TAuthenticationRegisterUserEmailSchema>({
        userEmail:(
            string()
            .required('Enter your email!')
            .email('Invalid email!')
        )
    });

    
    const handleOnChangeText:THandleOnChangeText = useCallback((
        userInfo,
        text
    )=>{
        userEmailInfoObject.current[userInfo] = text;
        if(userEmailValidationErrors !== null){
            setUserEmailValidationErrors(null)
        }
    },[userEmailValidationErrors])

    const handeYupValidate = useCallback(()=>{
        try{
            userSchema.validateSync(
                userEmailInfoObject.current,
                {   
                    abortEarly:false
                }
            )
            return true
        }
        catch(error){
            if(error instanceof ValidationError){
                setUserEmailValidationErrors(handeYupValidateErrors(error))
            }
            return false
        }
    },[])

    const checkUserNickName = useCallback(async()=>{
        let check = null
        const abortSignal = new AbortController()
        const [res,err] = await checkUser(
            {
                user:userEmailInfoObject.current.userEmail
            },
            abortSignal.signal,
            errorResponseHandler
        )

        if(res){
            if(res.isUser === true){
                setUserEmailValidationErrors({
                    userEmail:['Email is not available!']
                })
                check = false
            }
            else{
                check = true
            }
        }
        else{
            setErrorModalProps({
                isErrorModalVisible:true,
                errorModalData:err,
                textButtonProps:{
                    textButtonTextLabel:'Okay',
                    textButtonBorderRadius:9999,
                    textButtonOpacityColor:'grey',
                    handleOnPress:()=>{
                        setErrorModalProps(null)
                    }
                }
            })
        }

        return check

    },[])

    const handleNext = useCallback(async()=>{
    
        setIsTextInputEditable(false)

        const checkYupValidate = handeYupValidate()

        if(checkYupValidate){

            const check = await checkUserNickName()

            if(check){
                setUserRegisterObject(userEmailInfoObject.current)
                router.navigate('/authentication/register/userValidateEmail')
            }
            else{
                setIsTextInputEditable(true)
            }

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
        userEmailValidationErrors,
        handleOnChangeText,
        handleNext
    }
}