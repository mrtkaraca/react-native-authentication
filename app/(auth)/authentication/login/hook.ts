import { 
  useCallback,
    useRef,
    useState 
} from "react";
import { 
    object, 
    string, 
    ValidationError 
} from "yup";

import { signInUser } from "@/api/login";

import { handeYupValidateErrors } from "../helper";

import { 
    THandleOnChangeText,
    TLoginHookProps,
    TLoginUserSchema, 
    TLoginYupUserErrors, 
    TLoginUserInfoObject
} from "./type";

import { useApiErrorHandler } from "@/api/hook";
import { useAuthentication } from "@/contexts/authentication";
import { useErrorModalHook } from "@/components/ErrorModal/hook";
import { useErrorModal } from "@/contexts/errorModal";
import { router } from "expo-router";



export const useLoginHook = (props:TLoginHookProps)=>{

    const {
        handleAuthenticationLogin
    } = useAuthentication()

    const {
        errorResponseHandler
    } = useApiErrorHandler()

    const {
        setErrorModalProps
    } = useErrorModal()

    const userInfoObject = useRef<TLoginUserInfoObject>({
        user:null,
        userPassword:null
    });
    
    const [userLoginValidationErrors,setUserLoginValidationErrors] = useState<TLoginYupUserErrors>(null)

    const userSchema = object().shape<TLoginUserSchema>({
        user: (
            string()
            .required("Enter nickname or email.")
            .test(
              'email-or-nickname',
              "Invalid nickname or email!",
              (value)=>{
                return (
                    string()
                    .matches(RegExp("^([0-9A-Za-z])*([0-9A-Za-z]*(?<=([0-9A-Za-z]))[\.]{0,1}(?=[0-9A-Za-z]))*([0-9A-Za-z])*$"))
                    .isValidSync(value)
                    ||
                    string()
                    .email()
                    .isValidSync(value)
                )
              }
            )
        ),
        userPassword: (
            string()
            .required("Enter password.")
        )
    });

    

    const handleOnChangeText:THandleOnChangeText = useCallback((
        userInfo,
        text
    )=>{
        userInfoObject.current[userInfo] = text;
        if(userLoginValidationErrors !== null){
            setUserLoginValidationErrors(null)
        }
    },[userLoginValidationErrors])

    const handeYupValidate = useCallback(()=>{
        try{
            userSchema.validateSync(
                userInfoObject.current,
                {   
                    abortEarly:false
                }
            )
            return true
        }
        catch(error){
            if(error instanceof ValidationError){
                setUserLoginValidationErrors(handeYupValidateErrors(error))
            }
            return false
        }
    },[])

    const handleOnLogin = useCallback(async()=>{
    
        const abortController = new AbortController();

        const checkYupValidate = handeYupValidate()

        if(checkYupValidate){
            const [res,err] = await signInUser(
                userInfoObject.current,
                abortController.signal,
                errorResponseHandler
            )

            if(res){
                if(
                    res.isUser && 
                    res.isCorrectPassword
                ){
                    handleAuthenticationLogin({
                        authToken:res.authToken,
                        userNickName:res.userNickName
                    })
                }
                else{
                    setUserLoginValidationErrors({
                        user:res.isUser === false ? ['User is not exists!'] : undefined,
                        userPassword:res.isCorrectPassword === false ? ['Wrong password!'] : undefined
                    })
                }
            }
            else{
                if(err){
                    setErrorModalProps({
                        isErrorModalVisible:true,
                        errorModalData:err,
                        textButtonProps:{
                            textButtonBorderRadius:9999,
                            textButtonTextLabel:'Okay',
                            textButtonOpacityColor:"grey",
                            handleOnPress:()=>{
                                setErrorModalProps(null)
                            }
                        }
                    })
                }
            }
            
        }
        
    },[])

        const handleOnRegister = useCallback(()=>{
        router.navigate('/authentication/register/userName')
    },[])

    return {
        userLoginValidationErrors,
        handleOnChangeText,
        handleOnLogin,
        handleOnRegister
    }
}

export default {
    useLoginHook
}