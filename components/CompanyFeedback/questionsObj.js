export const produceQuestions = (company, previouslyAnswered) => {
  console.log(company, previouslyAnswered, 'this should be an empty array');
  const questions = [
    {
      type: 'ext',
      id: 1,
      val: 100,
      answer: 'scale',
      question: `Do you feel like regulations would negatively impact ${company}?`,
    },
    {
      type: 'ext',
      id: 2,
      val: 100,
      answer: 'yesOrNo',
      question: `Has ${company} ever made the news for harming the local (or not-so-local) environment?`,
    },
    {
      type: 'ext',
      id: 3,
      val: 100,
      answer: 'yesOrNo',
      question: `Would you consider ${company} a guilty pleasure?`,
    },
    {
      type: 'ext',
      id: 4,
      val: 100,
      answer: 'scale',
      question: `${company} pays its employees fairly.`,
    },
    {
      type: 'ext',
      id: 5,
      val: 100,
      answer: 'scale',
      question: `Is ${company}'s presence a threat to local businesses?`,
    },
    {
      type: 'ext',
      id: 6,
      val: 100,
      answer: 'scale',
      question: `Do ${company}'s employees have to use federal assistance?`,
    },
    {
      type: 'ext',
      id: 7,
      val: 100,
      answer: 'scale',
      question: `Does ${company} import lots of mass-produced items?`,
    },
    {
      type: 'rep',
      id: 8,
      val: 100,
      answer: 'scale',
      question: `Would you describe ${company}'s employee make-up as "diverse?"`,
    },
    {
      type: 'rep',
      id: 9,
      val: 100,
      answer: 'scale',
      question: `Are people of color and members of vulnerable populations elevated to positions of power at ${company}`,
    },
    {
      type: 'rep',
      id: 10,
      val: 100,
      answer: 'scale',
      question: `Do both genders seem equally represented along all rungs of the corporate ladder at ${company}?`,
    },
    {
      type: 'rep',
      id: 11,
      val: 100,
      answer: 'scale',
      question: `To your knowledge, has ${company} ever been sued for its treatment of any class of employees?`,
    },
    {
      type: 'rep',
      id: 12,
      val: 100,
      answer: 'scale',
      question: `Is ${company} known for descrimination?`,
    },
    {
      type: 'rep',
      id: 13,
      val: 100,
      answer: 'scale',
      question: `Do customers of all races and genders feel comfortable when shopping at ${company}?`,
    },
    {
      type: 'rep',
      id: 14,
      val: 100,
      answer: 'scale',
      question: `Does ${company} support any causes that hurt any particular community of people?`,
    },
    {
      type: 'rep',
      id: 15,
      val: 100,
      answer: 'scale',
      invert: true,
      question: `${company} is too PC!`,
    },
    {
      type: 'mon',
      id: 16,
      val: 100,
      answer: 'scale',
      question: `Does ${company} have many competitors?`,
    },
    {
      type: 'mon',
      id: 17,
      val: 100,
      answer: 'scale',
      question: `If customers are disatisfied with "${company}'s service, they have plenty of other optionsto which they can take their business.`,
    },
    {
      type: 'lob',
      id: 18,
      val: 100,
      answer: 'scale',
      question: `${company}'s political lobbying allows them to circumvent regulations or avoid paying taxes.`,
    },
    {
      type: 'lob',
      id: 19,
      val: 100,
      answer: 'yesOrNo',
      question: `${company} encourages politicians to vote contrary to the interest of the people.`,
    },
    {
      type: 'lob',
      id: 20,
      val: 100,
      answer: 'scale',
      invert: true,
      question: `${company} pays their fair shar ein taxes!`,
    },
    {
      type: 'pro',
      id: 21,
      val: 100,
      answer: 'scale',
      invert: true,
      question: `${company} makes my community a better place.`,
    },
    {
      type: 'pro',
      id: 22,
      val: 100,
      answer: 'scale',
      invert: true,
      question: `I feel good about spending money at ${company}`,
    },
    {
      type: 'pro',
      id: 23,
      val: 100,
      answer: 'scale',
      invert: true,
      question: `${company} helps more people than it hurts.`,
    },
    {
      type: 'pro',
      id: 24,
      val: 100,
      answer: 'scale',
      invert: true,
      question: `${company} has spearheaded necessary reforms in its industry.`,
    },
    {
      type: 'pro',
      id: 25,
      val: 100,
      answer: 'scale',
      invert: true,
      question: `To my knowledge, there is no life-saving product or servive that ${company} witholds unless an abominable sum of money is paid.`,
    },
    {
      type: 'pro',
      id: 26,
      val: 100,
      answer: 'scale',
      invert: true,
      question: `${company} treats overseas workers equitably and does not exploit them.`,
    },
    {
      type: 'scale',
      id: 27,
      answer: 'scale',
      val: 500,
      deductAfter: true,
      question: `Do you feel like regulations would negatively impact ${company}?`,
    },
    //for this one above, do the following:  If a
    //company is ranked as being large or higher,
    //then subtract this quantity from their total
    //score unless they have a perfect score in every
    //other realm
    {
      type: 'hierarchy',
      id: 28,
      val: 400,
      answer: 'multiChoice',
      input: true,
      responsesObj: {
        A: '10 times more or less',
        B: 'Between 100 - 999 times more',
        C: 'Between 1000 and 9999 times more',
        D: 'Over 10000 times more',
      },
      question: `By which order of magnitude does ${company}'s CEO out-earn their lowest paid worker?`,
    },
  ];
  const index = checkNumber(
    previouslyAnswered,
    getRandomInt(questions.length - 1),
    questions.length - 1,
  );
  const finalQuestion = questions[index];
  return finalQuestion;
};

const checkNumber = (arr, num, max) => {
  if (arr.includes(num)) {
    const newNum = getRandomInt(max);
    return checkNumber(arr, newNum, max);
  }
  return num;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
