const LocalStrategy = require("passport-local").Strategy;
const { createHashedPassword } = require("../utils/utils");

function configurePassPort(passport, client) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "pw",
        session: false,
      },
      async (username, password, done) => {
        try {
          const db = client.db("tblog");
          const hashedPassword = await createHashedPassword(password);
          const user = await db.collection("login").findOne({ id: username });
          if (!user || user.pw != hashedPassword) {
            return done(null, false, { message: "존재하지 않는 사용자입니다" });
          }
          if (user.id == username && user.pw == hashedPassword) {
            return done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}

module.exports = configurePassPort;
