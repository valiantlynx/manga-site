import { pb } from "./pb";

export default async function login({ data }) {
    const response = await pb
        .collection("users")
        .authWithPassword(
            data.sastName || data.exampleInputEmail1,
            data.newPassword || data.exampleInputPassword1
        )
        .catch((err) => err.message);
    return response;
}
