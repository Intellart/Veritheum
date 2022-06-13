// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty, isEqual, map } from 'lodash';
import { VscGlobe } from 'react-icons/vsc';
import {
  MdCollectionsBookmark, MdEdit,
} from 'react-icons/md';
import { IoLogoTwitter, IoSettings, IoHeart } from 'react-icons/io5';
import { FaDiscord } from 'react-icons/fa';
import GalleryContent from '../GalleryContent/GalleryContent';
import Loader from '../Loader/Loader';
import { formatDate, getAllUserWalletAddresses } from '../../../utils';
import { actions, selectors } from '../../../store/userStore';
import Logo from '../../../assets/graphics/veritheum_logo_cb.png';
import UserImagePlaceholder from '../../../assets/icons/user.svg';
import type { Profile as ProfileType } from '../../../store/userStore';
import type { Nft } from '../../../store/nftStore';
import type { QueryParam } from '../../../api';
import type { ReduxState } from '../../../types';
import './Profile.scss';

type Props = {
  profile: ?ProfileType,
  userNfts: ?Nft[],
  dispatch: Function,
}

type State = {
  isFetchingNfts: boolean,
}

class Profile extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingNfts: false,
    };
  }

  componentDidMount() {
    const userId = window.location.pathname.replace('/profile/', '');

    if (userId !== '/profile' && isEmpty(this.props.profile)) {
      this.props.dispatch(actions.fetchUserById(userId));

      return;
    }

    if (userId === '/profile' && isEmpty(this.props.userNfts) && this.props.profile) {
      const addressIDs = getAllUserWalletAddresses(this.props.profile.wallets, 'id');
      const nftsQuery: QueryParam[] = [
        { key: 'match_any', query: 'true' },
        // $FlowFixMe
        { key: 'owner_id', query: String(this.props.profile.id) },
        ...map(addressIDs, (addr) => ({ key: 'cardano_address_id[]', query: String(addr) })),
      ];
      const likesQuery: QueryParam[] = [
        // $FlowFixMe
        { key: 'user_id', query: String(this.props.profile.id) },
      ];
      this.props.dispatch(actions.fetchUserNfts('nfts', nftsQuery));
      this.props.dispatch(actions.fetchUserNfts('nft_likes', likesQuery));
    }
  }

  componentDidUpdate(prevProps: Props) {
    const userId = window.location.pathname.replace('/profile/', '');
    const isSameSelectedUser = isEqual(this.props.profile, prevProps.profile) || Number(userId) === this.props.profile?.id;
    const shouldFetchNfts = !this.state.isFetchingNfts && userId !== '/profile' && isSameSelectedUser && isEmpty(this.props.userNfts);

    if (userId !== '/profile' && !isSameSelectedUser) {
      this.props.dispatch(actions.fetchUserById(userId));

      return;
    }

    if (shouldFetchNfts && this.props.profile) {
      const addressIDs = getAllUserWalletAddresses(this.props.profile.wallets, 'id');
      const nftsQuery: QueryParam[] = [
        { key: 'match_any', query: 'true' },
        // $FlowFixMe
        { key: 'owner_id', query: String(this.props.profile.id) },
        ...map(addressIDs, (addr) => ({ key: 'cardano_address_id[]', query: String(addr) })),
      ];
      const likesQuery: QueryParam[] = [
        // $FlowFixMe
        { key: 'user_id', query: String(this.props.profile.id) },
      ];
      this.props.dispatch(actions.fetchUserNfts('nfts', nftsQuery));
      this.props.dispatch(actions.fetchUserNfts('nft_likes', likesQuery));
      this.setState({ isFetchingNfts: true });
    }
  }

  componentWillUnmount() {
    const hasUserIdParam = window.location.pathname.replace('/profile/', '') !== '/profile';
    const shouldClearSelectedUser = hasUserIdParam && (!isEmpty(this.props.profile) || !isEmpty(this.props.userNfts));

    if (shouldClearSelectedUser) {
      this.props.dispatch(actions.clearCurrentSelectedUser());
    }
  }

  render () {
    const { profile } = this.props;
    const tabs = [
      {
        label: 'Collected',
        value: {
          id: 'collected',
          nft: 'owner.id',
          user: 'id',
        },
        icon: <MdCollectionsBookmark />,
      },
      {
        label: 'Created',
        value: {
          id: 'created',
          nft: 'cardano_address',
          user: 'wallets',
        },
        icon: <MdEdit />,
      },
      {
        label: 'Liked',
        value: {
          id: 'liked',
          nft: 'likes',
          user: 'id',
        },
        icon: <IoHeart />,
      },
    ];

    const graphics = (
      <div className="graphics-wrapper">
        <div className="logo-graphic left"><img src={Logo} alt="Veritheum logo" /></div>
        <div className="logo-graphic right"><img src={Logo} alt="Veritheum logo" /></div>
        <div className="circle-graphic gr-1" />
        <div className="circle-graphic gr-2" />
        <div className="circle-graphic gr-3" />
        <div className="circle-graphic gr-4" />
      </div>
    );

    if (isEmpty(profile) || !profile) return <Loader />;

    return (
      <div className="profile-page">
        <div className="upper-profile-page-wrapper">
          <div className="user-info">
            <div className="user-image">
              <img src={UserImagePlaceholder} alt="User" />
            </div>
            <div className="user-name">
              {profile.full_name}
            </div>
            <div className="user-date-joined">
              Joined: {formatDate(profile.created_at)}
            </div>
          </div>
          {graphics}
        </div>
        <div className="lower-profile-page-wrapper">
          <div className="toolbar-links">
            <Link to={window.location.pathname}>
              <VscGlobe />
            </Link>
            <Link to={window.location.pathname}>
              <IoLogoTwitter />
            </Link>
            <Link to={window.location.pathname}>
              <FaDiscord />
            </Link>
            <Link to="/settings">
              <IoSettings />
            </Link>
          </div>
          <GalleryContent tabs={tabs} isProfile />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const hasUserIdParam = window.location.pathname.replace('/profile/', '') !== '/profile';
  const profile = selectors.getUser(state, hasUserIdParam);
  const userNfts = selectors.getUserNfts(state, hasUserIdParam);

  return {
    profile, userNfts,
  };
};

export default (connect(mapStateToProps)(Profile): React$ComponentType<{}>);
