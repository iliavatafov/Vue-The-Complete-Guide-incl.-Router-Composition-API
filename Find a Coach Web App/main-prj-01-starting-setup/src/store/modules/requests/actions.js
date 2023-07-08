export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const url = `https://vue-http-demo-6f676-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newRequest),
    });

    const responseData = await JSON.stringify(response);

    if (!response.ok) {
      console.log(response.ok);
      const error = new Error(responseData.message || "Faild to send request.");
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit("addRequest", newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;

    const token = context.rootGetters.token;

    const url = `https://vue-http-demo-6f676-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`;

    const response = await fetch(url);

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };

      requests.push(request);
    }

    context.commit("setRequests", requests);
  },
};
