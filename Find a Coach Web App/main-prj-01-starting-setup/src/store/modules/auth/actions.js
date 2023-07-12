let timer;

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBML2B2HwV94K_5POQ-VapztKd0WR4yidA`;

    if (mode === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBML2B2HwV94K_5POQ-VapztKd0WR4yidA`;
    }
    const respone = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await respone.json();
    if (!respone.ok) {
      const error = new Error(
        responseData.message || "Fail to authenticate, check your login data."
      );
      throw error;
    }

    const expiresIn = responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    const expirationData = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationData);
    localStorage.setItem("userEmail", responseData.email);

    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      email: responseData.email,
    });
  },
  tryLogin(context) {
    // Get stored data from localStorage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");

    const tokenExpiration = localStorage.getItem("tokenExpiration");

    // Calculate token expiration time
    const expiresIn = +tokenExpiration - new Date().getTime();

    // Return if token is expired
    if (expiresIn < 0) {
      return;
    }

    // Set autoLogout to execute when token expiers
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    // If there is token and userId in localStorage set the user data in the Vuex store
    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        email: userEmail,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("userEmail");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
