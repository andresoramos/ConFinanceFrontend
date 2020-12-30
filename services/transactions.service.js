import React from 'react';
import {Provider, Subscribe, Container} from 'unstated';
import Plaid from '../services/plaid.service';
import getRange from '../components/range';
import ICON_MAP from '../categories_icon_map';
// Create a Container for our React Context. This container will
// hold state and methods just like a react component would:
export class TransactionsServiceApi extends Container {
  constructor() {
    super();
  }

  getTransactionsForRange = async (accessTokens, rangeKey) => {
    let range = getRange(rangeKey);
    let transactions = await Promise.all(
      accessTokens.map(async (t) => {
        let res = await Plaid.getTransactions(t, range.start, range.end);
        return res;
      }),
    );
    transactions = transactions.flat(1);

    transactions.forEach((t) => {
      t.rating = Math.floor(Math.random() * 10);
    });

    let sortedTransactions = transactions.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    this.setState({transactions: sortedTransactions});
    return sortedTransactions;
  };

  getDataPoints = (transactions) => {
    return transactions.map((t) => {
      return {
        x: new Date(t.date).getTime(),
        y: t.average ? t.average : 0, //, //sum / transactions.length
      };
    });
  };

  getDrilldown = () => {
    return {
      series: [
        {
          name: 'Outstanding',
          id: 'Outstanding',
          data: [
            ['v65.0', 0.1],
            ['v64.0', 1.3],
            ['v63.0', 53.02],
          ],
        },
        {
          name: 'Ok',
          id: 'Ok',
          data: [
            ['v58.0', 1.02],
            ['v57.0', 7.36],
          ],
        },
        {
          name: 'Poor',
          id: 'Poor',
          data: [
            ['v11.0', 6.2],
            ['v10.0', 0.29],
            ['v9.0', 0.27],
            ['v8.0', 0.47],
          ],
        },
      ],
    };
  };

  getTransactionCategories() {
    let newArr = [];
    let uniqueArr = [];

    var categoryCount = {};
    Object.keys(ICON_MAP).map((key) => {
      var category = ICON_MAP[key];

      newArr = newArr.concat(category.hierarchy);

      /* return {
        label: category.hierarchy.join(', '),
        value: key,
        icon: () => <CategoryIcon categoryId={key}></CategoryIcon>,
      }; */
    });

    newArr.forEach((e) => {
      if (categoryCount[e]) {
        categoryCount[e]++;
      } else {
        categoryCount[e] = 1;
      }
    });

    // categoryCount.keys().filter((c) => c > 1);
    //uniqueArr = [...new Set(newArr)];
    /* console.log(
      'category count',
      categoryCount,
      typeof categoryCount,
      categoryCount.length,
    ); */
    // console.log('\n\n\n\n\n\n\n\nunique', uniqueArr, uniqueArr.length);
    // console.log('new', newArr, newArr.length);

    /*  var array_first = uniqueArr;
    var array_second = newArr;
    var array_difference = array_first.filter(function (x) {
      // checking second array does not contain element "x"
      if (array_second.indexOf(x) == -1) return true;
      else return false;
    });
    console.log('diff', array_difference); */
    let finalCat = Object.keys(categoryCount).filter(
      (k) => categoryCount[k] > 2,
    );

    return finalCat.map((c) => {
      return {label: c, value: c};
    });
    /* Í */
    //    const arr = Array.from(Array(ICON_MAP).keys());
  }
}
// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
const TransactionsService = new TransactionsServiceApi();

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
export const ApiProvider = (props) => {
  // We leave the injector flexible, so you can inject a new dependency
  // at any time, eg: snapshot testing
  return <Provider inject={props.inject || [Api]}>{props.children}</Provider>;
};

export const ApiSubscribe = (props) => {
  // We also leave the subscribe "to" flexible, so you can have full
  // control over your subscripton from outside of the module
  return <Subscribe to={props.to || [Api]}>{props.children}</Subscribe>;
};

export default TransactionsService;
