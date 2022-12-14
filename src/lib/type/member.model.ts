export type MemberModel = {
  id: number;
  name: string;
  position: "役員" | "リーダー" | "一般";
  email: string;
  isHaveKey: boolean;
  userID: string;
};
