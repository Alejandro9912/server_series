const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    res
      .status(403)
      .send({ msg: "La peticion no tiene el header de autenticacion" });
  }

  const token = req.headers.authorization.replace("Token ", "");

  try {
    const payload = jwt.decoded(token);

    const { exp } = payload;
    const currentData = new Date().getTime();

    if (exp <= currentData) {
      res.status(400).send({ msg: "El token ha expirado" });
    }

    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: " Token invalido" });
  }
}

module.exports = {
  asureAuth,
};
