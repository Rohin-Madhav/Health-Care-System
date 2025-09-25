const Payment = require('../models/payment')


function simulatePaymentGateway({ amount, currency, paymentMethod }) {
  
  
    return {
        transactionId: 'TXN' + Date.now(),
        status: 'Completed'
    };
}

exports.createPayment = async (req, res) => {
    try {
        
        if (req.user.role !== 'patient') {
            return res.status(403).json({ message: 'Only patients can make payments.' });
        }

        const { appointmentId, doctorId, amount, currency, paymentMethod } = req.body;
        const patientId = req.user._id;

       
        const gatewayResponse = simulatePaymentGateway({ amount, currency, paymentMethod });

        const payment = new Payment({
            appointmentId,
            patientId,
            doctorId,
            transactionId: gatewayResponse.transactionId,
            amount,
            currency,
            paymentMethod,
            status: gatewayResponse.status
        });

        await payment.save();

        res.status(201).json({ message: 'Payment successful', payment });
    } catch (error) {
        res.status(500).json({ message: 'Payment failed', error: error.message });
    }
};


