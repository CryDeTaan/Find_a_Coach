export default {
  async fetchCoaches(context) {
    const baseUrl =
      'https://find-a-coach-using-vue3-default-rtdb.europe-west1.firebasedatabase.app/';

    const response = await fetch(baseUrl + '/coaches.json');
    const responseData = await response.json();

    if (!response.ok) {
      // error ..
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key, // UserId is stored in URL
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
  },
  async registerCoach(context, data) {
    const userId = context.rootState.userId;

    const coachData = {
      // id: context.rootState.userId, // UserId is stored in URL
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    const baseUrl =
      'https://find-a-coach-using-vue3-default-rtdb.europe-west1.firebasedatabase.app/';

    const response = await fetch(baseUrl + `coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData),
    });

    if (!response.ok) {
      // error ..
    }

    context.commit('registerCoach', { ...coachData, id: userId });
  },
};
