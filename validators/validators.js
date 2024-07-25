
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateMatricule = (matricule) => {
    const matriculeRegex = /^\d{4}$/;   // un nombre à 4 chiffres
    return matriculeRegex.test(matricule);
    
};

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
    
};

const validateNom = (nom) => {
    const nomRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/; // non nul et seulement lettres
    return nomRegex.test(nom.trim());
};

const validatePrenom = (prenom) => {
    const nomRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/; // non nul et seulement lettres
    return nomRegex.test(prenom.trim());
};

module.exports = {
    validateEmail,
    validateMatricule,
    validatePassword,
    validateNom,
    validatePrenom
};
