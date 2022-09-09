function generateAuthError(message) {
 switch (message) {
     case "INVALID_PASSWORD": return "Неверно введены email или пароль";
    case "EMAIL_EXISTS": return "Пользователь с таким email уже существует";
                        default:
                            return "Слишком много попыток вхождения, попробуйте позже";
                    }
}

export default generateAuthError;
