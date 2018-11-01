import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import { Button, Popover } from 'react-bootstrap';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
  </Layout>
);
