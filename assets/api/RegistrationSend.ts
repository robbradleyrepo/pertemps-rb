const apiData20190920 = {
  id: 'e446400b-643c-451f-8ea9-137e46a31909',
  status: null,
  flow: {
    id: '0e0a1cb5-8756-419a-951f-3170df43e45b',
    title: 'Basic Registration',
  },
  branch: null,
  candidate: {
    id: '54e3ac2f-d7d7-46de-8fe7-b0542048f4e5',
    firstName: 'John',
    lastName: 'Smith',
    email: 'peter.squirrel@googlemail.com',
    phone: '00447896207506',
    dob: '1979-07-18T00:00:00',
  },
};

export default apiData20190920;

export function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiData20190920);
    }, Math.random() * 1000 + 500);
  });
}
