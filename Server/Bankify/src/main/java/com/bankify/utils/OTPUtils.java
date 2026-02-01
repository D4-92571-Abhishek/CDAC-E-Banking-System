package com.bankify.utils;

import java.security.SecureRandom;

public class OTPUtils {
	public static String generateOtp() {
		StringBuilder otp = new StringBuilder();
		SecureRandom random = new SecureRandom();
		for(int i=0;i<6;i++)otp.append(random.nextInt(10));
		return otp.toString();
	}
}
