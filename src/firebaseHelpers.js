import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const handleRegistration = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const tenantDocRef = doc(db, "tenants", auth.tenantId);

    const userDocRef = doc(tenantDocRef, "users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
    });

    console.log("Данные пользователя успешно сохранены!");
  } catch (error) {
    if (error.code.includes("auth")) {
      console.error("Ошибка регистрации:", error.message);
    } else {
      console.error("Ошибка сохранения данных пользователя:", error.message);
    }
  }
};
