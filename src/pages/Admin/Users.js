import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import UserMenu from '../../components/Layout/UserMenu'


function Users() {
  return (
    <Layout>
    <div className='row'>
        <div className='col-md-3'>
           <UserMenu/>
        </div>
        <div className='col-md-9'>
           <h1>All Users</h1>
        </div>
    </div>
    </Layout>
  )
}

export default Users