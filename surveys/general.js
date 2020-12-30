export const survey = [
  {
    questionType: 'Info',
    questionText:
      "Welcome to Conscious Finance!\n\nTo begin, we'll need to ask you a few questions about your lifestyle and ethics.",
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'On average, how much of your shopping do you do online?',
    //    'Conscious Finance gives reccomendations based on your shopping habits. \n
    questionId: 'onlineShopping',
    category: 'habits',
    options: [
      {
        optionText: 'I do all of my shopping in person.',
        value: 0,
      },
      {
        optionText:
          "I only shop online for items that I can't find in stores, or on occasion.",
        value: 25,
      },
      {
        optionText: 'I spend roughly the same amount in store and online. ',
        value: 50,
      },
      {
        optionText: 'I do a majority of my shopping online.',
        value: 75,
      },
      {
        optionText: 'I order everything online.',
        value: 100,
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      //if you have a car
      'How far away are the stores you frequent the most?',

    questionId: 'locationType',
    options: [
      {
        optionText: 'Dogs',
        value: 'dog',
      },
      {
        optionText: 'Cats',
        value: 'cat',
      },
      {
        optionText: 'Ferrets',
        value: 'ferret',
      },
      {
        optionText: 'Snakes',
        value: 'snake',
      },
      {
        optionText: 'Guinea pigs',
        value: 'guinea',
      },
    ],
  },
  /* {
      questionType: 'MultipleSelectionGroup',
      questionText: 'Select two or three of your favorite foods!',
      questionId: 'favoriteFoods',
      questionSettings: {
        maxMultiSelect: 3,
        minMultiSelect: 2,
      },
      options: [
        {
          optionText: 'Sticky rice dumplings',
          value: 'sticky rice dumplings',
        },
        {
          optionText: 'Pad Thai',
          value: 'pad thai',
        },
        {
          optionText: 'Steak and Eggs',
          value: 'steak and eggs',
        },
        {
          optionText: 'Tofu',
          value: 'tofu',
        },
        {
          optionText: 'Ice cream!',
          value: 'ice cream',
        },
        {
          optionText: 'Injera',
          value: 'injera',
        },
        {
          optionText: 'Biryani',
          value: 'biryani',
        },
        {
          optionText: 'Tamales',
          value: 'tamales',
        },
      ],
    }, */
  {
    questionType: 'MultipleSelectionGroup',
    questionText:
      'Simple Survey can auto advance after a question has been answered. Select two things you do to relax:',
    questionId: 'relax',
    questionSettings: {
      maxMultiSelect: 2,
      minMultiSelect: 2,
      autoAdvance: true,
    },
    options: [
      {
        optionText: 'Reading a good book',
        value: 'reading',
      },
      {
        optionText: 'Going on vacation',
        value: 'vacations',
      },
      {
        optionText: 'Eating meals with family',
        value: 'meals',
      },
      {
        optionText: 'Heading to the ocean',
        value: 'ocean',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      'Simple Survey can also simulate radio button behavior. Pick from below: ',
    questionId: 'radio',
    questionSettings: {
      allowDeselect: false,
    },
    options: [
      {
        optionText: 'I was forced to pick option 1',
        value: 'option 1',
      },
      {
        optionText: 'I have to pick option 2',
        value: 'option 2',
      },
      {
        optionText: 'I guess option 3',
        value: 'option 3',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Simple Survey also supports default selections: ',
    questionId: 'singleDefault',
    questionSettings: {
      defaultSelection: 0,
    },
    options: [
      {
        optionText: 'This is the default option',
        value: 'default',
      },
      {
        optionText: 'This is the alternative option',
        value: 'alternative',
      },
    ],
  },
  {
    questionType: 'MultipleSelectionGroup',
    questionText: 'And of course it supports multiple defaults: ',
    questionId: 'multipleDefaults',
    questionSettings: {
      defaultSelection: [0, 2],
      maxMultiSelect: 2,
      minMultiSelect: 2,
    },
    options: [
      {
        optionText: 'This is the first default option',
        value: 'first default',
      },
      {
        optionText: 'This is the first alternate option',
        value: 'first alternative',
      },
      {
        optionText: 'This is the second default option',
        value: 'second default',
      },
      {
        optionText: 'This is the second alternate option',
        value: 'second alternative',
      },
    ],
  },
  {
    questionType: 'TextInput',
    questionText:
      'Simple Survey supports free form text input.\n\nWhat is your favorite color?',
    questionId: 'favoriteColor',
    placeholderText: 'Tell me your favorite color!',
  },
  {
    questionType: 'NumericInput',
    questionText:
      'It also supports numeric input. Enter your favorite number here!',
    questionId: 'favoriteNumber',
    placeholderText: '42',
  },
  {
    questionType: 'NumericInput',
    questionText:
      'New to 3.0, default values!\n\nHow many balls can you juggle at once?',
    questionId: 'jugglingBalls',
    defaultValue: '0',
  },
  {
    questionType: 'Info',
    questionText: 'That is all for the demo, tap finish to see your results!',
  },
];
