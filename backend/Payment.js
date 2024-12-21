const paypal = require('paypal-rest-sdk')

paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AdJWZx-731x84a2kG4VRk7MsfKVO2082HHBCkXnH7CdGZfxy2UJ6JZxGjecuCST3iqr4OxyCcS2vLShR',
    'client_secret': 'EJaTo9ee2JdFgDIRzBI7MrOyT3Oy8ALcxIFx-xPoZAvf5d3K0Ztfh7GsdWh8J27xAg5lisienhk3ZBDi'
});

module.exports = paypal;