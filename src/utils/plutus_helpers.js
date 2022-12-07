import { postSellBuildTx, postSellSubmitTx, postBuyBuildTx, postBuySubmitTx,
         postCloseSellBuildTx, postCloseSellSubmitTx } from "../api";
import { actions as nftActions } from '../store/nftStore';

// Initiate sell
const signSellTx = (tx) => {
    const datum = tx['datum']
    const address = tx['address']

    window.cardano.signTx(tx['tx']).then((witness) => {
        sendSellTxAndWitnessBack(tx['tx'], witness, datum, address);
    });
};

const sendSellTxAndWitnessBack = (tx, witness, datum, address) => {
    const payload = JSON.stringify({ 'tx': tx, 'witness': witness, 'datum': datum, 'address': address });

    postSellSubmitTx(payload)
        .then(response => response)
        .then(data => {
            alert("Transaction: " + data["tx_id"] + " submitted!");
        });
};

export const submitSellRequest = (tokenName, fingerprint, props) => {
    // TODO: should the user have the option to change price? How to implement this?
    let adaValue = prompt("Please enter token value (in ADA)", "2");

    if (adaValue == null) {
        return
    } else {
        adaValue = adaValue * 1000000;
    }

    window.cardano.getUsedAddresses().then((senders) => {
        window.cardano.getChangeAddress().then((change_address) => {

        // TODO: add change_address to the NFTs table into sell_address field
        const payload = JSON.stringify({
            'senders': senders,
            'change_address': change_address,
            'nft_name': tokenName,
            'ada_lovelace': adaValue
        });
        const updateSellerPayload = JSON.stringify({ 'seller_address': change_address });

        postSellBuildTx(payload)
            .then(response => {console.log(response); return response;})
            .then(signSellTx)
            .then(props.dispatch(
                nftActions.updateStateToOnSale(fingerprint)))
            .then(props.dispatch(
                nftActions.updateSeller(updateSellerPayload, fingerprint)))
            .then(window.location.replace('/marketplace'));
        });
    });
};

// Close sell
const closeSellSignTx = (tx) => {
    const witnessSet = tx['witness_set']
    const datum = tx['datum']

    window.cardano.signTx(tx['tx']).then((witness) => {
        closeSellSendTxAndWitnessBack(tx['tx'], witness, witnessSet, datum);
    });
};

const closeSellSendTxAndWitnessBack = (tx, witness, witnessSet, datum) => {
    const payload = JSON.stringify({ 'tx': tx, 'witness': witness, 'witness_set': witnessSet, 'datum': datum });

    postCloseSellSubmitTx(payload)
        .then(response => response)
        .then(data => {
            alert("Transaction: " + data["tx_id"] + " submitted!");
        });
};

export const submitCloseSellRequest = (tokenName) => {
    let adaValue = prompt("Please enter token value (in ADA)", "2");

    if (adaValue == null) {
        return
    } else {
        adaValue = adaValue * 1000000;
    }

    window.cardano.getUsedAddresses().then((senders) => {
        window.cardano.getChangeAddress().then((change_address) => {
            const payload = JSON.stringify({
                'senders': senders,
                'change_address': change_address,
                'nft_name': tokenName,
                'ada_lovelace': adaValue
            });

            postCloseSellBuildTx(payload)
                .then(response => response)
                .then(closeSellSignTx);
        });
    });
};

// Buy
export const submitBuyRequest = (tokenName) => {
    let adaValue = prompt("Please enter token value (in ADA)", "2");

    if (adaValue == null) {
        return
    } else {
        adaValue = adaValue * 1000000;
    }

    window.cardano.getUsedAddresses().then((senders) => {
        window.cardano.getChangeAddress().then((change_address) => {
            const payload = JSON.stringify({
            'senders': senders,
            'change_address': change_address,
            'nft_name': tokenName,
            'ada_lovelace': adaValue
            });

            postBuyBuildTx(payload)
            .then(response => response)
            .then(buySignTx);
        });
    });
};

const buySignTx = (tx) => {
    const witnessSet = tx['witness_set'];
    const datum = tx['datum'];

    window.cardano.signTx(tx['tx'], true).then((witness) => {
        buySendTxAndWitnessBack(tx['tx'], witness, witnessSet, datum);
    });
};

const buySendTxAndWitnessBack = (tx, witness, witnessSet, datum) => {
    const payload = JSON.stringify({ 'tx': tx, 'witness': witness, 'witness_set': witnessSet, 'datum': datum });

    postBuySubmitTx(payload)
        .then(response => response)
        .then(data => {
            alert("Transaction: " + data["tx_id"] + " submitted!");
        });
};