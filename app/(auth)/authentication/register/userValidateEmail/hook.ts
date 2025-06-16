import { 
    useCallback,
    useEffect,
    useRef,
    useState,
    useTransition,
} from "react";


import { useAuthenticationRegisterContextStore } from "@/contexts/authentication/register";

import { 
    TUserValidateEmailHookProps
} from "./type";
import { TAuthTextInputLabelProps } from "../../components/AuthTextInputLabel/type";
import { createUser, sendVerificationEmail, validateVerificationEmail } from "@/api/register";
import { useApiErrorHandler } from "@/api/hook";
import { useErrorModal } from "@/contexts/errorModal";
import { TRegisterValidateVerificationEmailApiData } from "@/api/register/type";
import { TAuthError } from "../../components/AuthError/type";
import { useAuthentication } from "@/contexts/authentication";
import { router } from "expo-router";
import { useCustomRoute } from "@/app/hooks";



export const useUserValidateEmaildHook = (props:TUserValidateEmailHookProps)=>{

    const resendValidationEmailSecondDuration = 30
    const initialDisabledTextButtonLabel = `Resend (${resendValidationEmailSecondDuration})s`
    const initialTextButtonLabel = 'Resend'


    const userRegisterObject = useAuthenticationRegisterContextStore((state)=>state.userRegisterObject)
    const setUserRegisterObject = useAuthenticationRegisterContextStore((state)=>state.setUserRegisterObject)

    const {
        resetAndNavigate
    } = useCustomRoute()

    const {
        handleAuthenticationLogin
    } = useAuthentication()

    const initialAuthenticationLabel:TAuthTextInputLabelProps = {
        title:'Check your email.',
        description:`To verify your email, click on the link we sent to your ${userRegisterObject.userEmail} address to verify your account.`
    }
    
    const {
        errorResponseHandler
    } = useApiErrorHandler()

    const {
        setErrorModalProps
    } = useErrorModal()

    const sendVerificationEmailIntervalCountDown = useRef(resendValidationEmailSecondDuration)
    const sendVerificationEmailInterval= useRef<number | null>(null)
    const validateVerificationEmailInterval = useRef<number | null>(null)

    const [isPending,setIsPending] = useState(true)
    const [textButtonLabel,setTextButtonLabel] = useState(initialDisabledTextButtonLabel)
    const [isTextButtonDisabled,setIsTextButtonDisabled] = useState(true)
    const [userToken,setUserToken] = useState<TRegisterValidateVerificationEmailApiData | null>(null)
    const [isIntervalCountdownActive,setIsIntervalCountdownActive] = useState(false)
    const [isValidateVerificationEmailIntervalActive,setIsValidateVerificationEmailIntervalActive] = useState(false)
    const [authError,setAuthError]=useState<TAuthError>({
        isValid:null
    })


    const [authenticationLabel,setAuthenticationLabel] = useState<TAuthTextInputLabelProps>(initialAuthenticationLabel)


    const handleSendVerificationEmail = useCallback(async()=>{

        let check = null

        const abortControl = new AbortController()

        const [res,err] = await sendVerificationEmail(
            {
                userEmail:userRegisterObject.userEmail
            },
            abortControl.signal,
            errorResponseHandler
        )

        if(res){
            if(res.isMailSent){
                check = true
                setUserToken({
                    userToken:res.userToken
                })
            }
            else{
                check = false
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

    const handleResendVerificationEmailOnPress = useCallback(()=>{
        setIsPending(true)
    },[])

    const handleCreateUser = useCallback(async()=>{
        const abortControl = new AbortController()
        
        const [res,err] = await createUser(
            userRegisterObject,
            abortControl.signal,
            errorResponseHandler
        )

        if(res){
            handleAuthenticationLogin({
                userNickName:res.userNickName,
                authToken:res.authToken
            })
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
                        router.dismissTo('/authentication/login')
                    }
                }
            })
        }
    },[])

    const handleValidateVerificationMail = useCallback(async()=>{

        if(userToken){
            const intrv = setInterval(async() => {

                const abortControl = new AbortController()
        
                const [res,err] = await validateVerificationEmail(
                    userToken,
                    abortControl.signal,
                    errorResponseHandler
                )
    
                if(res){
                    if(res.isActive !== null){
                        if(res.isActive){
                            setIsValidateVerificationEmailIntervalActive(false)
                            await handleCreateUser()
                        }
                    }
                    else{
                        setIsValidateVerificationEmailIntervalActive(false)
                        setAuthError({
                            isValid:false,
                            authErrorMessage:'Verification link is expired! Please try again to resend verification link.'
                        })
                    }
                }
            }, 1000);

            validateVerificationEmailInterval.current = intrv
        }

    },[userToken])

    useEffect(()=>{
        if(isPending){
            (async()=>{
                const check = await handleSendVerificationEmail()
                if(check){
                    setIsTextButtonDisabled(true)
                    setAuthenticationLabel(initialAuthenticationLabel)
                    setTextButtonLabel(initialDisabledTextButtonLabel)
                    setIsIntervalCountdownActive(true)
                    setIsValidateVerificationEmailIntervalActive(true)
                }
                else{
                    setIsTextButtonDisabled(false)
                    setAuthenticationLabel({
                        title:'Failed to send verification mail!',
                        description:'Try again to get verification mail.'
                    })
                    setTextButtonLabel(initialTextButtonLabel)
                    setIsIntervalCountdownActive(false)
                    setIsValidateVerificationEmailIntervalActive(false)
                }

                setIsPending(false)
            })()
        }
    },[isPending])

    useEffect(()=>{
        if(isIntervalCountdownActive){
            setIsTextButtonDisabled(true)
            sendVerificationEmailIntervalCountDown.current = resendValidationEmailSecondDuration
            const interval = setInterval(() => {
                if(sendVerificationEmailIntervalCountDown.current > 0){
                    sendVerificationEmailIntervalCountDown.current -= 1
                    setTextButtonLabel(`Resend (${sendVerificationEmailIntervalCountDown.current})s`)
                }
                else{
                    setTextButtonLabel(initialTextButtonLabel)
                    setIsTextButtonDisabled(false)
                    setIsIntervalCountdownActive(false)
                }
            },1000);

            sendVerificationEmailInterval.current = interval

        }
        else{
            if(sendVerificationEmailInterval.current){
                clearInterval(sendVerificationEmailInterval.current)
            }
        }

        return ()=>{
            if(sendVerificationEmailInterval.current){
                clearInterval(sendVerificationEmailInterval.current)
            }
        }
    },[isIntervalCountdownActive])

    useEffect(()=>{
        if(isValidateVerificationEmailIntervalActive){
            handleValidateVerificationMail()
        }
        else{
            if(validateVerificationEmailInterval.current){
                clearInterval(validateVerificationEmailInterval.current)
            }
        }

        return ()=>{
            if(validateVerificationEmailInterval.current){
                clearInterval(validateVerificationEmailInterval.current)
            }
        }
    },[isValidateVerificationEmailIntervalActive,handleValidateVerificationMail])

      
    return{
        authError,
        textButtonLabel,
        isPending,
        authenticationLabel,
        isTextButtonDisabled,
        handleResendVerificationEmailOnPress
    }
}