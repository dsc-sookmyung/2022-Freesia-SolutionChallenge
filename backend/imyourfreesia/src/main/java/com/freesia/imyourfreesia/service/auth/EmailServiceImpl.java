package com.freesia.imyourfreesia.service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Random;

// 사용자 정의 구현 클래스 (메소드 직접 구현)
@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    JavaMailSender emailSender;

    public static final String code = createCode();

    private MimeMessage createAuthMail(String to) throws Exception {

        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, to); // 보내는 대상
        message.setSubject("I'm your freesia Membership Registration Authentication"); // 제목

        String msgg="";
        msgg+="<div style=\"font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 500px; height: 600px; border-top: 4px solid #FFEF5E; margin: 100px auto; padding: 30px 0; box-sizing: border-box\";>";
        msgg+="<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\">";
        msgg+="<span style=\"font-size: 15px; margin: 0 0 10px 3px;\"><strong>I'm your freesia</strong></span><br />";
        msgg+="<span style=\"color: #FFEF5E\"><strong>Membership authentication</strong></span>";
        msgg+="</h1><br />";
        msgg+= "<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\"> Hello, I'm your freesia. <br />Please enter the code below in the membership authentication. <br />Thank you.</p><br />";
        msgg+= "<div align='center'>";
        msgg+= " <p align='center' style=\"display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #FFEF5E; line-height: 45px; vertical-align: middle; font-size: 16px;\"><strong>"+code+"</strong></p<br/>";
        msgg+= "</div><br/>";
        msgg+= "<<div style=\"border-top: 1px solid #DDD; padding: 5px;\"></div>";
        msgg+="</div>";
        message.setText(msgg, "utf-8", "html"); // 내용
        message.setFrom(new InternetAddress("iamyourfreesia@gmail.com","I'm your freesia")); // 보내는 사람

        return message;
    }

    // 인증코드 8자리 랜덤 생성
    public static String createCode() {
        StringBuffer key = new StringBuffer();
        Random random = new Random();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0:
                    key.append((char) ((int) (random.nextInt(26)) + 97));
                    break;
                case 1:
                    key.append((char) ((int) (random.nextInt(26)) + 65));
                    break;
                case 2:
                    key.append((random.nextInt(10)));
                    break;
            }
        }

        return key.toString();
    }

    // 사용자 정의 구현
    @Override
    public String sendAuthMail(String to) throws Exception {
        MimeMessage message = createAuthMail(to);
        try{ // 예외처리
            emailSender.send(message);
        } catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return code;
    }
}
