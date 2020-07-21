const apiData20190920 = {
  id: '9c8842a6-5603-4401-af06-b8fecc0b32e7',
  firstName: 'Deepak',
  lastName: 'R',
  email: 'deepak.r@exposure.net',
  role: 'ConsultantType1',
  branches: [
    {
      id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      name: 'Pertemps Driving Training',
      crmDatabases: [
        {
          id: 185,
          name: 'Bond Adept 1',
        },
      ],
    },
    {
      id: '7c9e6679-7425-40de-944b-e07fc1f90ae8',
      name: 'Pertemps Driving Division',
      crmDatabases: [
        {
          id: 185,
          name: 'Bond Adept 1',
        },
        {
          id: 186,
          name: 'JobMatching 2',
        },
      ],
    },
  ],
};

export default apiData20190920;

export function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiData20190920);
    }, Math.random() * 1000 + 500);
  });
}
