// types/user.ts
export type UserProfile = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  emailAddress: string | null;
  profession: string;
  field: string;
};
