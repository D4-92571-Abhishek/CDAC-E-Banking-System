package com.bankify.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class OtpVisuals {
	public static String buildOtpEmailTemplate(String name,String otp,String amount,LocalDateTime transactionTime) {

		String html = """
				<!DOCTYPE html>
				<html>
				<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

				<table width="100%" cellpadding="0" cellspacing="0">
				    <tr>
				        <td align="center">

				            <table width="600" cellpadding="0" cellspacing="0"
				                   style="background:#ffffff; margin:40px 0; border-radius:8px; overflow:hidden;">

				                <!-- Header -->
				                <tr>
				                    <td style="background:linear-gradient(135deg, #212529 0%, #495057 100%); padding:20px; text-align:center;">
				                        <h1 style="color:#ffffff; margin:0;">Bankify</h1>
				                        <p style="color:#e9f7ef; margin:5px 0 0;">Transaction Security Alert</p>
				                    </td>
				                </tr>

				                <!-- Body -->
				                <tr>
				                    <td style="padding:30px; color:#333;">
				                        <p>Hello <b>{{NAME}}</b>,</p>

				                        <p>
				                            We received a request to process the following transaction.
				                            Please use the OTP below to authorize it.
				                        </p>

				                        <table width="100%" style="margin:20px 0;">
				                            <tr>
				                                <td><b>Amount:</b></td>
				                                <td>₹ {{AMOUNT}}</td>
				                            </tr>
				                            <tr>
				                                <td><b>Date & Time:</b></td>
				                                <td>{{TRANSACTION_TIME}}</td>
				                            </tr>
				                        </table>

				                        <!-- OTP -->
				                        <div style="text-align:center; margin:30px 0;">
				                            <span style="
				                                font-size:28px;
				                                letter-spacing:6px;
				                                font-weight:bold;
				                                padding:12px 20px;
				                                border:2px dashed #198754;
				                                display:inline-block;
				                                color:Black;">
				                                {{OTP}}
				                            </span>
				                        </div>

				                        <p style="color:#d9534f;">
				                            This OTP is valid for <b>5 minutes</b>.
				                        </p>

				                        <p>
				                            <b>Do not share this OTP</b> with anyone, including Bankify staff.
				                            If you did not initiate this transaction, please contact support immediately.
				                        </p>

				                        <p>Regards,<br>
				                        <b>Bankify Transaction Security Team</b></p>
				                    </td>
				                </tr>

				                <!-- Footer -->
				                <tr>
				                    <td style="background:#f4f6f8; padding:15px; text-align:center;">
				                        <small style="color:#777;">
				                            This is an automated message. Please do not reply to this email.
				                        </small>
				                    </td>
				                </tr>

				            </table>

				        </td>
				    </tr>
				</table>

				</body>
				</html>

				""";

		DateTimeFormatter formatter =
		        DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");
		html = html
		.replace("{{OTP}}", otp)
		.replace("{{NAME}}", name)
		.replace("{{AMOUNT}}",amount)
		.replace("{{TRANSACTION_TIME}}", transactionTime.format(formatter));
		return html;
	}
}
