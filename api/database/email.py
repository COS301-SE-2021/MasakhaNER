import smtplib, ssl

class Email:
    def __init__(self):
        self.smtp_server = "smtp.gmail.com"
        self.port = 587  # For starttls
        self.sender_email = "masakhaner.301@gmail.com"
        self.password = "stopdacap@301"
        self.context = ssl.create_default_context()
        try:
            self.server = smtplib.SMTP(self.smtp_server,self.port)
            self.server.ehlo()
            self.server.starttls(context=self.context)
            self.server.ehlo() 
            self.server.login(self.sender_email, self.password)
        except Exception as e:
            print(f"Exception: {e}")

    def send_email(self, message, receiver_email):
        self.server.sendmail(self.sender_email, receiver_email, message)
        self.server.quit() 
        print('email sent')

sendemail = Email()
receiver_email = "sinothandomabhena@gmail.com"
message =  """\
        Subject: Hi there

        Sup"""
# sendemail.send_email(message,receiver_email)