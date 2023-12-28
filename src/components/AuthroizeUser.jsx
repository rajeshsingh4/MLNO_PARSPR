import { redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export const authorizeUser = async () => {
  const user = await AuthService.getCurrentUser();
  if (!user) {
    return redirect("/login");
  }
  return 'Authorized';
};