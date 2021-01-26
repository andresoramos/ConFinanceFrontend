import axios from 'axios';
import tokens from '../token';

export const questionRetrievalService = async () => {
  const retrievedQuestions = await axios.get(`${tokens.backendApi}/questions/`);
};
