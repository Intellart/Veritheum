import React from 'react';
import { Link } from 'react-router-dom';

// TOASK:
// - how to solve admin login, separate sign in form or use the existing signin?
// -

// NFTs view
// - approve minting

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
            <div className='admin-page-wrapper'>
                <div className=''></div>
            </div>
        );
    }
}

export default ((AdminPage): React$ComponentType<Props>);