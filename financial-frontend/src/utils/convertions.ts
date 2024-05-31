import { User } from "../../typings/structures";

export const bol2Int = (bol: boolean) => {
  return bol ? "1" : "0";
};

export const bolToRole = (user: User | null) => {
  if (!user) return 0;
  const makeString =
    bol2Int(user.is_superuser) +
    bol2Int(user.is_adminuser) +
    bol2Int(user.is_staff);
    
  return parseInt(makeString, 2);
};
