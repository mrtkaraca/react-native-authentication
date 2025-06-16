import { ValidationError } from "yup"

export const handeYupValidateErrors = (
    error:ValidationError
)=>{
    var validationErrors = []
    for(const err of error.inner){
        if(err.path){
            let obj = {
                [err.path]:err.message
            }
            validationErrors.push(obj)
        }
    }

    const reducedValidationErrors = validationErrors.reduce((prev,curr)=>{
        (Object.keys(curr)).forEach((key)=>{
            if(prev?.[key]){
                prev[key].push(curr[key])
            }
            else{
                prev = {
                    ...prev,
                    [key]:[
                        curr[key]
                    ]
                }
            }
        })
        return prev
    },{} as Record<string,Array<string>>)

    return reducedValidationErrors
}

export default {
    handeYupValidateErrors
}