import express from "express";
import tokenModel from "../model/tokenModel.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();


// signUp User
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res
        .status(409)
        .json({ message: "Bu email'e sahip başka bir kullanıcı var" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Şifreler Uyuşmuyor" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      fullName: `${firstName} ${lastName}`,
      email: email,
      password: hashedPassword,
    };

    const newUser = await userModel.create(user);

    // JWT İşlemlerine Devam Edilecek...
    const accessToken = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "6m",
      }
    );

    const refreshToken = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET
    );

    await tokenModel.create({
      userId: newUser._id,
      refreshToken,
    });

    res.status(201).json({ user: newUser, accessToken });
  } catch (error) {
    console.log(error.message);
  }
});

// SignIn User
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(404).json({
      message: "Kullanıcı Bulunamadı!",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Kullanıcı Bilgilerini Kontrol Edin",
    });
  }

  const accessToken = jwt.sign(
    { email, password },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "6m",
    }
  );

  const refreshToken = jwt.sign(
    {
      email,
      password,
    },
    process.env.REFRESH_TOKEN_SECRET
  );

  await tokenModel.findOneAndUpdate(
    {
      userId: user._id,
    },
    {
      refreshToken,
    }
  );

  res.status(201).json({ user, accessToken });
});

// LogOut
router.get("/logout/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await tokenModel.findOneAndUpdate(
      {
        userId: id,
      },
      {
        refreshToken: null,
      }
    );

    res.status(200).json({ message: "Çıkış İşlemi Başarılı" });
  } catch (error) {
    console.log(error.message);
  }
});

// Refresh Access Token
router.get(`/refresh/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { refreshToken } = await tokenModel.findOne({ userId: id });

    if (!refreshToken) {
      console.log("Yetkisiz");
      return res.status(403).json({
        message: "Yetkisiz",
      });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(404).json(err);
        }

        const accessToken = jwt.sign(
          { email: decoded.email, id: decoded.id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "6m",
          }
        );

        res.status(200).json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

export default router;
