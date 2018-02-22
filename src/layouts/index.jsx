import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header/Header'
import './normalize.scss'
import './index.scss'

const MainLayout = ({ children }) => (
  <div>
    <Helmet>
      <title>Delta Notes</title>
      <meta name="description" content="Notes" />
      <meta name="keywords" content="note, notes" />
    </Helmet>
    <div>
      <style id="css"></style>
      {children()}
    </div>
  </div>
)

MainLayout.propTypes = {
  children: PropTypes.func,
}

export default MainLayout
