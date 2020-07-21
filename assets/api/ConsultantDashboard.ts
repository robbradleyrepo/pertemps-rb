const apiData20190920 = {
  registrations: [
    {
      id: 'e446400b-643c-451f-8ea9-137e46a31909',
      status: 'Awaiting Candidate Response',
      flow: {
        id: '0e0a1cb5-8756-419a-951f-3170df43e45b',
        title: 'Basic Registration',
      },
      branch: {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Pertemps Driving Training',
      },
      candidate: {
        id: '54e3ac2f-d7d7-46de-8fe7-b0542048f4e5',
        firstName: 'John',
        lastName: 'Smith',
        email: 'peter.squirrel@googlemail.com',
        phone: null,
        dob: '0001-01-01T00:00:00',
      },
    },
  ],
  branchRegistrations: [
    {
      id: 185,
      title: 'Temporary Forklift Driver',
      status: 'Completed',
      branch: {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Pertemps Driving Training',
      },
      consultant: {
        id: '00000000-0000-0000-0000-000000000000',
        firstName: 'Deepak',
        lastName: 'R',
        email: 'deepak.r@exposure.net',
        role: 'ConsultantType1',
      },
      candidate: {
        id: '00000000-0000-0000-0000-000000000000',
        firstName: 'Elliott',
        lastName: 'Bourne',
        email: 'elliott.bourne@exposure.net',
        phone: '00447896207506',
        dob: '2000-01-01T00:00:00',
      },
    },
    {
      id: 186,
      title: 'Temporary Door Opener',
      status: 'Completed',
      branch: {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Pertemps Driving Training',
      },
      consultant: {
        id: '00000000-0000-0000-0000-000000000000',
        firstName: 'Tinku',
        lastName: 'Chacko',
        email: 'tinku.chacko@exposure.net',
        role: 'ConsultantType1',
      },
      candidate: {
        id: '00000000-0000-0000-0000-000000000000',
        firstName: 'Ash',
        lastName: 'Adefesobi',
        email: 'ash.adefesobi@exposure.net',
        phone: '00447896207506',
        dob: '2000-01-01T00:00:00',
      },
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
