import React from 'react';
import { connect } from 'react-redux';
import { get, map } from 'lodash';
import { actions as createdNftActions } from '../../../store/createdNftStore';
import { actions as userActions } from '../../../store/userStore';
import type { Nft } from '../../../store/nftStore';
import type { Profile } from '../../../store/userStore';

type Props = {
    dispatch: Function,
    createdNfts: { [string]: Nft },
    allUsers: { [string]: Profile },
}

const mapStateToProps = (state) => {
  const createdNfts = get(state, 'createdNfts', {});
  const allUsers = get(state, 'user.allUsers', {});

  return {
    createdNfts,
    allUsers,
  };
};

class AdminPage extends React.Component<ReduxProps, State> {
  constructor() {
    super();
    this.state = {
      createdNfts: this.props?.createdNfts,
      allUsers: this.props?.allUsers,
    };
  }

  componentDidMount() {
    this.props.dispatch(createdNftActions.fetchCreatedNfts());
    this.props.dispatch(userActions.fetchAllUsers());
  }

  componentDidUpdate() {
    if (this.state.allUsers !== this.props.allUsers) {
      this.setState({
        allUsers: this.props.allUsers,
      });
    }
    if (this.state.createdNfts !== this.props.createdNfts) {
      this.setState({
        createdNfts: this.props.createdNfts,
      });
    }
  }

  approveMintOfNft(fingerprint: string) {
    this.props.dispatch(createdNftActions.approveCreatedNft(fingerprint));
  }

  declineMintOfNft(fingerprint: string) {
    this.props.dispatch(createdNftActions.declineCreatedNft(fingerprint));
  }

  render () {
    const { createdNfts, allUsers } = this.state;

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
                      <th>ID</th>
                      <th>Full name</th>
                      <th>Email</th>
                      <th>ORCID ID</th>
                      <th>Registered on</th>
                    </tr>
                  </thead>
                  <tbody>
                    {map(allUsers, (userKey, i) => (
                      <tr key={i} className="mint-nfts-row">
                        <td className="mint-nfts-data">{userKey.id}</td>
                        <td className="mint-nfts-data">{userKey.full_name}</td>
                        <td className="mint-nfts-data">{userKey.email}</td>
                        <td className="mint-nfts-data">{userKey.orcid_id}</td>
                        <td className="mint-nfts-data">{userKey.created_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='mint-nfts-section'>
              <h4>NFT - requests for minting</h4>
              <div className='mint-nfts-table'>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>User email</th>
                      <th>User ORCID</th>
                      <th>Created on</th>
                      <th>JPG/PDF</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {map(createdNfts, (nftKey, i) => (
                      <tr key={i} className="mint-nfts-row">
                        <td className="mint-nfts-data">{nftKey.fingerprint}</td>
                        <td className="mint-nfts-data">{nftKey.owner?.full_name}</td>
                        <td className="mint-nfts-data">{nftKey.owner?.email}</td>
                        <td className="mint-nfts-data">{nftKey.owner?.orcid_id}</td>
                        <td className="mint-nfts-data">{nftKey.created_at}</td>
                        <td className="mint-nfts-data"><a href={nftKey.url} target="_blank" rel="noopener noreferrer">{nftKey.url ? 'Link to Nft' : '-'}</a></td>
                        <td className="mint-nfts-actions">
                          <button onClick={() => this.approveMintOfNft(nftKey.fingerprint)}>Approve</button>
                          <button onClick={() => this.declineMintOfNft(nftKey.fingerprint)}>Decline</button>
                        </td>
                      </tr>
                    ))}
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

export default (connect(mapStateToProps)(AdminPage): React$ComponentType<Props>);
