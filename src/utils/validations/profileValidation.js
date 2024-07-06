export const editProfileValidation = (data)=>{
    let errors = {};

    function isValidDate(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }

    if(data.name && (data.name.length < 3 || data.name.length > 14) ){
        errors.name = "Fullname must have 3 to 14 characters.";
    }
    
    if(data.username && (data.username.trim().includes(" ") || /[^a-zA-Z0-9]/.test(data.username))){
        errors.username = "Username should not contain any spaces or special characters.";
    }

    if(data.date && !isValidDate(data.dob)){
        errors.dob = "DOB must be in dd-mm-yy formate"
    }
    
    return errors;
}