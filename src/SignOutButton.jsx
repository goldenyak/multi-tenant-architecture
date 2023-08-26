// SignOutButton.jsx

import React from 'react';
import { getAuth, signOut } from "firebase/auth";

function SignOutButton() {
    const auth = getAuth();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("Пользователь успешно вышел из системы");
        }).catch((error) => {
            console.error("Ошибка выхода из системы:", error);
        });
    }

    return (
        <button onClick={handleSignOut}>Выход</button>
    );
}

export default SignOutButton;
