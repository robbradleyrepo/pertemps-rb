const apiData20190920 = {
  id: 'e446400b-643c-451f-8ea9-137e46a31909',
  status: 'Awaiting Candidate Response',
  branch: {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Pertemps Driving Training',
  },
  consultant: {
    id: '9c8842a6-5603-4401-af06-b8fecc0b32e7',
    firstName: 'Deepak',
    lastName: 'R',
    email: 'deepak.r@exposure.net',
    role: 'ConsultantType1',
  },
  candidate: {
    id: '54e3ac2f-d7d7-46de-8fe7-b0542048f4e5',
    firstName: 'John',
    lastName: 'Smith',
    email: 'peter.squirrel@googlemail.com',
    phone: null,
    dob: '0001-01-01T00:00:00',
  },
  flow: {
    id: '0e0a1cb5-8756-419a-951f-3170df43e45b',
    title: 'BasicRegistration',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget dui eu erat maximus laoreet. Maecenas ac condimentum nibh, vitae elementum lacus. Vivamus imperdiet massa enim, a blandit ex gravida at.',
    tasks: [
      {
        id: '6f2345c9-ad5d-4306-acd5-660402dd23cd',
        type: 'Task',
        name: 'Basic Registration (Quick)',
        label: 'Basic Registration (Quick)',
        title: 'Basic Registration (Quick)',
        description: '',
        steps: [
          {
            id: 'ec733c34-e28b-4db3-b09f-1ea97384e4d1',
            type: '',
            name: 'Basic Details',
            label: 'Basic Details',
            title: 'Basic Details',
            description:
              '### Less than 2 minutes to complete\n\nThis sections is dedicated to your personal details so that we can identify and contact you.\n\nWe also need your address, date of birth, and you will have the opportunity to add a landline phone number - if you have one.\n\n### Before you start:\n\nYou can also come in to our branch and complete this form with *|CONSULTANT_FIRSTNAME|*, your assigned recruitment consultant.',
            actions: [
              {
                id: '1f223d90-f09a-4046-8670-f657db7e2947',
                name: 'Landline',
                label: 'What is your landline phone number?',
                placeholder: '',
                title: 'What is your landline phone number?',
                type: 'text',
                required: false,
                pattern:
                  '(\\s*\\(?0\\d{4}\\)?(\\s*|-)\\d{3}(\\s*|-)\\d{3}\\s*)|(\\s*\\(?0\\d{3}\\)?(\\s*|-)\\d{3}(\\s*|-)\\d{4}\\s*)|(\\s*(7|8)(\\d{7}|\\d{3}(\\-|\\s{1})\\d{4})\\s*)',
                description:
                  'If you have one, enter your landline phone number below',
              },
              {
                id: '2f34f7f4-4427-4e1d-81ac-61b83f7751f0',
                name: 'Address',
                label: 'What is your address?',
                placeholder: 'Type your post code here',
                title: 'What is your address?',
                type: 'location',
                required: true,
                pattern:
                  '^[a-zA-Z]{1,2}[0-9][0-9A-Za-z]{0,1} {0,1}[0-9][A-Za-z]{2}$',
                description:
                  'Please supply your address so that we can contact you and find work near you.\n\nTo help us locate your UK address, what is your post code?',
              },
              {
                id: '54f3f5ba-fb9a-483a-854e-13b42f142b7c',
                name: 'Date of Birth',
                label: 'What is your date of birth?',
                placeholder: '00-00-0000',
                title: 'What is your date of birth?',
                type: 'date',
                required: true,
                pattern: '',
                description: 'Please tell us your date of birth below:',
              },
            ],
          },
          {
            id: '10f588eb-263f-483e-86c0-29086d97ce75',
            type: 'Work preferences',
            name: 'Work Preferences',
            label: 'Work preferences',
            title: 'Work preferences',
            description:
              '### Less that 3 minutes to complete.\n\nThis section is for your work preferences so that we can better target suitable work opportunities for you.\n\nWe will also need to know your availability for work, and your preferred work location.\n\n### Before you start:\nYou can also come in to our branch and complete this form with *|CONSULTANT_FIRSTNAME|*, your assigned recruitment consultant.',
            actions: [
              {
                id: 'cf2256b1-a89c-4e3f-a6d5-6f6cd30ff3a2',
                name: 'Type of Work',
                label: 'What type of work are you looking for?',
                placeholder: 'Type here',
                title: 'What type of work are you looking for?',
                type: 'text',
                required: true,
                pattern: '',
                description:
                  'Tell us in your own words e.g. "Driving", "Accountant", "any part-time jobs"',
              },
              {
                id: '0f60c298-16ef-465e-96e1-deb02ab856a7',
                name: 'Salary',
                label: 'How much would you ideally like to be paid?',
                placeholder: '00.00',
                title: 'How much would you ideally like to be paid?',
                type: 'text',
                required: true,
                pattern: '',
                description: 'Phasellus eget dui eu erat maximus laoreet.',
              },
              {
                id: 'b84da0aa-f373-4e98-8381-914445c0ac1a',
                name: 'Start Date',
                label: 'From when are you available to work?',
                placeholder: '00-00-0000',
                title: 'From when are you available to work?',
                type: 'date',
                required: true,
                pattern: '',
                description:
                  'If your application is successful, please indicate when you would be able to start work.',
              },
              {
                id: 'aba50d70-74c1-4fe0-a4dc-55b431802fa0',
                name: 'Location',
                label: 'What is your preferred location for work?',
                placeholder: 'Type in your region here',
                title: 'What is your preferred location for work?',
                type: 'text',
                required: true,
                pattern: '',
                description:
                  'Tell us where you would like to work, e.g. "London" or "Birmingham"',
              },
            ],
          },
          {
            id: '1ddcb9d3-b128-4557-863d-84a4e15e59fb',
            type: '',
            name: 'Declarations',
            label: 'Declarations',
            title: 'Declarations',
            description:
              '### Less that 3 minutes to complete.\n\nWe just have a few final questions to ask and will need you to confirm that the information provided is correct before giving *|BRANCH_NAME|* your consent to proceed with this application for work.\n\n### Before you start:\nYou can also come in to our branch and complete this form with *|CONSULTANT_FIRSTNAME|*, your assigned recruitment consultant.',
            actions: [
              {
                id: '9f4d85f4-70ba-44d9-bdc6-4e5ae0ce3c4c',
                name: 'Health and disability',
                label: 'Health and disability',
                placeholder: '',
                title: 'Health and disability',
                type: 'text',
                required: false,
                pattern: '',
                description:
                  'The following questions on health and disability are asked in order to find out your needs in terms of reasonable adjustments to access our recruitment service and to find out your needs in order to perform the job or position sought.',
              },
              {
                id: '8eb06f68-b418-401e-9433-3ab6556eefa4',
                name: 'Health and disability (1)',
                label: 'Health and disability',
                placeholder: '',
                title: 'Health and disability',
                type: 'radio',
                required: true,
                pattern: '',
                choices: [
                  {
                    text: 'Yes',
                    value: 'Yes',
                  },
                  {
                    text: 'No',
                    value: 'No',
                  },
                ],
                description:
                  '**Do you have any health issues or a disability relevant to the role which may make it difficult for you to carry out the functions which are essential for the role you seek?**',
              },
              {
                id: '88538550-f72c-4e15-913e-4e22ee048389',
                name: 'Health and disability (2)',
                label: 'Health and disability',
                placeholder: 'Type here',
                title: 'Health and disability',
                type: 'textarea',
                required: true,
                pattern: '',
                description:
                  '**If you have a disability, what are your needs in terms of reasonable adjustments in order to access this recruitment service and to attend interview, or to take aptitude tests etc.?**',
              },
              {
                id: 'd82cb963-0c06-4082-b26f-49bc80c5de73',
                name: 'Rehabilitation of offenders',
                label: 'Rehabilitation of offenders',
                placeholder: '',
                title: 'Rehabilitation of offenders',
                type: 'radio',
                required: true,
                pattern: '',
                choices: [
                  {
                    text: 'Yes',
                    value: 'Yes',
                  },
                  {
                    text: 'No',
                    value: 'No',
                  },
                ],
                description:
                  '**Do you have any unspent convictions or prosecutions pending at this time?**',
              },
              {
                id: '48ce1fdb-a3fd-439f-9de6-6f7e02dbf008',
                name: 'Rehabilitation of offenders (1)',
                label: 'Rehabilitation of offenders',
                placeholder: 'Swipe to sign',
                title: 'Rehabilitation of offenders',
                type: 'text',
                required: true,
                pattern: '',
                description:
                  'Pursuant to the Rehabilitation of Offenders Act, I declare that I have no unspent convictions and there are no prosecutions pending at this time.\n\nI also undertake to inform *|BRANCH_NAME|* of any prosecution that occurs whilst my details are held by *|BRANCH_NAME|*.',
              },
              {
                id: '57e2f399-022a-4a0b-b856-f26bbd21f38d',
                name: 'General Declaration',
                label: 'General Declaration',
                placeholder: 'Swipe to sign',
                title: 'General Declaration',
                type: 'text',
                required: true,
                pattern: '',
                description:
                  'I can confirm that the information disclosed in this application form is relevant and correct and can be verified by references from previous employers and/or any professional bodies or character referees specified.\n\nI also undertake to inform *|BRANCH_NAME|* of the outcome of all introductions / interviews to companies or agents.\n\nI understand that information i have disclosed may be held within a computer database. I hereby give my permission for information I have disclosed to be divulged to companies or agents as deemed necessary by *|BRANCH_NAME|* in relation to my application for work.\n\n## Should I become a Flexible Worker I confirm:\n\nI will have a read and accepted the issues Contract of Employment which also confirms the minimum hourly rate of pay I will be paid for temporary assignments.\n\nWhilst on assignment from *|BRANCH_NAME|*: \nI will ensure my signed timesheet is returned to the Branch by 9am on the Monday following the week of work.\n\nI will regard all available information as confidential and I will not divulge it to any third parties.\n\nI will comply to the Health & Safety regulations of all the companies/agents I am assigned to.',
              },
            ],
          },
        ],
      },
      {
        id: '16c6bb82-09dd-4d06-a1ee-20463e2a51d2',
        type: 'Task',
        name: 'Additional Questions',
        label: 'Additional Questions',
        title: 'Additional Questions',
        description:
          '### Some additional questions specifically for this role\n\nHello, we want to know a little more.',
        steps: [
          {
            id: '4eb4fec2-7ffc-4259-8086-bab336999c95',
            type: '',
            name: 'General Questions',
            label: 'General Questions',
            title: 'General Questions',
            description: '',
            actions: [
              {
                id: '91caf318-a17f-429f-ad10-c1a9e7f56d43',
                name: 'What is your favourite color?',
                label: 'What is your favourite color?',
                placeholder: 'Pertemps Blue',
                title: 'What is your favourite color?',
                type: 'text',
                required: false,
                pattern: '',
                description:
                  'Please let us know what your favourite colour is.',
              },
            ],
          },
          {
            id: '2acde234-402f-47fa-961c-c4a0f348e307',
            type: '',
            name: 'One more thing',
            label: 'One more thing',
            title: 'One more thing',
            description: '### Just one more thing',
            actions: [
              {
                id: '944777bb-b223-4b32-a91b-accfa4d1a03c',
                name: 'Do you like Apples?',
                label: 'Do you like Apples?',
                placeholder: '',
                title: 'Do you like Apples?',
                type: 'radio',
                required: false,
                pattern: '',
                choices: [
                  {
                    text: 'Yes',
                    value: 'Yes',
                  },
                  {
                    text: 'No',
                    value: 'No',
                  },
                  {
                    text: 'Not Sure',
                    value: 'Not Sure',
                  },
                ],
                description: '',
              },
            ],
          },
        ],
      },
    ],
  },
};

const fakeApiData20191003 = {
  id: '00000000-0000-0000-0000-000000000001',
  status: 'Awaiting Candidate Response',
  branch: {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Pertemps Driving Training',
  },
  consultant: {
    id: '00000000-0000-0000-0000-000000000003',
    firstName: 'Tinku',
    lastName: 'Chacko',
    email: 'tinku.chacko@exposure.net',
    role: 'ConsultantType1',
  },
  candidate: {
    id: '00000000-0000-0000-0000-000000000004',
    firstName: 'Peter',
    lastName: 'Eichhorn',
    email: 'peter@exposure.net',
    phone: '00447896207506',
    dob: '2019-08-29T10:16:13.9469843+00:00',
  },
  flow: {
    id: '00000000-0000-0000-0000-000000000005',
    title: 'Temporary Door Opener',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
    tasks: [
      {
        id: '00000000-0000-0000-0000-000000000006',
        type: 'Task',
        name: 'Basic Registration',
        label: 'Your Standard Details',
        title: 'Basic Registration',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
        steps: [
          {
            id: '00000000-0000-0000-0000-000000000007',
            type: 'step',
            name: 'Step 1',
            label: 'Step 1',
            title: 'Step 1',
            showIntroductionScreen: true,
            showSummaryScreen: true,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
            actions: [
              {
                id: '00000000-0000-0000-0000-000000000008',
                name: 'FirstName',
                label: 'Please enter your first name',
                placeholder: 'John',
                title: 'Your First Name',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'text',
                required: true,
                pattern: '^[A-Za-z ]{1,25}$',
                value: 'Peter',
              },
              {
                id: '00000000-0000-0000-0000-000000000009',
                name: 'LastName',
                label: 'Please enter your last name',
                placeholder: 'Doe',
                title: 'Your Last Name',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'text',
                required: true,
                pattern: '^[A-Za-z ]{1,25}$',
                value: 'Eichhorn',
              },
              {
                id: '00000000-0000-0000-0000-000000000010',
                name: 'DOB',
                label: 'What is your date of birth?',
                placeholder: 'dd/mm/yyyy',
                title: 'Your Date of Birth',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'date',
                required: true,
                value: '1979-07-18',
              },
              {
                id: '00000000-0000-0000-0000-000000000011',
                name: 'FavNumber',
                label: 'What is your favourite number?',
                placeholder: '0',
                title: 'Favourite Number',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'number',
                required: false,
                min: 0,
                max: 100,
                step: 1,
                value: 50,
              },
              {
                id: '00000000-0000-0000-0000-000000000012',
                name: 'Email',
                label: 'What is your Email Address?',
                placeholder: 'john.doe@gmail.com',
                title: 'Your Email',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'email',
                required: true,
                value: 'peter.eichhorn@exposure.net',
              },
              {
                id: '00000000-0000-0000-0000-000000000013',
                name: 'SelfIntro',
                label: 'Tell me about your self',
                placeholder: "I'm great!",
                title: 'About You',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'textarea',
                required: false,
                value: null,
              },
              {
                id: '00000000-0000-0000-0000-000000000014',
                name: 'Goodin',
                label: "I'm excellent at:",
                placeholder: null,
                title: 'Language Skills',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'checkbox',
                required: false,
                choices: [
                  {
                    text: 'Reading',
                    value: 'read',
                  },
                  {
                    text: 'Writing',
                    value: 'write',
                  },
                  {
                    text: 'Listening',
                    value: 'listen',
                  },
                  {
                    text: 'Speaking',
                    value: 'speak',
                  },
                ],
                value: ['read', 'write', 'listen'],
              },
              {
                id: '87092be6-411e-4bb0-8c06-018b585fa5f7',
                name: 'Gender',
                label: 'What is your Gender?',
                placeholder: 'What is your Gender?',
                title: 'What is your Gender?',
                description: '',
                type: 'radio',
                required: false,
                choices: [
                  {
                    text: 'Female',
                    value: 'f',
                    dependencyQuestions: [
                      {
                        id: '432651aa-37cc-44df-8f05-6d9334204162',
                        name: 'Do you have husband?',
                        label: 'Do you have husband?',
                        placeholder: 'Do you have husband?',
                        title: 'Do you have husband?',
                        type: 'radio',
                        required: false,
                        pattern: '',
                        description: '',
                        choices: [
                          {
                            text: 'Yes',
                            value: 'y',
                            dependencyQuestions: [
                              {
                                id: 'a9a76c84-2b14-4112-bef3-18e139d33ebf',
                                name: 'What is his name?',
                                label: 'What is his name?',
                                placeholder: 'What is his name?',
                                title: 'What is his name?',
                                type: 'text',
                                required: false,
                                pattern: '',
                                description: '',
                              },
                            ],
                          },
                          {
                            text: 'No',
                            value: 'n',
                            dependencyQuestions: [
                              {
                                id: 'b09459fd-32c4-4cf1-bc94-18696f24066b',
                                name: 'Do you plan to marry?',
                                label: 'Do you plan to marry?',
                                placeholder: 'Do you plan to marry?',
                                title: 'Do you plan to marry?',
                                type: 'radio',
                                required: false,
                                pattern: '',
                                choices: [
                                  {
                                    text: 'Yes',
                                    value: 'y',
                                    dependencyQuestions: [
                                      {
                                        id:
                                          '7032b0bd-fb83-4339-aa85-bb2d7674ac1a',
                                        name: 'When would you marry?',
                                        label: 'When would you marry?',
                                        placeholder: 'When would you marry?',
                                        title: 'When would you marry?',
                                        type: 'text',
                                        required: false,
                                        pattern: '',
                                        description: '',
                                      },
                                    ],
                                  },
                                  {
                                    text: 'No',
                                    value: 'n',
                                    dependencyQuestions: [
                                      {
                                        id:
                                          '8af1a71f-d243-4051-8a9e-2bd924a70f2f',
                                        name: 'Why?',
                                        label: 'Why?',
                                        placeholder: 'Why?',
                                        title: 'Why?',
                                        type: 'text',
                                        required: false,
                                        pattern: '',
                                        description: '',
                                      },
                                    ],
                                  },
                                ],
                                description: '',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    text: 'Male',
                    value: 'm',
                    dependencyQuestions: [
                      {
                        id: 'e80eadbf-3d95-46be-8c04-78613ed98d74',
                        name: 'Do you have a wife?',
                        label: 'Do you have a wife?',
                        placeholder: 'Do you have a wife?',
                        title: 'Do you have a wife?',
                        type: 'radio',
                        required: false,
                        pattern: '',
                        description: '',
                        choices: [
                          {
                            text: 'Yes',
                            value: 'y',
                            dependencyQuestions: [],
                          },
                          {
                            text: 'No',
                            value: 'n',
                            dependencyQuestions: [],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    text: 'Rather not say',
                    value: 'notsay',
                    dependencyQuestions: [],
                  },
                ],
                pattern: '',
              },
              {
                id: '00000000-0000-0000-0000-000000000015',
                name: 'Lunch',
                label: 'What for lunch Today?',
                placeholder: null,
                title: 'lunch preference',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'radio',
                required: false,
                choices: [
                  {
                    text: 'Veg',
                    value: 'veg',
                  },
                  {
                    text: 'Non Veg',
                    value: 'non-veg',
                  },
                ],
                custom: {
                  title: 'Other',
                  label: 'Other',
                  placeholder: 'Please Specify',
                },
                value: null,
              },
              {
                id: '00000000-0000-0000-0000-000000000016',
                name: 'AgeGroup',
                label: 'Select Your Age Group',
                placeholder: null,
                title: 'Age Group',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'single_select',
                required: true,
                choices: [
                  {
                    text: '18yrs-30yrs',
                    value: '18-30',
                  },
                  {
                    text: '31yrs-40yrs',
                    value: '31-40',
                  },
                  {
                    text: 'above 41 yrs',
                    value: '41+',
                  },
                ],
                value: null,
              },
              {
                id: '00000000-0000-0000-0000-000000000017',
                name: 'Address',
                label: 'Your Home Address',
                title: 'Home Address',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'location',
                value: {
                  Lat: null,
                  Lon: null,
                  Fullstr: null,
                  Address1: null,
                  Address2: null,
                  PostCode: 'W1W 8BU',
                  City: null,
                  County: null,
                  Country: null,
                },
              },
              {
                id: '00000000-0000-0000-0000-000000000018',
                name: 'TravelDistance',
                label: 'How far do you wish to travel?',
                title: 'Travel Distance',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'locationdistance',
                required: false,
                min: 0,
                max: 100,
                step: 1,
                value: null,
              },
            ],
          },
          {
            id: '00000000-0000-0000-0000-000000000019',
            type: 'step',
            name: 'Employment History',
            label: 'Employment History',
            title: 'Employment History',
            showIntroductionScreen: true,
            showSummaryScreen: false,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
            actions: [
              {
                id: '00000000-0000-0000-0000-00000000XXX',
                name: 'Test1',
                label: 'Test 1',
                placeholder: 'Test 1',
                title: 'Test 1',
                description:
                  'Proin sed gravida lacus, id varius risus. Pellentesque a dolor at leo elementum commodo molestie sed ante. Sed semper augue est, non placerat dui luctus at.',
                type: 'text',
                required: true,
                pattern: '^[A-Za-z ]{1,25}$',
                value: 'Test 1',
              },
              {
                id: '00000000-0000-0000-0000-000000000020',
                name: 'workhistory',
                label: 'Work History',
                placeholder: 'Work History',
                title: 'Work History',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'actionset',
                required: true,
                pattern: null,
                value: [
                  {
                    companyName: "Sainsbury's",
                    recruitmentType: 'Direct',
                    startEndDates: {
                      startDate: 'mm/yyyy',
                      endDate: 'mm/yyyy',
                    },
                    jobTitle: '',
                    jobDescription: '',
                    companyAddress: {
                      Lat: null,
                      Lon: null,
                      Fullstr: null,
                      Address1: null,
                      Address2: null,
                      PostCode: null,
                      City: null,
                      County: null,
                      Country: null,
                    },
                    reasonLeaving: '',
                  },
                  {
                    companyName: 'EasyBuy',
                    recruitmentType: 'Agency',
                    startEndDates: {
                      startDate: 'mm/yyyy',
                      endDate: 'mm/yyyy',
                    },
                    jobTitle: '',
                    jobDescription: '',
                    companyAddress: {
                      Lat: null,
                      Lon: null,
                      Fullstr: null,
                      Address1: null,
                      Address2: null,
                      PostCode: null,
                      City: null,
                      County: null,
                      Country: null,
                    },
                    reasonLeaving: '',
                  },
                ],
                actions: [
                  {
                    id: '00000000-0000-0000-0000-000000000021',
                    name: 'CompanyName',
                    label:
                      'Who are/were you most recently working?|Who were you working for?',
                    placeholder: 'Type here',
                    title:
                      'Who are/were you most recently working?|Who were you working for?',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.|Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                    type: 'text',
                    required: true,
                    pattern: null,
                    value: "Sainsbury's",
                  },
                  {
                    id: '00000000-0000-0000-0000-000000000022',
                    name: 'RecruitmentType',
                    label:
                      'At *|CompanyName|* were you employed directly or through an employment agency?',
                    placeholder: '',
                    title:
                      'At *|CompanyName|* were you employed directly or through an employment agency?',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                    type: 'radio',
                    required: true,
                    pattern: null,
                    choices: [
                      {
                        text: 'I was employed directly by *|CompanyName|*',
                        value: 'Direct',
                      },
                      {
                        text: 'I was employment through an employment agency',
                        value: 'Agency',
                      },
                    ],
                    value: null,
                  },
                  {
                    id: '00000000-0000-0000-0000-000000000023',
                    name: 'StartEndDates',
                    label:
                      'From when to when have you worked at *|CompanyName|*',
                    placeholder: 'Month,Year',
                    title:
                      'From when to when have you worked at *|CompanyName|*',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                    type: 'startenddate',
                    required: true,
                    pattern: null,
                    value: {
                      startDate: 'mm/yyyy',
                      endDate: 'mm/yyyy',
                    },
                  },
                  {
                    id: '00000000-0000-0000-0000-000000000024',
                    name: 'JobTitle',
                    label: 'What was your job title at *|CompanyName|*',
                    placeholder: 'Type here',
                    title: 'What was your job title at *|CompanyName|*',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                    type: 'text',
                    required: true,
                    pattern: null,
                    value: 'IT Analyst',
                  },
                  {
                    id: '00000000-0000-0000-0000-000000000025',
                    name: 'JobDescription',
                    label:
                      'What were your responsibilites as manager at *|CompanyName|*',
                    placeholder: 'Type here',
                    title:
                      'What were your responsibilites as manager at *|CompanyName|*',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                    type: 'textarea',
                    required: true,
                    pattern: null,
                    value: null,
                  },
                  {
                    id: '00000000-0000-0000-0000-000000000026',
                    name: 'CompanyAddress',
                    label: "What is the company's address?",
                    placeholder: 'Type your post code here',
                    title: "What is the company's address?",
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                    type: 'location',
                    value: {
                      Lat: null,
                      Lon: null,
                      Fullstr: null,
                      Address1: null,
                      Address2: null,
                      PostCode: null,
                      City: null,
                      County: null,
                      Country: null,
                    },
                  },
                  {
                    id: '00000000-0000-0000-0000-000000000027',
                    name: 'ReasonLeaving',
                    label: 'What was your reason for leaving *|CompanyName|*',
                    placeholder: 'Type here',
                    title: 'What was your reason for leaving *|CompanyName|*',
                    description:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                    type: 'textarea',
                    required: true,
                    pattern: null,
                    value: null,
                  },
                ],
              },
              {
                id: '00000000-0000-0000-0000-00000000YYY',
                name: 'Test2',
                label: 'Test 2',
                placeholder: 'Test 2',
                title: 'Test 2',
                description:
                  'Curabitur pharetra sapien efficitur commodo mattis. Suspendisse at feugiat risus. Nunc dolor ipsum, vulputate et magna eu, tempor euismod dolor. In hac habitasse platea dictumst. Donec vitae massa ante.',
                type: 'text',
                required: true,
                pattern: '^[A-Za-z ]{1,25}$',
                value: 'Test 2',
              },
            ],
          },
        ],
      },
      {
        id: '00000000-0000-0000-0000-000000000028',
        type: 'Task',
        name: 'Industrial Assessment',
        label: 'Industrial Assessment',
        title: 'Industrial Assessment',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
        steps: [
          {
            id: '00000000-0000-0000-0000-000000000029',
            type: 'step',
            name: 'Step 1',
            label: 'Step 1',
            title: 'Step 1',
            showIntroductionScreen: true,
            showSummaryScreen: false,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
            actions: [
              {
                id: '00000000-0000-0000-0000-000000000030',
                name: 'accqn',
                label: 'Are you good at accounting?',
                placeholder: "I am so good at accounts, it's insane!",
                title: 'Good at accounts?',
                type: 'text',
                required: false,
                pattern: '',
                value: null,
              },
            ],
          },
        ],
      },
      {
        id: '00000000-0000-0000-0000-000000000031',
        type: 'Task',
        name: 'Paperwork Upload',
        label: 'Paperwork Upload',
        title: 'Paperwork Upload',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
        steps: [
          {
            id: '00000000-0000-0000-0000-000000000032',
            type: 'step',
            name: 'Step 1',
            label: 'Step 1',
            title: 'Step 1',
            showIntroductionScreen: true,
            showSummaryScreen: false,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
            actions: [
              {
                id: '00000000-0000-0000-0000-000000000033',
                name: 'CV',
                label: 'Please upload your CV',
                placeholder: '',
                title: 'CV?',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'file',
                accept:
                  'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf',
                required: false,
                value: null,
              },
              {
                id: '00000000-0000-0000-0000-000000000034',
                name: 'Photo',
                label: 'Please upload a photo of yourself',
                placeholder: '',
                title: 'Selfie?',
                description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum rhoncus vulputate. Aenean facilisis augue sit amet sapien vehicula, at bibendum diam vulputate.',
                type: 'file',
                accept: 'image/jpeg,image/png',
                required: true,
                value: null,
              },
            ],
          },
        ],
      },
    ],
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

export function getFakeData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeApiData20191003);
    }, Math.random() * 1000 + 500);
  });
}
