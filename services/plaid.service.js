import React from 'react';
import {Provider, Subscribe, Container} from 'unstated';

import plaid from 'plaid';
import tokens from '../token';

// Create a Container for our React Context. This container will
// hold state and methods just like a react component would:
export class PlaidService extends Container {
  constructor() {
    super();
    this.plaidClient = this.createPlaidClient();
  }

  getPlaidClient() {
    if (!this.plaidClient) {
      this.plaidClient = this.createPlaidClient();
    } else {
      return this.plaidClient;
    }
  }

  createPlaidClient() {
    return new plaid.Client({
      clientID: tokens.PLAID_CLIENT_ID,
      secret: tokens.PLAID_SECRET,
      env: plaid.environments.sandbox, //development,
      options: {
        version: '2020-09-14', // '2020-09-14' | '2019-05-29' | '2018-05-22' | '2017-03-08'
      },
    });
  }

  async getLinkToken() {
    const response = await this.plaidClient
      .createLinkToken({
        user: {
          client_user_id: '123-test-user-id',
        },
        client_name: 'Conscious Finance',
        products: ['auth', 'transactions'],
        country_codes: ['US'],
        language: 'en',
      })
      .catch((err) => {
        // handle error
        console.log('error creating link token: ', err);
      });

    return response.link_token;
  }

  async getAccessToken(results) {
    const response = await this.plaidClient
      .exchangePublicToken(results.public_token)
      .catch((err) => {
        // handle error
        console.log('error getting access token: ', err);
      });
    return response.access_token;
  }

  async getAccounts(accessToken) {
    const accounts_response = await this.plaidClient
      .getAccounts(accessToken)
      .catch((err) => {
        console.log('error getting accounts', err);
      });
    const institution_response = await this.plaidClient
      .getInstitutionById(accounts_response.item.institution_id, ['US'], {
        include_optional_metadata: true,
      })
      .catch((err) => {
        console.log('error getting accounts', err);
      });

    const institution = institution_response.institution;
    institution.accounts = [];
    accounts_response.accounts.forEach((account) => {
      account.accessToken = accessToken;
      account.institution = institution_response.institution;
      account.name = institution_response.institution.name;
      institution.accounts.push(account);
    });
    return institution;
  }
  formatDate = (date) => {
    var d = date.toISOString();
    return d.substring(0, d.indexOf('T'));
  };

  async getTransactions(accessToken, startDate, endDate) {
    const response = await this.plaidClient
      .getTransactions(
        accessToken,
        this.formatDate(startDate),
        this.formatDate(endDate),
        {
          offset: 0,
        },
      )
      .catch((err) => {
        // handle error
        console.log('error getting transactions', err);
      });
    const transactions = []; //response.transactions;
    response.transactions.forEach((t) => {
      if (t.amount > 0 && t.payment_channel != 'other') {
        transactions.push(t);
      } else {
        // console.log('omitted', t.amount, t.name, t.payment_channel);
      }
    });
    return transactions;
  }
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
const Plaid = new PlaidService();

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

export default Plaid;

// IMPORT NOTE:
// With the above export structure, we have the ability to
// import like this:

// import Api, {ApiProvider, ApiSubscribe, PlaidApiContainer}

// Api: Singleton Api instance, exported as default.
//      Contains your instantiated .state and methods.

// ApiProvider: Context Provider...
//      Publishes your React Context into the top of the
//      React App into the component tree.

// ApiSubscribe: Context Subsriber...
//      Subscribes to the higher Context from any place
//      lower than the point at which the Context was provided.

// PlaidApiContainer:Context Container Class...
//      Used to instantiate new copy of your service if so desired.
//      Can be used for testing, or subsrcibing your class to a new
//      data source that uses the same data model/methods.
