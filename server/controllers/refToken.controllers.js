import jwt from "jsonwebtoken"

export const refresh = async(req, res)=>{
    const token = req.cookies?.refresh_token

    if (!token) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN); // your secret key
    const accessToken = jwt.sign({ userId: payload.userId }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "15m" });

    return res.json({ access_token: accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
}