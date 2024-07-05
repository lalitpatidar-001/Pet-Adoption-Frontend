export const handleRegisterationValidation = (data) => {
    let errors = {};

    // Helper function to validate email
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.[^<>()[\]\.,;:\s@"]{2,}))$/i;
        return re.test(String(email).toLowerCase());
    }

    // Fullname validation
    if (!data.fullname || data.fullname.length < 3 || data.fullname.length > 14) {
        errors.fullname = "Fullname must have 3 to 14 characters.";
    }

    // Username validation
    if (!data.username) {
        errors.username = "Username cannot be empty.";
    } else if (data.username.trim().includes(" ") || /[^a-zA-Z0-9]/.test(data.username)) {
        errors.username = "Username should not contain any spaces or special characters.";
    }

    // Password validation
    if (!data.password || data.password.length < 6) {
        errors.password = "Password must be at least 6 characters long.";
    }

    // Contact validation
    if (!data.contact || data.contact.length < 10 || data.contact.length > 10) {
        errors.contact = "Contact number must be exactly 10 digits.";
    } else if (!/^\d{10}$/.test(data.contact)) {
        errors.contact = "Contact number must contain only digits.";
    }

    // Email validation
    if (!data.email || !validateEmail(data.email)) {
        errors.email = "Invalid email address.";
    }

    return errors;
}