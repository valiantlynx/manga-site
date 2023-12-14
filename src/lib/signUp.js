import { pb } from "./pb";
import login from "./signIn";

export default async function signUp({ data }) {
    try {
        const pbData = {
            username: data.sastName,
            email: data.exampleInputEmail1,
            password: data.newPassword,
            passwordConfirm: data.exampleInputPassword1,
            name: data.firstName,
            terms_and_conditions: data.exampleCheck1,
        };

        await pb.collection("users").create(pbData);

        await login({ data });
        return "success";
    } catch (err) {
        return err.message;
    }
}
