// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import type { QueryParam } from '../../../api';
import './Profile.scss';

function Profile(): Node {
  const hasUserIdParam = window.location.pathname.replace('/profile/', '') !== '/profile';
  const profile = useSelector((state) => selectors.getUser(state, hasUserIdParam));
  const userNfts = useSelector((state) => selectors.getUserNfts(state, hasUserIdParam));
  const dispatch = useDispatch();
  const [isFetchingNfts, setIsFetchingNfts] = useState(false);
  const userId = useParams().id;
  const location = useLocation();

  useEffect(() => {
    dispatch(actions.clearCurrentSelectedUser());

    if (userId && isEmpty(profile)) {
      dispatch(actions.fetchUserById(userId));

      return;
    }

    if (!userId && isEmpty(userNfts) && profile) {
      const nftsQuery: QueryParam[] = [
        // $FlowFixMe
        { key: 'owner_id', query: String(profile.id) },
      ];
      const likesQuery: QueryParam[] = [
        // $FlowFixMe
        { key: 'user_id', query: String(profile.id) },
      ];
      dispatch(actions.fetchUserNfts('intellart/nfts/index_user_nfts', nftsQuery));
      dispatch(actions.fetchUserNfts('intellart/nft_likes', likesQuery));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isSameSelectedUser = isEqual(profile) || Number(userId) === profile?.id;
    const shouldFetchNfts = !isFetchingNfts && userId && isSameSelectedUser && isEmpty(userNfts);

    if (userId && !isSameSelectedUser) {
      dispatch(actions.fetchUserById(userId));

      return;
    }

    if (shouldFetchNfts && profile) {
      const nftsQuery: QueryParam[] = [
        // $FlowFixMe
        { key: 'owner_id', query: String(profile.id) },
      ];
      const likesQuery: QueryParam[] = [
        // $FlowFixMe
        { key: 'user_id', query: String(profile.id) },
      ];
      dispatch(actions.fetchUserNfts('intellart/nfts/index_user_nfts', nftsQuery));
      dispatch(actions.fetchUserNfts('intellart/nft_likes', likesQuery));
      setIsFetchingNfts(true);
    }
  }, [profile, userId, isFetchingNfts, userNfts, dispatch]);

  useEffect(() => {
    dispatch(actions.clearCurrentSelectedUser());

    if (userId && isEmpty(profile)) {
      dispatch(actions.fetchUserById(userId));

      return;
    }

    if (!userId && isEmpty(userNfts) && profile) {
      const nftsQuery: QueryParam[] = [
        // $FlowFixMe
        { key: 'owner_id', query: String(profile.id) },
      ];
      const likesQuery: QueryParam[] = [
        // $FlowFixMe
        { key: 'user_id', query: String(profile.id) },
      ];
      dispatch(actions.fetchUserNfts('intellart/nfts/index_user_nfts', nftsQuery));
      dispatch(actions.fetchUserNfts('intellart/nft_likes', likesQuery));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const tabs = [
    {
      label: 'Created',
      value: {
        id: 'created',
        nft: 'owner',
        user: 'id',
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
          {profile.social_links ? (
            <Link to={window.location.pathname}>
              <VscGlobe />
            </Link>
          ) : null}
          {profile.social_links ? (
            <Link to={window.location.pathname}>
              <IoLogoTwitter />
            </Link>
          ) : null}
          {profile.social_links ? (
            <Link to={window.location.pathname}>
              <FaDiscord />
            </Link>
          ) : null}
          {!userId && (
            <Link to="/settings">
              <IoSettings />
            </Link>
          )}
        </div>
        <GalleryContent tabs={tabs} isProfile />
      </div>
    </div>
  );
}

export default Profile;
