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
import { router, useFocusEffect } from "expo-router";

import { useAuthenticationRegisterContextStore } from "@/contexts/authentication/register";
import { useErrorModal } from "@/contexts/errorModal";
import { checkUser } from "@/api/register";
import { useApiErrorHandler } from "@/api/hook";

import { handeYupValidateErrors } from "../../helper";

import { 
    TAuthenticationRegisterUserNickNameInfoObject,
    TAuthenticationRegisterUserNickNameSchema,
    TAuthTextInputValidation,
    THandleOnChangeText,
    TUserNickNameHookProps, 
    TUserNickNameYupUserErrors
} from "./type";

export const useUserNickNameHook = (props:TUserNickNameHookProps)=>{

    const timerMs= 1500
    
    const setUserRegisterObject = useAuthenticationRegisterContextStore((state)=>state.setUserRegisterObject)

    const {
        errorResponseHandler
    } = useApiErrorHandler()

    const {
        setErrorModalProps
    } = useErrorModal()

    const userNickNameInfoObject = useRef<TAuthenticationRegisterUserNickNameInfoObject>({
        userNickName:null
    });
    
    const checkUserNickNameTimer = useRef<number | undefined>(undefined)

    const [textInputValidation,setTextInputValidation] = useState<TAuthTextInputValidation>({
        isTextInputValid:null,
        isTextInputLoading:null
    })

    const [isTextInputEditable,setIsTextInputEditable] = useState<boolean>(true)

    const [userNickNameValidationErrors,setUserNickNameValidationErrors] = useState<TUserNickNameYupUserErrors>(null)

    const userSchema = object().shape<TAuthenticationRegisterUserNickNameSchema>({
        userNickName:(
            string()
            .required("Enter your user nick name!")
            .test(
                'nickname',
                'Your nickname can include dot (.) only as special character!',
                value=>{
                    if(value.match("^.*[^a-z0-9A-Z\.]+.*$")){
                        return false;
                    }
                    return true;
                }
            )
            .test(
                'nickname',
                'Wrong place to using dot!',
                value=>{
                    if(value.match("^([\.])+.*$")){
                    return false;
                    }
                    return true;
                }
            )
            .test(
                'nickname',
                'Wrong place to using dot!',
                value=>{
                    if(value.match("^.*[\.]+$")){
                    return false;
                    }
                    return true;
                }
            )
            .matches(RegExp("^([0-9A-Za-z])*([0-9A-Za-z]*(?<=([0-9A-Za-z]))[\.]{0,1}(?=[0-9A-Za-z]))*([0-9A-Za-z])*$"),"You cant use consecutive special character! (.)")
        )
    });

    const handeYupValidate = useCallback(()=>{
        try{
            userSchema.validateSync(
                userNickNameInfoObject.current,
                {   
                    abortEarly:false
                }
            )
            return true
        }
        catch(error){
            if(error instanceof ValidationError){
                setUserNickNameValidationErrors(handeYupValidateErrors(error))
            }
            return false
        }
    },[])

    const checkUserNickName = useCallback(async()=>{
        let check = null
        const abortSignal = new AbortController()
        const [res,err] = await checkUser(
            {
                user:userNickNameInfoObject.current.userNickName
            },
            abortSignal.signal,
            errorResponseHandler
        )

        if(res){
            if(res.isUser === true){
                setUserNickNameValidationErrors({
                    userNickName:['User nick name is not available!']
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

    const handleCheckUserNickName = useCallback(()=>{

        setTextInputValidation({
            isTextInputValid:null,
            isTextInputLoading:true
        })

        if(checkUserNickNameTimer.current !== undefined){
            clearTimeout(checkUserNickNameTimer.current)
        }

        if(userNickNameInfoObject.current.userNickName !== null){

            const checkValidate = handeYupValidate()
    
            if(checkValidate){
                const timer = setTimeout(async() => {
                    const check = await checkUserNickName()

                    setTextInputValidation({
                        isTextInputValid:check,
                        isTextInputLoading:false
                    })
          
                }, timerMs);
                checkUserNickNameTimer.current = timer
            }
            else{
                setTextInputValidation({
                    isTextInputValid:false,
                    isTextInputLoading:false
                })
            }
            
        }
        else{
           setTextInputValidation({
                isTextInputValid:null,
                isTextInputLoading:false
            })
        }

        
    },[])
    
    const handleOnChangeText:THandleOnChangeText = useCallback((
        userInfo,
        text
    )=>{
        userNickNameInfoObject.current[userInfo] = text.length > 0 ? text : null;
        if(userNickNameValidationErrors !== null){
            setUserNickNameValidationErrors(null)
        }
        handleCheckUserNickName()
    },[userNickNameValidationErrors,handleCheckUserNickName])


    const handleNext = useCallback(async()=>{
 
        if(textInputValidation?.isTextInputLoading === true) return

        setIsTextInputEditable(false)

        if(textInputValidation?.isTextInputValid){
            setUserRegisterObject(userNickNameInfoObject.current)
            router.navigate('/authentication/register/userPassword')
        }
        else{

            const checkYupValidate = handeYupValidate()

            if(checkYupValidate){
                const check = await checkUserNickName()

                if(check){
                    setUserRegisterObject(userNickNameInfoObject.current)
                    router.navigate('/authentication/register/userPassword')
                }
                else{
                    setIsTextInputEditable(true)
                }
      
                setTextInputValidation({
                    isTextInputValid:check,
                    isTextInputLoading:false
                })
            }
            else{
                setIsTextInputEditable(true)
                setTextInputValidation({
                    isTextInputLoading:false,
                    isTextInputValid:false
                })
            }
        }

   
        
    },[textInputValidation])

    
    useFocusEffect(
        useCallback(()=>{
            setIsTextInputEditable(true)
        },[])
    )  

    return{
        isTextInputEditable,
        textInputValidation,
        userNickNameValidationErrors,
        handleOnChangeText,
        handleNext
    }
}