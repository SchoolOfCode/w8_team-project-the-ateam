async function getTwitter() {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    'OAuth oauth_consumer_key="UqWqSA3ekn9cmG057rfXaVfqg",oauth_token="1394280388118392834-GqQrTX6486zifYFNJQmJrgiMS4SNCk",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1621518636",oauth_nonce="ZUlOwvsSbWq",oauth_version="1.0",oauth_signature="qIm7eUorABYm9UV4I%2FvzKPmFFr0%3D"'
  );
  myHeaders.append(
    "Cookie",
    'guest_id=v1%3A162151657944511544; personalization_id="v1_S+s15t2jLr1adjN6SP3Xag=="'
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://api.twitter.com/2/tweets/1228393702244134912", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
getTwitter();
// mode: "no-cors",
