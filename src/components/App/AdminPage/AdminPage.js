import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, map } from 'lodash';
import { actions as createdNftActions } from '../../../store/createdNftStore';
import { actions as sellNftActions } from '../../../store/sellNftStore';
import { actions as userActions, selectors } from '../../../store/userStore';
import type { Nft } from '../../../store/nftStore';
import type { Profile } from '../../../store/userStore';

// NFTs view
// - approve minting and selling

// Page Statistics view
// - user count

type Props = {
    dispatch: Function,
    createdNfts: { [string]: Nft },
    sellNfts: { [string]: Nft },
    allUsers: { [string]: Profile },
}

const mapStateToProps = (state) => {
  const createdNfts = get(state, 'createdNfts', {});
  const sellNfts = get(state, 'sellNfts', {});
  const allUsers = get(state, 'user.allUsers', {});

  return {
    createdNfts,
    sellNfts,
    allUsers,
  };
};

class AdminPage extends React.Component<ReduxProps, State> {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(createdNftActions.fetchCreatedNfts());
    this.props.dispatch(sellNftActions.fetchSellNfts());
    this.props.dispatch(userActions.fetchAllUsers());
  }

  approveMintOfNft(fingerprint: string) {
    this.props.dispatch(createdNftActions.approveCreatedNft(fingerprint));
  }

  declineMintOfNft(fingerprint: string) {
    this.props.dispatch(createdNftActions.declineCreatedNft(fingerprint));
  }

  approveSellOfNft(fingerprint: string) {
    this.props.dispatch(sellNftActions.approveSellNft(fingerprint));
  }

  declineSellOfNft(fingerprint: string) {
    this.props.dispatch(sellNftActions.declineSellNft(fingerprint));
  }

  render () {
    const { createdNfts, sellNfts, allUsers } = this.props;
    console.log(allUsers);

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
              <h4>NFTs for minting</h4>
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
                        <td className="mint-nfts-data">{nftKey.url}</td>
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
            <div className='sell-nfts-section'>
              <h4>NFTs for selling</h4>
              <div className='sell-nfts-table'>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>User email</th>
                      <th>User ORCID</th>
                      <th>Created on</th>
                      <th>Name</th>
                      <th>JPG/PDF</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {map(sellNfts, (nftKey, i) => (
                      <tr key={i} className="sell-nfts-row">
                        <td className="sell-nfts-data">{nftKey.fingerprint}</td>
                        <td className="sell-nfts-data">{nftKey.owner?.full_name}</td>
                        <td className="sell-nfts-data">{nftKey.owner?.email}</td>
                        <td className="sell-nfts-data">{nftKey.owner?.orcid_id}</td>
                        <td className="sell-nfts-data">{nftKey.created_at}</td>
                        <td className="sell-nfts-data">{nftKey.name}</td>
                        <td className="sell-nfts-data">{nftKey.url}</td>
                        <td className="sell-nfts-data">{nftKey.price}</td>
                        <td className="sell-nfts-actions">
                          <button onClick={() => this.approveSellOfNft(nftKey.fingerprint)}>Approve</button>
                          <button onClick={() => this.declineSellOfNft(nftKey.fingerprint)}>Decline</button>
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
