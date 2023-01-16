export interface createUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}
export interface createUsernameVariables {
  username: string;
}

export interface searchUsersInput {
  username: string;
}

export interface searchUsersData {
  searchUsers: Array<searchedUser>;
}

export interface searchedUser {
  id: string;
  username: string;
}
