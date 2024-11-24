export const parseErrorAuth = (error) => {
    if(error != "")
    {
        switch(error)
        {
            case "EMAIL_NOT_FOUND":
                return "No se encontró un usuario con ese email";
            case "INVALID_PASSWORD":
                return "La clave ingresada es incorrecta";
            case "USER_DISABLED":
                return "El usuario ha sido deshabilitado";
            case "EMAIL_EXISTS":
                return "El email ya se encuentra registrado";
            case "OPERATION_NOT_ALLOWED":
                return "Operación no permitida";
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
                return "Demasiados intentos, intente más tarde";
            case "INVALID_EMAIL":
                return "Email inválido";
                case "WEAK_PASSWORD":
                    return "Clave débil";
                    case "MISSING_PASSWORD":
                        return "Debes ingresar una clave";
                        case "INVALID_LOGIN_CREDENTIALS":
                        return "No existe un usuario con ese email y clave";
            default:
                return "Error desconocido";
        }
    }
}