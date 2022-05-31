const auth = {
  isAuth: false,
};

function login() {
  auth.isAuth = true;
}

function logout() {
  auth.isAuth = false;
}

function getAuth() {
  return auth.isAuth;
}

function alternate() {
  auth.isAuth = !auth.isAuth;
}

export default { getAuth, login, logout, alternate };
