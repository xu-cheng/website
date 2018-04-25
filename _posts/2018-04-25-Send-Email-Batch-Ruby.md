---
layout: post
title: "Send Email in the Batch using Ruby"
description: ""
category:
tags: ["Ruby"]
---

Sometimes, you may find the need to send a large number of emails in batch. For example, you may be a TA of a course and are required to notify all the students of their grades. In this case, sending email in the batch would save lots of time and effort. In the following are my notes on how to achieve this using Ruby.

First, you need to install Ruby and [the mail library][mail]. You can install the library by `gem install mail`.

Second, since there are lots of emails to be sent, it is a better idea to maintain a single SMTP connection to the email server to reduce the overhead. This is also beneficial to avoid possible network issues. You can open an SMTP connection using following Ruby codes, which connects to the email server in my department.

{% highlight ruby linenos %}
require "mail"
require "socket"

smtp_conn = Net::SMTP.new("mh2.comp.hkbu.edu.hk", 465)
smtp_conn.set_debug_output $stderr
smtp_conn.enable_tls
smtp_conn.start Socket.gethostname, "<username>", "<password>", "login"

Mail.defaults do
  delivery_method :smtp_connection, connection: smtp_conn
end
{% endhighlight %}

Finally, format your emails and deliver them. It is worth noting that you should sleep a few seconds between each email delivering to avoid DoSing the email server.

{% highlight ruby linenos %}
# format the email
mail = Mail.new do
  from     'from@example.com'
  to       'to@example.com'
  subject  '<subject>'
  body     '<body>'
  add_file filename: 'some_attachment.txt', content: File.read('/path/to/attachment.txt')
end

# check the email
puts mail

# send the email
mail.deliver!

sleep 2 # wait a bit
# handle next email
{% endhighlight %}

 [mail]: https://github.com/mikel/mail
