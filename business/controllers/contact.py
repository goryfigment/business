import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.http import JsonResponse
from business.decorators import data_required
from business.settings_secret import GMAIL, GMAIL_PASSWORD


@data_required(['city', 'state', 'company', 'first_name', 'last_name', 'phone', 'email', 'message'], 'POST')
def company_message(request):
    from_email = request.POST['email']
    to_email = "whey2ezllc@gmail.com"
    name = request.POST['first_name'] + " " + request.POST['last_name']
    company = request.POST['company']
    city = request.POST['city']
    state = request.POST['state']
    phone = request.POST['phone']
    email = request.POST['email']
    message = request.POST['message']

    # Create message container - the correct MIME type is multi-part/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Whey2eZ Message"
    msg['From'] = from_email
    msg['To'] = to_email

    # Create the body of the message (a plain-text and an HTML version).
    text = "Name: " + name + "\n" + \
           "Company: " + company + "\n" + \
           "City: " + city + " " + ", State: " + state + "\n" + \
           "Phone: " + phone + "\n" + \
           "Email: " + email + "\n\n" + \
           "Message: " + message

    html = """\
    <html>
      <head></head>
      <body>
        <div>
        <p>
           Name: """ + name + """<br>
           Company: """ + company + """<br>
           City: """ + city + """, State: """ + state + """<br>
           Phone: """ + phone + """<br>
           Email: """ + email + """<br><br>
           Message: """ + message + """
        </p>
      </body>
    </html>
    """

    # Record the MIME types of both parts - text/plain and text/html.
    part1 = MIMEText(text, 'plain')
    part2 = MIMEText(html, 'html')
    msg.attach(part1)
    msg.attach(part2)

    # Send the message via local SMTP server.
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.ehlo()
    s.starttls()
    s.login(GMAIL, GMAIL_PASSWORD)

    # sendmail function takes 3 arguments: sender's address, recipient's address
    s.sendmail(from_email, to_email, msg.as_string())
    s.quit()

    return JsonResponse({'success': True}, safe=False)
