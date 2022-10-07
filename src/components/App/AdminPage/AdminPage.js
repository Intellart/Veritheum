import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get, map } from 'lodash';
import { actions } from '../../../store/nftStore';
import type { Nft } from '../../../store/nftStore';

// NFTs view
// - approve minting and selling

// Page Statistics view
// - user count

type Props = {
    dispatch: Function,
    createdNfts: Nft[],
    sellNfts: Nft[],
}

const mapStateToProps = (state) => {
    const createdNfts = get(state, 'nft.createdNfts', []);
    const sellNfts = get(state, 'nft.sellNfts', []);

    return {
        createdNfts,
        sellNfts,
    };
  };

class AdminPage extends React.Component<ReduxProps, State> {
    constructor() {
      super();
      this.state = {};
    }


    render () {
        const { isAdmin } = this.props;
        const userList = [];
        const createdNfts = this.props.dispatch(actions.fetchCreatedNfts());
        const sellNfts = this.props.dispatch(actions.fetchSellNfts());

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
                                        {map(userList, (userKey, i) => (
                                            <tr key={i} className="mint-nfts-row">
                                                <td className="mint-nfts-data">{userKey?.id}</td>
                                                <td className="mint-nfts-data">{userKey?.full_name}</td>
                                                <td className="mint-nfts-data">{userKey?.email}</td>
                                                <td className="mint-nfts-data">{userKey?.orcid_id}</td>
                                                <td className="mint-nfts-data">{userKey?.created_at}</td>
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
                                                    <button onClick={() => this.approveSellOfNft(nftKey.fingerprint)}>Approve</button>
                                                    <button onClick={() => this.declineSellOfNft(nftKey.fingerprint)}>Decline</button>
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