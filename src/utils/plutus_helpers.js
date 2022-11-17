import { postSellBuildTx, postSellSubmitTx, postBuyBuildTx, postBuySubmitTx,
         postCloseSellBuildTx, postCloseSellSubmitTx } from "../api";

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

export const submitSellRequest = (tokenName) => {
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

        postSellBuildTx(payload)
            .then(response => {console.log(response); return response;})
            .then(signSellTx);
        });
    });
};

// Close sell
// TODO: implement Close functionality on marketplace NFTs
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
                'nft_price': adaValue
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
            'nft_price': adaValue
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