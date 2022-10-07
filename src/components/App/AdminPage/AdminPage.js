import React from 'react';
import { Link } from 'react-router-dom';

// NFTs view
// - approve minting and selling

// Page Statistics view
// - user count

type Props = {
    isAdmin: boolean,
}

class AdminPage extends React.Component<Props, State> {
    constructor() {
      super();
      this.state = {};
    }

    render () {
        const { isAdmin } = this.props;

        return (
            <div className='page-wrapper'>
                <div className='admin-dashboard'>
                    Admin page content
                    <div className='sections'>
                        <div className='users-section'>
                            <h4>Registered Users</h4>
                            <div className='users-table'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>First name</th>
                                            <th>Last name</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Alfreds Futterkiste</td>
                                            <td>Maria Anders</td>
                                            <td>Germany</td>
                                            <td>Germany</td>
                                        </tr>
                                        <tr>
                                            <td>Centro comercial Moctezuma</td>
                                            <td>Francisco Chang</td>
                                            <td>Mexico</td>
                                            <td>Mexico</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='mint-nfts-section'>
                            <h4>NFTs for minting</h4>
                            <div className='mint-nfts-table'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>User</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Alfreds Futterkiste</td>
                                            <td>Maria Anders</td>
                                            <td>Germany</td>
                                        </tr>
                                        <tr>
                                            <td>Centro comercial Moctezuma</td>
                                            <td>Francisco Chang</td>
                                            <td>Mexico</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='sell-nfts-section'>
                            <h4>NFTs for selling</h4>
                            <div className='sell-nfts-table'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>User</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Alfreds Futterkiste</td>
                                            <td>Maria Anders</td>
                                            <td>Germany</td>
                                        </tr>
                                        <tr>
                                            <td>Centro comercial Moctezuma</td>
                                            <td>Francisco Chang</td>
                                            <td>Mexico</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ((AdminPage): React$ComponentType<Props>);