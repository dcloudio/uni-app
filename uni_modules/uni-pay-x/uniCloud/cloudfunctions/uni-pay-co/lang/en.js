const word = {

};

const sentence = {
	50403: 'Permission denied',
	51001: 'Invalid out_trade_no',
	51002: 'Invalid code',
	51003: 'Invalid order_no',
	51004: 'Invalid type',
	51005: 'Invalid total_fee',
	51006: 'Invalid description',
	51007: 'Invalid provider',
	51008: 'Invalid clientInfo',
	51009: 'Invalid cloudInfo',
	51010: 'Invalid out_trade_no or transaction_id',
	51011: 'Invalid wxpay_virtual',
	51012: 'Invalid buy_quantity',
	51013: 'Invalid apple_virtual',
	52001: 'NotExist payOrder',
	52002: 'NotExist notifyUrl',
	53001: 'Create payment error',
	53002: 'Refund error',
	53003: 'Query refund error',
	53004: 'Close order error',
	53005: 'Cert verify error',
	54001: 'Invalid verification',
	54002: 'Order not paid'
};

module.exports = {
	...word,
	...sentence
}
