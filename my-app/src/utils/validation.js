export const validationNameorCity = (value) => {
    if (typeof value !== "string") return false;
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\-\'\s]+$/;
    return regex.test(value.trim());
};

export const validationEmail = (value) => {
    if (typeof value !== "string") return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value.trim());
};

export const validationAge = (birthdate) => {
    if (!birthdate) return false;
    const birthDate = new Date(birthdate);
    if (isNaN(birthDate.getTime())) return false;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const isBeforeBirthday =
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());

    if (isBeforeBirthday) {
        age--;
    }
    return age >= 18;
};

export const validationPostalCode = (postalCode) => {
    if (typeof postalCode !== "string") return false;
    const regex = /^[0-9]{5}$/;
    return regex.test(postalCode.trim());
};