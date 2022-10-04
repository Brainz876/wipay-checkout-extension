import React from "react";
import {
  useExtensionApi,
  render,
  Banner,
  useTranslate,
  Button,
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Dynamic::Render", () => <App />);

function App() {
  const wipayAPI = () => {
    /*
    TODO:
    1. Get Checkout Amount from Shopify Api, Log and Test
    2. Checkout in USD
    3. Test in Sandbox mode
    4. Publish App
    5. Attach App to Checkout Page
    */
    console.log("it worked");

    var headers = new Headers();
    headers.append("Accept", "application/json");
    var parameters = new URLSearchParams();
    parameters.append("account_number", "1234567890");
    parameters.append("avs", "0");
    parameters.append("country_code", "JM");
    parameters.append("currency", "USD");
    parameters.append("data", '{"a":"b"}');
    parameters.append("environment", "sandbox");
    parameters.append("fee_structure", "customer_pay");
    parameters.append("method", "credit_card");
    parameters.append("order_id", "oid_123-aBc");
    parameters.append("origin", "WiPay-example_app");
    parameters.append(
      "response_url",
      "https://jm.wipayfinancial.com/response/"
    );
    parameters.append("total", "10.00");
    var options = {
      method: "POST",
      headers: headers,
      body: parameters,
      redirect: "follow",
    };
    fetch("https://jm.wipayfinancial.com/plugins/payments/request", options)
      .then((response) => response.text())
      .then((result) => {
        // result in JSON format (header)
        result = JSON.parse(result);
        // perform redirect
        window.location.href = result.url;
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Button
      onPress={() => wipayAPI()}>
      Pay With WiPay
    </Button>
  );
}

// extend('Checkout::Dynamic::Render', (root) => {
//   const button = root.createComponent(
//     Button,
//     {onPress: () => console.log('onPress event t')},
//     'Pay now',
//   );

//   root.appendChild(button);
// });
