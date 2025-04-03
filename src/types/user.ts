interface user {
  id: string;
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
  createdAt: Date;
}

interface userUpdate {
  name?: string;
  email?: string;
  bio?: string;
  profilePicture?: string;
}

interface getUsersResponse {
  users: user[];
  totalPages: number;
  currentPage: number;
}

interface getUserResponse {
  user: user;
}

interface createUserResponse {
  user: user;
}

interface updateUserResponse {
  user: user;
}

interface deleteUserResponse {
  message: string;
}

export type { user, userUpdate, getUsersResponse, getUserResponse, createUserResponse, updateUserResponse, deleteUserResponse };