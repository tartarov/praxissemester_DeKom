


const fetchJwksUri = async (issuer) => {
    if (!allowedIssuers.includes(issuer)) {
      throw new Error(`The issuer ${issuer} is not trusted here!`);
    }
    const response = await fetch(`${issuer}/.well-known/openid-configuration`);
    const {jwks_uri} = await response.json();
    return jwks_uri;
  };
  
  const getKey = (jwksUri) => (header, callback) => {
    const client = jwksClient({jwksUri});
    client.getSigningKey(header.kid, (err, key) => {
      console.log("HEADER.KID: " + JSON.stringify(header))
      if (err) {
        console.log(err)
        return callback(err);
      }
      console.log("key: " + JSON.stringify(key))
      callback(null, key.publicKey || key.rsaPublicKey);
    });
  };
  
  const verify = async token => {
    const {iss: issuer} = jwt.decode(token);
    const jwksUri = await fetchJwksUri(issuer);
    return promisify(jwt.verify)(token, getKey(jwksUri));
  };

