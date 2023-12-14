import { pb } from "./pb";

export default function signOut() {
    pb.authStore.clear();
}
