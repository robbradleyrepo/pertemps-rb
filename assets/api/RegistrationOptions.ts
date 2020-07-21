const apiData20190920 = {
  branches: [
    {
      id: '350dbe9b-1442-4747-9b4d-2776e16c11a1',
      name: 'Static Branch1',
      registrationFlows: [
        {
          id: 'b765ce95-d998-464f-9b33-8502c5ee487f',
          title: 'HGV1 Driver',
        },
        {
          id: '0e0a1cb5-8756-419a-951f-3170df43e45b',
          title: 'Basic Registration',
        },
      ],
    },
    {
      id: 'd9498551-d1e7-4a50-83bd-8491c50136d5',
      name: 'Static Branch2',
      registrationFlows: [
        {
          id: 'b765ce95-d998-464f-9b33-8502c5ee487f',
          title: 'HGV1 Driver',
        },
        {
          id: '0e0a1cb5-8756-419a-951f-3170df43e45b',
          title: 'Basic Registration',
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
