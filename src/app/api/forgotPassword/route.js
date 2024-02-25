import { NextResponse } from "next/server";
import crypto from "crypto";
import connectMongoDB from "../../../../utils/mongoDB";
import NewUserAuth from "../../../../models/newUserAuth";
import {
  baseUrlStaging,
  baseUrlProd,
  baseUrlTest,
} from "../../../../axios/baseUrl";
import sgMail from "@sendgrid/mail";

export async function POST(req) {
  const { email } = await req.json();

  await connectMongoDB();
  const user = await NewUserAuth.findOne({ email: email });

  if (!user) {
    return NextResponse.json(
      { message: "email is not there" },
      { status: 400 }
    );
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetExpires = Date.now() + 3600000;

  user.resetToken = passwordResetToken;
  user.resetTokenExpiry = passwordResetExpires;

  const resetUrl = `${baseUrlStaging}/resetPassword/${resetToken}`;

  const emailBody = `Reset your password by clicking on the following url: ${resetUrl}`;

  const message = {
    to: email,
    from: "arkalal.chakravarty@gmail.com",
    subject: "Reset Password",
    text: emailBody,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  sgMail
    .send(message)
    .then(() => {
      return NextResponse.json(
        { message: "Reset Email sent successfully" },
        { status: 200 }
      );
    })
    .catch(async (error) => {
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();

      console.log(error);

      return NextResponse.json(
        { message: "Failed sending email" },
        { status: 400 }
      );
    });

  try {
    await user.save();
    return NextResponse.json(
      { message: "Reset email is sent to the user" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
