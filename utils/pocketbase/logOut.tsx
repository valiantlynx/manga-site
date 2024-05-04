"use client"
import { pb } from '@/utils/pocketbase/pb';

export default function signOut() {
    pb.authStore.clear();
}