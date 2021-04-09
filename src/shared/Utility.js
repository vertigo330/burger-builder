export const updateObject = (oldObject, newProperties) => {
    return {
        ...oldObject,
        ...newProperties
    }
}

export const checkValidity = (rule, value) => {

    let isValid = true;

    if(rule.required) {
        isValid = isValid && value.trim().length > 0;
    }
    
    if(rule.minLength) {
        isValid = isValid && value.trim().length >= rule.minLength;
    }

    if(rule.maxLength) {
        isValid = isValid && value.trim().length <= rule.maxLength;
    }

    if(rule.isEmail){
        const regexp = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
        isValid = isValid && regexp.test(value);
    }

    return isValid;
}