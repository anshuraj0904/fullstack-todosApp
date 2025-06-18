import jwt from "jsonwebtoken";

// 👇 Final seamless token regeneration middleware
export const RegenerateAccessTokenIfNeeded = async (req, res, next) => {
  const accessToken = req.cookies?.access_token;
  const refreshToken = req.cookies?.refresh_token;

  // 🔒 Case 1: If no refresh_token — not logged in, skip
  if (!refreshToken) {
    return next();
  }

  // 🎟️ Case 2: access_token is missing or expired
  try {
    // ✅ Check if access_token is valid
    if (accessToken) {
      const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
      req.user = decoded; // Optional: attach user
      return next(); // Token is fine
    }
  } catch (err) {
    // If token is expired or invalid, fall through to refresh
    console.log(`Error: ${err}`);
    
  }

  // 🌀 Try refreshing
  try {
    const user = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);

    const newAccessToken = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.SECRET_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );

    // 🍪 Set new access token in cookie
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    req.user = user; // Optional: attach user to req
  } catch (err) {
    // 🔐 Refresh token invalid — skip, let next middleware/auth fail
    console.log(`Error: ${err}`);
    
  }

  next();
};
