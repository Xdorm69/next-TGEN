"use client";
import { Button } from "./ui/button";
import axios from "axios";
import { API_URL } from "@/utils/urlUtils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await axios.post(API_URL + "/auth/logout");
    router.push("/");
    router.refresh();
    toast.success("User Logged Out");
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
