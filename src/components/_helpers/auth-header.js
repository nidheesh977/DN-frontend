import { authenticationService } from "../../middleware/auth";

function authHeader() {
  // return authorization header with jwt token
  const currentUser = authenticationService.currentUserValue;
  if (currentUser) {
    return {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    };
  } else {
    return {};
  }
}
export default authHeader;