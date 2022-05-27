// @flow
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import {
  filter, get, reduce, some, includes, map, find,
} from 'lodash';
import type { Nft } from '../store/nftStore';
import type { Profile } from '../store/userStore';
import type { State } from '../store/exchangeRatesStore';

export const formatDate = (date: Date|string|number): string|null => {
  if (!date) return null;

  return format(utcToZonedTime(new Date(date), 'Europe/Berlin'), 'MMMM') + ' ' + format(utcToZonedTime(new Date(date), 'Europe/Berlin'), 'do') + ' ' + format(utcToZonedTime(new Date(date), 'Europe/Berlin'), 'yyyy');
};

// $FlowFixMe
export const isPromise = (p) => !!p && typeof p.then === 'function';

export const isProdEnv = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction: boolean = isProdEnv && window.location.hostname === 'veritheum.intellart.ca';
export const isStaging: boolean = isProdEnv && window.location.href.includes('staging');

export const buildRedirectLink = (path: string): string => window.location.origin + path;

export const orcidOAuthLink = (path: string): string => {
  const baseURL = isProdEnv ? 'https://orcid.org' : 'https://sandbox.orcid.org';
  const clientId = get(process.env, 'REACT_APP_ORCID_CLIENT_ID', '');

  return `${baseURL}/oauth/authorize?client_id=${clientId}&response_type=code&scope=/authenticate&redirect_uri=${buildRedirectLink(path)}`;
};

export const getAllUserWalletAddresses = (wallets: Object[], key: string): number[] => {
  const list = reduce(wallets, (result, wallet) => {
    const addresses = map(wallet.cardano_addresses, (address: Object) => address[key]);

    return [...result, ...addresses];
  }, []);

  return list;
};

export const buildUserGalleryNftList = (tabs: Object[], profile: Profile, initialNftList: Nft[]): { list: {[string]: Nft[]}, tabs: Object[] } => {
  const newTabs = tabs.slice();
  const list = reduce(newTabs, (result, tab) => {
    const tabNftList = filter(initialNftList, (nft: Nft) => {
      const nftVal = get(nft, tab.value.nft);
      const userVal = get(profile, tab.value.user);

      if (tab.value.id === 'created') {
        const addresses = getAllUserWalletAddresses(userVal, 'address');

        return includes(addresses, nftVal);
      }

      if (tab.value.id === 'liked') return some(nftVal, ['user_id', userVal]);

      return nftVal === userVal;
    });

    tab.count = tabNftList.length;
    result[tab.value.id] = tabNftList;

    return result;
  }, {});

  return { list, tabs: newTabs };
};

export const findNftLike = (nft: Nft, userId: ?number): ?Object => find(nft.likes, ['user_id', userId]);

export const calcExchangeRate = (exchangeRates: State, coin: number, currency?: 'usd'|'cad'|'eur'|'gbp' = 'usd'): number => exchangeRates[currency] * coin;
