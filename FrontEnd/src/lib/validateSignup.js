const validate = (values) => {
    const errors = {};
    if (!values.fullName) {
        errors.fullName = "Full Name is required.";
    }
    if(!values.email){
        errors.email = "Email is required.";
    }
    if(values.email && !values.email.includes("@")){
        errors.email = "Please write email in correct format.";
    }
    if(!values.password){
        errors.password = "Password is required.";
    }
    if(values.password && values.password.length < 8){
        errors.password = "Password must be alteast 8 characters.";
    }
    
    return errors;
};

export default validate